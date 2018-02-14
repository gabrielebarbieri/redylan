<template>
	<div>
		<h1>How it works ?</h1>
		An exemple
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