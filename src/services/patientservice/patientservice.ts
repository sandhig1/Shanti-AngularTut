import { HttpClient } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';

@Service()
export class Patientservice {

    http = inject(HttpClient);


            getPatients(){
                debugger;
                return this.http.get(APIUrl + "patient/getPatients");
            }
        
            savePatient(patientData:WritableSignal<any>){
                return this.http.post(APIUrl + "patient/savePatient", patientData);
        
            }
        
            updatePatient(patientData:WritableSignal<any>){
                return this.http.put(APIUrl + "patient/updatePatient", patientData)
        
            }
        
            deletePatient(id:number){
                return this.http.delete(APIUrl + "patient/deletePatient?id=" + id);
            }
        
            getPatientDetail(id:number){
                return this.http.get(APIUrl + "patient/getPatientDetail?id=" + id);
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
