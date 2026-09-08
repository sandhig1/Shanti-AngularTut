import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { Mainhome } from './mainhome/mainhome';
import { Home } from './home/home';
import { Enquiry } from './enquiry/enquiry';
import { Enquirydetail } from './enquirydetail/enquirydetail';
import { Viewenquiry } from './viewenquiry/viewenquiry';
import { State } from './state/state';
import { Statedetail } from './statedetail/statedetail';
import { Viewstate } from './viewstate/viewstate';
import { City } from './city/city';
import { Dashboard } from './dashboard/dashboard';
import { Binding } from './binding/binding';
import { Directive } from './directive/directive';
import { Controlflow } from './controlflow/controlflow';
import { Citylist } from './citylist/citylist';
import { Arealist } from './arealist/arealist';
import { Area } from './area/area';
import { Cliniclist } from './cliniclist/cliniclist';
import { Clinic } from './clinic/clinic';
import { Doctorlist } from './doctorlist/doctorlist';
import { Doctor } from './doctor/doctor';
import { Patientlist } from './patientlist/patientlist';
import { Patient } from './patient/patient';
import { Stafflist } from './stafflist/stafflist';
import { Staff } from './staff/staff';
import { Appointmentlist } from './appointmentlist/appointmentlist';
import { Appointment } from './appointment/appointment';

export const routes: Routes = [
    {path:'', component:Mainhome},
    {path:'mainhome', component:Mainhome},
    {path:"login", component:Login},
    {path:"signup", component:Signup},
    {path:"", 
        component:Home,
        children:[
            {path:"enquiry", component:Enquiry},
            {path:"enquirydetail", component:Enquirydetail},
            {path:"enquirydetail/:id", component:Enquirydetail},
            {path:"viewenquiry", component:Viewenquiry},
            {path:"viewenquiry/:id", component:Viewenquiry},
            {path:"state", component:State},
            {path:"statedetail", component:Statedetail},
            {path:"statedetail/:id", component:Statedetail},
            {path:"viewstate", component:Viewstate},
            {path:"viewstate/:id", component:Viewstate},
            {path:"city", component:City},
            {path:"city/:id", component:City},
            {path:"citylist", component:Citylist},
            {path:"arealist", component:Arealist},
            {path:"area", component:Area},
            {path:"area/:id", component:Area},
            {path:"cliniclist", component:Cliniclist},
            {path:"clinic", component:Clinic},
            {path:"clinic/:id", component:Clinic},
            {path:"doctorlist", component:Doctorlist},
            {path:"doctor", component:Doctor},
            {path:"doctor/:id", component:Doctor},
            {path:"patientlist",component:Patientlist},
            {path:"patient", component:Patient},
            {path:"patient/:id", component:Patient},
            {path:"stafflist",component:Stafflist},
            {path:"staff", component:Staff},
            {path:"staff/:id", component:Staff},
            {path:"appointmentlist",component:Appointmentlist},
            {path:"appointment", component:Appointment},
            {path:"appointment/:id", component:Appointment},
            {path:"dashboard", component:Dashboard},
            {path:"binding", component:Binding},
            {path:"directive", component:Directive},
            {path:"controlflow", component:Controlflow}
        ]
    },
    {
        path:"**", redirectTo:''
    }
];
