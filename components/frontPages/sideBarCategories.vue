<template>
	<div class="panel panel-info">
			<div class="panel-heading">Book category</div>
				<div class="panel-body" >
				<span v-for="category in categories" style="padding-bottom: 5px; display: block;">	
				<router-link :to="`/language/edit/${category.cat_id}`">
					{{category.cat_name}}
				</router-link>
			</span>
				<!-- <Link to={{pathname:'/frontpage' , query:{catid:category.cat_id, lngid:this.props.lngid} }}>
				{this.props.catid==category.cat_id ? (<b>{category.cat_name}</b>): category.cat_name }
				</Link>
				 -->
				 </div>
			</div>
</template>

<script>
export default {
	name:'Hello',
	data () {
		return {
			msg :'This is home page'
		}
	},
	computed : {
		categories(){
			return this.$store.state.category.categoriesList.categories.slice();
		}
	}
}
</script>