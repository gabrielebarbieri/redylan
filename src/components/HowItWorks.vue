<template>
	<div class="gb-content">
		<h1>How it works ?</h1>
		<p>Intro: history and brief description of the project</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non gravida turpis. Sed et leo eros. Maecenas at justo interdum mauris consectetur pulvinar non eu purus. Duis et nisi mollis, tempor neque at, luctus tortor. Aliquam quis scelerisque ipsum. Fusce nisl nibh, molestie vitae dapibus sit amet, gravida varius augue. Nunc a mi congue, accumsan eros ut, blandit ipsum. Nunc vehicula fermentum est sit amet blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent ac lectus at velit interdum laoreet. Morbi luctus lorem in velit tincidunt, ac luctus nisl ornare. Aliquam non urna porttitor, mollis eros sit amet, luctus odio.<p>
		<p>Relation with RNN</p>
		<p>Crash Course on Contrained Markov process</p>
		<generator></generator>
		<p>Citation</p>
		<p>Perec Video</p>
		<p>Relation with Flow Machines</p>
		<iframe width="560" height="315" src="https://www.youtube.com/embed/1rdE_0mHjjQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
		<p>SKYGGE</p>
		
	</div>
</template>

<script>
	import Generator from '@/components/VerseGenerator'
	export default {
	  name: 'how-it-works',
	  data () {
	    return {}
	  },
	  components: {
    'generator': Generator
	  }
	}
</script>

<style>
	.gb-content {
		font-weight: 200;
		text-align: justify;
	}
</style>