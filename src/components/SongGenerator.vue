<template>
	<div>
    <el-row>
      <el-col :span="12">
        <h1>Generate a song in the style of Bob Dylan</h1>
        Choose the structure of your song: <el-select v-model="scheme" placeholder="Song structure">
          <el-option
            v-for="rhyme in rhymes"
            :key="rhyme.value"
            :label="rhyme.label + ' (' + rhyme.value + ')'"
            :value="rhyme.value">
          </el-option>
        </el-select>
        <el-row>
          <span v-if="senses.length">Choose up to {{senses.length}} themes for your song:</span>
          <search v-for="s in senses" :key="s.rhyme" v-model="s.sense"></search>
        </el-row>
        <el-button type="primary" v-on:click="generateSong" :loading="isGenerating">Generate Song</el-button>
      </el-col>
      <el-col :span="8">
        <el-card v-if="displaySong" :body-style="{ padding: '0px' }">
          <img v-bind:src="songImage" class="image">
          <div style="padding: 14px;">
            <h3>{{title}}</h3>
            <p><div v-for="verse in verses">{{verse}}<br></div></p>
          </div>
        </el-card>
      </el-col>
    </el-row>
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
        displaySong: false,
        songImage: '',
        rhymes: rhymeSchemes,
        scheme: '',
        title: '',
        senses: []
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
      getSongImageUrl: function (senses) {
        if (senses.length > 0) {
          return 'https://source.unsplash.com/320x180/?' + senses[0]
        }
        return 'https://source.unsplash.com/320x180/?music'
      },
      generateSong: function () {
        var vm = this
        vm.isGenerating = true
        vm.displaySong = true
        vm.clean()
        var senses = _.filter(_.map(vm.senses, s => s.sense), s => s !== '')
        vm.songImage = vm.getSongImageUrl(senses)

        if (senses.length === 1) {
          vm.title = _.capitalize(senses[0])
        } else if (senses.length > 1) {
          vm.title = _.capitalize(_.join(_.initial(senses), ', ') + ' and ' + _.last(senses))
        }

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

<style>
.image {
    width: 100%;
    display: block;
  }
</style>

