<template>
	<div>
		<h1>How it works ?</h1>
		<p>This page is under construction</p>
		<iframe width="560" height="315" src="https://www.youtube.com/embed/1rdE_0mHjjQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
		<generator></generator>
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