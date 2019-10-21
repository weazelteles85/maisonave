import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    public authService: AuthService
    ) { }
  LoginForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  private initForm() {

    this.LoginForm = new FormGroup({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onGoogleLoginClick() {
    this.authService.signInWithGoogle();
  }

  onLoginWithEmail() {
    this.authService.signinWithEmailAndPassword(this.email, this.password);
  }

  Test() {
    console.log(this.authService.result);
    this.authService.user$.subscribe(
      (user) => {
        console.log(user);
      }
    )
  }



}
