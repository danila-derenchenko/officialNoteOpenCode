<template>
    <button @click="requestsOnServer('PUT')">Добавить пользователя</button>
  </template>

<script>
import axios from 'axios';
export default {
    methods: {
        requestsOnServer(type) {
            if(type == 'PUT') {
                axios.put('http://localhost:3003/users/b74e', JSON.stringify({
                    name: "Hello"
                }))
            }
        }
    }
}

</script>

<style scoped>

</style>
