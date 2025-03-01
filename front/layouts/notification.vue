<template>
  <div class="notification_container">
    <transition-group name="fade" tag="div">
      <div
        v-for="(notif, index) in notifications"
        :key="notif.id"
        class="notification"
        :style="{ backgroundColor: notificationColors[notif.type] }"
      >
        <div class="notification_text">
          {{ notif.text }}
        </div>
        <div
          class="notification_timer"
          :style="{
            width:
              ((notificationDuration - (currentTime - notif.timeCreate)) /
                notificationDuration) *
                100 +
              '%',
          }"
        ></div>
      </div>
    </transition-group>
  </div>
  <slot></slot>
</template>

<script setup>
const notifications = ref([]);
const notificationLimit = 5;
const notificationDuration = 5000;

const currentTime = ref(Date.now());
const notificationColors = {
  success: "green",
  warn: "yellow",
  error: "red",
  info: "gray",
};

function createNotification(text, type) {
  if (notifications.value.length >= notificationLimit) {
    notifications.value.shift();
  }

  const id = Date.now();
  const notification = {
    id,
    text,
    type,
    timeCreate: Date.now(),
  };

  notifications.value.push(notification);

  setTimeout(() => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
  }, notificationDuration);
}

const interval = setInterval(() => {
  currentTime.value = Date.now();
}, 50);

provide("createNotification", createNotification);
</script>

<style scoped>
.notification_container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  max-width: 500px;
}

.notification {
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  color: white;
  position: relative;
  animation: slide-in 0.5s ease;
}

.notification_timer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.5);
  transition: width 0.1s linear;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

@keyframes slide-in {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
@media (max-width: 768px) {
  .notification_container {
    max-width: 300px;
  }
}
</style>
