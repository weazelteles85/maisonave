import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { User } from '../core/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  missMatchPass: string;

  constructor(public authService: AuthService) { 
    
  }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {

    this.registerForm = new FormGroup({
      'nFirst': new FormControl('', Validators.required),
      'nLast': new FormControl ('', Validators.required),
      'email': new FormControl('', Validators.required),
      'prePass': new FormControl('', Validators.required),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  checkPassMatch(isTouched:boolean, password:string) {
    if(isTouched) {
      if(password != this.registerForm.get('prePass').value) {
        //this.registerForm.invalid;
        this.missMatchPass = 'Passwords does not match';
      }
      else {
        this.missMatchPass = null;
      }
    }
  }

  onRegisterNewUser() {
    const user:User = new User(
      this.registerForm.get('nFirst').value, 
      this.registerForm.get('nLast').value,
      this.registerForm.get('email').value,
      this.registerForm.get('password').value,
      false, false, true)
    this.authService.registerNewUser(user);
  }

  onGoogleLoginClick() {
    this.authService.signInWithGoogle();
  }

}
