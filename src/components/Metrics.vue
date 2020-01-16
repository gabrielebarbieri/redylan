<template>
<el-col>
  <el-row type="flex">
    <el-col :span="14">
      <el-card v-if="generators.length > 0" :body-style="{ padding: '0px' }">
        <div style="padding: 14px;">
          <el-row v-for="(g, index) in generators" :key="index" style="padding: 5px;" type="flex">
            <metrics-generator :visible.sync="g.visible" v-model="g.verse"></metrics-generator>
              <el-col :span="2" class="edit-button-col"><el-button style="padding: 5px;" @click="g.visible=true" icon="el-icon-edit" size="mini"></el-button></el-col>
              <el-col :span="12">{{g.verse}}</el-col>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>

  <el-row type="flex" style="padding: 14px;">
    <el-button @click="addGenerator" type="primary"> CREATE A NEW VERSE</el-button>
  </el-row>
</el-col>
</template>

<style>
  .edit-button-col {
    display: flex;
    align-items: center;
    justify-content: center;
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
      this.generators.push({visible: true, verse: ''})
    }
  }
}
</script>
