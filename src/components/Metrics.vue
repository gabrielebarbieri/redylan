<template>
  <!-- <div>Metrics Page</div> -->
  <el-row>
    <el-col :span="10">
      <el-form label-width="120px" label-position="top">
        <el-form-item label="N OF SYLLABLES">
          <el-input-number v-model="nOfSyllables" @change="handleChange" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="SEED WORD">
          <el-input placeholder="Please input" v-model="seedWord"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"
            v-on:click="generate"
            :loading="isGenerating"
            v-bind:disabled="seedWord==false"
            round
            >GENERATE</el-button>
        </el-form-item>
      </el-form>
      <div><p>{{verse}}</p></div>
    </el-col>
  </el-row>
</template>

<script>
import {metricWorker} from '@/core/workerclient'
export default {
  name: 'metrics',
  data () {
    return {
      isGenerating: false,
      nOfSyllables: 5,
      seedWord: 'dance',
      verse: ''
    }
  },
  methods: {
    handleChange (value) {
    },
    generate () {
      var vm = this
      vm.isGenerating = true
      metricWorker.generate(vm.seedWord, vm.nOfSyllables, vm.displayVerse, vm.verseGenerated)
    },
    displayVerse: function (verse) {
      this.verse = verse
      this.isGenerating = false
    },
    verseGenerated: function () {
      this.isGenerating = false
    }

  }
}
</script>
