<template>
  <p>
    {{ marker }}
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{
  marker: any;
}>();
</script>
