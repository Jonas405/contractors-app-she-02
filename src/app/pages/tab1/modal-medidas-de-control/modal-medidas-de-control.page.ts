import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { element } from 'protractor';
import { MandatoryMeasureOptions } from 'src/app/interfaces/measuresDetails';
import { NewWorkRequestRelationMandatoryMeasureValidationSupplySshe } from 'src/app/models/work-request-model';
import { WorksService } from 'src/app/services/works.service';
import { ModalMedidasFotosPage } from '../modal-medidas-fotos/modal-medidas-fotos.page';

@Component({
  selector: 'app-modal-medidas-de-control',
  templateUrl: './modal-medidas-de-control.page.html',
  styleUrls: ['./modal-medidas-de-control.page.scss'],
})
export class ModalMedidasDeControlPage implements OnInit {
  //from modal work request
  @Input() workRequestId;
  @Input() selectedMandatoryMeasures;
  @Input() lastWorkRequestValidationId;
  //lst for select items
  lstMeasureOptionsAvailable : MandatoryMeasureOptions[] = []

  //lst validation sshe and supply
  lstMeasureDetailsValidation: MandatoryMeasureOptions[] = []

  //Grouped
  grouped: { [key: number]: MandatoryMeasureOptions[] } = {};
  groupedOrder: any

  //Measures grouped by mandatory measure name
  groupedMeasures;

  //Measure selected mandatory size 
  sizeMandatoryMeasureSelected;
  constructor(private worksService: WorksService, 
    private modalCrtl: ModalController,
    private alertController: AlertController) { }

  ngOnInit() {
    console.log(this.workRequestId)
    console.log(this.selectedMandatoryMeasures)

  

    this.getMandatoryMeasureByWorkRequestSelected();
    this.getMandatoryMeasureSizeForComparision()
   
  }

  getMandatoryMeasureSizeForComparision(){
    this.worksService.getMandatoryMeasureByWorkRequestSelectedForComparision(
      this.selectedMandatoryMeasures
    ).subscribe((data:MandatoryMeasureOptions[])=>{
      console.log("How many measure we have available")
      console.log(data)
      this.lstMeasureDetailsValidation = data
      console.log("Set this for validation over web")
      console.log(this.lstMeasureDetailsValidation)
      console.log(data.length)
      this.sizeMandatoryMeasureSelected = data.length
    })
  }

  getMandatoryMeasureByWorkRequestSelected(){
 /* 
    for (let i = 0; i < this.selectedMandatoryMeasures.length; i++ ){

      this.worksService.getMandatoryMeasureByWorkRequestSelected(i).subscribe(
        (data:MandatoryMeasureOptions[])=>{
          console.log("loop" + i)
          console.log(data)
          //set lst measure options available
        
        }
      )
  
    }

    console.log("llamando")
    this.groupMeasureById() */
   
    this.selectedMandatoryMeasures.forEach(element => {
      console.log(element)
      this.worksService.getMandatoryMeasureByWorkRequestSelected(element).subscribe(
        (data:MandatoryMeasureOptions[])=>{
         // console.log("qlq stas entrando aqui o no ?")
         // console.log(data)
          //set lst measure options available
          data.forEach(element => {
            this.lstMeasureOptionsAvailable.push(element)
             //Llamamos a la function para agrupar la lista generada
            this.groupMeasureById()
          });
        })
      }); 
   //   console.log(this.lstMeasureOptionsAvailable)
  
  }

  groupMeasureById(){
    //We create a new object when we`ll save by mandatoryMeasureName
    let groupedObjectByMandatoryMeasureName = {}
    this.lstMeasureOptionsAvailable.forEach( x => {
     // console.log("entro al for")
     // console.log(x)
      if(!groupedObjectByMandatoryMeasureName.hasOwnProperty(x.mandatoryMeasureName)){
        groupedObjectByMandatoryMeasureName[x.mandatoryMeasureName] = {
          measureName:[]
        }
      }
    //We add to that object the data by grouped mandatoryMeasureName
    groupedObjectByMandatoryMeasureName[x.mandatoryMeasureName].measureName.push({
      mandatoryDetailsId: x.mandatoryDetailsId,
      mandatoryMeasureDetails: x.mandatoryMeasureDetails,
      mandatoryMeasureId: x.mandatoryMeasureId,
      mandatoryMeasureName: x.mandatoryMeasureName,
      mandatoryMeasureOptionId: x.mandatoryMeasureOptionId,
      mandatoryMeasureOptionName: x.mandatoryMeasureOptionName
      })

      
      
    })
    this.groupedMeasures = groupedObjectByMandatoryMeasureName
  }

