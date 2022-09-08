import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WorkDetails } from 'src/app/interfaces/worksDetails';
import { WorksService } from 'src/app/services/works.service';
import { ModalCapacitacionesPage } from '../modal-capacitaciones/modal-capacitaciones.page';
import { ModalDetalleDeTrabajoFotosPage } from '../modal-detalle-de-trabajo-fotos/modal-detalle-de-trabajo-fotos.page';
import { ModalDetalleDeTrabajoListaEmpleadosPage } from '../modal-detalle-de-trabajo-lista-empleados/modal-detalle-de-trabajo-lista-empleados.page';
import { ModalDetalleDeTrabajoRiesgosPage } from '../modal-detalle-de-trabajo-riesgos/modal-detalle-de-trabajo-riesgos.page';
import { ModalMedidasFotosPage } from '../modal-medidas-fotos/modal-medidas-fotos.page';

@Component({
  selector: 'app-modal-detalles-de-trabajo',
  templateUrl: './modal-detalles-de-trabajo.page.html',
  styleUrls: ['./modal-detalles-de-trabajo.page.scss'],
})
export class ModalDetallesDeTrabajoPage implements OnInit {

  @Input() statusId;
  @Input() statusName;
  @Input() workRequestId

  workSelectedDetails: WorkDetails;
  
  //When work request has already approved all the employees need take a training before start the job
  constructor(private modalCrtl: ModalController,
              private worksService: WorksService) { }

  //I'll apply status 1 -> Pendiente -> Capacitacion - Juramento grabado - apto medico
  //           status 2 -> Aprobado -> Subir evidencia
  //Another status just work details.
  ngOnInit() {

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

  async openModalWorkDetailsEmployeeList(){
    const modal = await this.modalCrtl.create({
      component: ModalDetalleDeTrabajoListaEmpleadosPage,
      componentProps:{
      }
    }); 
    await modal.present();
  }

  async openModalWorkDetailsPictures(){
    const modal = await this.modalCrtl.create({
      component: ModalDetalleDeTrabajoFotosPage,
      componentProps:{
      }
    }); 
    await modal.present();
  }

  async openModalWorkDetailsRisks(){
    const modal = await this.modalCrtl.create({
      component: ModalDetalleDeTrabajoRiesgosPage,
      componentProps:{
      }
    }); 
    await modal.present();
  }

    // go to upload evidence for begging the job
    async openModalForRecordedVideoAndUploadEvidenceApto(){
    //console.log("enable navigate over all view with the id")
    //console.log(this.workRequestId)
    //console.log(this.selectedMandatoryMeasures)
    const modal = await this.modalCrtl.create({
      component: ModalMedidasFotosPage,
      componentProps:{
        'statusId': this.statusId,
        'statusName':this.statusName,
        'workRequestId':this.workRequestId,
        'MedicalAndDeclaration': "declaration"
      }
    }); 
    await modal.present();
  }



  async openModalMandatoryTrainingByWorkType(){

    console.log(this.statusId);
    console.log(this.statusName);
    console.log(this.workRequestId)

    const modal = await this.modalCrtl.create({
      component: ModalCapacitacionesPage,
      componentProps:{
          'statusId': this.statusId,
          'statusName':this.statusName,
          'workRequestId':this.workRequestId
      }
    }); 
    await modal.present();
  }

}
