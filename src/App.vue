<template>
  <el-container id="app">
    <el-header>
      <el-row type="flex">
        <el-col :span="2">
          <a href="#/" v-on:click="handleSelect('/', '/')">
            <img src="./assets/logo.png" height="64px;" width="64px;" align="center">
          </a>
        </el-col>
        <el-col>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
        <el-menu-item index="/">Song generator</el-menu-item>
        <el-menu-item index="/how-it-works/">How it works</el-menu-item>
      </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24"><router-view></router-view></el-col>
      </el-row>
    </el-main>
  </el-container>

</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      activeIndex: '/'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(this.activeIndex)
      this.activeIndex = key
      console.log(this.activeIndex)
    }
  }
}
</script>

<style>
body, html {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: "Helvetica Neue",Helvetica, Arial,sans-serif;
  /*font-family: 'Roboto Condensed', sans-serif;*/
  /*font-family: 'Indie Flower', cursive;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  margin: auto;
}
.el-header {
    /*background-color: #303133;*/
    color: #F2F6FC;
    /*text-align: center;*/
    line-height: 64px;
  }

.el-menu {
  border-bottom: none;
}

.el-button {
  font-family: inherit;
}

input {
  font-family: inherit;
}

/*// Adobe CC Color scheme

4D6973
F4EFDE
C0AE91 / 403A30
BC7637
8C4D22

/// */

</style>
