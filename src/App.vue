<template>
  <div id="app">
    <Toolbar />
  </div>
</template>

<script>
import Toolbar from './components/ToolbarComponent.vue';

export default {
  components: {
    Toolbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
