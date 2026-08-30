import { HttpClient } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';

@Service()
export class Areaservice {
    http = inject(HttpClient);

     getAreas(){
        debugger;
        return this.http.get(APIUrl + "area/getAreas");
    }

    saveArea(areaData:WritableSignal<any>){
        return this.http.post(APIUrl + "area/saveArea", areaData);

    }

    updateArea(areaData:WritableSignal<any>){
        return this.http.put(APIUrl + "area/updateArea", areaData)

    }

    deleteArea(id:number){
        return this.http.delete(APIUrl + "area/deleteArea?id=" + id);
    }

    getAreaDetail(id:number){
        return this.http.get(APIUrl + "area/getAreaDetail?id=" + id);
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
