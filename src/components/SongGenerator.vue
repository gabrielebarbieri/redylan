<template>
	<div>
		<h1>Generate a song in the style of Bob Dylan</h1>
		<el-button type="primary" v-on:click="generateSong">Generate Song</el-button>
    <p>
		  <div v-for="verse in verses">{{verse}}<br></div>
    </p>
	</div>
</template>

<script>
  import worker from '@/core/workerclient'
  export default {
    name: 'song-generator',
    data () {
      return {
        verses: []
      }
    },
    methods: {
      generateSong: function () {
        var vm = this
        vm.clean()
        worker.generateSong(vm.addVerse, vm.songGenerated)
      },
      addVerse: function (verse) {
        this.verses.push(verse)
      },
      clean: function () {
        this.verses = []
      },
      songGenerated: function () {
        console.log('Song generated')
      }
    }
}
</script>