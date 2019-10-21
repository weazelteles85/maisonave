import { Component, OnInit, AfterViewInit, OnDestroy, Input, Output, EventEmitter, 
  ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Charge, Source } from '../models';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit, AfterViewInit, OnDestroy {

  displayAmount: string;
  chargeValue: number;
  errorMessage: string;

  @Input() totalAmount: number;

  // Emit results of operation to other components
  @Output() stripeResult = new EventEmitter<Charge | Source>();

  // Result used locally to display status.
  result: Charge | Source;

  // The Stripe Elements Card
  @ViewChild('cardElement') cardElement: ElementRef;
  card: any;
  formError:string;
  formComplete = false;

  // State of async activity
  loading = false;

  constructor(private cd: ChangeDetectorRef, public pmt: PaymentService) { }

  ngOnInit() {
  }

  updateValue(value:number) {
    var valueString = value.toString();
    if(valueString.indexOf(".")!=-1) {
      this.displayAmount = value.toString();
      var decimal = valueString.split(".");
      if(decimal.length == 1 || decimal[1].length < 3) {
        this.displayAmount = parseFloat(value.toString()).toFixed(2);
      }
      if(decimal[1].length > 2) {
        this.displayAmount = '0';
      }
    }
    else if(value % 1 == 0) {
      this.displayAmount = (value / 100).toFixed(2);
    }
    if(value < 0) {
      this.displayAmount = '0';
    }
    //Convert amount to stripe Friendly
    this.chargeValue = Number.parseInt(this.displayAmount.replace('.', ''));
    console.log(this.chargeValue);
  }

  ngAfterViewInit() {
    this.card = this.pmt.elements.create('card');
    this.card.mount(this.cardElement.nativeElement);

    // Listens to change event on the card for validation errors
    this.card.on('change', (evt) => {
      this.formError = evt.error ? evt.error.message : null;
      this.formComplete = evt.complete;
      this.cd.detectChanges();
    })
  }

  // Called when the user submits the form 
  formHandler(): void {
    if(this.chargeValue > 0) {
      this.errorMessage = null;
      this.loading = true;
    let action;
    this.totalAmount = this.chargeValue;

    if (this.totalAmount) {
      action = this.pmt.createCharge(this.card, this.totalAmount);
    } else {
      action = this.pmt.attachSource(this.card);
    }

    action.subscribe(
      data => {
        this.result = data;
        this.stripeResult.emit(data)
        this.loading = false
      },
      err => {
        this.result = err;
        this.loading = false;
      }
    )
    } else {
      this.errorMessage = 'Please enter a valid amount to charge';
    }
  }

  ngOnDestroy() {

  }

}
