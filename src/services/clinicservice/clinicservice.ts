import { HttpClient } from '@angular/common/http';
import { inject, Service, Signal, WritableSignal } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';

@Service()
export class Clinicservice {

    http = inject(HttpClient);

    getClinic(){
         debugger;
        return this.http.get(APIUrl + "clinic/getClinics");
    }

    getClinicDetail(id: number) {
        return this.http.get(APIUrl + "clinic/getClinicDetail?id=" + id);
    }

    saveClinic(clinicData: WritableSignal<any>) {
        return this.http.post(APIUrl + "clinic/saveClinic", clinicData);
    }

    updateClinic(clinicData:WritableSignal<any>){
        return this.http.put(APIUrl + "clinic/updateClinic", clinicData)
    }

    deleteClinic(id:number){
        return this.http.delete(APIUrl + "clinic/deleteClinic?id=" + id);
    }

    getCities(){
            debugger;
            return this.http.get(APIUrl + "city/getCities");
    }
    
    getStates(){
            debugger;
            return this.http.get(APIUrl + "state/getstates");
    }
}
