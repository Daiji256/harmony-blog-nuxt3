<template>
  <div>
    <AdjustText v-bind:text="dateStr" />
  </div>
</template>

<script setup lang="ts">
const { date } = defineProps({ date: { type: String, required: true } });
const dateStr = (new Date(date)).toLocaleDateString("ja-JP");
</script>
