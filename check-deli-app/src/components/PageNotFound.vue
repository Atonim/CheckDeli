<template>
  <div class="not-found">
    <h2>404</h2>
    <p>Страница не найдена :(</p>
  </div>
</template>

<script>
export default {
  data(){
    return
  }
}
</script>

<style lang="scss">
.not-found {
  color: #FFBD00;
  text-align:center;
  h2 {
    font-size: 60px;
    animation: grow 1s ease-in-out infinite alternate;
  }
  p {
    font-size: 18px;
  }
}

@keyframes grow {
    0% {
        transform: scale(1.0);
    }
    100% {
        transform: scale(1.5);
    }
}
</style>