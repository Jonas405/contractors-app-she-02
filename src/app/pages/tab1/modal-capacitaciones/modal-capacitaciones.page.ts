import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { TrainingDetails } from 'src/app/interfaces/trainingDetails';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-modal-capacitaciones',
  templateUrl: './modal-capacitaciones.page.html',
  styleUrls: ['./modal-capacitaciones.page.scss'],
})
export class ModalCapacitacionesPage implements OnInit {

  trainingDetails: TrainingDetails[]
  constructor(private navCtrl: NavController,
    private workServices: WorksService,
    private modalCrtl: ModalController) { }

    //Here we need add which users has logged and take the training
    //Which work type id they w'll do for assigned the training
    //When the video is already view complete post that user id show the video
    //The size of employees in relation no one work will be the same to users with
    //all training completed for pass to the another estatus "Activo"
    //Also the video record in relation to declaration about their vital status for accomplish the work 

  //Id user from ionic storage
  idUserFromStorage: string;

  ngOnInit() {
    console.log("entrando al notificaciones")
   // this.getUserIdFromStorage();
   // this.getTrainingsDetails();
  }

  

   //Refresh page profile 
   doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      this.ngOnInit()
      refresher.target.complete();
    }, 2000);
  }

/*   getUserIdFromStorage(){
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is notificaciones ', val);
       this.idUserFromStorage = val;
       this.getUserDetailsById(this.idUserFromStorage)
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  getUserDetailsById(id){
    this.perfilServices.getUserDetailsById(id).subscribe((data: UsersDetails)=>{
      this.userDetails = data[0]
      console.log(this.userDetails);
      console.log(this.userDetails.name)
    })
    } */


/*     getTrainingsDetails(){
      this.workServices.getTrainingDetails().subscribe((data:TrainingDetails[])=>{
        this.trainingDetails = data
        console.log(this.trainingDetails)
      })
    } */
}
