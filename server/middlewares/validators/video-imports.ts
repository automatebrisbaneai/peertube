import * as express from 'express'
import { body } from 'express-validator/check'
import { isIdValid } from '../../helpers/custom-validators/misc'
import { logger } from '../../helpers/logger'
import { areValidationErrors } from './utils'
import { getCommonVideoAttributes } from './videos'
import { isVideoImportTargetUrlValid } from '../../helpers/custom-validators/video-imports'
import { cleanUpReqFiles } from '../../helpers/utils'
import { isVideoChannelOfAccountExist, isVideoMagnetUriValid, isVideoNameValid } from '../../helpers/custom-validators/videos'
import { CONFIG } from '../../initializers/constants'

const videoImportAddValidator = getCommonVideoAttributes().concat([
  body('channelId')
    .toInt()
    .custom(isIdValid).withMessage('Should have correct video channel id'),
  body('targetUrl')
    .optional()
    .custom(isVideoImportTargetUrlValid).withMessage('Should have a valid video import target URL'),
  body('magnetUri')
    .optional()
    .custom(isVideoMagnetUriValid).withMessage('Should have a valid video magnet URI'),
  body('name')
    .optional()
    .custom(isVideoNameValid).withMessage('Should have a valid name'),

  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.debug('Checking videoImportAddValidator parameters', { parameters: req.body })

    const user = res.locals.oauth.token.User

    if (areValidationErrors(req, res)) return cleanUpReqFiles(req)

    if (CONFIG.IMPORT.VIDEOS.HTTP.ENABLED !== true) {
      cleanUpReqFiles(req)
      return res.status(409)
        .json({ error: 'Import is not enabled on this instance.' })
        .end()
    }

    if (!await isVideoChannelOfAccountExist(req.body.channelId, user, res)) return cleanUpReqFiles(req)

    // Check we have at least 1 required param
    if (!req.body.targetUrl && !req.body.magnetUri) {
      cleanUpReqFiles(req)

      return res.status(400)
        .json({ error: 'Should have a magnetUri or a targetUrl.' })
        .end()
    }

    return next()
  }
])

// ---------------------------------------------------------------------------

export {
  videoImportAddValidator
}

// ---------------------------------------------------------------------------
