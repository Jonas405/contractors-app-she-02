import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { WebView } from '@awesome-cordova-plugins/ionic-webview/ngx';
import { MediaCapture, MediaFile, CaptureError  } from '@awesome-cordova-plugins/media-capture/ngx';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { StreamingMedia } from '@awesome-cordova-plugins/streaming-media/ngx';
import { ActionSheetController, LoadingController, ModalController, NavController, Platform } from '@ionic/angular';
import { NewEvidenceModel } from 'src/app/models/work-request-model';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx'; 
import { WorksService } from 'src/app/services/works.service';


const MEDIA_FOLDER_NAME = 'CONTRACTORS';

@Component({
  selector: 'app-modal-medidas-fotos',
  templateUrl: './modal-medidas-fotos.page.html',
  styleUrls: ['./modal-medidas-fotos.page.scss'],
})
export class ModalMedidasFotosPage implements OnInit {

    //from modal work request
    @Input() workRequestId;
    @Input() selectedMandatoryMeasures;

    //For modal when open from medical status need received this parameters

    //'workRequestId':this.workRequestId,
    //'MedicalAndDeclaration': "declaration"
    @Input() MedicalAndDeclaration;

    //For modal when open from upload work evidence need received this parameters
    //'workEvidence': "workEvidenceApproved"
    @Input() workEvidence;

    //For modal when open from measure evidenc need received this parameter
    //  'mandatoryMeasuesEvidence':"mandatoryMeasureEvidence"
    @Input() mandatoryMeasuesEvidence;

