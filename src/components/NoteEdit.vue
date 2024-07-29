<template>
    <header class="noteEditHeader">
        <p class="noteEditHeaderIntro">Служебная записка №{{ getInfo('number') }}</p>
        <div class="noteEditStatusNote"></div>
    </header>
</template>

<script>
import { getRequest } from '../API/requests';
import { useNoteStore, useUserStore } from '../store/userStore';
// ПО ОКОНЧАНИИ ВЕРСТКИ УДАЛИТЬ РЕДИРЕКТ
// ПО ОКОНЧАНИЮ РАБОТ ИСПРАВИТЬ ПОЛУЧЕНИЕ ЗАПИСКИ ИЗ
export default {
    name: 'NoteEdit',
    data() {
        return {
            noteStore: useNoteStore(),
            userStore: useUserStore(),
            note: null
        }
    },
    mounted() {
        this.getNote()
    },
    methods: {
        getNote() {
            if(this.$data.note == null) {
                this.$data.note = this.noteStore.getNoteByNumber(this.$route.params.id)
            }
        },
        getInfo(param) {
            if(this.$data.note == null) {
                return 'No data'
            } else {
                switch(param) {
                    case 'number':
                        return this.$data.note.number
                    case 'status':
                        return this.$data.note.status
                    case 'createData':
                        return this.$data.note.createData
                    case 'regNumber':
                        return this.$data.note.regNumber
                    case 'regData':
                        return this.$data.note.regData
                    case 'summary':
                        return this.$data.note.summary
                    case 'whom':
                        return this.$data.note.whom
                    case 'executor':
                        return this.$data.note.executor
                    case 'coordinator':
                        return this.$data.note.coordinator
                    case 'signer':
                        return this.$data.note.signer
                    case 'registrator':
                        return this.$data.note.registrator
                    case 'description':
                        return this.$data.note.description
                }
            }
        }
    }
}

</script>

<style lang="scss">

</style>