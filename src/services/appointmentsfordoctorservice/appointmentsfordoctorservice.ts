import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';

@Service()
export class appointmentsfordoctorservice {

    http = inject(HttpClient);

    getAppointmentsForDoctor(DoctorId:number){
        debugger;
        return this.http.get(APIUrl + "appointment/getAppointmentsForDoctor?DoctorId=" + DoctorId);
    }
}