    //pick photo from gallery 
  galleryOptions: CameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    quality: 50,
    allowEdit: false,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.ALLMEDIA,
    correctOrientation: true
  }

  newEvidence = new NewEvidenceModel
  files = []
  pathToUpload;
  previewPost;
  previewPostExt;

  isLoading = false;
  
  constructor(private modalCrtl: ModalController,
    private camera:Camera,
    private http: HttpClient,
    private worksService: WorksService,
    //this is the new test 
    private mediaCapture: MediaCapture,
    private file: File,
    private media: Media,
    private streamingMedia: StreamingMedia,
    private photoViewer: PhotoViewer,
    private actionSheetController: ActionSheetController,
    private webview: WebView,
    public  sanitizer:DomSanitizer,
    private plt: Platform,
    private loadingController: LoadingController,
    private navCtrl: NavController) { }

  @ViewChild('videoPlayer') videoplayer: ElementRef;
  
  ngOnInit() {
    console.log("entro en el que tal")
    console.log(this.workRequestId)
    console.log(this.selectedMandatoryMeasures)

    console.log("QLQ")
    console.log(this.MedicalAndDeclaration)

    console.log("Work evidence")
    console.log(this.workEvidence)

    this.files.forEach(element=>{
      this.deleteFile(element)
    })

    //this is the test with will save all in a local folder in the app  
    this.plt.ready().then(() => {
      let path = this.file.dataDirectory;
      this.file.checkDir(path, MEDIA_FOLDER_NAME).then(
        () => {
          this.loadFiles();
        },
        err => {
          this.file.createDir(path, MEDIA_FOLDER_NAME, false);
        }
      );
    });
  }

  loadFiles() {
    //find the file Object load file!
    this.file.listDir(this.file.dataDirectory, MEDIA_FOLDER_NAME).then(
          res => {
            this.files = res;
          },
          err => console.log('error loading files: ', err)
      );
    }

  async selectMedia() {
    const actionSheet = await this.actionSheetController.create({
      header: '¿Que quieres compartir?',
      buttons: [
        {
          text: 'Tomar foto',
          handler: () => {
            this.captureImage();
          }
        },
        {
          text: 'Grabar video',
          handler: () => {
            this.recordVideo();
          }
        },
        {
          text: 'Seleccionar archivo de galería',
          handler: () => {
            this.pickImageFromGallery();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  captureImage() {
    this.mediaCapture.captureImage().then(
      (data: MediaFile[]) => {
        if (data.length > 0) {
          this.copyFileToLocalDir(data[0].fullPath);   
        const previewFileSrc = this.webview.convertFileSrc(data[0].fullPath)
        console.log(previewFileSrc)
        this.previewPost = previewFileSrc
        this.previewPostExt = previewFileSrc.split('.').pop();
        console.log(this.previewPostExt)
        }
      },
      (err: CaptureError) => console.error(err)
    );
  }

  recordVideo() {
    this.mediaCapture.captureVideo().then(
      (data: MediaFile[]) => {
        if (data.length > 0) {
          this.copyFileToLocalDir(data[0].fullPath);
          console.log(data[0].fullPath)
          console.log(data)
          console.log(data[0].getFormatData)     
          const previewFileSrc = this.webview.convertFileSrc(data[0].fullPath)
          console.log(previewFileSrc)
          this.previewPost = previewFileSrc
          this.previewPostExt = previewFileSrc.split('.').pop(); 
 
          console.log(this.previewPostExt)
        }
      },
      (err: CaptureError) => console.error(err)
    );
  }

  copyFileToLocalDir(fullPath) {
    let myPath = fullPath;
    // Make sure we copy from the right location
    if (fullPath.indexOf('file://') < 0) {
      myPath = 'file://' + fullPath;
    }
    this.pathToUpload = myPath
    const ext = myPath.split('.').pop();
    const d = Date.now();
    const s = "x"
    const newName = `${this.workRequestId}.${s}.${d}.${ext}`;
    const name = myPath.substr(myPath.lastIndexOf('/') + 1);
    const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
    const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME
    console.log("check the copy file")
    console.log("path")
    console.log(myPath)
    console.log(copyFrom)
    console.log(name)
    console.log(copyTo)
    console.log(newName)


    this.file.copyFile(copyFrom, name, copyTo, newName).then(
      success => {
        this.loadFiles();
      },
      error => {
        console.log('error: ', error);
      }
    );
  }

  copyFileToLocalDirFormGallery(fullPath) {
    let myPath = fullPath;
    // Make sure we copy from the right location
    if (fullPath.indexOf('file://') < 0) {
      myPath = 'file://' + fullPath;
    }
    this.pathToUpload = myPath
    const y = myPath.split('.').pop();
    const x = y.split('?').shift()

    console.log("copy file from gallery")
    console.log(x)
    const previewFileSrc = this.webview.convertFileSrc(fullPath)
    console.log(previewFileSrc)
    this.previewPost = previewFileSrc
    this.previewPostExt = x
    console.log(this.previewPostExt)

    console.log("After convert the post final img")
    console.log(this.previewPost);
    console.log(this.previewPostExt)

    const ext = x;
    const d = Date.now();
    const s = "x"
    const newName = `${this.workRequestId}.${s}.${d}.${ext}`;
    const name = myPath.substr(myPath.lastIndexOf('/') + 1);
    const copyFrom = myPath.substr(0, myPath.lastIndexOf('/') + 1);
    const copyTo = this.file.dataDirectory + MEDIA_FOLDER_NAME
    const finalNameDir = name.split('?').shift()
    this.file.copyFile(copyFrom, finalNameDir, copyTo, newName).then(
      success => {
        this.loadFiles();
      },
      error => {
        console.log('error: ', error);
      }
    );
  }


  openFile(f: FileEntry) {

    if (f.name.indexOf('.wav') > -1) {
      // We need to remove file:/// from the path for the audio plugin to work
      const path =  f.nativeURL.replace(/^file:\/\//, '');
      const audioFile: MediaObject = this.media.create(path);
      audioFile.play();

    } else if (f.name.indexOf('.MOV') > -1 || f.name.indexOf('.mp4') > -1) {
      // E.g: Use the Streaming Media plugin to play a video
      this.streamingMedia.playVideo(f.nativeURL);
       //this.makeVideoIntoBlob(f.nativeURL)

    } else if (f.name.indexOf('.jpg') > -1) {
      // E.g: Use the Photoviewer to present an Image
      this.photoViewer.show(f.nativeURL, 'Foto Cargada');
      console.log("call service for pass foto ")
      const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
     // this.makeFileIntoBlob(f.nativeURL) 
    }
  }
 
  deleteFile(f: FileEntry) {
    const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
    this.file.removeFile(path, f.name).then(() => {
      this.loadFiles();
      this.previewPost = "";
    }, err => console.log('error remove: ', err));
  }

  uploadFileToServer(f){
    
    if (f.name.indexOf('.wav') > -1) {
      // We need to remove file:/// from the path for the audio plugin to work
      const path =  f.nativeURL.replace(/^file:\/\//, '');
      const audioFile: MediaObject = this.media.create(path);
      audioFile.play();

    } else if (f.name.indexOf('.MOV') > -1 || f.name.indexOf('.mp4') > -1) {
      // E.g: Use the Streaming Media plugin to play a video
    // preview image not need  this.streamingMedia.playVideo(f.nativeURL);
      this.makeVideoIntoBlobUploadToServer(f.nativeURL)

    } else if (f.name.indexOf('.jpg') > -1) {
      // E.g: Use the Photoviewer to present an Image
    // preview image not need    this.photoViewer.show(f.nativeURL, 'Foto Cargada');
      
      console.log("call service for pass foto ")
      const path = f.nativeURL.substr(0, f.nativeURL.lastIndexOf('/') + 1);
      this.makeFileIntoBlobUploadToServer(f.nativeURL) 
    //  this.readBinaryFile(f)
    }    
  }

//--- Video to server 
async makeVideoIntoBlobUploadToServer(imagePath) {
  const fileSrc = this.webview.convertFileSrc(imagePath)
  this.http.get(fileSrc,{
    responseType: 'blob',
    reportProgress: true,
    observe: 'events'
  }).subscribe(async event =>{
    if(event.type === HttpEventType.Response){

      //------- if to validate if they are comming to evidence measures or medical declaration
      if(this.MedicalAndDeclaration == 'declaration'){
        //-------- This is for medical declaration
        let url ='https://www.domappssuiteservices.com/contractors/medical-declaration-employees/'
        const ext = this.pathToUpload.split('.').pop();
        let datenow = new Date();
        let dformat = datenow.toISOString().replace("T"," ").substring(0, 19);
        const newPostFile = `${this.workRequestId}.${dformat}.${ext}`;
        this.newEvidence.dirEvidenceFile = `${url}${newPostFile}`;
          var formdata = new FormData();    
          formdata.append("postNewEvidenceWorkFileRequest", event.body,newPostFile)
          //Here I need add the direction endpoint where I'll send the file
          this.http.post("http://192.168.0.3:4000/postNewEmployeeMedicalEvidenceFileRequest", formdata).subscribe((response) => {
          console.log(response)
          this.dismiss()
          this.PostDataBaseEmployeeMedicalDeclaration(this.newEvidence.dirEvidenceFile)  
          //Clear file present to show another time share evidency
          this.files.forEach(element=>{
            this.deleteFile(element)
              })
        }); 
      }
      
      if(this.mandatoryMeasuesEvidence == 'mandatoryMeasureEvidence'){
        //-------- This is for evidence measures  ----------------------------------------------
        let url ='https://www.domappssuiteservices.com/contractors/evidence-mandatory-measures/'
        const ext = this.pathToUpload.split('.').pop();
        let datenow = new Date();
        let dformat = datenow.toISOString().replace("T"," ").substring(0, 19);
        const newPostFile = `${this.workRequestId}.${dformat}.${ext}`;
        this.newEvidence.dirEvidenceFile = `${url}${newPostFile}`;
          var formdata = new FormData();    
          formdata.append("postNewEvidenceWorkFileRequest", event.body,newPostFile)
          //Here I need add the direction endpoint where I'll send the file
          this.http.post("http://192.168.0.3:4000/postNewEvidenceWorkFileRequest", formdata).subscribe((response) => {
          console.log(response)
          this.dismiss()
          this.PostDataBase(this.newEvidence.dirEvidenceFile)  
          //Clear file present to show another time share evidency
          this.files.forEach(element=>{
            this.deleteFile(element)
              })
        }); 
        //-----------------------------------------
      }

      if(this.workEvidence == 'workEvidenceApproved'){
        //-------- This is for evidence measures  ----------------------------------------------
        let url ='https://www.domappssuiteservices.com/contractors/evidence-work-approved-advance/'
        const ext = this.pathToUpload.split('.').pop();
        let datenow = new Date();
        let dformat = datenow.toISOString().replace("T"," ").substring(0, 19);
        const newPostFile = `${this.workRequestId}.${dformat}.${ext}`;
        this.newEvidence.dirEvidenceFile = `${url}${newPostFile}`;
          var formdata = new FormData();    
          formdata.append("postNewEvidenceWorkFileRequest", event.body,newPostFile)
          //Here I need add the direction endpoint where I'll send the file
          this.http.post("http://192.168.0.3:4000/postNewApprovedWorkEvidenceAdvanceFileRequest", formdata).subscribe((response) => {
          console.log(response)
          this.dismiss()
          this.PostDataBaseEvidenceWorkApprovedAdvance(this.newEvidence.dirEvidenceFile)  
          //Clear file present to show another time share evidency
          this.files.forEach(element=>{
            this.deleteFile(element)
              })
        }); 
        //-----------------------------------------
      }

     }
    }) 
  }

//Foto to Server 
//Make file into blob from path
  async makeFileIntoBlobUploadToServer(imagePath) {
  const fileSrc = this.webview.convertFileSrc(imagePath)
  const finalImgPath = fileSrc.split('?').shift()
  console.log("ahora si")
  console.log(finalImgPath)
  this.http.get(finalImgPath,{
    responseType: 'blob',
    reportProgress: true,
    observe: 'events'
  }).subscribe(async event =>{
    if(event.type === HttpEventType.Response){

        //------- if to validate if they are comming to evidence measures or medical declaration
        if(this.MedicalAndDeclaration == 'declaration'){
          //-------- This is for medical declaration
          let url ='https://www.domappssuiteservices.com/contractors/medical-declaration-employees/'
          const ext = this.pathToUpload.split('.').pop();
          let datenow = new Date();
          let dformat = datenow.toISOString().replace("T"," ").substring(0, 19);
          const newPostFile = `${this.workRequestId}.${dformat}.${ext}`;
          this.newEvidence.dirEvidenceFile = `${url}${newPostFile}`;
            var formdata = new FormData();    
            formdata.append("postNewEvidenceWorkFileRequest", event.body,newPostFile)
            //Here I need add the direction endpoint where I'll send the file
            this.http.post("http://192.168.0.3:4000/postNewEmployeeMedicalEvidenceFileRequest", formdata).subscribe((response) => {
            console.log(response)
            this.dismiss()
            this.PostDataBaseEmployeeMedicalDeclaration(this.newEvidence.dirEvidenceFile)  
            //Clear file present to show another time share evidency
            this.files.forEach(element=>{
              this.deleteFile(element)
                })
          }); 
        }
        if(this.mandatoryMeasuesEvidence == 'mandatoryMeasureEvidence'){
          //-------- This is for evidence measures  ----------------------------------------------
          let url ='https://www.domappssuiteservices.com/contractors/evidence-mandatory-measures/'
          const ext = finalImgPath.split('.').pop();
          imagePath = finalImgPath
          let datenow = new Date();
          let dformat = datenow.toISOString().replace("T"," ").substring(0, 19);
          const newPostFile = `${this.workRequestId}.${dformat}.${ext}`;
    
          console.log("esta es la url");
          console.log(url);
          console.log("este es el objeto");
          console.log(newPostFile)
          this.newEvidence.dirEvidenceFile = `${url}${newPostFile}`;
    
          console.log(this.newEvidence);
    
          console.log(event.body)
          var formdata = new FormData();    
          formdata.append("postNewEvidenceWorkFileRequest", event.body, newPostFile)
          console.log(formdata)
          this.http.post("http://192.168.0.3:4000/postNewEvidenceWorkFileRequest", formdata).subscribe((response) => {
          this.dismiss()
          this.PostDataBase(this.newEvidence.dirEvidenceFile)  
          //Clear file present to show another time share evidency
          this.files.forEach(element=>{
            this.deleteFile(element)
          })
          }); 
        }
        if(this.workEvidence == 'workEvidenceApproved'){
          //-------- This is for evidence measures  ----------------------------------------------
          let url ='https://www.domappssuiteservices.com/contractors/evidence-work-approved-advance/'
          const ext = this.pathToUpload.split('.').pop();
          let datenow = new Date();
          let dformat = datenow.toISOString().replace("T"," ").substring(0, 19);
          const newPostFile = `${this.workRequestId}.${dformat}.${ext}`;
          this.newEvidence.dirEvidenceFile = `${url}${newPostFile}`;
            var formdata = new FormData();    
            formdata.append("postNewEvidenceWorkFileRequest", event.body,newPostFile)
            //Here I need add the direction endpoint where I'll send the file
            this.http.post("http://192.168.0.3:4000/postNewApprovedWorkEvidenceAdvanceFileRequest", formdata).subscribe((response) => {
            console.log(response)
            this.dismiss()
            this.PostDataBaseEvidenceWorkApprovedAdvance(this.newEvidence.dirEvidenceFile)  
            //Clear file present to show another time share evidency
            this.files.forEach(element=>{
              this.deleteFile(element)
                })
          }); 
          //-----------------------------------------
        }
      }
    })
  }

  PostDataBaseEvidenceWorkApprovedAdvance(dirPost){
    let datenow = new Date();
    this.newEvidence.date = datenow.toISOString().replace("T"," ").substring(0, 19);
   
    console.log("este es el id requests antres de subir evidencia")
    console.log(this.workRequestId)
  
    this.newEvidence.workRequestId = this.workRequestId
    this.newEvidence.dirEvidenceFile = dirPost
    console.log("Upload evidence ")
    console.log("Upload evidence comment  "+this.newEvidence.comment)
    console.log("Upload evidence url file"+this.newEvidence.dirEvidenceFile)
    console.log("Upload evidence id work request "+this.newEvidence.workRequestId)
    console.log("Upload post "+this.newEvidence.date) 
    this.newEvidence.userCompanyEmployeeId = 5
    console.log(this.newEvidence)
       this.worksService.postNewApprovedWorkEvidenceAdvance(this.newEvidence).subscribe(data=>{
        console.log(data)
        this.files.forEach(element=>{
          this.deleteFile(element)
        })
       })
  }

 PostDataBase(dirPost){
  let datenow = new Date();
  this.newEvidence.date = datenow.toISOString().replace("T"," ").substring(0, 19);
 
  console.log("este es el id requests antres de subir evidencia")
  console.log(this.workRequestId)

  this.newEvidence.workRequestId = this.workRequestId
  this.newEvidence.dirEvidenceFile = dirPost
  console.log("Upload evidence ")
  console.log("Upload evidence comment  "+this.newEvidence.comment)
  console.log("Upload evidence url file"+this.newEvidence.dirEvidenceFile)
  console.log("Upload evidence id work request "+this.newEvidence.workRequestId)
  console.log("Upload post "+this.newEvidence.date) 
  this.newEvidence.userCompanyEmployeeId = 5
  console.log(this.newEvidence)
     this.worksService.postNewEvidence(this.newEvidence).subscribe(data=>{
      console.log(data)
      this.files.forEach(element=>{
        this.deleteFile(element)
      })
     })
 }

 PostDataBaseEmployeeMedicalDeclaration(dirPost){
  let datenow = new Date();
  this.newEvidence.date = datenow.toISOString().replace("T"," ").substring(0, 19);
 
  console.log("este es el id requests antres de subir evidencia")
  console.log(this.workRequestId)
  this.newEvidence.workRequestId = this.workRequestId
  this.newEvidence.dirEvidenceFile = dirPost
  console.log("Upload evidence ")
  console.log("Upload evidence comment  "+this.newEvidence.comment)
  console.log("Upload evidence url file"+this.newEvidence.dirEvidenceFile)
  console.log("Upload evidence id work request "+this.newEvidence.workRequestId)
  console.log("Upload post "+this.newEvidence.date) 
  this.newEvidence.userCompanyEmployeeId = 5
  console.log(this.newEvidence)
     this.worksService.postNewEmployeeMedicalEvidence(this.newEvidence).subscribe(data=>{
      console.log(data)
      this.files.forEach(element=>{
        this.deleteFile(element)
      })
     })
 }

 async present() {
  this.isLoading = true;
  return await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Publicando... Puede compartir hasta 10 fotos o vìdeos.'
  }).then(a => {
    a.present().then(() => {
      console.log('presented');
      if (!this.isLoading) {
        a.dismiss().then(() => console.log('abort presenting'));
      }
    });
  });
}

async dismiss() {
  this.isLoading = false;
  return await this.loadingController.dismiss().then(() => console.log('dismissed'));
}

//Get photos from gallery 

pickImageFromGallery(){
 this.camera.getPicture(this.galleryOptions).then(res=>{
   console.log('response = ', res);
   this.copyFileToLocalDirFormGallery(res);
 })
}



/*   async presentLoading() {
  const loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Publicando...'//,
   // duration: 5000
  });
  await loading.present();

  const { role, data } = await loading.onDidDismiss();
  console.log('Loading dismissed!');
} */


  closeScheduleModal(){
    this.modalCrtl.dismiss();
    this.files.forEach(element=>{
      this.deleteFile(element)
    })

    this.navCtrl.navigateRoot('/tabs/tab1');
  }


}
