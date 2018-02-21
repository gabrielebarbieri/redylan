<template>
  <el-container id="app">
    <el-header style="height: auto;">
        <a href="#/" v-on:click="handleSelect('/', '/')" style="padding-top: 0px; padding-bottom: 0px;">
          <img src="./assets/logo.png" height="64px;" width="64px;" align="center">
        </a>
        <a v-bind:class="{ active: isActive('/') }" href="#/" v-on:click="handleSelect('/', '/')">SONG GENERATOR</a>
        <a v-bind:class="{ active: isActive('/how-it-works/') }" href="#/how-it-works/" v-on:click="handleSelect('/how-it-works/', '/how-it-works/')">HOW IT WORKS</a>
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
    },
    isActive (key) {
      console.log(this.activeIndex)
      console.log(key)
      return this.activeIndex === key
    }
  }
}
</script>

<style>
body, html {
  font-family: "Helvetica Neue",Helvetica, Arial,sans-serif;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  margin: auto;
}

.el-header ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}

.el-header {
    background-color: #333;
    overflow: hidden;
  }

.el-header a {
    float: left;
    color: #999999;
    text-align: center;
    padding: 23.5px 16px;
    text-decoration: none;
    font-size: 14px;
}
.el-header a:hover {
    color: #DDDDDD;
}
.el-header a.active {
    color: white;
}

.el-button {
  font-family: inherit;
  font-weight: bold;
}

input {
  font: inherit;
}

</style>
