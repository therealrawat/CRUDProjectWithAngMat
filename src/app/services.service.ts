import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private _refreshrequired = new Subject<void>();
  get RequiredRefresh() {
    return this._refreshrequired;
  }

  constructor(private http:HttpClient) { }

  
  updatePatient = 'http://localhost:5205/api/Patient/UpdatePatientDetails'
  getPatient = 'http://localhost:5205/api/Patient/GetPatientDetails'
  addPatient = 'http://localhost:5205/api/Patient/AddPatientDetails'


 AddEditpatient(data:any){
  return this.http.post('http://localhost:5205/api/Patient/AddEditPatient',data);
 }
 

  GetAllActivePatients()
  {
    return this.http.get(this.getPatient)
  }


  DeletePatients(id: any,Delby:any,deletedOn:any)
  {
    return this.http.delete(`http://localhost:5205/api/Patient/DeletePatient?id=${id}&DeletedBy=${Delby}&DeletedOn=${deletedOn}`).pipe(
      tap(()=>{
        this.RequiredRefresh.next()
      })
    )
  }

  GetDataByID(id:any)
   {
    console.warn(id);
    return this.http.get(`http://localhost:5205/api/Patient/GetpatientbyID?id=${id}`)
   }

  //  UpdateCurrentData(data:any)
  //  {
  //   console.log("updated value:",data)
  //   return this.http.put(this.updatePatient, data).pipe(
  //     tap(()=>{
  //       this.RequiredRefresh.next()
  //     })
  //   )
  //  }
  //  AddPatient(data:any)
  //  {
  //    return this.http.post(this.addPatient,data);
  //  }


}
