<template>
  <div v-bind:style="{
    width: '100%',
    padding: '64px',
    background: style.colors.primaryContainer,
  }">
    <div v-bind:style="{
      position: 'relative',
      width: '100%',
      height: '100%',
      borderRadius: '36px',
      color: style.colors.onSurface,
      background: style.colors.surface,
      boxShadow: style.shadow.level1,
    }">
      <div v-bind:style="{
        padding: '32px 48px',
        position: 'absolute',
      }">
        <div v-bind:style="{
          fontSize: '66px',
          lineHeight: '84px',
        }">{{ adjustedTitle }}</div>
        <div v-bind:style="{ height: '12px' }"></div>
        <div v-bind:style="{
          fontSize: '36px',
          lineHeight: '48px',
          color: style.colors.onSurfaceVariant,
        }">{{ adjustedDescription }}</div>
      </div>
      <div v-bind:style="{
        padding: '32px 48px',
        position: 'absolute',
        bottom: 0,
        fontSize: '42px',
        lineHeight: '60px',
      }">{{ adjustedTags }}</div>
      <div v-bind:style="{
        padding: '32px 48px',
        position: 'absolute',
        bottom: 0,
        right: 0,
        fontSize: '42px',
        lineHeight: '60px',
      }">{{ adjustedSiteName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
type Props = { title: String, description: string | undefined, tags: string[] | undefined };
const { title, description, tags } = defineProps<Props>();

// WARNING: The SCSS definition is not taking effect, so this file needs to be set separately.
const style = {
  colors: {
    primaryContainer: '#bce9ff',
    surface: '#fbfcfe',
    onSurface: '#191c1e',
    onSurfaceVariant: '#40484c',
  },
  shadow: {
    level1: '0 1.5px 6px 0 rgba(0,0,0,0.2)',
  },
};

const adjustText = (text: String) => {
  const rPm = "）｠」』］〛｝】〗〉》〕〙〟。．、，";
  const mPm = "・：；";
  const dPm = "！？‼⁇⁈⁉";
  const emSp = "　";
  return text
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
};

const adjustedTitle = adjustText(title);
const adjustedDescription = adjustText(description ?? "");
const adjustedTags = Array
  .from(new Set(tags)) // Converting to a set to avoid duplicates caused by a bug.
  .map(tag => adjustText(tag))
  .join(' / ');
const adjustedSiteName = adjustText(useRuntimeConfig().public['siteName']);
</script>
