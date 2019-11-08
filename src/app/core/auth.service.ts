import { auth } from 'firebase';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, from } from 'rxjs';
import { switchMap, map, } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { User } from './user.model';
import { DataStorageService } from './data-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  localUser: User;
  email: string;
  emailSent = false;
  errorMessage: string;
  result: any;

  provider: any = new auth.GoogleAuthProvider();

  //token: string;
  //userID: string;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private storageService: DataStorageService) {
    // Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null)
      }
    }));
    this.storageService.listOfUsers = this.afs.collection('users').valueChanges();
    this.user$.subscribe((user) => this.localUser = user);
  }

  getUser(): Promise<User> {
    return this.user$.pipe(map((user) => {
      return user;
    })).toPromise();
  }

  // Login/Signup
  // Register New User
  registerNewUser(user: User) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.Email, user.Password).catch(
      error => console.error(error)
    ).then(
      (response) => {
        const authUser = this.afAuth.auth.currentUser;
        user.setUserId(authUser.uid);
        this.setNewUserData(false, user);
        authUser.sendEmailVerification().then(
          (value) => {
            console.log('Email sent to user');
            this.emailSent = true;
            if (this.afAuth.auth.currentUser.emailVerified) { this.emailSent = false; }
            this.afAuth.auth.signOut();
          }
        ).catch(
          (error) => {
            console.error(error);
          }
        );
      }
    )
  }

  // Sign in with Email and password
  signinWithEmailAndPassword(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (credential) => {
        if (this.afAuth.auth.currentUser.emailVerified) {
          console.log('inside Login with email and password');
          this.router.navigate(['/my-files']);
          //const userData = this.user$.subscribe((user) => {
          //if(!user) {
          //this.setNewUserData(false, userData);
          //}
          //return user;
          //})
        }
        else {
          this.errorMessage = "Please verify your email, you should have received a link";
          this.logOut();
        }
      }
    ).catch((error) => {
      this.errorMessage = error;
      console.error(error);
    });
  }

  // Sign in with Google
  signInWithGoogle() {
    console.log('login with google called')
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.user$.subscribe((user) => {
          if (!user) {
            this.setNewUserData(true, null);
          }
          else {
            this.router.navigate(['/my-files'])
            return this.afs.doc(`users/${credential.user.uid}`);
          }
        });
      })
  }

  public setNewUserData(IsGoogleLogin: boolean, user) {
    if (IsGoogleLogin) {
      const userData: User = new User(
        this.afAuth.auth.currentUser.displayName,
        '',
        this.afAuth.auth.currentUser.email,
        'Google API', false, false, true
      );
      userData.setUserId(this.afAuth.auth.currentUser.uid);
      this.updateUserData(userData);
    }
    else {
      if (user != null) {
        this.updateUserData(user);
      }
    }
  }

  public updateUserData(userData) {
    // Sets user data to firestore on Login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${userData.UserID}`);
    return userRef.set(JSON.parse(JSON.stringify(userData)), { merge: true });
  }

  logOut() {
    this.afAuth.auth.signOut()
  }
  //// Abilities and Roles Authorization
  //// Assign roles to an ability method 

  canRead(user: User): boolean {
    if (user.IsAdmin || user.IsEditor || user.IsSubscriber) return true;
    else return false;
  }

  canEdit(user: User): boolean {
    if (user.IsAdmin || user.IsEditor) return true;
    else return false;
  }

  canDelete(user: User): boolean {
    if (user != undefined) {
      if (user.IsAdmin) return true;
      else return false;
    }
  }

  // Used by the http interceptor to set the auth header
  getUserIdToken(): Observable<string> {
    if(this.afAuth.auth.currentUser) {
      return from(this.afAuth.auth.currentUser.getIdToken());
    }
    else return null;
  }




}
