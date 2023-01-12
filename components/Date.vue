<template>
  <div>
    {{ dateStr }}
  </div>
</template>

<style lang="scss" scoped>
.post-card {
  margin-bottom: 8px;
}
</style>

<script setup lang="ts">
type Props = { date: string };
const { date } = defineProps<Props>();
const dateDate = new Date(date);
const dateStr = String(dateDate.getFullYear())
  + '/' + String(dateDate.getMonth() + 1).padStart(2, '0')
  + '/' + String(dateDate.getDate()).padStart(2, '0');
</script>
