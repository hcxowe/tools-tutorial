<template>
  <div id="app">
    <TableScroll />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TableScroll from './components/TableScroll'

export default {
  name: 'app',
  components: {
    HelloWorld,
    TableScroll
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
