import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx' ;
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { environment } from '../../../environments/environment';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""

  constructor(private router: Router,
              public afAuth: AngularFireAuth,
              public alertController: AlertController,
              public user: UserService
              ) { }

  ngOnInit() {
  }

  async login() {
    const { username, password } = this
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(username, password)

      if(res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        this.showAlert('Successfully login!', '')
        this.router.navigate(['/welcome'])
      }


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

  register() {
    this.router.navigate(['register']);
  }

  reset_password() {
    this.router.navigate(['verify-email']);
  }

}
