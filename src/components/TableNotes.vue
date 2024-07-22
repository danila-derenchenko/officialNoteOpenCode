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
    <div v-for="note in noteStore.notes" class="tableNoteWrapper tableNotesGrid">
        <div class="tableNoteElement">{{ note.number }}</div>
        <div class="tableNoteElement">{{ note.createData }}</div>
        <div class="tableNoteElement">{{ note.status }}</div>
        <div class="tableNoteElement">{{ note.executor }}</div>
        <div class="tableNoteElement">{{ note.signer }}</div>
        <div class="tableNoteElement">{{ note.coordinator }}</div>
        <div class="tableNoteElement">{{ note.registrator }}</div>
        <div class="tableNoteElement">{{ note.regData }}</div>
        <div class="tableNoteElement">{{ note.regNumber }}</div>
    </div>
</template>

<script>
import { useNoteStore } from '../store/userStore';

export default {
    name: "TableNotes",
    data() {
        return {
            noteStore: useNoteStore()
        }
    },
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
        font-weight: $boldBigTextWeight;
        text-align: center;
        border: $borderNotes;
        border-left: none;
        border-top: none;
    }
</style>