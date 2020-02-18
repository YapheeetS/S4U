import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {Router} from '@angular/router';
import { UserService } from "../../service/user.service";
import { LoadingController, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
      public router: Router,
      public afAuth: AngularFireAuth,
      public alert: AlertController,
      public afstore: AngularFirestore,
      public user: UserService,
  ) { }

  ngOnInit() {
  }
  async register() {
    const { username, password, cpassword } = this
    if (password !== cpassword) {
      this.presentRegAlert('Error', 'Password doesn\'t match, please try again');
      return console.error('Password doesn\'t match');
    }

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username, password)

      this.afstore.doc('users/${res.user.uid}').set({
        username
      })

      this.user.setUser({
        username,
        uid: res.user.uid
      })
      console.log(res)
      this.presentRegAlert("Success!", "Welcome S4U!")
      this.router.navigate(['/login'])
    } catch (error) {
      console.dir(error)
      this.presentRegAlert("Error", error.message)
    }
  }

  async presentRegAlert(title: string, content: string) {
    const alert = await this.alert.create({
      header: title,
      message: content,
      buttons: ['OK']
    })
    await alert.present();
  }

}
