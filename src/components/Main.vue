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
        <button class="mainButtonCreateEditDelete">Создать</button>
        <button :disabled="buttonSelectDisabled" class="mainButtonCreateEditDelete" v-on:click="onClickEditButton">Редактировать</button>
        <button :disabled="buttonSelectDisabled" class="mainButtonCreateEditDelete">Удалить</button>
    </div>
    <div class="mainTableNotes">
        <TableNotes @selectNote="selectNote" />
    </div>
</template>

<script>
import { useUserStore } from '../store/userStore';
import { router } from '../router/router';
import TableNotes from './TableNotes.vue';
import { getRequest } from '../API/requests';
import { consts } from '../consts';

export default {
    name: 'Main',
    data() {
        return {
            userStore: useUserStore(),
            buttonSelectDisabled: true,
            selectedNoteId: null
        }
    },
    mounted() {
        getRequest(consts.PATH_SERVER + '/users').then(res=> {
            this.userStore.addUsers(res)
        })
    },
    components: {
        TableNotes
    },
    methods: {
        getRole() {
            console.log(this.$data.userStore.loginUser)
            switch(this.$data.userStore.loginUser.role) {
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