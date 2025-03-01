<template>
  <Theme />
  <Notification>
    <div class="fwh main_div">
      <Header />
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </Notification>
</template>

<script setup>
import Notification from "./notification.vue";
import Header from "./header.vue";
import Theme from "./theme.vue";
</script>

<style scoped>
.main_div {
  background: var(--bg-color);
  width: 100%;
  min-height: 100vh;
}
.content {
  padding: 30px 100px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

@media (max-width: 1000px) {
  .content {
    padding: 30px 30px;
  }
}
</style>
