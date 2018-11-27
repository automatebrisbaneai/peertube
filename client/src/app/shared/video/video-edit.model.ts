import { VideoPrivacy } from '../../../../../shared/models/videos/video-privacy.enum'
import { VideoUpdate } from '../../../../../shared/models/videos'
import { VideoScheduleUpdate } from '../../../../../shared/models/videos/video-schedule-update.model'
import { Video } from '../../../../../shared/models/videos/video.model'

export class VideoEdit implements VideoUpdate {
  static readonly SPECIAL_SCHEDULED_PRIVACY = -1

  category: number
  licence: number
  language: string
  description: string
  name: string
  tags: string[]
  autors: string[]
  nsfw: boolean
  commentsEnabled: boolean
  waitTranscoding: boolean
  channelId: number
  privacy: VideoPrivacy
  support: string
  thumbnailfile?: any
  previewfile?: any
  thumbnailUrl: string
  previewUrl: string
  uuid?: string
  id?: number
  scheduleUpdate?: VideoScheduleUpdate

  constructor (video?: Video & { tags: string[], autors: string[], commentsEnabled: boolean, support: string, thumbnailUrl: string, previewUrl: string }) {
    if (video) {
      this.id = video.id
      this.uuid = video.uuid
      this.category = video.category.id
      this.licence = video.licence.id
      this.language = video.language.id
      this.description = video.description
      this.name = video.name
      this.tags = video.tags
      this.autors = video.autors
      this.nsfw = video.nsfw
      this.commentsEnabled = video.commentsEnabled
      this.waitTranscoding = video.waitTranscoding
      this.channelId = video.channel.id
      this.privacy = video.privacy.id
      this.support = video.support
      this.thumbnailUrl = video.thumbnailUrl
      this.previewUrl = video.previewUrl

      this.scheduleUpdate = video.scheduledUpdate
    }
  }

  patch (values: { [ id: string ]: string }) {
    Object.keys(values).forEach((key) => {
      this[ key ] = values[ key ]
    })

    // If schedule publication, the video is private and will be changed to public privacy
    if (parseInt(values['privacy'], 10) === VideoEdit.SPECIAL_SCHEDULED_PRIVACY) {
      const updateAt = new Date(values['schedulePublicationAt'])
      updateAt.setSeconds(0)

      this.privacy = VideoPrivacy.PRIVATE
      this.scheduleUpdate = {
        updateAt: updateAt.toISOString(),
        privacy: VideoPrivacy.PUBLIC
      }
    } else {
      this.scheduleUpdate = null
    }
  }

  toFormPatch () {
    const json = {
      category: this.category,
      licence: this.licence,
      language: this.language,
      description: this.description,
      support: this.support,
      name: this.name,
      tags: this.tags,
      autors: this.autors,
      nsfw: this.nsfw,
      commentsEnabled: this.commentsEnabled,
      waitTranscoding: this.waitTranscoding,
      channelId: this.channelId,
      privacy: this.privacy
    }

    // Special case if we scheduled an update
    if (this.scheduleUpdate) {
      Object.assign(json, {
        privacy: VideoEdit.SPECIAL_SCHEDULED_PRIVACY,
        schedulePublicationAt: new Date(this.scheduleUpdate.updateAt.toString())
      })
    }

    return json
  }
}
