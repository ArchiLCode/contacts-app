<template>
  <div id="app">
    <ContactsList />
  </div>
</template>

<script>
import ContactsList from './components/ContactsList.vue'

export default {
  components: {
    ContactsList,
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Gilroy;
}

#app {
  background-color: #edf6f9;
}
</style>
