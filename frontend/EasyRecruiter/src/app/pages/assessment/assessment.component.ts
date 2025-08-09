import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavComponent } from '../../components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { LoaderModule } from '@progress/kendo-angular-indicators';
import { ApiService } from '../../services/app.api.service';


@Component({
  selector: 'app-assessment',
  standalone: true,
  imports: [NavComponent, RouterModule, FooterComponent,CommonModule, FormsModule, LoaderModule],
  templateUrl: './assessment.component.html',
  styleUrl: './assessment.component.css'
})
export class AssessmentComponent implements OnInit {
  requisitions: any[] = [];
  selectedRequisitionID: number | null = null;
  cvs: any[] = [];
  isLoading = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getRequisitions();
  }

  getRequisitions() {
    debugger
    this.isLoading = true;
    this.apiService.get<any[]>('requisition/getAllRequisitions')
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
    this.getCVsByRequisition(this.selectedRequisitionID);
  }

  getCVsByRequisition(requisitionID: number) {
    this.isLoading = true;
    this.apiService.get<any[]>(`cvbank/${requisitionID}`)
      .subscribe({
        next: (data) => {
          this.apiService.get<any[]>(`assessment/${requisitionID}`)
            .subscribe({
              next: (assessments) => {
                debugger
                this.cvs = data.map(cv => {
                  const assessment = assessments.find(a => a.cvId === cv.cvId && a.requisitionID === cv.requisitionID);
                  debugger

                  return {
                    ...cv,
                    assessmentId: assessment ? assessment.assessmentId : undefined,
                    writtenMarks: assessment ? assessment.writtenMarks : 0,
                    vivaMarks: assessment ? assessment.vivaMarks : 0,
                    otherMarks: assessment ? assessment.otherMarks : 0,
                    comment: assessment ? assessment.comment : '',
                    isSelectedForNextRound: assessment ? assessment.isSelected : false
                  };
                });
                debugger
                this.isLoading = false;
              },
              error: (err) => {
                console.error('Error fetching assessments:', err);
                this.isLoading = false;
              }
            });
        },
        error: (err) => {
          this.cvs = [];
          console.error('Error fetching CVs:', err);
        }
      });
      debugger
  }  

  saveAssessments() {
    const selectedAssessments = this.cvs
      .filter(cv => cv.isSelected) // Only selected CVs
      .map(cv => ({
        cvId: cv.cvId,
        RequisitionID: this.selectedRequisitionID,
        WrittenMarks: cv.writtenMarks,
        VivaMarks: cv.vivaMarks,
        OtherMarks: cv.otherMarks,
        TotalMarks: cv.writtenMarks + cv.vivaMarks + cv.otherMarks,
        Comment: cv.comment,
        IsSelected: cv.isSelectedForNextRound
      }));
  
    if (selectedAssessments.length === 0) {
      alert("Please select at least one CV to save assessment.");
      return;
    }
  
    this.isLoading = true;
    this.apiService.post<{ message: string }>('assessment/addMultiple', selectedAssessments)
      .subscribe({
        next: () => {
          debugger
          alert("Assessments saved successfully!");
          this.isLoading = false;
        },
        error: (err) => {
          alert("Failed to save assessments.");
          this.isLoading = false;
        }
      });
  }

  deleteAssessment(assessment: any) {
    debugger
    if (confirm("Are you sure you want to delete this assessment?")) {
      this.apiService.delete<{ message: string }>(`assessment/delete/${assessment?.assessmentId}`)
        .subscribe({
          next: () => {
            alert("Assessment deleted successfully!");
            this.cvs = this.cvs.filter(cv => cv.assessmentId !== assessment?.assessmentId);
          },
          error: (err) => {
            alert("Failed to delete assessment.");
            console.error('Error deleting assessment:', err);
          }
        });
    }
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

}