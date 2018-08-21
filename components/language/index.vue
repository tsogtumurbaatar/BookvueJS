<template>
	<div class="panel panel-primary">
		<div class="panel-heading">Language List</div>
		<div class="panel-body">
			<div class="col-md-12">
				<button @click="removeLanguage" class="btn btn-warning pull-right">
					Remove Items
				</button>
				<router-link to="/language/add" class="btn btn-success pull-right" style="margin-right:10px;">Add language</router-link>	
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
						<span v-if="sortKey==='lng_id' && sortOrder==='asc'" class="glyphicon glyphicon-arrow-down"></span>
						<span v-if="sortKey==='lng_id' && sortOrder==='desc'" class="glyphicon glyphicon-arrow-up"></span>
							</th>
							<th @click="sortBy(2)" class="col-md-3" >Name 
						<span v-if="sortKey==='lng_name' && sortOrder==='asc'" class="glyphicon glyphicon-arrow-down"></span>
						<span v-if="sortKey==='lng_name' && sortOrder==='desc'" class="glyphicon glyphicon-arrow-up"></span>
							</th>
							<th @click="sortBy(3)" class="col-md-5" >Description 
						<span v-if="sortKey==='lng_desc' && sortOrder==='asc'" class="glyphicon glyphicon-arrow-down"></span>
						<span v-if="sortKey==='lng_desc' && sortOrder==='desc'" class="glyphicon glyphicon-arrow-up"></span>
							</th>
							<th class="col-md-1">Action</th>
						</thead>
						<tbody>
							<tr v-for="language in paginatedData">
								<td><input type="checkbox" name="catchecks" :value="language.lng_id"/></td>
								<td>{{language.lng_id}}</td>
								<td>{{language.lng_name}}</td>
								<td>{{language.lng_desc}}</td>
								<td><router-link :to="`/language/edit/${language.lng_id}`"><span class="glyphicon glyphicon-edit"></span></router-link></td>
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
		name:'language-index',
		data () {
			return {
				filterValue:'',
				sortKey : 'lng_id',
				sortOrder : 'asc',
				pageNumber: 0,
				size:10,
			
				// https://medium.com/@denny.headrick/pagination-in-vue-js-4bfce47e573b
			}
		},
		computed : {
			filterAndSortedData() 
			{
				let result = this.$store.state.language.languagesList.languages.slice();
				if(this.filterValue){
					result = result.filter(item=>item.lng_name.includes(this.filterValue));
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
				return this.$store.state.language.deletedLanguages.error	
			}
			
		},
		mounted(){
			 this.$store.commit('language/RESET_REMOVE_LANGUAGES');
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
					if(key==1) this.sortKey = 'lng_id';
					if(key==2) this.sortKey = 'lng_name';
					if(key==3) this.sortKey = 'lng_desc';
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

				removeLanguage() {
					var result = confirm("Want to delete?");
					if (result) {
						var checkedBoxes = this.getCheckedBoxes("catchecks");
						if(checkedBoxes) this.$store.dispatch('language/removeLanguages', {checkedBoxes})
						else window.alert('Nothing selected');
					}
				},
			},	

		}
	</script>