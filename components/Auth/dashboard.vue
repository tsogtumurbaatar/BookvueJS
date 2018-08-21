<template>
	<div class="col-md-12">
    <h1>Laravel 5 – Our Cool Dashboard - {{$auth.user().name}}</h1>
    <div class="form-group">
    	<input type="file" @change="onFileSelected" class="form-control" placeholder="Upload the Image" />
   		<button @click="onUpload"></button>
    </div>
    </div>	
</template>

<script>
export default{
	name:'dashboard',
	data() {
		return {
			selectedFile : null
		}
	},
	methods :{
		onFileSelected(event){
			this.selectedFile = event.target.files[0];
		},
		onUpload(){
			// https://www.youtube.com/watch?v=VqnJwh6E9ak
		}
	}
}

</script>