<script setup>
import { computed } from 'vue'
import Emoji from './Emoji.vue'

const props = defineProps({
  firstEmoji: {
    type: Object,
    default: null
  },
  secondEmoji: {
    type: Object,
    default: null
  }
})

const kitchenEmoji = computed(() => {
  if (props.firstEmoji && props.secondEmoji) {
    const unicodeFirst = props.firstEmoji.unicode[0].replace('U+', '').toLowerCase()
    const unicodeSecond = props.secondEmoji.unicode[0].replace('U+', '').toLowerCase()
    return `https://emk.vercel.app/s/${unicodeFirst}_${unicodeSecond}?size=96`
  }
  return null
})
</script>

<template>
  <div class="mt-8 p-5 border border-gray-200 rounded-lg">
    <div v-if="firstEmoji || secondEmoji" class="flex gap-5 mb-5">
      <div v-if="firstEmoji" class="flex items-center gap-2">
        <span>Первый:</span>
        <Emoji :emoji="firstEmoji" />
      </div>
      <div v-if="secondEmoji" class="flex items-center gap-2">
        <span>Второй:</span>
        <Emoji :emoji="secondEmoji" />
      </div>
    </div>
    
    <div v-if="kitchenEmoji" class="text-center">
      <h3 class="text-lg font-medium mb-2">Результат смешивания:</h3>
      <img :src="kitchenEmoji" alt="Mixed emoji" class="mx-auto w-24 h-24">
    </div>
    <div v-else class="text-center text-gray-500 py-5">
      Выберите два эмодзи для смешивания
    </div>
  </div>
</template>