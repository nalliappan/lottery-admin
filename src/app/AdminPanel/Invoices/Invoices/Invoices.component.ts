import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-invoices',
  templateUrl: './Invoices.component.html',
  styleUrls: ['./Invoices.component.scss']
})

export class InvoicesComponent implements OnInit {

	popUpDeleteUserResponse : any;
	invoiceList             : any [] = [];

   @ViewChild(MatPaginator) paginator : MatPaginator;

   dataSource = new MatTableDataSource<any>(this.invoiceList);

   /*

   lottri_app_users(where: {email_address: {}}) {
    city
    first_name
    last_name
    phone_number
    state
    is_verified
    email_address
    date_of_birth
  }
   
   */

   displayedColumns : string[] = ['first_name', 'last_name', 'email_address', 'phone_number','date_of_birth', 'is_verified','action'];

	constructor(public service : AdminPanelServiceService,  private apollo: Apollo) { }

	ngOnInit() {
   this.service.getInvoiceContent().valueChanges().subscribe(res => console.log(res));

      this.apollo
		.watchQuery({
			query: gql`{
            lottri_app_users {
               city
               first_name
               last_name
               phone_number
               state
               is_verified
               email_address
               date_of_birth
             }
            }
			`,
		})
		.valueChanges.subscribe((result: any) => {
		   //this.getInvoiceData(result?.data?.lottri_app_users)
         const res = result?.data?.lottri_app_users.map((data: any) => {
           //const {first_name,last_name, email_address, phone_number, date_of_birth, is_verified } = data;
           return {
            first_name : data.first_name,
            last_name : data.last_name, 
            email_address : data.email_address, 
            phone_number : data.phone_number, 
            date_of_birth : data.date_of_birth, 
            is_verified : data.is_verified
           };
         });
         this.getInvoiceData(res);
		});
	}

   //getInvoiceData method is used to get the invoice list data.
   getInvoiceData(response: any){
      this.invoiceList = response;
     
     
      console.log(this.invoiceList)
      this.dataSource = new MatTableDataSource<any>(this.invoiceList);
      setTimeout(()=>{
         this.dataSource.paginator = this.paginator;
      },0)
    
   }
	/** 
     *onDelete method is used to open a delete dialog.
     */
   onDelete(i){
      this.service.deleteDialog("Are you sure you want to delete this invoice permanently?").
         subscribe( res => {this.popUpDeleteUserResponse = res},
                    err => console.log(err),
                    ()  => this.getDeleteResponse(this.popUpDeleteUserResponse,i))
   }

   /**
     * getDeleteResponse method is used to delete a invoice from the invoice list.
     */
   getDeleteResponse(response : string, i){
      if(response == "yes"){
         this.dataSource.data.splice(i,1);
         this.dataSource = new MatTableDataSource(this.dataSource.data);
         this.dataSource.paginator = this.paginator;
      }
   }

   /**
     * onSeeDialog method is used to open a see dialog.
     */
   onSeeDialog(){
      this.service.seeList();
   }

   //applyFilter function can be set which takes a data object and filter string and returns true if the data object is considered a match.
   applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
         this.dataSource.paginator.firstPage();
      }
   }
}
