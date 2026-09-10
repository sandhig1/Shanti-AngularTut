import { HttpClient } from '@angular/common/http';
import { inject, Service, WritableSignal } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';
import { Observable } from 'rxjs';

@Service()
export class Appointmentservice {

    http = inject(HttpClient);

    getAppointments(){
        debugger;
        return this.http.get(APIUrl + "appointment/getAppointments");
    }

    saveAppointment(appointmentData:WritableSignal<any>){
        return this.http.post(APIUrl + "appointment/saveAppointment", appointmentData);

    }

    updateAppointment(appointmentData:WritableSignal<any>){
        return this.http.put(APIUrl + "appointment/updateAppointment", appointmentData)

    }

    deleteAppointment(id:number){
        return this.http.delete(APIUrl + "appointment/deleteAppointment?id=" + id);
    }

    getAppointmentDetail(id:number){
        return this.http.get(APIUrl + "appointment/getAppointmentDetail?id=" + id);
    }

    getClinic(){
        debugger;
        return this.http.get(APIUrl + "clinic/getClinics");
    }

    /*getPatient():Observable<any>{
        debugger;
        return this.http.get<any>(APIUrl + "patient/getPatients");
    }*/

    getPatient(){
        debugger;
        return this.http.get(APIUrl + "patient/getPatients");
    }

    getDoctor(){
        debugger;
        return this.http.get(APIUrl + "doctor/getDoctors");
    }            
        
}