  selectedMeasuresByUser = [];
  AddSelectedMeasure(selectedMeasures){

    //Generate an array with al selected measure by user for comparision with mandatory measurs

    if(this.selectedMeasuresByUser.some(value => value === selectedMeasures)){
      console.log("value already exists, need be deleted because are re-selected")
      const index = this.selectedMeasuresByUser.indexOf(selectedMeasures)
      this.selectedMeasuresByUser.splice(index,1)
      console.log(this.selectedMeasuresByUser)
    }else{
      console.log("value doesn't exists, need be added because no are selected")
      console.log(selectedMeasures)
      this.selectedMeasuresByUser.push(selectedMeasures)
      console.log(this.selectedMeasuresByUser)
    }

  }

  ComperMeasuresSelectedAndMandatory(){
    if(this.selectedMeasuresByUser.length === this.sizeMandatoryMeasureSelected){
      console.log("Good all measure are selected so continue to charge evidence")
      this.openEvicence()
    }else{
      console.log("please need be accomplish with all mandatory measures for comtomie ")
      this.presentAlert() 
    }
  }

  async presentAlert() {
    const alert = this.alertController.create({
      header: 'Alerta',
      subHeader: '¡Mensaje importante!',
      message: 'Debe cumplir todas las medidas asignadas para poder realizar el trabajo.',
      buttons: ['OK'],
    });
    await (await alert).present();
  
  }

   // go to upload evidence for begging the job
   async openEvicence(){

    //post measures selected in the database
    //They need selected all the measure for conitnue so
    //I'll upload the measures over the validation supply and sshe
    //and they w'll review with the evidence to approved or reject the work request

    this.postValidation()

    console.log("a ver si cierto")
    console.log(this.workRequestId)
    console.log(this.selectedMandatoryMeasures)
    const modal = await this.modalCrtl.create({
      component: ModalMedidasFotosPage,
      componentProps:{
        'workRequestId' : this.workRequestId,
        'selectedMandatoryMeasures' : this.selectedMandatoryMeasures,
        'mandatoryMeasuesEvidence':"mandatoryMeasureEvidence"
      }
    }); 

    this.modalCrtl.dismiss();

    
    await modal.present();
  }

  postValidation(){
    //List to post in the table validation relation sshe and supply
    this.lstMeasureDetailsValidation;
    this.lastWorkRequestValidationId;

    //console.log(this.lastWorkRequestValidationId[0]);

    console.log("this is the list")
    console.log(this.lstMeasureDetailsValidation)

    this.lstMeasureDetailsValidation.forEach(element=>{
      console.log("print element")
      console.log(element)

      let lol = new NewWorkRequestRelationMandatoryMeasureValidationSupplySshe 
      //Declare empty object lol as NewWorkRequest.... structure
      //let lol = {} as NewWorkRequestRelationMandatoryMeasureValidationSupplySshe

      lol.validationSshe = 0
      lol.validationSupply = 0
      lol.relationWorkRequestMandatoryMeasureId = this.lastWorkRequestValidationId[0].relationWorkRequestMandatoryMeasureId;
      lol.mandatoryMeasuresDetailsId = element.mandatoryDetailsId
      lol.mandatoryMeasuresId = element.mandatoryMeasureId
      lol.mandatoryMeasuresOptionId = element.mandatoryMeasureOptionId

      console.log("print the relation work between the work and the validations")
      console.log(lol)

      this.worksService.postNewWorkRequestRelationMandatoryMeasureValidationSupplySshe(lol).subscribe(
        data=>{
          console.log(data)
        },
        err=>{
          console.log("no formo el objecto correctamente")
          console.log(err)
        }
      )

    })



  }




/*   groupMeasureById(){
    console.log("Agrupa por measure name")
    this.grouped = this.lstMeasureOptionsAvailable.reduce((group: { [x: string]: any[]; }, current) => {
      //create your grouping key, by which you want to group the items
      const groupingKey = `${current.mandatoryMeasureId} - ${current.mandatoryMeasureName}`;
      //if the group does not yet have an entry for this key, init it to empty array
      group[groupingKey] = group[groupingKey] || [];
      //add the current item to the group
      group[groupingKey].push(current);
      console.log("final group")
      console.log(group)
      this.groupedOrder = group
      this.datax = this.groupedOrder
      console.log("esto es datax")
      console.log(this.datax)


      return group;
    }, {});
  } */

}
