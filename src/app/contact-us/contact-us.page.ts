import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient }  from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.page.html',
  styleUrls: ['./contact-us.page.scss'],
})
export class ContactUsPage implements OnInit {

  isSubmited = false;
  endpoint = 'https://us-central1-maisonave-ebf32.cloudfunctions.net/basicSendEmail';

  contactUsForm: FormGroup

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.contactUsForm = new FormGroup({
      'name': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'description': new FormControl('', Validators.required)
    })
  }

  sendEmail() {
    console.log('sendEmail called');
    const name = this.contactUsForm.get('name').value;
    const email = this.contactUsForm.get('email').value;
    const description = this.contactUsForm.get('description').value;

    console.log(name);
    console.log(email);
    console.log(description);

    const data = {
      toEmail: 'taxinfo@maisonave.com',
      toName: 'Test', //<--- This value is currently not being used for anything in the cloud functions
      eMailSubject: 'New Contact-Us Form From Your Website',
      htmlBody: `<p><strong>Name: </strong>${name}</p>
      <p><strong>Email: </strong>${email}</p>
      <p><strong>Description: </strong>${description}</p>`,
    }

    this.http.post(this.endpoint, data).subscribe();
    this.contactUsForm.reset();
    this.isSubmited = true;
  }
}
