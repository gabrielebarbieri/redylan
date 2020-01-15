<template>
  <el-col>
    <el-row class="verse-row" v-for="g in generators" :key="g">
      <metrics-generator></metrics-generator>
    </el-row>
    <el-row>
      <el-button icon="el-icon-edit" @click="addGenerator"> Create a new Verse</el-button>
    </el-row>
  </el-col>
</template>

<style>
  .verse-row {
    margin-bottom: 20px;
  }
</style>

<script>
import MetricsGenerator from '@/components/MetricsGenerator'
export default {
  name: 'metrics',
  data () {
    return {
      generators: []
    }
  },
  components: {
    'metrics-generator': MetricsGenerator
  },
  methods: {
    addGenerator: function () {
      this.generators.push(this.generators.length)
    }
  }
}
</script>
