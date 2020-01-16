<template>
  <el-row type="flex" align="middle">
    <el-col :span="4">
      <el-dialog
        title=""
        :visible.sync="visible"
        width="75%"
        :before-close="handleClose">
        <el-form :inline="true" size="mini">
          <el-form-item label="Seed word ">
            <el-input placeholder="Enter a word" v-model="seedWord"></el-input>
          </el-form-item>
          <el-form-item label="Total syllables ">
            <el-input-number v-model="nOfSyllables" :min="1" :max="13"></el-input-number>
          </el-form-item>
          <el-form-item label="Corpus">
            <el-select placeholder="Corpus" v-model="corpus">
              <el-option v-for="item in corpusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-table :data="versesData" height="275" style="width: 100%" size="mini" v-loading="isGenerating">
          <el-table-column :label="tableTitle">
            <template slot-scope="scope">
              <el-button type="text" @click="handleSelectedVerse(scope.row.value)">{{scope.row.value}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="" width="120">
            <template slot-scope="scope">
              <el-popover trigger="click" placement="top">
                <p>Seed Word: {{scope.row.seed}}</p>
                <p>Total syllables: {{scope.row.syllables}}</p>
                <p>Corpus: {{getCorpusLabel(scope.row.corpus)}}</p>
                <el-button size="mini" icon="el-icon-info" slot="reference"></el-button>
              </el-popover>
              <el-button size="mini" @click="handleRowClear(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="clearAllVerses()" v-bind:disabled="isGenerating">Clear All</el-button>
          <el-button type="primary" @click="generate()" v-bind:disabled="isGenerating || !seedWord">{{buttonLabel}}</el-button>
        </span>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
import {metricWorker} from '@/core/workerclient'
export default {
  name: 'metrics-generator',
  data () {
    return {
      versesData: [],
      verses: new Set(),
      isGenerating: false,
      nOfSyllables: 5,
      seedWord: 'dance',
      value: '',
      corpus: 'poetry',
      corpusOptions: [{value: 'poetry', label: 'Old Poetry'}, {value: 'dylan', label: 'Bob Dylan'}]
    }
  },
  props: ['visible'],
  computed: {
    buttonLabel: function () {
      if (this.versesData.length === 0) {
        return 'Generate'
      }
      return 'Generate More'
    },
    tableTitle: function () {
      if (this.versesData.length === 0) {
        if (this.seedWord) {
          return 'Click on Generate to get some verses'
        }
        return 'Enter a word and click on Generate to get some verses'
      }
      var msg = 'Click on a verse to select it'
      if (this.versesData.length > 5) {
        msg += ' (you can scroll to see all of them)'
      }
      return msg
    }
  },
  methods: {
    generate () {
      var vm = this
      vm.isGenerating = true
      metricWorker.generate(vm.seedWord, vm.nOfSyllables, vm.addVerse, vm.verseGenerated, vm.handleError, vm.corpus)
    },
    addVerse: function (verse) {
      if (!this.verses.has(verse.value)) {
        this.versesData.unshift(verse)
        this.verses.add(verse.value)
      }
    },
    clearAllVerses () {
      this.versesData = []
      this.verses.clear()
    },
    verseGenerated: function () {
      this.isGenerating = false
    },
    handleError: function (error) {
      this.$message.error(error)
    },
    handleClose: function (done) {
      if (this.value) {
        done()
      } else {
        this.$confirm('You have not selected any verse. Are you sure to close this dialog?')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    },
    handleRowClear: function (index, row) {
      this.versesData.splice(index, 1)
      this.verses.delete(row.value)
    },
    handleSelectedVerse: function (value) {
      if (value) {
        this.value = value
        this.$emit('input', value)
        this.$emit('update:visible', false)
        // this.visible = false
        this.done()
      }
    },
    getCorpusLabel: function (corpus) {
      if (corpus === 'dylan') {
        return 'Bob Dylan'
      }
      if (corpus === 'poetry') {
        return 'Old Poetry'
      }
    }
  }
}
</script>
