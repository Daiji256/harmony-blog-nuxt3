<template>
  <div>
    {{ dateStr }}
  </div>
</template>

<script setup lang="ts">
type Props = { date: string };
const { date } = defineProps<Props>();
const dateStr = (new Date(date)).toLocaleDateString("ja-JP");
</script>
