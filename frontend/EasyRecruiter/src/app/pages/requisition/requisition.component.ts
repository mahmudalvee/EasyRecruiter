import { Component, OnInit } from '@angular/core';
import { NavComponent } from '../../components/nav/nav.component';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoaderModule } from '@progress/kendo-angular-indicators';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavComponent, RouterModule, FooterComponent,CommonModule, FormsModule, LoaderModule],
  templateUrl: './requisition.component.html',
  styleUrl: './requisition.component.css'
})
export class RequisitionComponent {
  showNew: boolean = false;
  showNewBtn: boolean = true;
  requisitionName: string = '';
  designation: string = '';
  department: string = '';
  grade: string = '';
  salary: number = 0;
  vacancyNo: number = 0;
  vacancy: string = '';
  descriptionSkill: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  requisitions: any[] = [];
  isLoading = false;


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getRequisitions();
  }

  addRequisition() {
    const requisitionData = {
      requisitionName: this.requisitionName,
      designation: this.designation,
      department: this.department,
      grade: this.grade,
      salary: this.salary,
      vacancy: this.vacancyNo.toString(),
      descriptionSkill: this.descriptionSkill.toString()
    };

    console.log(requisitionData);
    this.isLoading = true;
    this.http.post<{ message: string }>(environment.apiUrl + 'requisition/addRecruitment', requisitionData)
      .subscribe({
        next: (response) => {
          alert(`Success: ${response.message}`);
          this.resetForm();
          this.getRequisitions();
        },
        error: (err) => {
          this.errorMessage = 'Failed to add requisition';
          alert(`Error: ${this.errorMessage}`);
          console.error('Error:', err);
          this.isLoading = false;
        }
      });

  }

  getRequisitions() {
    this.isLoading = true;
    this.http.get<any[]>(environment.apiUrl + 'requisition/getAllRequisitions')
      .subscribe({
        next: (data) => {
          this.requisitions = data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error fetching requisitions:', err);
          this.isLoading = false;
        }
      });
  }

  deleteRequisition(id: number) {
    if (confirm('Are you sure you want to delete this requisition? Deleting a requisition will delete corresponding CV Bank and other requisition Data permanently.')) {
      this.isLoading = true;
      this.http.delete<{ message: string }>(`${environment.apiUrl}requisition/delete/${id}`)
        .subscribe({
          next: (response) => {
            alert(response.message); // Show success message
            this.requisitions = this.requisitions.filter(req => req.requisitionID !== id);
            this.isLoading = false;
          },
          error: (err) => {
            alert('Failed to delete requisition.');
            console.error('Error:', err);
            this.isLoading = false;
          }
        });
    }
  }

  addRequisitionClicked(){
    this.showNewBtn = false;
    this.showNew = true;
  }

  resetForm() {
    this.showNewBtn = true;
    this.showNew = false;
    this.requisitionName = '';
    this.designation = '';
    this.department = '';
    this.grade = '';
    this.salary = 0;
    this.vacancyNo = 0;
    this.vacancy = '';
    this.descriptionSkill = '';
  }
}
