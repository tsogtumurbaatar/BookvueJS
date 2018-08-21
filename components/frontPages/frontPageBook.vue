<template>
	<div class="col-md-4" style="padding-bottom:25px; height:280px;">
		<div class="col-md-12">
			<router-link :to="`/frontpage/${book.book_id}`">
				<img :src="book.book_img1" width="150px" height="200px"/>	
			</router-link>
		</div>
		<div class="col-md-12">
			<router-link :to="`/frontpage/${book.book_id}`"> {{book.book_name}} </router-link>
		</div>
		<div class="col-md-12">
			<span v-if="book.book_point>=0 && book.book_point <=0.50" style="color:#FFA500;"><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span></span>

			<span v-if="book.book_point>=0.51 && book.book_point <=1.50"style="color:#FFA500;"><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span></span>

			<span v-if="book.book_point>=1.51 && book.book_point <=2.50" style="color:#FFA500;"><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span></span>

			<span v-if="book.book_point>=2.51 && book.book_point <=3.50" style="color:#FFA500;"><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span><span class="glyphicon glyphicon-star-empty"></span></span>

			<span v-if="book.book_point>=3.51 && book.book_point <=4.50" style="color:#FFA500;"><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star-empty"></span></span>

			<span v-if="book.book_point>=4.51 && book.book_point <=5.50" style="color:#FFA500;"><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span><span class="glyphicon glyphicon-star"></span></span>

			&nbsp;&nbsp;<small>({{book.book_review_count}} reviews)</small>
		</div>
	</div>
</template>

<script>
	export default {
		name:'frontPageBook',
		data () {
			return {

			}
		},
		props :['book', 'index']
	}
</script>
