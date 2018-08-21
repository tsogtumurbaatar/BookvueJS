<template>
	<div class="panel panel-primary">
		<div class="panel-heading">Language Add <span v-if="language"><b> - New language added</b></span></div>
		<div class="panel-body">
			
			<div v-if="loading">
				<h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/>  
			</div>

			<div v-else class="form-horizontal">
				<div class="alert alert-danger" v-if="error_local">
					<strong>Error occurred!</strong> Language name and Language description are empty!
				</div>
				<div class="alert alert-danger" v-if="error">
					<span v-if="error.response.data.error === 'token_not_provided' ">
						<strong>Permission error!</strong> Your permission is not granted to make that request
					</span>
				</div>

				<div class="form-group">
					<label class="control-label col-sm-4" for="email">Language Name:</label>
					<div class="col-sm-8">
						<input v-model="lng_name" type="text" class="form-control" id="email" placeholder="Language Name">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-4" for="email">Language Description:</label>
					<div class="col-sm-8">
						<input v-model="lng_desc" type="text" class="form-control" id="email" placeholder="Language Description">
					</div>
				</div>
				<router-link to="/language/" class="btn btn-warning pull-right">Back</router-link>	
				<button @click="addLanguage" class="btn btn-success pull-right" style="margin-right:10px;">
					Add Language
				</button>
			</div>

		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name:'language-add',
		data () {
			return {
				lng_name :'',
				lng_desc:'',
				error_local : 0
			}
		},
		computed : mapState({
			loading : state => state.language.newLanguage.loading,
			language : state => state.language.newLanguage.language,
			error : state => state.language.newLanguage.error
		}),
		methods:{
			addLanguage()
			{
				if((this.lng_name=='')||(this.lng_desc==''))
				{
					this.error_local = 1;
				}
				else
				{
					this.error_local = 0;

					var language = {
						lng_name : this.lng_name,
						lng_desc: this.lng_desc
					};

					this.$store.dispatch('language/addLanguage', language);
					this.lng_name = '';
					this.lng_desc = '';
				}
			}
		},
		created() {
			this.$store.commit('language/RESET_ADD_LANGUAGE');
		}	
	}
</script>