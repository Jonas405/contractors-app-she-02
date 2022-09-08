import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  
  login(fLogin:NgForm){

    console.log(fLogin.valid)

    if(fLogin.invalid){
      this.presentAlertForm("Por favor, llene todos los campos")
      return;
    }
    // this.loginService.login(this.loginUser.email, this.loginUser.password)
    console.log(fLogin.valid);
    console.log(this.user);
    console.log(this.user.rfc)
    console.log(this.user.password)

    this.serviceLogin.userlogin(this.user.rfc, this.user.password)
    .subscribe(data=>{
      
          let navigateParameter = data[0].id;
          console.log(navigateParameter);
          this.navCtrl.navigateRoot('/main/tabs/tab1', { animated:true });
    },
     error =>{
      this.presentAlert("Clave o usuario incorrecto, por favor intente nuevamente.");
     });
  }

  async presentAlert(message:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertForm(message:string) {
    const alert = await this.alertController.create({
      header: 'Campos vacio',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
}
