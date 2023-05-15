import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminPanelServiceService } from '../../Service/AdminPanelService.service';

import { Apollo, gql } from 'apollo-angular';

@Component({
	selector: 'app-products',
	templateUrl: './Products.component.html',
	styleUrls: ['./Products.component.scss']
})

export class ProductsComponent implements OnInit {
	
	productsList 		      : any;
	productsGrid 			   : any;
	popUpDeleteUserResponse : any;
	showType	    				: string = 'grid';

	/***
	 * 
	 */

	displayedProductColumns : string [] = ['draw_title', 'drawing_on', 'max_picks','action' ];
	@ViewChild(MatPaginator) paginator : MatPaginator;
	@ViewChild(MatSort) sort           : MatSort;

	constructor(public translate : TranslateService,
					private router : Router, 
					private adminPanelService : AdminPanelServiceService, private apollo: Apollo) { }

	ngOnInit() {
		//this.adminPanelService.getProducts().valueChanges().subscribe(res => this.getProductResponse(res));
        /**
		 * 
			{ 
				lottri_lottri_active_draws {
					max_picks
					title
					drawing_on
					drawing_id
					contest_name
					description
					contest_id
				  }
			}
		 */
		this.apollo
		.watchQuery({
			query: gql`{
			lottri_lottri_drawing_details {
				contest_id
				contest_name
				draw_title
				drawing_id
				drawing_on
				entry_fees
				max_picks
				percent_distribution
				prize_pool
				total_players
				winners
			  }
			}
			`,
		})
		.valueChanges.subscribe((result: any) => {
			console.log("Testing..................")
			console.log(result.data.lottri_lottri_drawing_details);
			this.productsGrid = result.data.lottri_lottri_drawing_details;
		});
  	}

	

	//getProductResponse method is used to get the response of all products.
 	public getProductResponse(response) {
      this.productsGrid = null;
      let products = ((response.men.concat(response.women)).concat(response.gadgets)).concat(response.accessories);
      this.productsGrid = products;
   }

  	/**
	  * productShowType method is used to select the show type of product.
	  */
	productShowType(type) {
		this.showType = type;
		if(type == 'list'){
			document.getElementById('list').classList.add("active");
			document.getElementById('grid').classList.remove('active');
			this.productsList = new MatTableDataSource(this.productsGrid);
			setTimeout(()=>{
				this.productsList.paginator = this.paginator;
				this.productsList.sort = this.sort;
			},0)
			
		}
		else{
			document.getElementById('grid').classList.add("active");
			document.getElementById('list').classList.remove('active');
		}
	}

	/**
	  * onEditProduct method is used to open the edit page and edit the product.
	  */
	onEditProduct(data){
		this.router.navigate(['/admin-panel/product-edit',data.type,data.id]);
		this.adminPanelService.editProductData = data;
	}

	/* 
     *deleteProduct method is used to open a delete dialog.
     */
   deleteProduct(i){
      this.adminPanelService.deleteDialog("Are you sure you want to delete this product permanently?").
         subscribe( res => {this.popUpDeleteUserResponse = res},
                    err => console.log(err),
                    ()  => this.getDeleteResponse(this.popUpDeleteUserResponse,i))
   }

   /**
     * getDeleteResponse method is used to delete a product from the product list.
     */
   getDeleteResponse(response : string,i){
      if(response == "yes"){
      	if(this.showType == 'grid') {
         	this.productsGrid.splice(i,1);
      	}else if(this.showType == 'list'){
				this.productsList.data.splice(i,1);
				this.productsList = new MatTableDataSource(this.productsList.data);
      		this.productsList.paginator = this.paginator;
      	}
      }
   }
}
