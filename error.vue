<template>
  <TopAppBar />
  {{ statusCode }}
  {{ statusMessage }}
  <FooterMenu />
</template>

<script setup lang="ts">
type Props = { error: Object };
const { error } = defineProps<Props>();
const statusCode = 'statusCode' in error ? `${error.statusCode}` : 'unknown';
const statusMessage = 'statusMessage' in error ? `${error.statusMessage}` : '';
</script>
