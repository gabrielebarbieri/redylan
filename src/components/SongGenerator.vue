<template>
	<div>
		<h1>Generate a song in the style of Bob Dylan</h1>
    <el-select v-model="scheme" placeholder="Song structure">
      <el-option
        v-for="rhyme in rhymes"
        :key="rhyme.value"
        :label="rhyme.label + ' (' + rhyme.value + ')'"
        :value="rhyme.value">
      </el-option>
    </el-select>
    <el-row><search v-for="s in senses" :key="s.rhyme" v-model="s.sense"></search></el-row>
		<el-button type="primary" v-on:click="generateSong" :loading="isGenerating">Generate Song</el-button>
    <p>
		  <div v-for="verse in verses">{{verse}}<br></div>
    </p>
	</div>
</template>

<script>
  import {songWorker} from '@/core/workerclient'
  import rhymeSchemes from '@/core/rhyme_schemes'
  import Search from '@/components/Search'
  import _ from 'lodash'
  export default {
    name: 'song-generator',
    data () {
      return {
        verses: [],
        isGenerating: false,
        rhymes: rhymeSchemes,
        scheme: '',
        senses: {}
      }
    },
    watch: {
      scheme: function (newScheme, oldScheme) {
        if (newScheme === oldScheme) return
        var uniqueRhymes = _.filter(_.uniq(_.split(this.scheme, '')), c => c !== ' ')
        this.senses = _.map(uniqueRhymes, r => ({'rhyme': r, 'sense': ''}))
      }
    },
    methods: {
      generateSong: function () {
        var vm = this
        vm.isGenerating = true
        vm.clean()
        var senses = _.filter(_.map(vm.senses, s => s.sense), s => s !== '')
        songWorker.generate(senses, vm.scheme, vm.addVerse, vm.songGenerated)
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
    },
    components: {
      'search': Search
    }
}
</script>