import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-detalle-de-trabajo-lista-empleados',
  templateUrl: './modal-detalle-de-trabajo-lista-empleados.page.html',
  styleUrls: ['./modal-detalle-de-trabajo-lista-empleados.page.scss'],
})
export class ModalDetalleDeTrabajoListaEmpleadosPage implements OnInit {

  @Input() lstEmployeeCompany;

  searchEmployee: string;

  selectedEmployeesByUser = []

  constructor(private modalCrtl: ModalController) { }

  ngOnInit() {
    console.log(this.lstEmployeeCompany)
  }

  selectedUsers(){
    this.modalCrtl.dismiss(this.selectedEmployeesByUser)
  }
  
  addSelectedEmployee(selectedEmployee){

    if(this.selectedEmployeesByUser.some(value => value === selectedEmployee)){
      console.log("value already exists, need be deleted because are re-selected")
      const index = this.selectedEmployeesByUser.indexOf(selectedEmployee)
      this.selectedEmployeesByUser.splice(index,1)
      console.log(this.selectedEmployeesByUser)
    }else{
      console.log("value doesn't exists, need be added because no are selected")
      console.log(selectedEmployee)
      this.selectedEmployeesByUser.push(selectedEmployee)
      console.log(this.selectedEmployeesByUser)
    }


  }

}
