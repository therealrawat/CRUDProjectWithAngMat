import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  title = "Add Patient"

  myForm!: FormGroup;
  constructor(private _snackBar: MatSnackBar, private services: ServicesService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

  
  idData!: number;

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      this.idData = param['id'];
    });
    this.myForm = this.formBuilder.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        // Validators.email,
        Validators.pattern("[a-z0-9#$%&]"+"[a-z0-9#$%&'\\.\\-_]*"+"@[^\\.\\s@]"+"[a-z0-9_\\.\\-_]*"+"\\.[a-z]{2,4}")
      ]),
      phoneNumber: new FormControl('',[
        Validators.required,
        Validators.maxLength(16)
      ]),
      dob: new FormControl('', [
        Validators.required
      ]),
      countryId: new FormControl('', [
        Validators.required
      ])
    })
    this.getById(this.idData);

    if(this.idData > 0)
    {
      this.title = "Update Patient"
    }
  }

  

  getById(idData: number) {
    this.services.GetDataByID(idData).subscribe((res:any) => {
      this.myForm.patchValue(res)
      this.myForm.patchValue({countryId:res.countryID})
      this.myForm.patchValue({dob:formatDate(res.dob, 'yyyy-MM-dd','en')})
    })
  }


  status: any[] = [
    { value: true, viewValue: 'True' },
    { value: false, viewValue: 'False' }
  ];



  UpdateData(data: any) {
    data.patientId = this.idData;
    this.services.AddEditpatient(data).subscribe((result) => {
      console.warn(result);
      if (result && data.patientId > 0) {
        this._snackBar.open(data.firstName + "'s details have been updated.", "close", { duration: 2500, horizontalPosition: 'center', verticalPosition: 'top' });
        this.router.navigate(['home'])
      }
      else if(!data.patientId)
      {
        this._snackBar.open("A new patient has been added.", "close", { duration: 2500, horizontalPosition: 'center', verticalPosition: 'top'});
        this.router.navigate(['home'])
      }
       else {
        this._snackBar.open("Errors.", "close", { duration: 2500 });
      }
    })

  }
}
