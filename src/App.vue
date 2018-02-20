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
  font-family: "Helvetica Neue",Helvetica, Arial,sans-serif;
  font-weight: 700;
  /*font-size: 12px;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  margin: auto;
}
.el-header {
    color: #F2F6FC;
    line-height: 64px;
  }

.el-menu {
  border-bottom: none;
}

.el-button {
  font-family: inherit;
  font-weight: bold;
  /*font-size: 12px;*/
}

input {
  font: inherit;
}

/*// Background color

31396E -> 0D142A

/// */

</style>
