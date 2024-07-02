<template>
    <header class="mainHeader">
        <p class="mainHeaderIntroText">Служебные записки</p>
        <div class="mainHeaderProfileBox">
            <img src="../assets/img/MainAvatar.svg" alt="avatar" class="mainHeaderProfileAvatar">
            <div class="mainHeaderProfileNameRole">
                <p class="mainHeaderProfileUsername">{{ this.$data.userStore.user.username }}</p>
                <p class="profileRole">{{ getRole() }}</p>
            </div>
            
        </div>
    </header>
</template>

<script>
import { useUserStore } from '../store/userStore';

export default {
    name: 'Main',
    data() {
        return {
            userStore: useUserStore()
        }
    },
    methods: {
        getRole() {
            console.log(this.$data.userStore.user)
            switch(this.$data.userStore.user.role) {
                case 'executor':
                    return 'Исполнитель'
                case 'signer':
                    return 'Подписант'
                case 'registrator':
                    return 'Регистратор'
                case 'coordinator':
                    return 'Согласовант'
            }
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
</style>