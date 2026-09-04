import { Component, inject,  computed, signal, WritableSignal  } from '@angular/core';
import { Router } from '@angular/router';
import { Patientservice } from '../../services/patientservice/patientservice';
import { Areaservice } from '../../services/areaservice/areaservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-patientlist',
  imports: [FormsModule],
  templateUrl: './patientlist.html',
  styleUrl: './patientlist.css',
})
export class Patientlist {

  router = inject(Router);
  patientServ = inject(Patientservice);
  areaServ = inject(Areaservice);
  cityServ = inject(Areaservice);
  stateServ = inject(Areaservice);

  patients: WritableSignal<any[]> = signal([]);


  constructor() {
    this.getAllPatient();
  }

  AddPatient() {
    this.router.navigate(['patient']);
  }

  getAllPatient() {
    debugger;
    this.patientServ.getPatients().subscribe({
      next: (res: any) => {
        debugger;
        this.patients.set(res.data)
      }
    })
  }

  //Edit Patient//
  editPatient(id: number) {
    debugger;
    this.router.navigate(['patient/' + id]);
  };

  deletePatient(id: number) {
    debugger;
    if (id > 0) {
      this.patientServ.deletePatient(id).subscribe({
        next: (res: any) => {
          debugger;
          if (res.status == true) {
            alert("Patient Deleted Successfully")
            this.getAllPatient();
          }
          else {
            alert("Error while Deleting Patient");
          }
        }
      })
    }
  }

  searchText: string = ''; 
    
    /* ========================================================= 
    PAGINATION 
    ========================================================= */ 
    currentPage = signal(1); pageSize = signal(10);
  
    /* ========================================================= 
            SEARCH 
    ========================================================= */ 
    onSearch(): void { 
      // Whenever search changes, 
      // return to page 1. 
      this.currentPage.set(1); 
    } 
    
    /* ========================================================= 
            CLEAR SEARCH 
    ========================================================= */ 
    clearSearch(): void { 
      this.searchText = ''; 
      this.currentPage.set(1); 
    }
  
    /* ========================================================= 
            FILTERED AREAS 
    ========================================================= */ 
    filteredpatients = computed(() => { 
      const search = this.searchText.trim().toLowerCase(); 
      const enquiries = this.patients(); 
      
      /* If search box is empty, return all records. */ 
      if (!search) { return enquiries; } 
      /* Search in: Enquiry No Customer Name Phone Email Enquiry Detail */ 
      return enquiries.filter(item => { 
        return ( String(item.EnquiryNo ?? '').toLowerCase().includes(search) 
          || String(item.CustomerName ?? '').toLowerCase().includes(search) 
          || String(item.PhoneNo ?? '') .toLowerCase().includes(search) 
          || String(item.EmailAdd ?? '') .toLowerCase() .includes(search) 
          || String(item.EnquiryDetail ?? '') .toLowerCase() .includes(search) 
        ); 
      });
    })
  
  
    /* ========================================================= 
          PAGINATED STATES 
    ========================================================= */ 
    paginatedpatients = computed(() => { 
      const page = this.currentPage(); 
      const size = this.pageSize(); 
      const enquiries = this.filteredpatients(); 
      const start = (page - 1) * size; 
      const end = start + size; 
      return enquiries.slice( start, end ); 
    });
  
    /* ========================================================= 
              TOTAL PAGES 
    ========================================================= */ 
    totalPages = computed(() => { 
      const totalRecords = this.filteredpatients().length; 
      return Math.max( 1, Math.ceil( totalRecords / this.pageSize() ) ); 
    }); 
    
    /* ========================================================= 
          PAGE NUMBERS 
    ========================================================= */ 
    pages = computed(() => { 
      return Array.from( { length: this.totalPages() }, (_, index) => index + 1 ); 
    });
  
    /* ========================================================= 
          START RECORD 
    ========================================================= */ 
    startRecord = computed(() => { 
      const total = this.filteredpatients().length; 
      
      if (total === 0) { 
        return 0; 
      } 
      
      return ( (this.currentPage() - 1) * this.pageSize() ) + 1; 
    }); 
    
    /* ========================================================= 
          END RECORD 
    ========================================================= */ 
    endRecord = computed(() => { 
      const total = this.filteredpatients().length; 
      
      if (total === 0) { 
        return 0; 
      } 
      
      return Math.min( this.currentPage() * this.pageSize(), total ); 
    });
  
    /* ========================================================= 
          SERIAL NUMBER 
    ========================================================= */
    getSerialNumber(index: number): number { 
      return ( (this.currentPage() - 1) * this.pageSize() ) + index + 1; 
    }
  
    /* ========================================================= 
            GO TO PAGE 
    ========================================================= */ 
    goToPage(page: number): void { 
      if ( page >= 1 && page <= this.totalPages() ) { 
        this.currentPage.set(page); 
      } 
    } 
    
    /* ========================================================= 
          PREVIOUS PAGE 
    ========================================================= */ 
    previousPage(): void { 
      const current = this.currentPage(); 
      
      if (current > 1) { 
        this.currentPage.set( current - 1 ); 
      } 
    } 
    
    /* ========================================================= 
          NEXT PAGE 
    ========================================================= */ 
    nextPage(): void { 
      const current = this.currentPage(); 
      const total = this.totalPages(); 
      
      if (current < total) { 
        this.currentPage.set( current + 1 ); 
      } 
    }


}
