<template>
  <div id="app">
    <titlebar />
    <List />
  </div>
</template>

<script>
import store from "./store";
import titlebar from "./components/titlebar.vue";
import List from "./components/List.vue";

export default {
  name: "app",
  components: {
    titlebar,
    List
  },
  data() {
    // console.log(store);
    return {};
  },
  created(){
    // console.log(store);
    store.dispatch("member/checkuser").then((data)=>{
      console.log(data);
    });
    // store.dispatch("")
  },
  
};
</script>
