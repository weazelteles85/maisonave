import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-set-appointment',
  templateUrl: './set-appointment.component.html',
  styleUrls: ['./set-appointment.component.scss']
})
export class SetAppointmentComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  dismiss(text: string) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      text
    });
  }

}
