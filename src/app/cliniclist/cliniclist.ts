import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { Clinicservice } from '../../services/clinicservice/clinicservice';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliniclist',
  imports: [FormsModule],
  templateUrl: './cliniclist.html',
  styleUrl: './cliniclist.css',
})
export class Cliniclist {

  router = inject(Router);
  clinicServ = inject(Clinicservice);

  searchText = '';

  // All clinic records
  clinic: WritableSignal<any[]> = signal([]);


  // ============================
  // PAGINATION
  // ============================

  currentPage = signal(1);

  pageSize = 10;


  // ============================
  // SEARCH + FILTER
  // ============================

  filteredClinics = computed(() => {

    const search = this.searchText
      .toLowerCase()
      .trim();

    const clinics = this.clinic();

    if (!search) {
      return clinics;
    }

    return clinics.filter(item =>

      (item.ClinicCode ?? '')
        .toString()
        .toLowerCase()
        .includes(search)

      ||

      (item.ClinicName ?? '')
        .toString()
        .toLowerCase()
        .includes(search)

      ||

      (item.ClinicAddress ?? '')
        .toString()
        .toLowerCase()
        .includes(search)

      ||

      (item.StateName ?? '')
        .toString()
        .toLowerCase()
        .includes(search)

      ||

      (item.CityName ?? '')
        .toString()
        .toLowerCase()
        .includes(search)

      ||

      (item.MobileNo ?? '')
        .toString()
        .toLowerCase()
        .includes(search)

      ||

      (item.PhoneNo ?? '')
        .toString()
        .toLowerCase()
        .includes(search)

      ||

      (item.EmailAdd ?? '')
        .toString()
        .toLowerCase()
        .includes(search)

    );

  });


  // ============================
  // TOTAL PAGES
  // ============================

  totalPages = computed(() => {

    return Math.ceil(
      this.filteredClinics().length / this.pageSize
    ) || 1;

  });


  // ============================
  // PAGINATED CLINICS
  // ============================

  paginatedClinics = computed(() => {

    const startIndex =
      (this.currentPage() - 1) * this.pageSize;

    const endIndex =
      startIndex + this.pageSize;

    return this.filteredClinics()
      .slice(startIndex, endIndex);

  });


  // ============================
  // PAGE NUMBERS
  // ============================

  pages = computed(() => {

    return Array.from(
      { length: this.totalPages() },
      (_, index) => index + 1
    );

  });


  // ============================
  // CONSTRUCTOR
  // ============================

  constructor() {

    this.getAllClinic();

  }


  // ============================
  // ADD CLINIC
  // ============================

  AddClinic() {

    this.router.navigate(['clinic']);

  }


  // ============================
  // GET ALL CLINICS
  // ============================

  getAllClinic() {

    this.clinicServ.getClinic().subscribe({

      next: (res: any) => {

        if (res.status == true) {

          this.clinic.set(res.data);

          // Always start from first page
          this.currentPage.set(1);

        }

      },

      error: (err) => {

        console.error('Error while getting clinics:', err);

      }

    });

  }


  // ============================
  // EDIT CLINIC
  // ============================

  editClinic(id: number) {

    if (id > 0) {

      this.router.navigate(['clinic/' + id]);

    }

  }


  // ============================
  // DELETE CLINIC
  // ============================

  deleteClinic(id: number) {

    if (id > 0) {

      this.clinicServ.deleteClinic(id).subscribe({

        next: (res: any) => {

          if (res.status == true) {

            alert('Clinic Deleted Successfully');

            this.getAllClinic();

          }
          else {

            alert('Error while Deleting Clinic');

          }

        },

        error: (err) => {

          console.error('Delete error:', err);

          alert('Error while Deleting Clinic');

        }

      });

    }

  }


  // ============================
  // SEARCH
  // ============================

  onSearch() {

    // Whenever search changes,
    // go back to first page

    this.currentPage.set(1);

  }


  // ============================
  // GO TO PAGE
  // ============================

  goToPage(page: number) {

    if (
      page >= 1 &&
      page <= this.totalPages()
    ) {

      this.currentPage.set(page);

    }

  }


  // ============================
  // PREVIOUS PAGE
  // ============================

  previousPage() {

    if (this.currentPage() > 1) {

      this.currentPage.update(
        page => page - 1
      );

    }

  }


  // ============================
  // NEXT PAGE
  // ============================

  nextPage() {

    if (
      this.currentPage() <
      this.totalPages()
    ) {

      this.currentPage.update(
        page => page + 1
      );

    }

  }


  // ============================
  // SERIAL NUMBER
  // ============================

  getSerialNumber(index: number) {

    return (
      (this.currentPage() - 1) *
      this.pageSize
    ) + index + 1;

  }


  // ============================
  // START RECORD
  // ============================

  startRecord = computed(() => {

    if (this.filteredClinics().length === 0) {

      return 0;

    }

    return (
      (this.currentPage() - 1) *
      this.pageSize
    ) + 1;

  });


  // ============================
  // END RECORD
  // ============================

  endRecord = computed(() => {

    const end =
      this.currentPage() *
      this.pageSize;

    return Math.min(
      end,
      this.filteredClinics().length
    );

  });

}