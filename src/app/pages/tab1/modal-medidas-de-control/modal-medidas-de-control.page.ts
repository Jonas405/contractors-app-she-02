import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MandatoryMeasureOptions } from 'src/app/interfaces/measuresDetails';
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

  //lst for select items
  lstMeasureOptionsAvailable : MandatoryMeasureOptions[] = []

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
    console.log("a ver si cierto")
    console.log(this.workRequestId)
    console.log(this.selectedMandatoryMeasures)
    const modal = await this.modalCrtl.create({
      component: ModalMedidasFotosPage,
      componentProps:{
        'workRequestId' : this.workRequestId,
        'selectedMandatoryMeasures' : this.selectedMandatoryMeasures
      }
    }); 
    await modal.present();
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
