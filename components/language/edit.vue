<template>
	<div class="panel panel-primary">
		<div class="panel-heading">Language Edit <span v-if="aCat.updated"><b> - The language is changed</b></span></div>
		<div class="panel-body">
			
			<div v-if="aCat.loading">
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
						<input  v-model="lng_name" 
						@input="update('lng_name', $event)"
						type="text" 
						class="form-control" 
						id="email" 
						placeholder="Language Name">
					</div>
				</div>
				<div class="form-group">
					<label class="control-label col-sm-4" for="email">Language Description:</label>
					<div class="col-sm-8">
						<input  v-model="lng_desc"
						@input="update('lng_desc', $event)"
						type="text" 
						class="form-control" 
						id="email" 
						placeholder="Language Description">
					</div>
				</div>
				<router-link to="/language/" class="btn btn-warning pull-right">Back</router-link>	
				<button @click="saveLanguage" class="btn btn-success pull-right" style="margin-right:10px;">
					Save Language
				</button>
			</div>

		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name:'language-edit',
		data () {
			return {
				error_local : 0,
				lng_name : '',
				lng_desc : '',
			}
		},
		computed : {
			aCat() {
				if(this.$store.state.language.activeLanguage.language){
					this.lng_name  = this.$store.state.language.activeLanguage.language.lng_name
					this.lng_desc = this.$store.state.language.activeLanguage.language.lng_desc
				}
				return this.$store.state.language.activeLanguage
			},
			error()
			{
				return this.$store.state.language.activeLanguage.error	
			}

		},

		methods:{
			update (key, event) {
				switch(key){
					case 'lng_name' : {this.lng_name = event.target.value; break;}
					case 'lng_desc' : {this.lng_desc = event.target.value; break;}	
					default: break;
				}
			},
			saveLanguage()
			{
				if((this.lng_name=='')||(this.lng_desc==''))
				{
					this.error_local = 1;
				}
				else
				{
					this.error_local = 0;
					var language = {
						lng_id : this.$route.params.lng_id,
						lng_name : this.lng_name,
						lng_desc: this.lng_desc
					};

					this.$store.dispatch('language/saveLanguage', language);
				}
			}
		},
		created() {
			this.$store.dispatch('language/getLanguageByID', this.$route.params.lng_id)
		}	
	}
</script>