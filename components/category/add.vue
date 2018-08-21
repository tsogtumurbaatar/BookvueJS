<template>
	<div class="panel panel-primary">
		<div class="panel-heading">Category Add <span v-if="category"><b> - New category added</b></span></div>
		<div class="panel-body">
			
			<div v-if="loading">
				<h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/>  
			</div>

			<div v-else class="form-horizontal">
				<div class="alert alert-danger" v-if="error_local">
					<strong>Error occurred!</strong> Category name and Category description are empty!
				</div>
				<div class="alert alert-danger" v-if="error">
					<span v-if="error.response.data.error === 'token_not_provided' ">
						<strong>Permission error!</strong> Your permission is not granted to make that request
					</span>
				</div>

				<div class="form-group">
					<label class="control-label col-sm-4" for="email">Category Name:</label>
					<div class="col-sm-8">
						<input v-model="cat_name" type="text" class="form-control" id="email" placeholder="Category Name">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-4" for="email">Category Description:</label>
					<div class="col-sm-8">
						<input v-model="cat_desc" type="text" class="form-control" id="email" placeholder="Category Description">
					</div>
				</div>
				<router-link to="/category/" class="btn btn-warning pull-right">Back</router-link>	
				<button @click="addCategory" class="btn btn-success pull-right" style="margin-right:10px;">
					Add Category
				</button>
			</div>

		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name:'category-add',
		data () {
			return {
				cat_name :'',
				cat_desc:'',
				error_local : 0
			}
		},
		computed : mapState({
			loading : state => state.category.newCategory.loading,
			category : state => state.category.newCategory.category,
			error : state => state.category.newCategory.error
		}),
		methods:{
			addCategory()
			{
				if((this.cat_name=='')||(this.cat_desc==''))
				{
					this.error_local = 1;
				}
				else
				{
					this.error_local = 0;

					var category = {
						cat_name : this.cat_name,
						cat_desc: this.cat_desc
					};

					this.$store.dispatch('category/addCategory', category);
					this.cat_name = '';
					this.cat_desc = '';
				}
			}
		},
		created() {
			this.$store.commit('category/RESET_ADD_CATEGORY');
		}	
	}
</script>