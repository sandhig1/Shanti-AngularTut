import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { APIUrl } from '../../constants/global.constant';

@Service()
export class Doctorconsultancyservice {

    http = inject(HttpClient);
    

    getMedicineList(){
            debugger;
            return this.http.get(APIUrl + "Common/getMedicines");
        }
}
