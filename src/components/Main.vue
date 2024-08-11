<template>
    <header class="mainHeader">
        <p class="mainHeaderIntroText">Служебные записки</p>
        <div class="mainHeaderProfileBox">
            <img src="../assets/img/MainAvatar.svg" alt="avatar" class="mainHeaderProfileAvatar">
            <div class="mainHeaderProfileNameRole">
                <p class="mainHeaderProfileUsername">{{ this.$data.userStore.loginUser.username }}</p>
                <p class="profileRole">{{ getRole() }}</p>
            </div>
        </div>
    </header>
    <div class="mainButtonBox">
        <button class="mainButtonCreateEditDelete" :disabled="buttonCreateDisabled"
            v-on:click="createNote()">Создать</button>
        <button :disabled="buttonSelectDisabled" class="mainButtonCreateEditDelete"
            v-on:click="onClickEditButton">Редактировать</button>
        <button :disabled="buttonCreateDisabled || buttonSelectDisabled" v-on:click="deleteNote" class="mainButtonCreateEditDelete">Удалить</button>
    </div>
    <div class="mainTableNotes">
        <TableNotes @selectNote="selectNote" />
    </div>
</template>

<script>
import { useNoteStore, useUserStore } from '../store/userStore';
import { router } from '../router/router';
import TableNotes from './TableNotes.vue';
import { deleteRequest, getRequest, postRequest, updateRequest } from '../API/requests';
import { consts } from '../consts';

export default {
    name: 'Main',
    data() {
        return {
            userStore: useUserStore(),
            buttonSelectDisabled: true,
            buttonCreateDisabled: true,
            selectedNoteId: null, // здесь под id подразумевается поле number записки
            noteStore: useNoteStore()
        }
    },
    mounted() {
        if (this.userStore.loginUser == null) {
            this.$router.push({ name: 'toLogin' })
        }
        if (this.userStore.loginUser.role == 'executor') {
            this.$data.buttonCreateDisabled = false
        }
    },
    components: {
        TableNotes
    },
    methods: {
        createNote() {
            getRequest(consts.PATH_SERVER + '/numbers?type=number').then(res => {
                const note = {
                    number: res[0].number,
                    status: 'created',
                    createData: this.getNowDate(),
                    regNumber: '',
                    regData: '',
                    summary: '',
                    whom: '',
                    executor: this.userStore.loginUser.login,
                    coordinator: '',
                    signer: '',
                    registrator: '',
                    description: '',
                    comment: ''
                }
                postRequest(consts.PATH_SERVER + '/notes', note)
                this.noteStore.addNote(note)
                updateRequest(consts.PATH_SERVER + `/numbers/${res[0].id}`, {
                    type: 'number',
                    id: res[0].id,
                    number: res[0].number + 1
                })
            })
        },
        deleteNote() {
            if(this.noteStore.getNoteByNumber(this.$data.selectedNoteId).executor == this.userStore.loginUser.login) {
                this.noteStore.deleteNote(this.$data.selectedNoteId)
            } else {
                alert("Записку может удалить только тот пользователь, который её создал")
            }
        },
        getNowDate() {
            const time = new Date()
            if(time.getMonth() < 10 && time.getDate() > 10) {
                return `${time.getFullYear()}-0${time.getMonth()}-${time.getDate()}`
            }
            else if(time.getMonth() > 10 && time.getDate() < 10) {
                return `${time.getFullYear()}-${time.getMonth()}-0${time.getDate()}`
            }
            else if(time.getMonth() < 10 && time.getDate() < 10) {
                return `${time.getFullYear()}-0${time.getMonth()}-0${time.getDate()}`
            } else {
                return `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`
            }
        },
        getRole() {
            console.log(this.$data.userStore.loginUser)
            switch (this.$data.userStore.loginUser.role) {
                case 'executor':
                    return 'Исполнитель'
                case 'signer':
                    return 'Подписант'
                case 'registrator':
                    return 'Регистратор'
                case 'coordinator':
                    return 'Согласующий'
            }
        },
        selectNote(id) {
            this.$data.buttonSelectDisabled = false
            this.$data.selectedNoteId = id
        },
        onClickEditButton() {
            this.$router.push({ name: 'toNoteEdit', params: { id: this.$data.selectedNoteId } })
        }
    }
}

</script>

<style scoped lang="scss">
@import '../assets/style.scss';

.mainHeader {
    padding-left: $paddingMain;
    padding-right: $paddingMain;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 179px;
    border-bottom: $border;
}

.mainHeaderIntroText {
    font-size: $boldBigTextSize;
    font-weight: $boldBigTextWeight;
}

.mainHeaderProfileBox {
    display: flex;
    align-items: center;
    gap: 10px;
}

.mainHeaderProfileUsername {
    font-size: $boldSmallTextSize;
    font-weight: $boldBigTextWeight;
}

.mainButtonBox {
    display: flex;
    gap: 15px;
    width: 1000px;
    margin-left: 20px;
    margin-top: 20px;
}

.mainButtonCreateEditDelete {
    border: $border;
    border-radius: $borderRadius;
    background-color: #FFF;
    padding: $paddingMainButton;
    font-size: $boldSmallTextSize;
    font-weight: $boldBigTextWeight;
}

.mainButtonCreateEditDelete:hover {
    cursor: pointer;
}

.mainTableNotes {
    margin-top: 15px;
}
</style>