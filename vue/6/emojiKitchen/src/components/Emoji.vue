<script setup>
defineProps({
  emoji: Object  
})
</script>

<template>
  <span v-html="emoji.htmlCode[0]" class="text-2xl"></span> 
</template>