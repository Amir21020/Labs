<script setup>
import { reactive, ref } from 'vue';

const form = reactive({
  firstName: '',
  lastName: '',
  gender: '',
  password: '',
  confirmPassword: ''
});


const showPassword = ref(false);

const isButtonDisabled = () => {
  return form.password !== form.confirmPassword || !form.password || !form.confirmPassword;
};

const handleSubmit = () => {
  console.log('Данные формы:', form);
};

const handleShowPassword = () => {
  showPassword.value = true;
};

const handleHidePassword = () => {
  showPassword.value = false;
};
</script>

<template>
  <div class="h-screen w-screen grid content-center justify-center bg-gray-100">
    <div>
      <p>Пользователь: {{ form.firstName ? (form.lastName ? form.firstName : form.firstName + '.') : "" }} {{ form.lastName ? form.lastName + '.' : "" }} {{ form.gender ? form.gender + ' пол.' : '' }}</p>
    </div>
    <form @submit.prevent="handleSubmit" class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Имя пользователя</label>
        <input
          v-model="form.firstName"
          type="text"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Введите имя"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Фамилия пользователя</label>
        <input
          v-model="form.lastName"
          type="text"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Введите фамилию"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Пол</label>
        <div class="flex items-center">
          <label class="inline-flex items-center mr-4">
            <input
              v-model="form.gender"
              type="radio"
              value="Мужской"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2">Мужской</span>
          </label>
          <label class="inline-flex items-center">
            <input
              v-model="form.gender"
              type="radio"
              value="Женский"
              class="form-radio h-4 w-4 text-blue-600"
            />
            <span class="ml-2">Женский</span>
          </label>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">Пароль</label>
        <input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Введите пароль"
        />
      </div>

      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2">Подтверждение пароля</label>
        <input
          v-model="form.confirmPassword"
          :type="showPassword ? 'text' : 'password'"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Подтвердите пароль"
        />
      </div>

      <button
        type="button"
        @mousedown="handleShowPassword"
        @mouseup="handleHidePassword"
        @mouseleave="handleHidePassword"
        class="w-full mb-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Показать пароль
      </button>

      <button
        type="submit"
        :disabled="isButtonDisabled()"
        :class="{
          'bg-blue-500 hover:bg-blue-600': !isButtonDisabled(),
          'bg-gray-400 cursor-not-allowed': isButtonDisabled()
        }"
        class="w-full text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>