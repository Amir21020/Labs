<script setup>
import { ref, computed } from 'vue'
import { useToast } from 'vue-toastification'

const history = ref([])
const title = ref('')
const amount = ref('')
const id = ref(1)
const toast = useToast()

const outcomeBalance = computed(() => {
  return history.value
    .filter(item => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0)
})

const incomeBalance = computed(() => {
  return history.value
    .filter(item => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0)
})

const totalBalance = computed(() => {
  return history.value.reduce((sum, item) => sum + item.amount, 0)
})

const addOperation = () => {
  if(!title.value.trim()) {
    toast.warning('Название не может быть пустым')
    return
  }

  const amountNum = parseFloat(amount.value)
  if(isNaN(amountNum)) {
    toast.warning('Значение должно быть числом')
    return
  }

  if(amountNum === 0) {
    toast.warning('Сумма не может быть нулевой')
    return
  }

  history.value.push({
    id: id.value++,
    text: title.value.trim(),
    amount: amountNum
  })

  title.value = ''
  amount.value = ''
}
</script>

<template>
  <div class="flex flex-col items-start max-w-md mx-auto p-5">
    <h1 class="text-2xl font-bold whitespace-nowrap mb-5 border border-transparent">Учет расходов</h1>
    
    <div class="w-[calc(100%-1px)]">
      
      <div class="mb-5 space-y-1">
        <h2 class="text-lg">Баланс: {{ totalBalance }}</h2>
        <h2 class="text-lg">Расходы: {{ outcomeBalance }}</h2>
        <h2 class="text-lg">Доходы: {{ incomeBalance }}</h2>
      </div>
      
      <div v-if="history.length === 0" class="py-5 border border-gray-300 rounded mb-5 text-center">
        Нет операций
      </div>
      
      <ul v-else class="mb-5 space-y-2">
        <li 
          v-for="item in history" 
          :key="item.id" 
          class="flex justify-between items-center p-3 border border-black rounded"
        >
          <span class="font-medium">{{ item.text }}</span>
          <span 
            :class="{
              'text-green-600': item.amount > 0,
              'text-red-600': item.amount < 0
            }"
          >
            {{ item.amount > 0 ? '+' : '' }}{{ item.amount }}
          </span>
        </li>
      </ul>
      
      <div class="border-t border-black my-5 w-full"></div>
      
      <form @submit.prevent="addOperation" class="space-y-3">
        <div>
          <input 
            type="text" 
            v-model.trim="title" 
            placeholder="Название операции"
            class="w-full p-2 border border-black rounded"
          >
        </div>
        <div>
          <input 
            type="number" 
            v-model="amount" 
            placeholder="Сумма"
            step="0.01"
            class="w-full p-2 border border-black rounded"
          >
        </div>
        <button 
          type="submit" 
          class="w-full py-2 px-4 border-2 border-blue-600 text-blue-600 font-bold rounded hover:bg-blue-600 hover:text-white transition-colors"
        >
          Добавить
        </button>
      </form>
    </div>
  </div>
</template>