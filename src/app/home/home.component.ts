import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ServicesService } from '../services.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar} from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = "Home"
  displayedColumns = ['index', 'PatientName ', 'email', 'dob', 'phoneNumber', 'countryName', 'userName',  'actioin'];
  today= new Date();
  deleteTime = '';
  

  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;


  ngOnInit(): void {
    this.get_data();
    this.services.RequiredRefresh.subscribe((res) => {
      this.get_data();
    })

  }
  constructor(private _snackBar: MatSnackBar, public dialog: MatDialog, private services: ServicesService, private route: Router, private Obser: ServicesService) {
    
    this.deleteTime = formatDate(this.today, 'yyyy-MM-dd hh:mm:ss', 'en-US');
  }

  value: any
  dataSource: any;

  get_data() {
    this.services.GetAllActivePatients().subscribe((result) => {
      this.value = result
      this.dataSource = new MatTableDataSource<any>(this.value)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })

  }

  

    delete(index: any, Delby: any, deletedOn: any) 
    {

      if(confirm("Confirm delete Patient?"))
      {

        
              console.warn("index deleted: ", index);
              this.services.DeletePatients(index, Delby, deletedOn).subscribe((result) => {
                console.warn(result);
                this._snackBar.open("Patient deleted successfully.", "close", { duration: 2500, horizontalPosition: 'right', verticalPosition: 'top' });
              });
      }
      else
      {
        this._snackBar.open("Patient  not deleted successfully.", "close", { duration: 2500, horizontalPosition: 'right', verticalPosition: 'top' });
              
      }
    }
  
  
    

  editData(id: number) {
    this.route.navigate(['update'], { queryParams: { id: id } });
  }

  search(event: Event) {
    const filterVal = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterVal;
  }

  toAdd() {
    this.route.navigate(['update'])
  }

}
