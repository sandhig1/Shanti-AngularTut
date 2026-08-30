import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { DatePipe, JsonPipe } from '@angular/common';
import { Enquiryservice } from '../../services/enquiryservice/enquiryservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enquiry',
  imports: [DatePipe, FormsModule],
  templateUrl: './enquiry.html',
  styleUrl: './enquiry.css',
})
export class Enquiry {

  router = inject(Router);
  enquiryServ = inject(Enquiryservice)

  enquirylist: WritableSignal<any[]> = signal([]);

  searchText: string = ''; 
  /* ========================================================= 
  PAGINATION 
  ========================================================= */ 
  currentPage = signal(1); pageSize = signal(10);

  constructor() {
    this.getAllEnquiries();
  }

  getAllEnquiries() {
    debugger;
    this.enquiryServ.getEnquiries().subscribe({
      next: (res: any) => {
        debugger;
        this.enquirylist.set(res.data)

        this.currentPage.set(1);
      }
    })
  }

  viewenquiry(id:number){
    this.router.navigate(['viewenquiry/'+id]);
  };

  EditEnquiryDetail(id: number) {
    debugger;
    this.router.navigate(['enquirydetail/' + id]);
  };

  AddEnquiry() {
    this.router.navigate(['enquirydetail']);
  }
  
  deleteEnquiry(id:number){
    debugger;
    if (id>0){
      this.enquiryServ.deleteEnquiry(id).subscribe({
        next: (res: any) => {
          debugger;
          if (res.status==true){
            alert("Enquiry Deleted Successfully")
            this.getAllEnquiries();
          }
          else{
            alert("Error while Deleted Enquiry");
          }
        }
      })
    }
  }

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
  filteredEnquiries = computed(() => { 
    const search = this.searchText.trim().toLowerCase(); 
    const enquiries = this.enquirylist(); 
    
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
        PAGINATED ENQUIRIES 
  ========================================================= */ 
  paginatedEnquiries = computed(() => { 
    const page = this.currentPage(); 
    const size = this.pageSize(); 
    const enquiries = this.filteredEnquiries(); 
    const start = (page - 1) * size; 
    const end = start + size; 
    return enquiries.slice( start, end ); 
  });

  /* ========================================================= 
            TOTAL PAGES 
  ========================================================= */ 
  totalPages = computed(() => { 
    const totalRecords = this.filteredEnquiries().length; 
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
    const total = this.filteredEnquiries().length; 
    
    if (total === 0) { 
      return 0; 
    } 
    
    return ( (this.currentPage() - 1) * this.pageSize() ) + 1; 
  }); 
  
  /* ========================================================= 
        END RECORD 
  ========================================================= */ 
  endRecord = computed(() => { 
    const total = this.filteredEnquiries().length; 
    
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
