import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core'
import { NotificationsService } from 'angular2-notifications'
import { ModalDirective } from 'ngx-bootstrap/modal'
import { FormReactive } from '@app/shared'
import { FormValidatorService } from '@app/shared/forms/form-validators/form-validator.service'
import { VideoOwnershipService } from '@app/shared/video-ownership'
import { VideoChangeOwnership } from '../../../../../../shared/models/videos'
import { VideoAcceptOwnershipValidatorsService } from '@app/shared/forms/form-validators'
import { VideoChannel } from '@app/shared/video-channel/video-channel.model'
import { VideoChannelService } from '@app/shared/video-channel/video-channel.service'
import { I18n } from '@ngx-translate/i18n-polyfill'
import { AuthService } from '@app/core'

@Component({
  selector: 'my-account-accept-ownership',
  templateUrl: './my-account-accept-ownership.component.html'
})
export class MyAccountAcceptOwnershipComponent extends FormReactive implements OnInit {
  @Output() accepted = new EventEmitter<void>()

  @ViewChild('modal') modal: ModalDirective

  videoChangeOwnership: VideoChangeOwnership | undefined = undefined

  videoChannels: VideoChannel[]

  error: string = null

  constructor (
    protected formValidatorService: FormValidatorService,
    private videoChangeOwnershipValidatorsService: VideoAcceptOwnershipValidatorsService,
    private videoOwnershipService: VideoOwnershipService,
    private notificationsService: NotificationsService,
    private authService: AuthService,
    private videoChannelService: VideoChannelService,
    private i18n: I18n
  ) {
    super()
  }

  ngOnInit () {
    this.videoChannels = []

    this.videoChannelService.listAccountVideoChannels(this.authService.getUser().account)
      .subscribe(videoChannels => this.videoChannels = videoChannels.data)

    this.buildForm({
      channel: this.videoChangeOwnershipValidatorsService.CHANNEL
    })
  }

  show (videoChangeOwnership: VideoChangeOwnership) {
    this.videoChangeOwnership = videoChangeOwnership
    this.modal.show()
  }

  hide () {
    this.videoChangeOwnership = undefined
    this.modal.hide()
  }

  acceptOwnership () {
    const channel = this.form.value['channel']

    const videoChangeOwnership = this.videoChangeOwnership
    this.videoOwnershipService
      .acceptOwnership(videoChangeOwnership.id, { channelId: channel })
      .subscribe(
        () => {
          this.notificationsService.success(this.i18n('Success'), this.i18n('Ownership accepted'))
          if (this.accepted) this.accepted.emit()
          this.hide()
        },

        err => this.notificationsService.error(this.i18n('Error'), err.message)
      )
  }
}
