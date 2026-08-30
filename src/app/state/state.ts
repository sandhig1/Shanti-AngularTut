import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Stateservice } from '../../services/stateservice/stateservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-state',
  imports: [FormsModule],
  templateUrl: './state.html',
  styleUrl: './state.css',
})
export class State {

  router = inject(Router);
  stateServ = inject(Stateservice)

  states: WritableSignal<any[]> = signal([]);

  constructor() {
    this.getAllState();
  }

  getAllState() {
    debugger;
    this.stateServ.getStates().subscribe({
      next: (res: any) => {
        debugger;
        this.states.set(res.data)
      }
    })
  }

  AddState() {
    this.router.navigate(['statedetail']);
  }

  viewstate(id: number) {
    this.router.navigate(['viewstate/' + id]);
  };

  editState(id: number) {
    debugger;
    this.router.navigate(['statedetail/' + id]);
  };

  deleteState(id: number) {
    debugger;
    if (id > 0) {
      this.stateServ.deleteState(id).subscribe({
        next: (res: any) => {
          debugger;
          if (res.status == true) {
            alert("State Deleted Successfully")
            this.getAllState();
          }
          else {
            alert("Error while Deleting State");
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
          FILTERED ENQUIRIES 
  ========================================================= */ 
  filteredStates = computed(() => { 
    const search = this.searchText.trim().toLowerCase(); 
    const enquiries = this.states(); 
    
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
  paginatedStates = computed(() => { 
    const page = this.currentPage(); 
    const size = this.pageSize(); 
    const enquiries = this.filteredStates(); 
    const start = (page - 1) * size; 
    const end = start + size; 
    return enquiries.slice( start, end ); 
  });

  /* ========================================================= 
            TOTAL PAGES 
  ========================================================= */ 
  totalPages = computed(() => { 
    const totalRecords = this.filteredStates().length; 
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
    const total = this.filteredStates().length; 
    
    if (total === 0) { 
      return 0; 
    } 
    
    return ( (this.currentPage() - 1) * this.pageSize() ) + 1; 
  }); 
  
  /* ========================================================= 
        END RECORD 
  ========================================================= */ 
  endRecord = computed(() => { 
    const total = this.filteredStates().length; 
    
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
