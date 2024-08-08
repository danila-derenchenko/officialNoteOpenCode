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
        <button :disabled="buttonSelectDisabled" class="mainButtonCreateEditDelete">Удалить</button>
    </div>
    <div class="mainTableNotes">
        <TableNotes @selectNote="selectNote" />
    </div>
</template>

<script>
import { useNoteStore, useUserStore } from '../store/userStore';
import { router } from '../router/router';
import TableNotes from './TableNotes.vue';
import { getRequest, postRequest, updateRequest } from '../API/requests';
import { consts } from '../consts';

export default {
    name: 'Main',
    data() {
        return {
            userStore: useUserStore(),
            buttonSelectDisabled: true,
            buttonCreateDisabled: true,
            selectedNoteId: null,
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
                const time = new Date()
                const note = {
                    number: res[0].number,
                    status: 'created',
                    createData: `${time.getFullYear()}-${time.getMonth()}-${time.getDate()}`,
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