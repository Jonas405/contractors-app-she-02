import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { EvaluationDetails, SelectedAnswer, TrainingDetails } from 'src/app/interfaces/trainingDetails';
import { WorkDetails } from 'src/app/interfaces/worksDetails';
import { NewEvaluation } from 'src/app/models/work-request-model';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-modal-capacitaciones',
  templateUrl: './modal-capacitaciones.page.html',
  styleUrls: ['./modal-capacitaciones.page.scss'],
})
export class ModalCapacitacionesPage implements OnInit {

  @Input() statusId;
  @Input() statusName;
  @Input() workRequestId

  evaluationDetails : EvaluationDetails[] = []
  
  lstSelectedAnswer: SelectedAnswer [] = []

  workSelectedDetails: WorkDetails;

  cleaningLstAnswer : SelectedAnswer [] = []
  
  trainingDetails: TrainingDetails[]
  constructor(private navCtrl: NavController,
    private modalCrtl: ModalController,
    private worksService: WorksService,
    private alertController: AlertController) { }

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
   console.log(this.statusId)
   console.log(this.statusName)
   console.log(this.workRequestId)
   this.getWorksRequestDetailsById();
  }


  getWorksRequestDetailsById(){
    console.log(this.workRequestId)
    this.worksService.getWorksRequestDetailsById(this.workRequestId).subscribe((data:WorkDetails[])=>{
      console.log(data)
      this.workSelectedDetails = data[0]
      console.log(this.workSelectedDetails)
    })

  }


  postSelectedQuestion(questionId:number,answerSelectedId:number){
 
    console.log(questionId)
    console.log(answerSelectedId)

    let selectedAnswer = {} as SelectedAnswer;

    selectedAnswer.question = questionId
    selectedAnswer.anwser = answerSelectedId

    console.log(selectedAnswer)
    
    this.lstSelectedAnswer.push(selectedAnswer)
    console.log(this.lstSelectedAnswer)

       //Generate an array with al selected measure by user for comparision with question to evaluate
        if(this.cleaningLstAnswer.some(value => value.question === selectedAnswer.question)){
        console.log("value already exists, need be deleted because are re-selected")
        const index = this.cleaningLstAnswer.indexOf(selectedAnswer)
        this.cleaningLstAnswer.splice(index,1)
        console.log("inside the betoven")
        console.log(this.cleaningLstAnswer)
      }else{
        console.log("value doesn't exists, need be added because no are selected")
        console.log(selectedAnswer.question)
        console.log("inside the betoven")
        this.cleaningLstAnswer.push(selectedAnswer)
        console.log(this.cleaningLstAnswer)
      }  


  }


  shareEvaluation(){
    let scoring = 0;

    this.cleaningLstAnswer.forEach(element => {
      if(element.question == 1){
        if(element.anwser == 1 ){
          scoring = scoring + 10
        }
      }

      if(element.question == 2){
        if(element.anwser == 1 ){
          scoring = scoring + 10
        }
      }

      if(element.question == 3){
        if(element.anwser == 3 ){
          scoring = scoring + 10
        }
      }

      if(element.question == 4){
        if(element.anwser == 3 ){
          scoring = scoring + 10
        }
      }

      if(element.question == 5){
        if(element.anwser == 3 ){
          scoring = scoring + 10
        }
      }

      if(element.question == 6){
        if(element.anwser == 2 ){
          scoring = scoring + 10
        }
      }

      if(element.question == 7){
        if(element.anwser == 1 ){
          scoring = scoring + 10
        }
      }

      if(element.question == 8){
        if(element.anwser == 3 ){
          scoring = scoring + 10
        }
      }

      if(element.question == 9){
        if(element.anwser == 2 ){
          scoring = scoring + 10
        }
      }

      if(element.question == 10){
        if(element.anwser == 1 ){
          scoring = scoring + 10
        }
      }

    });

    this.uploadEvaluation(this.cleaningLstAnswer, scoring);

    console.log(scoring)
    //Upload the scoring to the database and give another try
    console.log(this.cleaningLstAnswer)
    console.log(scoring)

    this.closeScheduleModal(scoring)
  }

  uploadEvaluation(lstSelected, scoring){

    lstSelected.forEach(element => {
      console.log(element)
      console.log(element.questionId)
      console.log(element.answerId)

      let datenow = new Date();


      let newEvaluation = {} as NewEvaluation;
      newEvaluation.questionId = element.question
      newEvaluation.answerId = element.anwser
      newEvaluation.scoring = scoring
      newEvaluation.workRequestId = this.workRequestId
      newEvaluation.userCompanyEmployeeId = 5 //Need add the user here from the navigation view
      newEvaluation.date =  datenow.toISOString().replace("T"," ").substring(0, 19);

      this.worksService.postNewEvaluation(newEvaluation).subscribe(data=>{
          console.log(data)
        }
      )
    });

  }
  
  closeScheduleModal(scoring){
    this.presentAlert(scoring)
    this.modalCrtl.dismiss();
  }

  async presentAlert(scoring) {

    if(scoring > 79){
      const alert = this.alertController.create({
        header: 'Capacitación completada!',
        subHeader: '¡Mensaje importante!',
        message: 'Obtuviste una calificación de ' + scoring + ' aprobaste con éxito felicidades!',
        buttons: ['OK'],
      });
      await (await alert).present();
    }else{
      const alert = this.alertController.create({
        header: 'Capacitación reprobada!',
        subHeader: '¡Mensaje importante!',
        message: 'Obtuviste una calificación de ' + scoring + ' debes capacitarte nuevamene',
        buttons: ['OK'],
      });
      await (await alert).present();
    }

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
