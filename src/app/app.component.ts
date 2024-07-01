import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../app/services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, HttpClientModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'practicaFrontendAS3';
  tickets: any;
  showForm: boolean = false;
  createForm: boolean = false;
  updateForm: boolean = false;
  currentTicketId: number | null = null;

  ticketForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
    ciudad: new FormControl('', Validators.required),
  });

  constructor(private apiService: ApiService) {
    this.apiService.getData().subscribe(data => {
      this.tickets = data;
      console.log("fg", this.tickets);
    });


  }

  onSubmit() {
    if (this.ticketForm.valid) {
      console.log("Formulario valido");
    }
  }


  createTicket() {
    if (this.createForm) {
      this.showForm = !this.showForm;
    } else {
      this.showForm = true;
      this.createForm = true;
      this.updateForm = false;
      this.currentTicketId = null;
    }

    this.ticketForm.reset({
      nombre: '',
      email: '',
      telefono: '',
      ciudad: ''
    });



    // if (this.createForm) {
    //   this.showForm = !this.showForm;
    // } else {
    //   this.showForm = true;
    //   this.createForm = true;
    //   this.updateForm = false;
    // }
  }

  editTicket(ticket: any) {
    if (this.currentTicketId !== ticket.id) {
      this.currentTicketId = ticket.id;

      this.ticketForm.patchValue({
        nombre: ticket.name,
        email: ticket.email,
        telefono: ticket.phone,
        ciudad: ticket.address.city
      });

      if (!this.showForm) {
        this.showForm = true;
        this.updateForm = true;
        this.createForm = false;
      }
    } else {
      this.showForm = !this.showForm;
    }




    // console.log(ticket);
    // this.ticketForm.patchValue({
    //   nombre: ticket.name,
    //   email: ticket.email,
    //   telefono: ticket.phone,
    //   ciudad: ticket.address.city
    // });
    // if (this.updateForm) {
    //   this.showForm = !this.showForm;
    // } else {
    //   this.showForm = true;
    //   this.updateForm = true;
    //   this.createForm = false;
    // }
  }
}
