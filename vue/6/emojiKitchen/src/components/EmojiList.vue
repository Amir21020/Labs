<script setup>
import Emoji from './Emoji.vue'

defineProps({
    emojis : Array
})

const emit = defineEmits(['selectEmoji'])

const handleClick = (emoji) => {
  emit('selectEmoji', emoji)
}

</script>


<template>
    <div class="flex flex-wrap gap-2 my-5">
    <div 
      v-for="emoji in emojis" 
      :key="emoji.name"
      class="cursor-pointer text-2xl hover:scale-125 transition-transform"
      @click="handleClick(emoji)"
    >
      <Emoji :emoji="emoji" />
    </div>
  </div>
</template>