import {
  Component,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core'
import { FormGroup } from '@angular/forms'
import { ModalDirective } from 'ngx-bootstrap'

import { FeedbackService } from './feedback.service'
import { ManageStateService } from '@shared/manage-state.service'
import { CookieConfig } from '@util/variable'
import { NotificationService } from '@shared/utils/notification.service'

declare const html2canvas

@Component({
  selector: 'feedback',
  styleUrls: ['./feedback.component.scss'],
  templateUrl: './feedback.component.html',
})
export class FeedbackComponent implements OnInit {
  @ViewChild('formModal') formModal: ModalDirective
  @ViewChild('imageScreenshot') imageScreenshot: ElementRef
  @ViewChild('feedbackForm') feedbackForm: FormGroup
  @ViewChild('formErrorAlert') formErrorAlert

  private canvas
  private formError = ''

  constructor(
    private feedbackService: FeedbackService,
    private manageStateService: ManageStateService,
    private notificationService: NotificationService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.formModal.onHidden.subscribe(() => {
      this.imageScreenshot.nativeElement.innerHTML = ''
      this.feedbackForm.reset()
    })

    this.formErrorAlert.isOpen = false
    this.formErrorAlert.onClosed.subscribe(() => {
      this.formError = ''
    })
  }

  public showModal() {
    // let element = document.getElementById('divbigBoxes')
    let element = document.body
    html2canvas(element, {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.pageXOffset,
      scrollY: window.pageYOffset,
      x: window.pageXOffset,
      y: window.pageYOffset,
    }).then(canvas => {
      this.canvas = canvas
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      this.imageScreenshot.nativeElement.appendChild(canvas)
      this.formModal.show()
    })
  }

  public submit(form: FormGroup) {
    if (form.valid) {
      this.canvas.toBlob(blob => {
        this.feedbackService
          .sendFeedback({
            image: blob,
            idNguoiGui: this.manageStateService.load(CookieConfig.NVID_COOKIE),
            message: form.value.feedbackMessage.trim(),
          })
          .then(success => {
            if (!success) {
              this.formError = 'Lỗi không send được feedback'
              this.formErrorAlert.isOpen = true
            } else {
              this.formModal.hide()
              form.reset()
              this.imageScreenshot.nativeElement.innerHTML = ''
            }
          })
      })
    }
  }
}
