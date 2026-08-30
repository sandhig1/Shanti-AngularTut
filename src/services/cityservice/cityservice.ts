import { HttpClient } from '@angular/common/http';
import { inject, Service, signal, WritableSignal } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';

@Service()
export class Cityservice {
   http = inject(HttpClient);

    getCities(){
        debugger;
        return this.http.get(APIUrl + "city/getcities");
    }

    getCityDetail(id:number){
        debugger;
        return this.http.get(APIUrl + "city/getCityDetail?id="+ id);
    }

    saveCity(cityData:WritableSignal<any>){
        return this.http.post(APIUrl + "city/saveCity", cityData);

    }

    updateCity(cityData:WritableSignal<any>){
        return this.http.put(APIUrl + "city/updateCity", cityData)

    }

    deleteCity(id:number){
        return this.http.delete(APIUrl + "city/deleteCity?id=" + id);
    }

}
