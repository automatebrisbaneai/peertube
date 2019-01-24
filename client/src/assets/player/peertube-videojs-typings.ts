// FIXME: something weird with our path definition in tsconfig and typings
// @ts-ignore
import * as videojs from 'video.js'

import { VideoFile } from '../../../../shared/models/videos/video.model'
import { PeerTubePlugin } from './peertube-plugin'
import { WebTorrentPlugin } from './webtorrent-plugin'

declare namespace videojs {
  interface Player {
    peertube (): PeerTubePlugin
    webtorrent (): WebTorrentPlugin
  }
}

interface VideoJSComponentInterface {
  _player: videojs.Player

  new (player: videojs.Player, options?: any): any

  registerComponent (name: string, obj: any): any
}

type VideoJSCaption = {
  label: string
  language: string
  src: string
}

type UserWatching = {
  url: string,
  authorizationHeader: string
}

type PeerTubePluginOptions = {
  autoplay: boolean
  videoViewUrl: string
  videoDuration: number
  startTime: number | string

  userWatching?: UserWatching
  subtitle?: string

  videoCaptions: VideoJSCaption[]
}

type WebtorrentPluginOptions = {
  playerElement: HTMLVideoElement

  autoplay: boolean
  videoDuration: number

  videoFiles: VideoFile[]
}

type P2PMediaLoaderPluginOptions = {
  type: string
  src: string
}

type VideoJSPluginOptions = {
  peertube: PeerTubePluginOptions

  webtorrent?: WebtorrentPluginOptions

  p2pMediaLoader?: P2PMediaLoaderPluginOptions
}

// videojs typings don't have some method we need
const videojsUntyped = videojs as any

type LoadedQualityData = {
  qualitySwitchCallback: Function,
  qualityData: {
    video: {
      id: number
      label: string
      selected: boolean
    }[]
  }
}

type ResolutionUpdateData = {
  auto: boolean,
  resolutionId: number
  id?: number
}

type AutoResolutionUpdateData = {
  possible: boolean
}

type PlayerNetworkInfo = {
  p2p: {
    downloadSpeed: number
    uploadSpeed: number
    downloaded: number
    uploaded: number
    numPeers: number
  }
}

export {
  PlayerNetworkInfo,
  ResolutionUpdateData,
  AutoResolutionUpdateData,
  VideoJSComponentInterface,
  videojsUntyped,
  VideoJSCaption,
  UserWatching,
  PeerTubePluginOptions,
  WebtorrentPluginOptions,
  P2PMediaLoaderPluginOptions,
  VideoJSPluginOptions,
  LoadedQualityData
}
