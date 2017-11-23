import * as Promise from 'bluebird'
import * as express from 'express'
import 'express-validator'
import * as validator from 'validator'
import { database as db } from '../../initializers'
import { AccountInstance } from '../../models'
import { logger } from '../logger'
import { isUserUsernameValid } from './users'

function isAccountNameValid (value: string) {
  return isUserUsernameValid(value)
}

function checkVideoAccountExists (id: string, res: express.Response, callback: () => void) {
  let promise: Promise<AccountInstance>
  if (validator.isInt(id)) {
    promise = db.Account.load(+id)
  } else { // UUID
    promise = db.Account.loadByUUID(id)
  }

  promise.then(account => {
    if (!account) {
      return res.status(404)
        .json({ error: 'Video account not found' })
        .end()
    }

    res.locals.account = account
    callback()
  })
  .catch(err => {
    logger.error('Error in video account request validator.', err)
    return res.sendStatus(500)
  })
}

// ---------------------------------------------------------------------------

export {
  checkVideoAccountExists,
  isAccountNameValid
}
