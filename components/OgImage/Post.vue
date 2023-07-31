<template>
  <div :class="[backgroundColor]" class="w-full h-full flex text-white items-center justify-center">
    <h1 :style="{ fontSize: '70px', padding: '16px' }">
      <span v-html="adjustTitleHtml"></span>
    </h1>
  </div>
</template>

<script setup lang="ts">
type Props = {
  title: String,
  backgroundColor: String,
};
const { title, backgroundColor } = defineProps<Props>();

const rPm = "）｠」』］〛｝】〗〉》〕〙〟。．、，";
const mPm = "・：；";
const dPm = "！？‼⁇⁈⁉";
const emSp = "　";
const adjustTitleHtml = title
  .replace(new RegExp(`([${rPm}${mPm}])'`, 'g'), '$1‘')
  .replace(/ '/g, "‘")
  .replace(/' /g, "’")
  .replace(/^'/g, "‘")
  .replace(/'/g, "’")
  .replace(new RegExp(`([${rPm}${mPm}])"`, 'g'), '$1“')
  .replace(/ "/g, "“")
  .replace(/" /g, "”")
  .replace(/^"/g, "“")
  .replace(/"/g, "”")
  .replace(new RegExp(`([${dPm}])${emSp}`, 'g'), '$1 ');
</script>
