<template>
	<div class="panel panel-primary">
		<div class="panel-heading">Category List</div>
		<div class="panel-body">
			<div class="col-md-12">
				<button @click="removeCategory" class="btn btn-warning pull-right">
					Remove Items
				</button>
				<router-link to="/category/add" class="btn btn-success pull-right" style="margin-right:10px;">Add category</router-link>	
			</div>

			<div class="col-md-12">
			<div class="alert alert-danger" v-if="error">
					<span v-if="error.response.data.error === 'token_not_provided' ">
						<strong>Permission error!</strong> Your permission is not granted to make that request
					</span>
			</div>
			</div>
			
			<div class="col-md-12">
			<input  v-model="filterValue"
					@input = "resetCounter"
					type="text"
					style="margin-top:20px;margin-bottom:20px;" 
					class="form-control" 
					id="search" 
					placeholder="Search text...">
			</div>
			
			<div class="col-md-12">
				<div class="table-responsive">
					<table class="table">
						<thead>
							<th @click="sortBy(1)" class="col-md-1">Check</th>	
							<th @click="sortBy(1)" class="col-md-2">Index 
						<span v-if="sortKey==='cat_id' && sortOrder==='asc'" class="glyphicon glyphicon-arrow-down"></span>
						<span v-if="sortKey==='cat_id' && sortOrder==='desc'" class="glyphicon glyphicon-arrow-up"></span>
							</th>
							<th @click="sortBy(2)" class="col-md-3" >Name 
						<span v-if="sortKey==='cat_name' && sortOrder==='asc'" class="glyphicon glyphicon-arrow-down"></span>
						<span v-if="sortKey==='cat_name' && sortOrder==='desc'" class="glyphicon glyphicon-arrow-up"></span>
							</th>
							<th @click="sortBy(3)" class="col-md-5" >Description 
						<span v-if="sortKey==='cat_desc' && sortOrder==='asc'" class="glyphicon glyphicon-arrow-down"></span>
						<span v-if="sortKey==='cat_desc' && sortOrder==='desc'" class="glyphicon glyphicon-arrow-up"></span>
							</th>
							<th class="col-md-1">Action</th>
						</thead>
						<tbody>
							<tr v-for="category in paginatedData">
								<td><input type="checkbox" name="catchecks" :value="category.cat_id"/></td>
								<td>{{category.cat_id}}</td>
								<td>{{category.cat_name}}</td>
								<td>{{category.cat_desc}}</td>
								<td><router-link :to="`/category/edit/${category.cat_id}`"><span class="glyphicon glyphicon-edit"></span></router-link></td>
							</tr>
						</tbody>
					</table>
					<button @click="prevPage">
    					Previous
  					</button>
  					<button @click="nextPage">
    				Next
  					</button>
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import VueLodash from 'vue-lodash'

	export default {
		name:'category-index',
		data () {
			return {
				filterValue:'',
				sortKey : 'cat_id',
				sortOrder : 'asc',
				pageNumber: 0,
				size:10,
			
				// https://medium.com/@denny.headrick/pagination-in-vue-js-4bfce47e573b
			}
		},
		computed : {
			filterAndSortedData() 
			{
				let result = this.$store.state.category.categoriesList.categories.slice();
				if(this.filterValue){
					result = result.filter(item=>item.cat_name.includes(this.filterValue));
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
			error()
			{
				return this.$store.state.category.deletedCategories.error	
			}
			
		},
		mounted(){
			 this.$store.commit('category/RESET_REMOVE_CATEGORIES');
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
				sortBy(key)
				{
					this.sortOrder == 'asc'? this.sortOrder = 'desc' : this.sortOrder = 'asc';
					if(key==1) this.sortKey = 'cat_id';
					if(key==2) this.sortKey = 'cat_name';
					if(key==3) this.sortKey = 'cat_desc';
				},

				getCheckedBoxes(chkboxName) {
					var checkboxes = document.getElementsByName(chkboxName);
					var checkboxesChecked = [];

					for (var i=0; i<checkboxes.length; i++) {
						if (checkboxes[i].checked) {
							checkboxesChecked.push(checkboxes[i].value);
						}
					}
					return checkboxesChecked.length > 0 ? checkboxesChecked : null;
				},

				removeCategory() {
					var result = confirm("Want to delete?");
					if (result) {
						var checkedBoxes = this.getCheckedBoxes("catchecks");
						if(checkedBoxes) this.$store.dispatch('category/removeCategories', {checkedBoxes})
						else window.alert('Nothing selected');
					}
				},
			},	

		}
	</script>