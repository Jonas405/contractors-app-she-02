import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { IonDatetime, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SignaturePad } from 'angular2-signaturepad';
import { format, parseISO } from 'date-fns';
import { MandatoryMeasureOptions, MandatoryMeasures } from 'src/app/interfaces/measuresDetails';
import { UserCompanyDetails } from 'src/app/interfaces/userDetails';
import { Agencies, UserEmployeeCompany, WorkEmployeeTypes } from 'src/app/interfaces/worksDetails';
import { NewWorkRequestModel, NewWorkRequestRelationMandatoryMeasureValidationSupplySshe, RelationWorkRequestEmployeeTypeModel, RelationWorkRequestMandatoryMeasureModel, WorkRequestRelationUserCompanyEmployeeModel } from 'src/app/models/work-request-model';
import { WorksService } from 'src/app/services/works.service';
import { ModalDetalleDeTrabajoListaEmpleadosPage } from '../modal-detalle-de-trabajo-lista-empleados/modal-detalle-de-trabajo-lista-empleados.page';
import { ModalMedidasDeControlPage } from '../modal-medidas-de-control/modal-medidas-de-control.page';

@Component({
  selector: 'app-modal-permiso-de-trabajo',
  templateUrl: './modal-permiso-de-trabajo.page.html',
  styleUrls: ['./modal-permiso-de-trabajo.page.scss'],
})
export class ModalPermisoDeTrabajoPage implements OnInit {

  //employee list to add work request with filter
  searchEmployee: string;
  lstEmployeeCompany;

  workRequestModel = new NewWorkRequestModel

  lstWorkTypesToDo: MandatoryMeasures[] = []
  lstAgencies: Agencies[] = []
  lstWorkEmployeeTypes: WorkEmployeeTypes[] = []
  
  //List after selected for save the data after work request id are generated
  lstSelectedMandatoryMeasures = []
  lstSelectedEmployeeTypes = []

  newWorkRequestId : number;

  signatureBlob;

  // value for get las inserted work request to generate SSHE validation 
  lastWorkRequestValidationId;

  //signature pad 
  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  //For handler button from de modal viewchild save and cancel dates selected
  @ViewChild(IonDatetime) datetime:IonDatetime;

  showPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'
  formattedString = '';
  formattedStringDateInit = '';
  formattedStringDateFinish = '';

  nombre: string = '';
  usuario = {
    email: '',
    password:''
  }

  idUserFromStorage: number;
  userCompanyDetails: UserCompanyDetails;

  constructor(
    private modalCrtl: ModalController,
    private http: HttpClient,
    private storage: Storage,
    private navCtrl: NavController,
    private worksService: WorksService) {
    this.setToday()
   }

  ngOnInit() {
    //init the list employee to work

    //Add input variable coming from login for this action with the user id logged
    this.getUserIdFromStorage();

    this.getWorksTypesToDo()
    this.getAgencies();
    this.getWorkEmployeeTypes();
    this.getUsersEmployeeCompany()
 
  }

