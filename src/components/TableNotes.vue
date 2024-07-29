<template>
    <div class="tableNotesHeader tableNotesGrid">
        <p class="tableNotesTextIntro">Номер</p>
        <p class="tableNotesTextIntro">Дата создания</p>
        <p class="tableNotesTextIntro">Статус</p>
        <p class="tableNotesTextIntro">Исполнитель</p>
        <p class="tableNotesTextIntro">Подписант</p>
        <p class="tableNotesTextIntro">Согласующий</p>
        <p class="tableNotesTextIntro">Регистратор</p>
        <p class="tableNotesTextIntro">Рег. дата</p>
        <p class="tableNotesTextIntro" style="border-right: none;">Рег. номер</p>
    </div>
    <div v-for="note in noteStore.notes" :id="note.number" v-on:click="selectNote(note.number)" :class="['tableNoteWrapper', 'tableNotesGrid', {'selectedNote': selectedNote == note.number}]">
        <p class="tableNoteElement">{{ checkValueNotes(note.number) }}</p>
        <p class="tableNoteElement">{{ checkValueNotes(note.createData) }}</p>
        <p class="tableNoteElement">{{ checkValueNotes(note.status) }}</p>
        <p class="tableNoteElement">{{ checkValueNotes(note.executor) }}</p>
        <p class="tableNoteElement">{{ checkValueNotes(note.signer) }}</p>
        <p class="tableNoteElement">{{ checkValueNotes(note.coordinator) }}</p>
        <p class="tableNoteElement">{{ checkValueNotes(note.registrator) }}</p>
        <p class="tableNoteElement">{{ checkValueNotes(note.regData) }}</p>
        <p class="tableNoteElement">{{ checkValueNotes(note.regNumber) }}</p>
    </div>
</template>

<script>
import { useNoteStore } from '../store/userStore';

export default {
    name: "TableNotes",
    data() {
        return {
            noteStore: useNoteStore(),
            selectedNote: null
        }
    },
    methods: {
        checkValueNotes(data) {
            if(data == '') {
                return 'Не задано'
            } else if(data == 'created') {
                return 'Создана'
            } else if(data == 'agreed') {
                return 'Согласована'
            } else if(data == 'onAgreed') {
                return 'На согласовании'
            } else if(data == 'signed') {
                return 'Подписана'
            } else if(data == 'onSigned') {
                return 'На подписании'
            } else if(data == 'registered') {
                return 'Зарегистрирована'
            } else if(data == 'onRegistered') {
                return 'На регистрации'
            } else if(data == 'onFinalize') {
                return 'На доработке'
            } else {
                return data
            }
        },
        selectNote(id) {
            this.$emit('selectNote', id)
            this.$data.selectedNote = id
        }
    }
}
</script>

<style lang="scss">
    @import "../assets/style.scss";
    .tableNotesGrid {
        display: grid;
        grid-template-columns: calc(100% / 9) calc(100% / 9) calc(100% / 9) calc(100% / 9) calc(100% / 9) calc(100% / 9) calc(100% / 9) calc(100% / 9) calc(100% / 9);
    }
    .tableNotesTextIntro {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $boldSmallTextSize;
        font-weight: $boldBigTextWeight;
        text-align: center;
        border: $border;
        border-left: none;
        word-break: break-all;
        height: 88px;
    }
    .tableNoteElement {
        height: 88px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: $boldSmallTextSize;
        text-align: center;
        border: $borderNotes;
        border-left: none;
        border-top: none;
        word-break: break-all;
    }
    .tableNoteElement:hover {
        cursor: pointer;
    }
    .selectedNote {
        background-color: $tableNotesIsSecectColor;
    }
</style>