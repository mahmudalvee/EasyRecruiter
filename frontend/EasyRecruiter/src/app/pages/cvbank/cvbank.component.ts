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
  templateUrl: './cvbank.component.html',
  styleUrl: './cvbank.component.css'
})
export class CVBankComponent {
  showNew: boolean = false;
  showNewBtn: boolean = true;
  requisitionName: string = '';
  designation: string = '';
  department: string = '';
  grade: string = '';
  salary: number = 0;
  vacancyNo: number = 0;
  vacancy: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  requisitions: any[] = [];
  selectedRequisitionID: number | null = null;
  cvs: any[] = [];
  selectedCVs: File[] = [];
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
      vacancy: this.vacancyNo.toString()
    };

    console.log(requisitionData); // Log the data to the console
    this.http.post<{ message: string }>(environment.apiUrl + 'requisition/addRecruitment', requisitionData)
      .subscribe({
        next: (response) => {
          alert(`Success: ${response.message}`);
          this.getRequisitions();
        },
        error: (err) => {
          this.errorMessage = 'Failed to add requisition';
          alert(`Error: ${this.errorMessage}`);
          console.error('Error:', err);
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
          this.isLoading = false;
          console.error('Error fetching requisitions:', err);
        }
      });
  }

  onSelectionChange(requisitionID: number) {
    this.selectedRequisitionID = requisitionID;
    console.log('Selected Requisition ID:', this.selectedRequisitionID);
    this.getCVsByRequisition(this.selectedRequisitionID); // Fetch CVs for selected requisition
  }

  //single uploader
  // onFileSelected(event: any) {
  //   this.selectedCVs = Array.from(event.target.files); // Store selected files
  //   console.log('Selected CVs:', this.selectedCVs);

  //   if (!this.selectedRequisitionID|| this.selectedCVs.length === 0) {
  //     alert("Please select a requisition and upload at least one CV.");
  //     return;
  //   }
  //   var selectedRequisitionID = this.selectedRequisitionID;

  //   this.selectedCVs.forEach(file => {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('requisitionID', selectedRequisitionID.toString());

  //     this.http.post(environment.apiUrl + 'cvbank/upload', formData)
  //       .subscribe({
  //         next: (response) => {
  //           alert("CV uploaded successfully!");
  //           this.selectedCVs = [];
  //           this.getCVsByRequisition(selectedRequisitionID);
  //         },
  //         error: (err) => {
  //           alert("Failed to upload CV. "+err.error.message);
  //           console.error(err);
  //           this.selectedCVs = [];
  //           this.getCVsByRequisition(selectedRequisitionID);
  //         }
          
  //       });
  //   });
  // }

  onFileSelectedCVs(event: any) {
  this.selectedCVs = Array.from(event.target.files);

  if (!this.selectedRequisitionID || this.selectedCVs.length === 0) {
    alert("Please select a requisition and upload at least one CV.");
    return;
  }

  const formData = new FormData();
  formData.append('requisitionID', this.selectedRequisitionID.toString());

  this.selectedCVs.forEach((file, index) => {
    formData.append('files', file);
  });

  var selectedRequisitionID = this.selectedRequisitionID;
  this.isLoading = true;
  this.http.post(environment.apiUrl + 'cvbank/uploadCVs', formData)
    .subscribe({
      next: (response: any) => {
        alert("CVs uploaded successfully!");
        this.selectedCVs = [];
        this.isLoading = false;
        this.getCVsByRequisition(selectedRequisitionID);
      },
      error: (err) => {
        alert("Failed to upload CVs. " + err.error.message);
        console.error(err);
        this.selectedCVs = []
        this.isLoading = false;
        this.getCVsByRequisition(selectedRequisitionID);
      }
    });
  }

  getCVsByRequisition(requisitionID: number) {
    this.isLoading = true;
    this.http.get<any[]>(`${environment.apiUrl}cvbank/${requisitionID}`)
      .subscribe({
        next: (data) => {
          this.cvs = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.cvs = []; // Clear list if no CVs found
          console.error('Error fetching CVs:', err);
          this.isLoading = false;
        }
      });
  }

  viewPDF(base64String: string) {
    if (!base64String) {
      alert("No PDF available for this CV.");
      return;
    }

    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const fileBlob = new Blob([byteArray], { type: 'application/pdf' });

    const fileURL = URL.createObjectURL(fileBlob);
    window.open(fileURL, '_blank');
  }

  deleteCV(cVId: number) {
    if (confirm("Are you sure you want to delete this CV?")) {
      this.isLoading = true;
      this.http.delete(`${environment.apiUrl}cvbank/delete/${cVId}`)
        .subscribe({
          next: () => {
            alert("CV deleted successfully!");
            this.cvs = this.cvs.filter(cv => cv.cvId !== cVId);
            this.isLoading = false;
          },
          error: (err) => {
            alert("Failed to delete CV.");
            this.isLoading = false;
            console.error('Error deleting CV:', err);
          }
        });
    }
  }

  addRequisitionClicked(){
    this.showNewBtn = false;
    this.showNew = true;
  }
}
