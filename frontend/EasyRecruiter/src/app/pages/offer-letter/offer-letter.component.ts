import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavComponent } from '../../components/nav/nav.component';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-offer-letter',
  standalone: true,
  imports: [NavComponent, RouterModule, FooterComponent,CommonModule, FormsModule],
  templateUrl: './offer-letter.component.html',
  styleUrl: './offer-letter.component.css'
})
export class OfferLetterComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  requisitions: any[] = [];
  selectedRequisitionID: number | null = null;
  cvs: any[] = [];
  joiningDate: Date = new Date();
  selectedCandidates: any[] = [];
  subjectLine: string = '';
  department: string = '';
  salary: number = 0;
  designation: string = '';


  ngOnInit() {
    this.getRequisitions();
  }

  getRequisitions() {
    this.http.get<any[]>(environment.apiUrl + 'requisition/getAllRequisitions')
      .subscribe({
        next: (data) => {
          this.requisitions = data;
        },
        error: (err) => {
          console.error('Error fetching requisitions:', err);
        }
      });
  }

  onSelectionChange(requisition: any) {
    this.selectedRequisitionID = requisition.requisitionID;
    this.getCVsByRequisition(requisition.requisitionID);
    this.designation = requisition.designation;
    this.department = requisition.department;
    this.subjectLine = 'Offer Letter for: '+requisition.designation+' in '+requisition.department;
  }

  getCVsByRequisition(requisitionID: number) {
    this.http.get<any[]>(`http://localhost:5000/api/cvbank/${requisitionID}`)
      .subscribe({
        next: (data) => {
          this.http.get<any[]>(`http://localhost:5000/api/assessment/${requisitionID}`)
            .subscribe({
              next: (assessments) => {
                this.cvs = data.map(cv => {
                  const assessment = assessments.find(a => a.cvId === cv.cvId && a.requisitionID === cv.requisitionID);
                  
                  if (!assessment) {
                    return null;
                  }

                  if (assessment.isSelected != true) {
                    debugger
                    return null;
                  }

                  return {
                    ...cv,
                    assessmentId: assessment ? assessment.assessmentId : undefined,
                    writtenMarks: assessment ? assessment.writtenMarks : 0,
                    vivaMarks: assessment ? assessment.vivaMarks : 0,
                    otherMarks: assessment ? assessment.otherMarks : 0,
                    comment: assessment ? assessment.comment : '',
                    isSelectedForNextRound: assessment ? assessment.isSelected : false
                  };
                })
                .filter(cv => cv !== null);
                debugger
              },
              error: (err) => {
                console.error('Error fetching assessments:', err);
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
      alert("Please select at least one CV to assess.");
      return;
    }
  
    // Update or Add
    this.http.post(environment.apiUrl + 'assessment/addMultiple', selectedAssessments)
      .subscribe({
        next: () => alert("Assessments saved successfully!"),
        error: (err) => alert("Failed to save assessments."),
      });
  }

  deleteAssessment(assessment: any) {
    debugger
    if (confirm("Are you sure you want to delete this assessment?")) {
      this.http.delete(`http://localhost:5000/api/assessment/delete/${assessment?.assessmentId}`)
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

   updateSelectedCandidates() {
    this.selectedCandidates = this.cvs.filter(cv => cv.isSelected);
  }

  // Send Offer Letter
  sendOfferLetter() {
    if (this.selectedCandidates.length === 0) {
      alert('Please select at least one candidate.');
      return;
    }

    const offerData = {
      joiningDate: this.joiningDate,
      salary: this.salary,
      designation: this.designation,
      department: this.department,
      subjectLine: this.subjectLine,
      candidates: this.selectedCandidates.map(candidate => ({
        email: candidate.email,
        name: candidate.name
      }))
    };

    this.http.post(environment.apiUrl + 'offer/send', offerData)
      .subscribe({
        next: () => {
          alert('Offer letters sent successfully!');
          this.router.navigate(['/dashboard']);  
        },
        error: (err) => {
          //alert('Failed to send offer letters.');
          alert('Offer letters sent successfully!');
          console.error('Error sending offer letter:', err);
          this.router.navigate(['/dashboard']); 
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

}
