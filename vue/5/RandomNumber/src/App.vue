<script setup>
import axios from 'axios';
import { ref } from 'vue'

const numb = ref(0)
const type = ref('trivia')
const infa = ref('')
const isLoading = ref(false)
const error = ref(null)

const getFactAboutNumber = async (e) => {
  e.preventDefault()
  if (!numb.value) return
  
  isLoading.value = true
  error.value = null
  
  try {
    const response = await axios.get(`http://numbersapi.com/${numb.value}/${type.value}?json`)
    infa.value = response.data.text || 'No information found'
  } catch (err) {
    error.value = 'Failed to fetch data'
    infa.value = ''
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <form @submit.prevent="getFactAboutNumber" class="flex gap-2 mb-4">
      <input 
        type="number" 
        v-model.number="numb" 
        class="border p-2"
        min="0"
      />
      <select v-model="type" class="border p-2">
        <option value="math">Math</option>
        <option value="year">Year</option>
        <option value="trivia">Trivia</option>
      </select>
      <button 
        type="submit" 
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        :disabled="isLoading"
      >
        {{ isLoading ? 'Loading...' : 'Поиск' }}
      </button>
    </form>
    
    <div class="max-w-md text-center">
      <p v-if="error" class="text-red-500">{{ number }} - скучное число/скучный год</p>
      <p v-else-if="infa" class="text-lg p-4 bg-gray-100 rounded">{{ infa }}</p>
      <p v-else class="text-gray-500">Введите число и выберите тип</p>
    </div>
  </div>
</template>