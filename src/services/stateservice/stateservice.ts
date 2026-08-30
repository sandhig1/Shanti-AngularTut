import { HttpClient } from '@angular/common/http';
import { inject, Service, Signal, WritableSignal } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';

@Service()
export class Stateservice {
    http = inject(HttpClient);

    getStates(){
        debugger;
        return this.http.get(APIUrl + "state/getstates");
    }

    getStateDetail(id:number){
        return this.http.get(APIUrl + "state/getstateDetail?id=" + id);
    }

    saveState(stateData:WritableSignal<any>){
        return this.http.post(APIUrl + "state/saveState", stateData);

    }

    updateState(stateData:WritableSignal<any>){
        return this.http.put(APIUrl + "state/updateState", stateData)

    }

    deleteState(id:number){
        return this.http.delete(APIUrl + "state/deleteState?id=" + id);
    }
    
}
