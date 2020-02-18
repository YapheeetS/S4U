import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { LoadingController, AlertController, Platform } from '@ionic/angular';

import {WindowService} from '../../service/window.service';
import * as firebase from 'firebase';
import {Router} from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})

export class VerifyEmailPage implements OnInit {

  phone_num = '';
  email = '';
  verificationID: firebase.auth.ConfirmationResult;

  windowRef: any;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  constructor(private router: Router,
              public afAuth: AngularFireAuth,
              public alertController: AlertController,
  //             private firebaseAuthentication: FirebaseAuthentication,
  //             private  win: WindowService,
                  ) { }

  ngOnInit() {
      // 发短信
    // this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');


  }



  async send_code() {
      // 发短信
    const appVerifier = this.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(this.phone_num, appVerifier).then(

        (verificationID)  => {
            this.verificationID = verificationID;
            console.log(verificationID);
            this.router.navigate(['register']);
        }).catch(error => console.log(error));

    // const res = await this.afAuth.auth.createUserWithEmailAndPassword(this.phone_num, '123456');

    // this.firebaseAuthentication.verifyPhoneNumber(this.phone_num, 30000).then((verificationID) => {
    //   console.log(verificationID);
    //   this.verificationID = verificationID;
    // }).catch((error) => {
    //
    // });
  }

  async send_email() {

      try {
          const res = await this.afAuth.auth.sendPasswordResetEmail(this.email);
          this.showAlert("Success!", "The reset password link has been sent to the E-mail")
          this.router.navigate(['/login'])

      } catch(err) {
          console.dir(err)
          if (err.code === "auth/user-not-found") {
              console.log("User not found")
          }
          this.showAlert('Error', err.message)
      }
  }

  async showAlert(title: string, message: string){
      const alert = await this.alertController.create({
          header: title,
          message: message,
          buttons: ['Ok']
      })

      await alert.present()
  }

}
