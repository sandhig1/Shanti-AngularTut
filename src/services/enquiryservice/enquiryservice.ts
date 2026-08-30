import { HttpClient } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';

@Service()
export class Enquiryservice {

    http = inject(HttpClient);

    getEnquiries(){
        debugger;
        return this.http.get(APIUrl + "enquiry/getenquiries");
    }

    saveEnquiry(stateData:WritableSignal<any>){
        return this.http.post(APIUrl + "enquiry/saveEnquiry", stateData);

    }

    updateEnquiry(stateData:WritableSignal<any>){
        return this.http.put(APIUrl + "enquiry/updateEnquiry", stateData)

    }

    deleteEnquiry(id:number){
        return this.http.delete(APIUrl + "enquiry/deleteEnquiry?id=" + id);
    }

    getEnquiryDetail(id:number){
        return this.http.get(APIUrl + "enquiry/getenquiryDetail?id=" + id);
    }
}
