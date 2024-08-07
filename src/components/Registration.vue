<template>
    <div class="regFormWrapper">
        <form v-on:submit="checkLogin" class="regForm">
            <p class="regFormIntro">Вход в систему</p>
            <p class="regFormError" v-show="isError">Неверно введён логин, или пароль</p>
            <p class="regFormError" v-show="isErrorRequest">Ошибка обращения к серверу, попробуйте позже</p>
            <input v-model="login" placeholder="Введите логин" type="text" class="regFormInput">
            <input v-model="password" placeholder="Введите пароль" type="password" class="regFormInput">
            <button type="submit" class="regFormInput regFormInputButton">Войти</button>
        </form>
    </div>
</template>

<script>
import { getRequest } from '../API/requests.js';
import { consts } from '../consts.ts';
import { useUserStore } from '../store/userStore.js';

export default {
    name: 'Registration',
    data() {
        return {
            login: '',
            password: '',
            isError: false,
            isErrorRequest: false,
            useStore: useUserStore()
        }
    },
    methods: {
        checkLogin(evt) {
            evt.preventDefault()
            getRequest(consts.PATH_SERVER + `/users?login=${this.$data.login}`).then(res => {
                if(res.lenght != 0 && res[0] != undefined) {
                    if(res[0].password == this.$data.password) {
                        this.$data.login = ''
                        this.$data.password = ''
                        this.$data.isError = false
                        this.$data.isErrorRequest = false
                        this.$data.useStore.addLoginUser(res[0])
                        this.$router.push({ name: 'toMain' })
                    } else {
                        this.$data.isError = true
                        this.$data.isErrorRequest = false
                        this.$data.login = ''
                        this.$data.password = ''
                    }
                } else {
                    this.$data.isError = true
                    this.$data.isErrorRequest = false
                    this.$data.login = ''
                    this.$data.password = ''
                }
            }).catch(() => {
                this.$data.isErrorRequest = true
                this.$data.isError = false
            })
        }
    }
}
</script>

<style scoped lang="scss">
    @import '../assets/style.scss';
    .regFormWrapper {
        width: 100vw;
        height: 100vh;
        background-image: $backgroundRegForm;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .regForm {
        background-color: #FFF;
        border: $border;
        border-radius: $borderRadius;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 15px;
        padding: $paddingRegForm;
        box-shadow: 0px 0px 59px 38px rgba(5, 0, 255, 0.2);
    }
    .regFormError {
        color: #FF0202;
    }
    .regFormIntro {
        font-size: $boldBigTextSize;
        font-weight: $boldBigTextWeight;
        text-align: center;
    }
    .regFormInput {
        padding: 15px;
        font-size: $boldSmallTextSize;
        border: $border;
        border-radius: $borderRadius;
        width: 763px;
        height: 111px;
    }
    .regFormInputButton {
        background-color: #FFF;
        font-weight: $boldBigTextWeight;
        width: 331px;
        margin-left: auto;
        margin-right: auto;
    }
    .regFormInputButton:hover {
        cursor: pointer;
    }
</style>