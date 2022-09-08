import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { UserModel } from 'src/app/models/user-model';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user : UserModel = new UserModel;
  public showPassword: boolean = false;
  
  constructor(private serviceLogin: LoginService,
    private navCtrl: NavController,
    public alertController: AlertController) {}

  ngOnInit() {
  }

}
