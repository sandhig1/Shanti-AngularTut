import { HttpClient } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';

@Service()
export class Doctorservice {

    http = inject(HttpClient);

    getDoctors(){
            debugger;
            return this.http.get(APIUrl + "doctor/getDoctors");
        }
    
        saveDoctor(doctorData:WritableSignal<any>){
            return this.http.post(APIUrl + "doctor/saveDoctor", doctorData);
    
        }
    
        updateDoctor(doctorData:WritableSignal<any>){
            return this.http.put(APIUrl + "doctor/updateDoctor", doctorData)
    
        }
    
        deleteDoctor(id:number){
            return this.http.delete(APIUrl + "doctor/deleteDoctor?id=" + id);
        }
    
        getDoctorDetail(id:number){
            return this.http.get(APIUrl + "doctor/getDoctorDetail?id=" + id);
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

