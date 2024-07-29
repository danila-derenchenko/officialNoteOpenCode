<template>
    <header class="noteEditHeader">
        <p class="noteEditHeaderIntro">Служебная записка № {{ getInfo('number') }}</p>
        <div :class="['noteEditStatusNote', {'grayNoteStatus': statusNote == ('created' || 'onFinalize')}, 
            {'violetNoteStatus': statusNote == ('onAgreed' || 'onSigned' || 'onRegistered')},
            {'orangeNoteStatus': statusNote == ('agreed' || 'signed')},
            {'greenNoteStatus': statusNote == 'registered'}]">{{ getInfo('status') }}</div>
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
            note: null,
            statusNote: ''
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
        checkStatus(status) {
            this.$data.statusNote = status
            if(status == 'created') {
                return 'Создана'
            } else if(status == 'agreed') {
                return 'Согласована'
            } else if(status == 'onAgreed') {
                return 'На согласовании'
            } else if(status == 'signed') {
                return 'Подписана'
            } else if(status == 'onSigned') {
                return 'На подписании'
            } else if(status == 'registered') {
                return 'Зарегистрирована'
            } else if(status == 'onRegistered') {
                return 'На регистрации'
            } else if(status == 'onFinalize') {
                return 'На доработке'
            }
        },
        getInfo(param) {
            if(this.$data.note == null) {
                return 'Error'
            } else {
                switch(param) {
                    case 'number':
                        return this.$data.note.number
                    case 'status':
                        return this.checkStatus(this.$data.note.status)
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
    @import '../assets/style.scss';
    .noteEditHeaderIntro {
        font-size: $boldBigTextSize;
        font-weight: $boldBigTextWeight;
    }
    .noteEditHeader {
        padding: $paddingMainButton;
        border-bottom: $border;
    }
    .noteEditStatusNote {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $noteEditTextSize;
        font-weight: $boldSmallTextWeight;
        width: 413px;
        height: 69px;
        border: $borderNotes;
        border-radius: $borderRadius;
    }
    .grayNoteStatus {
        background-color: #D9D9D9;
    }
    .violetNoteStatus {
        background-color: #D6D6FF;
    }
    .orangeNoteStatus {
        background-color: #FFB257;
    }
    .greenNoteStatus {
        background-color: #51C54F;
    }
</style>