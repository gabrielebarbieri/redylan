<template>
	<div>
		<h1>Generate a song in the style of Bob Dylan</h1>
		<el-button type="primary" v-on:click="generateSong" :loading="isGenerating">Generate Song</el-button>
    <p>
		  <div v-for="verse in verses">{{verse}}<br></div>
    </p>
	</div>
</template>

<script>
  import {songWorker} from '@/core/workerclient'
  console.log(songWorker)
  export default {
    name: 'song-generator',
    data () {
      return {
        verses: [],
        isGenerating: false
      }
    },
    methods: {
      generateSong: function () {
        var vm = this
        vm.isGenerating = true
        vm.clean()
        songWorker.generate(vm.addVerse, vm.songGenerated)
      },
      addVerse: function (verse) {
        this.verses.push(verse)
      },
      clean: function () {
        this.verses = []
      },
      songGenerated: function () {
        this.isGenerating = false
      }
    }
}
</script>