<template>
           <el-autocomplete 
             class="inline-input" 
             v-bind:value="value"
             v-on:input="updateValue($event)"
             :fetch-suggestions="querySearch"
             placeholder="Search a theme..."
             @select="handleSelect"
             :trigger-on-focus="false"
           ></el-autocomplete>
</template>

<script>
  var perec = require('@/core/perec')
  var _ = require('lodash')
  export default {
    props: ['value'],
    data () {
      return {
        options: []
      }
    },
    methods: {
      querySearch (queryString, cb) {
        var results = queryString ? this.options.filter(this.createFilter(queryString)) : []
        // call callback function to return suggestions
        cb(_.take(results, 10))
      },
      createFilter (queryString) {
        return (word) => {
          return word.value.toLowerCase().includes(queryString.toLowerCase())
        }
      },
      updateValue: function (value) {
        this.$emit('input', value)
      },
      handleSelect (item) {
        console.log(item)
      }
    },
    mounted () {
      this.options = perec.words()
    }
  }
</script>