<template>
  <span v-html="adjustTextHtml"></span>
</template>

<script setup lang="ts">
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeQuotes from 'rehype-quotes';
import rehypeAdjustAki from 'rehype-adjust-aki';
import rehypeStringify from 'rehype-stringify';

const { text } = defineProps({ text: String });
const adjustTextHtml = unified()
  .use(rehypeParse)
  .use(rehypeQuotes)
  .use(rehypeAdjustAki)
  .use(rehypeStringify)
  .processSync(text)
  .toString();
</script>
