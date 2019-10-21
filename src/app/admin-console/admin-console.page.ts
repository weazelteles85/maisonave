import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../core/data-storage.service';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { User } from '../core/user.model';
import { Subject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-admin-console',
  templateUrl: './admin-console.page.html',
  styleUrls: ['./admin-console.page.scss'],
})
export class AdminConsolePage implements OnInit {

  public localListOfUsers: Array<User>;
  localUser: User;
  selectedUserSub: Subject<User> = new Subject();
  selectedUser: User;
  roleString: string;

  //main Task for uploading files
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  //Download URL
  downloadURL: Observable<string> = new Observable<string>();
  listOfDownloadURL: Array<string> = [];
  //State for dropzone CSS toggling
  isHovering: boolean;

  constructor(
    private storageServices: DataStorageService,
    private storage: AngularFireStorage,
    private authServices: AuthService) {
    this.storageServices.listOfUsers.subscribe((users) => {
      this.localListOfUsers = users;
      this.localListOfUsers.sort((personA, personB) => {
        if(personA.NLast < personB.NLast) return -1;
        else if(personA.NLast > personB.NLast) return 1;
        else return 0;
      });
    })
    this.selectedUserSub.subscribe((user) => {
      this.selectedUser = user;
      if (this.selectedUser.IsSubscriber) { this.roleString = 'Subscriber' }
      if (this.selectedUser.IsEditor) { this.roleString = 'Editor' }
      if (this.selectedUser.IsAdmin) { this.roleString = 'Admin' }
    });
    this.downloadURL.subscribe(url => this.listOfDownloadURL.push(url));
    this.authServices.user$.subscribe(user => this.localUser = user);
  }

  ngOnInit() {
  }

  setSelectedUser(index: number) {
    this.selectedUserSub.next(this.localListOfUsers[index]);
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  onDeleteItem(file) {
    if (this.localUser.IsAdmin) {
      // Delete string ref from url Array
      const index = this.selectedUser.FilesUrl.indexOf(file);
      this.selectedUser.FilesUrl.splice(index, 1);
      this.selectedUserSub.next(this.selectedUser);
      this.authServices.updateUserData(this.selectedUser);
      //Delete the actual file from storage at FireStorage
      this.storage.storage.refFromURL(file.url).delete();
    }
  }

  startUpload(event: FileList) {
    for (let index = 0; index < event.length; index++) {
      // The File object
      const file = event[index];

      //The storage path 
      const path = `${this.selectedUser.Email}/${new Date().getTime()}_${file.name}`;
      // Optional Metadata
      const customMetadata = { app: 'Maisonave Files' };

      //the main task
      this.task = this.storage.upload(path, file, { customMetadata });

      // Progress monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges();

      // The file's download URL
      this.task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadURL = this.storage.ref(path).getDownloadURL()
          this.downloadURL.subscribe((url) => {
            this.selectedUser.FilesUrl.push({ url: url, name: file.name });
            this.selectedUserSub.next(this.selectedUser);
            this.authServices.updateUserData(this.selectedUser);
          });

        })
      ).subscribe();
    }
  }

  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

  onRoleChange(selector) {
    if (selector.value == 'admin') this.selectedUser.IsAdmin = true;
    if (selector.value == 'editor') {
      this.selectedUser.IsAdmin = false;
      this.selectedUser.IsEditor = true;
    }
    if (selector.value == 'subscriber') {
      this.selectedUser.IsAdmin = false;
      this.selectedUser.IsEditor = false;
      this.selectedUser.IsSubscriber = true;
    }
    this.selectedUserSub.next(this.selectedUser);
    this.authServices.updateUserData(this.selectedUser);
  }

  TestPage() {
    this.storageServices.testLog();
    console.log('Download URL bellow');
    this.downloadURL.subscribe(url => console.log(url));
    console.log('listOfUrl Bellow');
    console.log(this.listOfDownloadURL);
  }

}
