<template>
  <el-container id="app">
    <el-header style="height: auto;">
        <a href="#/" v-on:click="handleSelect('/', '/')" style="padding-top: 0px; padding-bottom: 0px;">
          <img src="./assets/logo.png" height="64px;" width="64px;" align="center">
        </a>
        <a v-bind:class="{ active: isActive('/') }" href="#/" v-on:click="handleSelect('/', '/')">SONG GENERATOR</a>
        <a v-bind:class="{ active: isActive('/how-it-works/') }" href="#/how-it-works/" v-on:click="handleSelect('/how-it-works/', '/how-it-works/')">HOW IT WORKS</a>
        <a href="https://github.com/gabrielebarbieri/redylan"  target="blank" style="padding-top: 16px; padding-bottom: 16px;">
          <svg aria-hidden="true" class="octicon octicon-mark-github" height="32" version="1.1" viewBox="0 0 16 16" width="32"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
        </a>
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
    fill: #999999;
    text-align: center;
    padding: 23.5px 16px;
    text-decoration: none;
    font-size: 14px;
}
.el-header a:hover {
    color: #DDDDDD;
    fill: #DDDDDD;
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
