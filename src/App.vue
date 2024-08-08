<template>
    <RouterView />
</template>

<script>
import { RouterView } from 'vue-router';
import { getRequest } from './API/requests';
import { consts } from './consts';
import { useUserStore, useNoteStore } from './store/userStore';
import Registration from './components/Registration.vue';
export default {
    components: {
        RouterView
    },
    data() {
        return {
            userStore: useUserStore(),
            noteStore: useNoteStore()
        }
    },
    beforeMount() {
        if (this.userStore.loginUser == null) {
            this.$router.push({ name: 'toLogin' })
        }
        setInterval(() => {
            this.noteStore.loadNotes()
            this.userStore.loadUsers()
        }, 1000)
    }
}

</script>

<style lang="scss"></style>
