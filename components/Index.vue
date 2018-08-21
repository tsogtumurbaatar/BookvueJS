<template>
	<div class="row">
		<div class="col-md-3">
			<sideBarCategories></sideBarCategories>
		</div>
		<div class="col-md-9">
			<frontPageBooks></frontPageBooks>
		</div>

	</div>
</template>

<script>
	import frontPageBooks from './frontPages/frontPageBooks'
	import sideBarCategories from './frontPages/sideBarCategories'


	export default {
		name:'Hello',
		data () {
			return {
				msg :'This is home page'
			}
		},
		components : {
			frontPageBooks : frontPageBooks,
			sideBarCategories : sideBarCategories
		},


	}
</script>