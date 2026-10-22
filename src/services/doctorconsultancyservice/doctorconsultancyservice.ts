import { HttpClient } from '@angular/common/http';
import { inject, Service, WritableSignal } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';

@Service()
export class Doctorconsultancyservice {

    http = inject(HttpClient);
    
    getDoctorConsultancyList(){
            debugger;
            return this.http.get(APIUrl + "DoctorConsultancy/getDoctorConsultancy");
    };

    getMedicineList(){
            debugger;
            return this.http.get(APIUrl + "Common/getMedicines");
    };

    getDosageList(){
            debugger;
            return this.http.get(APIUrl + "Common/getDosage");
    };

    getTestList(){
            debugger;
            return this.http.get(APIUrl + "Common/getTest");
    };


    /*getDoctorConsultancyList(){
            debugger;
            return this.http.get(APIUrl + "DoctorConsultancy/getDoctorConsultancy");
    };*/

    saveDoctorConsultancy(DoctorConsultancy:WritableSignal<any>){
        return this.http.post(APIUrl + "DoctorConsultancy/SaveDoctorConsultancy", DoctorConsultancy);

    }

    updateDoctorConsultancy(DoctorConsultancy:WritableSignal<any>){
        return this.http.put(APIUrl + "DoctorConsultancy/UpdateDoctorConsultancy", DoctorConsultancy)

    }

    deleteDoctorConsultancy(id:number){
        return this.http.delete(APIUrl + "DoctorConsultancy/DeleteDoctorConsultancy?id=" + id);
    }

    getDoctorConsultancyDetail(id:number){
        return this.http.get(APIUrl + "DoctorConsultancy/getDoctorConsultancyDetail?id=" + id);
    }
}
