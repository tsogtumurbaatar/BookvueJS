<template>
	<div class="row">
		<div class="col-md-7" style="padding-bottom: 15px;">
			<input  v-model="filterValue"
			@input = "resetCounter"
			type="text"
			class="form-control" 
			id="search" 
			placeholder="Search text...">
		</div>
		<div class="col-md-5">
			<div class="col-md-8">
				<select class="form-control" onChange={this.handleChange} value={this.state.viewOrder}>
					<option value="0">Featured</option>
					<option value="1">Price: Low to High</option>
					<option value="2">Price: High to Low</option>
					<option value="3">Avg. Customer Review</option>
					<option value="4">Most reviews</option>
				</select>
			</div>
			<div class="col-md-4">
				<span class="glyphicon glyphicon-th-large" style="font-size:25px;"></span>&nbsp;&nbsp;
				<span class="glyphicon glyphicon-th-list" style="font-size:25px;"></span>
			</div>
		</div>
		<div class="col-md-12"></div>
<!-- 
		<FrontPageFilterBar
		catid = {this.props.catid}
		lngid = {this.props.lngid}
		categories = {this.props.categories}
		lngs = {this.props.lngs} 
		/> -->

		<FrontPageBook
		v-for = "(book, index) in paginatedData"
		v-bind:book = "book"
		v-bind:index = "index"
		v-bind:key = "book.book_id"
		></FrontPageBook>

		<div class="col-md-12">
		<button @click="prevPage">Previous</button>
		<button @click="nextPage">Next</button>	
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import VueLodash from 'vue-lodash'
import FrontPageBook from './frontPageBook'

export default {
	name:'Hello',
	data () {
		return {
			filterValue:'',
			sortKey : 'cat_id',
			sortOrder : 'asc',
			pageNumber: 0,
			size:9,
			}
		},
		components : {
			FrontPageBook : FrontPageBook
		},
		computed : {
			filterAndSortedData() 
			{
				let result = this.$store.state.book.booksList.books.slice();
				if(this.filterValue){
					result = result.filter(item=>item.book_name.includes(this.filterValue));
				}	
				return _.orderBy(result,[this.sortKey],[this.sortOrder])
			},
			paginatedData()
			{
				const start = this.pageNumber * this.size,
				end = start + this.size;
				return this.filterAndSortedData.slice(start, end);		
			},	
			pageCount()
			{
				let l = this.filterAndSortedData.length, s = this.size;
				return Math.floor(l/s);				
			},			
		},
		methods:{
			nextPage()
			{
				if(this.pageNumber + 1 <= this.pageCount) this.pageNumber ++;
			},
			prevPage()
			{
				if(this.pageNumber - 1 >= 0) this.pageNumber --;
			},
			resetCounter()
			{
				this.pageNumber = 0;
			},
		}
	}
</script>