<template>
	<div>
		<h1>Generate a song in the style of Bob Dylan</h1>
		<el-button type="primary" v-on:click="generateSong">Generate Song</el-button>
	</div>
</template>

<script>
  import worker from '@/core/workerclient'
  export default {
    name: 'song-generator',
    data () {
      return {}
    },
    methods: {
      generateSong: function () {
        worker.generateSong(console.log)
      }
    }
}
</script>