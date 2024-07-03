import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from '../app/services/api.service';
import { HttpClientModule } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { Ticket } from './models/ticket.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, HttpClientModule, ReactiveFormsModule,  CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showMenuOptions: boolean = false;
  tickets!: any;
  filteredResults!: any;
  showForm: boolean = false;
  showModalDelete: boolean = false;
  showModalSuccess: boolean = false;
  createForm: boolean = false;
  updateForm: boolean = false;
  currentTicketId: number = 0;

  titleModalSuccess!: string;
  textModalSuccess!: string;


  ticketForm = new FormGroup({
    titleInput: new FormControl('', Validators.required),
    descriptionInput: new FormControl('', Validators.required),
    activeInput: new FormControl(false),
    archivedInput: new FormControl(false),
  });

  constructor(private apiService: ApiService) {
    this.getTickets();
  }

  getTickets() {
    this.apiService.getData().subscribe(response => {
      this.tickets = response;
      this.sortTickets();
      console.log("Tickets", this.tickets);
    });
  }


  createTicket() {
    if (this.ticketForm.valid && this.createForm) {
      this.showForm = !this.showForm;

      const ticket = this.transformFormToTicket(this.ticketForm.value);

      this.apiService.createTicket(ticket).subscribe(
        response => {
          if (response) {
            console.log('Ticket creado:', response);
            this.ticketForm.reset();
            this.getTickets();
            this.modalSuccess("¡Ticket creado!", "Listo, se ha añadido este nuevo ticket");
          }
        },
        error => {
          console.error('Error al crear el ticket: ', error);
          alert('Error al crear el ticket: ' + error);
        }
      );
    } else {
      this.showForm = true;
      this.createForm = true;
      this.updateForm = false;
      this.currentTicketId = 0;
    }
    this.ticketForm.reset({
      titleInput: '',
      descriptionInput: '',
      activeInput: false,
      archivedInput: false
    });
  }


  updateTicket(ticketId: number, ticket: any) {
    if (this.ticketForm.valid && this.updateForm) {
      this.showForm = !this.showForm;

      const ticket = this.transformFormToTicket(this.ticketForm.value);

      this.apiService.updateTicket(ticketId, ticket).subscribe(
        response => {
          if (response) {
            console.log('Ticket actualizado:', response);
            this.ticketForm.reset();
            this.getTickets();
            this.modalSuccess("¡Ticket actualizado!", "Este ticket ha sido actualizado correctamente");
          }
        },
        error => {
          console.error('Error al actualizar el ticket: ', error);
          alert('Error al actualizar el ticket: ' + error);
        }
      );
    } else {
      this.showForm = true;
      this.createForm = false;
      this.updateForm = true;
      this.currentTicketId = 0;
    }

    this.ticketForm.reset({
      titleInput: '',
      descriptionInput: '',
      activeInput: false,
      archivedInput: false
    });


  }


  deleteTicket() {
    this.apiService.deleteTicket(this.currentTicketId).subscribe(
      response => {
        if (response) {
          console.log('Ticket eliminado:', response);
          this.ticketForm.reset();
          this.getTickets();
          this.showModalDelete = !this.showModalDelete;
          this.modalSuccess("¡Ticket eliminado!", "Este ticket ha sido eliminado");
        }
      },
      error => {
        console.error('Error al eliminar el ticket: ', error);
        alert('Error al eliminar el ticket: ' + error);
      }
    );
  }


  onSubmit() {
    if (this.ticketForm.valid) {
      if (this.createForm) {
        this.createTicket();
      }
      if (this.updateForm) {
        const ticketData = this.transformFormToTicket(this.ticketForm.value);
        this.updateTicket(this.currentTicketId, ticketData);
      }
    }
  }

  closeModal() {
    this.showForm = false;
    this.showModalDelete = false;
    this.showModalSuccess = false;
  }

  modalSuccess(titleModalSUccess: string, textModalSuccess: string) {
    setTimeout(() => {
      this.showModalSuccess = true;
      this.titleModalSuccess = titleModalSUccess;
      this.textModalSuccess = textModalSuccess;
    }, 2000);
  }

  modalDeleteTicket(ticketId: number) {
    this.showModalDelete = !this.showModalDelete;
    this.currentTicketId = ticketId;
  }

  editTicket(ticket: any) {
    this.currentTicketId = ticket.id;
    console.log(this.currentTicketId);

      this.ticketForm.patchValue({
        titleInput: ticket.attributes.title,
        descriptionInput: ticket.attributes.description,
        activeInput: ticket.attributes.active,
        archivedInput: ticket.attributes.archived
      });


      if (!this.showForm) {
        this.showForm = true;
        this.updateForm = true;
        this.createForm = false;
      }
  }

  transformFormToTicket(formData: any): Ticket {
    return {
      title: formData.titleInput ?? '',
      description: formData.descriptionInput ?? '',
      active: formData.activeInput ?? false,
      archived: formData.archivedInput ?? false
    };
  }

  sortTickets() {
    this.tickets.data.sort((a: any, b: any) => a.id - b.id);
  }

  menuOpciones() {
    this.showMenuOptions = !this.showMenuOptions;
  }

}
