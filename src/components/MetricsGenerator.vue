<template>
  <el-row type="flex" align="middle">
    <el-col :span="4">

      <el-button type="primary" @click="dialogVisible = true" icon="el-icon-edit" circle size="small"></el-button>
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="60%"
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
        <el-table :data="versesData" height="250" style="width: 100%" size="mini" v-loading="isGenerating">
          <el-table-column :label="tableTitle">
            <template slot-scope="scope">
              <el-button type="text" @click="handleSelectedVerse(scope.row.value)">{{scope.row.value}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="" width="100">
            <template slot-scope="scope">
              <el-row type="flex" justify="end">
                <el-button size="mini" @click="handleRowClear(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="clearAllVerses()" v-bind:disabled="isGenerating">Clear All</el-button>
          <el-button type="primary" @click="generate()" v-bind:disabled="isGenerating || !seedWord">{{buttonLabel}}</el-button>
        </span>
      </el-dialog>
    </el-col>
    <el-col :span="12"><div>{{verse}}</div></el-col>
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
      seedWord: '',
      dialogVisible: true,
      verse: '',
      corpus: 'poetry',
      corpusOptions: [{value: 'poetry', label: 'Old Poetry'}, {value: 'dylan', label: 'Bob Dylan'}]
    }
  },
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
      return 'Click on a verse to select it'
    }
  },
  methods: {
    generate () {
      var vm = this
      vm.isGenerating = true
      metricWorker.generate(vm.seedWord, vm.nOfSyllables, vm.addVerse, vm.verseGenerated, vm.handleError, vm.corpus)
    },
    addVerse: function (verse) {
      if (!this.verses.has(verse)) {
        this.versesData.unshift({'value': verse})
        this.verses.add(verse)
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
      if (this.verse) {
        done()
      }
    },
    handleRowClear: function (index, row) {
      this.versesData.splice(index, 1)
      this.verses.delete(row.value)
    },
    handleSelectedVerse: function (value) {
      if (value) {
        this.dialogVisible = false
        this.verse = value
      }
    }
  }
}
</script>
