<template>
  <el-container id="app">
    <el-header>Home</el-header>
    <el-main>
      <!-- <el-row>
        <el-col :span="24"><img src="./assets/logo.png"></el-col>
      </el-row> -->
      <el-row>
        <el-col :span="24"><router-view></router-view></el-col>
      </el-row>
    </el-main>
  </el-container>

</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body, html {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: "Helvetica Neue",Helvetica, Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  margin: auto;
}
.el-header {
    background-color: #303133;
    color: #F2F6FC;
    /*text-align: center;*/
    line-height: 60px;
  }

/*// Adobe CC Color scheme

4D6973
F4EFDE
C0AE91 / 403A30
BC7637
8C4D22

/// */

</style>
