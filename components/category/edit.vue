<template>
	<div class="panel panel-primary">
		<div class="panel-heading">Category Edit <span v-if="aCat.updated"><b> - The category is changed</b></span></div>
		<div class="panel-body">
			
			<div v-if="aCat.loading">
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
						<input  v-model="cat_name" 
						@input="update('cat_name', $event)"
						type="text" 
						class="form-control" 
						id="email" 
						placeholder="Category Name">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-4" for="email">Category Description:</label>
					<div class="col-sm-8">
						<input  v-model="cat_desc"
						@input="update('cat_desc', $event)"
						type="text" 
						class="form-control" 
						id="email" 
						placeholder="Category Description">
					</div>
				</div>
				<router-link to="/category/" class="btn btn-warning pull-right">Back</router-link>	
				<button @click="saveCategory" class="btn btn-success pull-right" style="margin-right:10px;">
					Save Category
				</button>
			</div>

		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name:'category-edit',
		data () {
			return {
				error_local : 0,
				cat_name : '',
				cat_desc : '',
			}
		},
		computed : {
			aCat() {
				if(this.$store.state.category.activeCategory.category){
					this.cat_name  = this.$store.state.category.activeCategory.category.cat_name
					this.cat_desc = this.$store.state.category.activeCategory.category.cat_desc
				}
				return this.$store.state.category.activeCategory
			},
			error()
			{
				return this.$store.state.category.activeCategory.error	
			}

		},

		methods:{
			update (key, event) {
				switch(key){
					case 'cat_name' : {this.cat_name = event.target.value; break;}
					case 'cat_desc' : {this.cat_desc = event.target.value; break;}	
					default: break;
				}
			},
			saveCategory()
			{
				if((this.cat_name=='')||(this.cat_desc==''))
				{
					this.error_local = 1;
				}
				else
				{
					this.error_local = 0;
					var category = {
						cat_id : this.$route.params.cat_id,
						cat_name : this.cat_name,
						cat_desc: this.cat_desc
					};

					this.$store.dispatch('category/saveCategory', category);
				}
			}
		},
		created() {
			this.$store.dispatch('category/getCategoryByID', this.$route.params.cat_id)
		}	
	}
</script>