  getUserIdFromStorage(){
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
      // this.idUserFromStorage = val; wait I need implements the login before 
      //In awhile I'll pass fix id param with 5
       this.userDetailsLoggedById(5)
      // this.nextEvents(); refresh the page when pull down
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  userDetailsLoggedById(id){
    this.worksService.getUserDetailsById(id).subscribe((data: UserCompanyDetails)=>{
      this.userCompanyDetails = data[0]
      console.log(this.userCompanyDetails);
      console.log(this.userCompanyDetails.jobManager)
    })
  }


  getUsersEmployeeCompany(){
    //Note in this part we need pass the id from the company id user logged
    this.worksService.getUsersEmployeeByCompany(2).subscribe((data:UserEmployeeCompany[])=>{
      this.lstEmployeeCompany  = data
      console.log(data)
    })
  }

  lstEmployeeCompanySelectedByUser = [];
  async openModalForSelectedEmployee(){
    const modal = await this.modalCrtl.create({
      component: ModalDetalleDeTrabajoListaEmpleadosPage,
      componentProps:{
        'lstEmployeeCompany' : this.lstEmployeeCompany 
      }
    }); 

    modal.onDidDismiss().then((data)=>{
      const lstSelectedEmployeeByUserFromModal = data['data'];//Her's your selected user
      console.log("return employee selected from modal")
      console.log(lstSelectedEmployeeByUserFromModal)
      this.lstEmployeeCompanySelectedByUser = lstSelectedEmployeeByUserFromModal
    })

    await modal.present();
  }
  addSelectedCompanyEmployeeUsers(event){
    let selectedCompanyEmployeeLst = [];
    console.log("entro")
    console.log(event)
    console.log(event.detail.value)
    selectedCompanyEmployeeLst = event.detail.value
  }  
  getWorksTypesToDo(){
    this.worksService.getWorksTypesToDo().subscribe((data:MandatoryMeasures[])=>{
      this.lstWorkTypesToDo = data
      console.log(data)
    })
  }

  getAgencies(){
    this.worksService.getWorksAgencies().subscribe((data:Agencies[])=>{
      this.lstAgencies = data
      console.log(data)
    })
    
  }

  getWorkEmployeeTypes(){

    this.worksService.getWorksEmployeeTypes().subscribe((data:WorkEmployeeTypes[])=>{
      this.lstWorkEmployeeTypes = data
      console.log(data)
    })
    
  }


  permitToWorkAddEmployeeTypesLst(event){
    let employeesTypesLst = [];
    console.log("entro")
    console.log(event)
    console.log(event.detail.value)
    let selectedTypeWorks = event.detail.value
    employeesTypesLst.push(selectedTypeWorks)

    // If are multiple select true use the below code

/*     selectedTypeWorks.forEach(element => {
      employeesTypesLst.push(element)
    });
    
    console.log(employeesTypesLst) */
  }

  permitToWorkAddTypeLst(event){
  
    if(this.lstSelectedMandatoryMeasures.length >0){

      this.lstSelectedMandatoryMeasures = []
      console.log("entro")
      console.log(event)
      console.log(event.detail.value)
      let selectedTypeWorks = event.detail.value
      let lul = selectedTypeWorks.split("-").slice(1)
      console.log(lul)
      this.lstSelectedMandatoryMeasures.push(lul)
      console.log(this.lstSelectedMandatoryMeasures)
    }else{
      console.log("entro")
      console.log(event)
      console.log(event.detail.value)
      let selectedTypeWorks = event.detail.value
      let lul = selectedTypeWorks.split("-").slice(1)
      console.log(lul)
      this.lstSelectedMandatoryMeasures.push(lul)
      console.log(this.lstSelectedMandatoryMeasures)
    }
    // If are multiple option use the code below
 /*    selectedTypeWorks.forEach(element => {

      let lul = element.split("-").slice(1)
      console.log(lul)
      //Aqui debo guardar en una lista la selecciones de las mesures para posterior recorrerla y guardarlas
      //con el id del work request cuando sea generado 
 //     this.permitToWork.workTypes.push(element)
      this.lstSelectedMandatoryMeasures.push(lul)
    }); */
    
  }

  permitToWorkAddEmployeeTypeLst(event){
  
  
    let selectedTypeWorks = event.detail.value[0]
    console.log(selectedTypeWorks)
    let lol = selectedTypeWorks.split("-").slice(1)
    this.lstSelectedEmployeeTypes.push(lol[0])

    // If are multiple selection object use the code below
/*     selectedTypeWorks.forEach(element => {
      let lul = element.split("-").slice(1)
      console.log(lul)
      //Aqui debo guardar en una lista la selecciones de las mesures para posterior recorrerla y guardarlas
      //con el id del work request cuando sea generado 
  
 //   this.permitToWork.workTypes.push(element)
      this.lstSelectedEmployeeTypes.push(lul)
      
    }); */
    
  }
  permitToWorkAddAgency(event){
    let workTypes = [];
    console.log(event)
    console.log(event.detail.value)
    let lol = event.detail.value
    let lul = lol.split("-").slice(1)
    console.log(lul[0])
    this.workRequestModel.agencyId = lul[0]

  }
  //Work with the info upload sol
  uploadSolicitud(formularioSolicitudDeTrabajo: NgForm){
    console.log(formularioSolicitudDeTrabajo)
  }

  uploadWorkRequest(){
    console.log("this is the object")
   
    this.workRequestModel.companyId = 1
    let datenow = new Date();
    let dformat = datenow.toISOString().replace("T"," ").substring(0, 19);
    this.workRequestModel.createdAt = dformat

    this.workRequestModel.workRequestStatusId = 1 //star with 1 state relation with work request status 1 "pending"
    //This is the principal model to upload work request

    //User logged
   // this.workRequestModel.companyUserId = this.userCompanyDetails.jobManagerCompanyUserId;
   this.workRequestModel.companyUserId = 5
   //this.workRequestModel.companyId = this.userCompanyDetails.companyId;
   this.workRequestModel.companyId = 1
   

    console.log("Este es el modelo a enviar con la info")
    console.log(this.workRequestModel)
    this.worksService.postNewWorkRequest(this.workRequestModel).subscribe(
      data=>{
          console.log("esto si todo va bien")
          console.log(data)
          console.log("llamamos al ultimo id insertado para almacenar localmente y continuar")
          this.worksService.getLastInsertedWorkRequest().subscribe(
            data=>{
              console.log("si todo va bien imprimo el id y continuo")
              console.log(data)
              this.newWorkRequestId = data[0].workRequestId
              console.log("ahora voy a generar con este id las inserciones en las tablas relacionadas")
              this.postNewWorkRequestRelationEmployeeType(this.newWorkRequestId)
              this.postNewWorkRequestRelationMandatoryMeasure(this.newWorkRequestId)
              this.postNewWorkRequestRelationUserCompanyEmployee(this.newWorkRequestId)

                 //Llamamos al ultimo id insertado para insertar en la otra tabla de relacion de validacion supply y she y continuar
          // y se vea reflejada en la web los check para completar trabajo

          this.worksService.getLastInsertedWorkRequestRelationMandatoryMeasure().subscribe(
            data=>{
                 console.log("this is th data")
                 console.log(data)
                 
                this.lastWorkRequestValidationId = data;
                console.log(this.lastWorkRequestValidationId)
                this.openControlMeasures(this.newWorkRequestId)
            },
            err=>{
              console.log("error al buscar ultimo id insertado")
            }
          )

            
            },
            err=>{
              console.log("no pude encontrar el id")
              console.log("agregar un alert conexion fallo plz try again")
              console.log(err)
            }
          )
      },
      err =>{
        console.log("esto si dectecta error y no pudo insertar id no dañar otro")
        console.log("agregar un alert conexion fallo plz try again")
        console.log(err)
      }
    )
  }

  //save list selected employee for work 
  postNewWorkRequestRelationUserCompanyEmployee(currentWorkRequestId){

    this.lstEmployeeCompanySelectedByUser.forEach(element=>{
      console.log("imprimiento el empleado de la lista")
      console.log(element)
      let lol = new WorkRequestRelationUserCompanyEmployeeModel
      lol.workRequestId = currentWorkRequestId
      lol.userCompanyEmployeeId = element.employeeId
      console.log("creando el objeto")
      console.log(lol)
      this.worksService.postNewWorkRequestRelationUserCompanyEmployee(lol).subscribe(
        data=>{
          console.log(data)
        },
        err=>{
          console.log("no formo el objeto correctamente")
          console.log(err)
        })
})
  }

  //save relation work request employee type
  postNewWorkRequestRelationEmployeeType(currentWorkRequestId){
    //debo recorrer el arreglo con las opciones del usuario para enviar un post por cada una
    // o mas pro enviar uno que contenga todas
    console.log(currentWorkRequestId)
    this.lstSelectedEmployeeTypes.forEach(element => {
      let relationWorkRequestEmployeeTypeModel = new RelationWorkRequestEmployeeTypeModel
      relationWorkRequestEmployeeTypeModel.workRequestId = currentWorkRequestId
      relationWorkRequestEmployeeTypeModel.workEmployeeTypeId = element[0]
      //generate insertion for the relation db
      this.worksService.postNewWorkRequestRelationEmployeeType(relationWorkRequestEmployeeTypeModel)
      .subscribe(
        data=>{
          console.log(relationWorkRequestEmployeeTypeModel)
          console.log(data)
        },
        err=>{
          console.log("no formo el objeto correctamente")
          console.log(err)
        }
      )
    });
      
  }

  postNewWorkRequestRelationMandatoryMeasure(currentWorkRequestId){
    //debo recorrer el arreglo con las opciones del usuario para enviar un post por cada una
    // o mas pro enviar uno que contenga toda
    console.log(currentWorkRequestId)

    this.lstSelectedMandatoryMeasures.forEach(element => {
      let relationWorkRequestMandatoryMeasureModel = new RelationWorkRequestMandatoryMeasureModel
      relationWorkRequestMandatoryMeasureModel.workRequestId = currentWorkRequestId
      relationWorkRequestMandatoryMeasureModel.mandatoryMeasureId = element[0]
      //generate insertion for the relation db
      this.worksService.postNewWorkRequestRelationMandatoryMeasure(relationWorkRequestMandatoryMeasureModel)
      .subscribe(
        data=>{
          console.log(relationWorkRequestMandatoryMeasureModel)
          console.log(data)
        },
        err=>{
          console.log("no formo el objeto correctamente")
          console.log(err)
        }
      )
    });
    


  }

  //save relation work request new measures

  setToday(){
    this.formattedString = format (parseISO(format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'), 'HH:mm, MMM d, yyyy')
  }

  dateChangedInit(value){
    this.dateValue = value
    this.formattedStringDateInit = format(parseISO(value), 'HH:mm, MMM d, yyyy')
    this.showPicker = false
    this.workRequestModel.initDate = this.formattedStringDateInit
  //  console.log(typeof this.workRequestModel.initDate)
  //  console.log(this.workRequestModel.initDate)
  }

  dateChangedFinish(value){
    this.dateValue = value
    this.formattedStringDateFinish = format(parseISO(value), 'HH:mm, MMM d, yyyy')
    this.showPicker = false
    this.workRequestModel.endDate = this.formattedStringDateFinish
  //  console.log(typeof this.workRequestModel.endDate)
  //  console.log(this.workRequestModel.endDate)
  }

  close(){
    this.datetime.cancel(true)
  }

  selectDateInit(){
    this.datetime.confirm(true)
   // console.log(this.workRequestModel.initDate)
  }

  selectDateFinish(){
    this.datetime.confirm(true)
  //  console.log(this.workRequestModel.endDate)
  }

  //Signature implementations
  public signatureImage: string;
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 1,
    'canvasWidth': 500,
    'canvasHeight': 300,
    'backgroundColor':'rgb(255, 255, 255)'
  };

  canvasResize(){
    let canvas = document.querySelector('canvas')
    this.signaturePad.set('canvasWidth', canvas.offsetWidth)
    this.signaturePad.set('canvasHeight', canvas.offsetHeight)
  }


  drawCompleted(){
    //this convert the url to image data image png base 64
    //review for when we need to upload the entire form to the
    //server we can work with different data types but this is the
    //recommended for try to homologate all upload folders
    console.log("inside the draw completed")
    console.log(this.signatureImage)

     //----------------- Ionic upload signature path convert signature to image

    const dataURL = this.signaturePad.toDataURL('image/png');
    const data = atob(dataURL.substring('data:image/png;base64,'.length)),
      asArray = new Uint8Array(data.length);

    for (var i = 0, len = data.length; i < len; ++i) {
      asArray[i] = data.charCodeAt(i);
    }

    const blob = new Blob([asArray], { type: 'image/png' });

   //----------------- Ionic upload signature path convert signature to image
    console.log(blob)

    //upload signature file to server with date and ID
    let url = 'https://www.domappssuiteservices.com/contractors/request-work-signatures/'
    let datenow = new Date();
    let dformat = datenow.toISOString().replace("T"," ").substring(0, 19);
    //I need add the work request ID and also the userId
    //I'll login and with the company_users in this part of the app for work request
    //Just company user can do it a work request
    const ext = "png"
   // const companyUserId = this.userCompanyDetails.jobManagerCompanyUserId
   const companyUserId = 5
    const newPostSignatureFile = `${companyUserId}.${dformat}.${ext}`;
    console.log(newPostSignatureFile)

   // const newPostSignatureFile = `${dformat}`;
    let dirSignatureFile = `${url}${newPostSignatureFile}`;

    console.log(dirSignatureFile);
    
      var formdata = new FormData();
      console.log(formdata)
      formdata.append("postNewSignatureFileWorkRequest", blob, dirSignatureFile);
    // pruebas fisicas 
          this.http.post("http://192.168.0.3:4000/postNewSignatureFileWorkRequest", formdata).subscribe((response) => {
    //    this.http.post("http://localhost:4000/postNewSignatureFileWorkRequest", formdata).subscribe((response) => {
        console.log(response)
        //Here I already upload the file so I'll get call the method to generate request
        this.workRequestModel.workSignatureDir = dirSignatureFile
        this.uploadWorkRequest()
        
      }); 

  }

  base64toBlob(base64){
    const byteString = atob(base64.split(',')[1])
    const mimeString = base64.split(',')[0].split(':')[1].split(':')[0];
    const byteNumbers = new Array(byteString.length);
    for(let i = 0; i < byteString.length; i++){
      byteNumbers[i] = byteString.charAt(i);
    }
    const ia = new Uint8Array(byteNumbers);
    return new Blob([ia], {type:mimeString});

  }




  drawClear(){
    this.signaturePad.clear()
  }

  // go to the modal medidas de control 
  async openControlMeasures(newWorkRequestId){
    console.log("que valor tiene el new work request id")
    console.log(this.newWorkRequestId)
    console.log(newWorkRequestId)
    const modal = await this.modalCrtl.create({
      component: ModalMedidasDeControlPage,
      componentProps:{
        'workRequestId' : newWorkRequestId,
        'selectedMandatoryMeasures' : this.lstSelectedMandatoryMeasures,
        'lastWorkRequestValidationId' : this.lastWorkRequestValidationId
      }
    }); 

    this.modalCrtl.dismiss();
    
    await modal.present();
  }

  

}
