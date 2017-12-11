<template>
  <el-container id="app">
    <!-- <el-header>Header</el-header> -->
    <el-main>
      <el-row>
        <el-col :span="24"><img src="./assets/logo.png"></el-col>
      </el-row>
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
}
</style>
