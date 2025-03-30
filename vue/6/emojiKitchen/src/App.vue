<script setup>
import { ref, onMounted } from 'vue'
import Emoji from './components/Emoji.vue'
import EmojiList from './components/EmojiList.vue'
import EmojiMixer from './components/EmojiMixer.vue'

const emojis = ref([])
const selectedSmiles = ref([null, null])

const fetchEmojis = async () => {
  try {
    const response = await fetch('https://emojihub.yurace.pro/api/all')
    if (!response.ok) throw new Error('Ошибка загрузки эмодзи')
    emojis.value = await response.json()
  } catch (error) {
    console.error('Error:', error)
  }
}

const handleFirstSelect = (emoji) => {
  selectedSmiles.value[0] = emoji
}

const handleSecondSelect = (emoji) => {
  selectedSmiles.value[1] = emoji
}

onMounted(() => {
  fetchEmojis()
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-5">
    <h1 class="text-3xl font-bold text-center mb-8">Emoji Mixer</h1>
    
    <div class="flex gap-8 mt-8">
      <div class="flex-1">
        <h2 class="text-xl font-semibold mb-3">Выберите первый эмодзи</h2>
        <EmojiList 
          :emojis="emojis" 
          @selectEmoji="handleFirstSelect"
        />
        <div v-if="selectedSmiles[0]" class="mt-3 text-lg">
          Выбрано: <Emoji :emoji="selectedSmiles[0]" />
        </div>
      </div>
      
      <div class="flex-1">
        <h2 class="text-xl font-semibold mb-3">Выберите второй эмодзи</h2>
        <EmojiList 
          :emojis="emojis" 
          @selectEmoji="handleSecondSelect"
        />
        <div v-if="selectedSmiles[1]" class="mt-3 text-lg">
          Выбрано: <Emoji :emoji="selectedSmiles[1]" />
        </div>
      </div>
    </div>
    <EmojiMixer 
      :firstEmoji="selectedSmiles[0]" 
      :secondEmoji="selectedSmiles[1]" 
    />

  </div>
</template>