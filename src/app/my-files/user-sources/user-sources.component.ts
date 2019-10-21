import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer, Source, Charge } from '../payment/models';
import { PaymentService } from '../payment/payment.service';

@Component({
  selector: 'app-user-sources',
  templateUrl: './user-sources.component.html',
  styleUrls: ['./user-sources.component.scss']
})
export class UserSourcesComponent implements OnInit {

  customer$: Observable<Customer>;
  charges$: Observable<Charge[]>;

  @Input() canSelect: boolean;
  @Output() selectedSource = new EventEmitter<Source>();

   constructor(private pmt: PaymentService) { }

  ngOnInit() {
    this.customer$ = this.pmt.getCustomer();
    this.charges$ = this.pmt.getCharges();
    this.customer$.subscribe();
  }



  timeConverter(time:any) {
    var newDate = new Date(time * 1000).toDateString()
    return newDate;
  }

  clickHandler(source: Source) {
    this.selectedSource.emit(source);
  }

}
