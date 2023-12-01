<script>
import StartCard from "@/components/StartCard.vue";
export default {
  components: {
    StartCard,
  },
};
</script>

<template>
  <div class="container">
    <StartCard />
  </div>
</template>

<style lang='scss'>
@import "@/scss/container.scss";
.container {
  align-items: center;
}
</style>