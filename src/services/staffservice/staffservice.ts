import { HttpClient } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';

@Service()
export class Staffservice {

    http = inject(HttpClient);

    getStaffs() {
        debugger;
        return this.http.get(APIUrl + "staff/getStaffs");
    }

    saveStaff(staffData: WritableSignal<any>) {
        return this.http.post(APIUrl + "staff/saveStaff", staffData);

    }

    updateStaff(staffData: WritableSignal<any>) {
        return this.http.put(APIUrl + "staff/updateStaff", staffData)

    }

    deleteStaff(id: number) {
        return this.http.delete(APIUrl + "staff/deleteStaff?id=" + id);
    }

    getStaffDetail(id: number) {
        return this.http.get(APIUrl + "staff/getStaffDetail?id=" + id);
    }

    getStaffCategory() {
        debugger;
        return this.http.get(APIUrl + "staffcategory/getStaffCategory");
    }

    getDepartment() {
        debugger;
        return this.http.get(APIUrl + "department/getDepartment");
    }

    getClinics() {
        debugger;
        return this.http.get(APIUrl + "clinic/getClinics");
    }
        
            

}
