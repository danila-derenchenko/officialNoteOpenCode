<template>
    <header class="noteEditHeader">
        <p class="noteEditHeaderIntro">Служебная записка № {{ getInfo('number') }}</p>
        <div :class="['noteEditStatusNote', { 'grayNoteStatus': statusNote == ('created' || 'onFinalize') },
            { 'violetNoteStatus': statusNote == ('onSigned' || 'onRegistered') || 'onAgreed' },
            { 'orangeNoteStatus': statusNote == ('agreed' || 'signed') },
            { 'greenNoteStatus': statusNote == 'registered' }]"> {{ getInfo('status') }}</div>
    </header>
    <div class="noteEditControlPanel">
        <div class="noteEditControlPanelBox">
            <div class="shortInputBox">
                <p class="descriptionInputBoxText">Номер</p>
                <input type="text" class="noteEditInput" v-model="numberNote" disabled>
            </div>
            <div class="shortInputBox">
                <p class="descriptionInputBoxText">Дата создания</p>
                <input type="date" class="noteEditInput" v-model="createDataNote" disabled>
            </div>
            <div class="shortInputBox">
                <p class="descriptionInputBoxText">Рег. номер</p>
                <input type="text" class="noteEditInput" :disabled="isRegistrator" v-model="regNumberNote">
            </div>
            <div class="shortInputBox">
                <p class="descriptionInputBoxText">Рег. дата</p>
                <input type="date" class="noteEditInput" v-model="regDataNote" disabled>
            </div>
        </div>
        <div class="noteEditInputBox">
            <p class="descriptionInputBoxText">Краткое содержание</p>
            <input type="text" class="noteEditInput noteEditLongInput" :disabled="isRegistrator && isExecutor && isCoordinator && isRegistrator" v-model="summaryNote">
        </div>
        <div class="noteEditControlPanelBox">
            <div class="shortInputBox">
                <p class="descriptionInputBoxText">Кому</p>
                <input type="text" class="noteEditInput" :disabled="isRegistrator && isExecutor && isCoordinator && isRegistrator" v-model="whomNote">
            </div>
            <div class="shortInputBox">
                <p class="descriptionInputBoxText">Исполнитель</p>
                <select v-model="executorNote" class="noteEditInput noteEditInputSelect" :disabled="isExecutor">sdbrwabvwqevbaerva
                    <option class="noteEditInputSelect" value="">Не задано</option>
                    <option v-for="executor in executors" class="noteEditInputSelect" :value="executor.login">{{
                        executor.username }}</option>
                </select>
            </div>
            <div class="shortInputBox">
                <p class="descriptionInputBoxText">Согласующий</p>
                <select v-model="coordinatorNote" class="noteEditInput noteEditInputSelect" :disabled="isExecutor">
                    <option class="noteEditInputSelect" value="">Не задано</option>
                    <option v-for="coordinator in coordinators" class="noteEditInputSelect" :value="coordinator.login">
                        {{ coordinator.username }}</option>
                </select>
            </div>
            <div class="shortInputBox">
                <p class="descriptionInputBoxText">Подписант</p>
                <select v-model="signerNote" class="noteEditInput noteEditInputSelect" :disabled="isExecutor">
                    <option class="noteEditInputSelect" value="">Не задано</option>
                    <option v-for="signer in signers" class="noteEditInputSelect" :value="signer.login">{{
                        signer.username }}</option>
                </select>
            </div>
            <div class="shortInputBox">
                <p class="descriptionInputBoxText">Регистратор</p>
                <select v-model="registratorNote" class="noteEditInput noteEditInputSelect" :disabled="isExecutor">
                    <option value="">Не задано</option>
                    <option v-for="registrator in registrators" class="noteEditInputSelect" :value="registrator.login">
                        {{ registrator.username }}</option>
                </select>
            </div>
        </div>
        <div class="noteEditInputBox">
            <p class="descriptionInputBoxText">Описание</p>
            <textarea v-model="descriptionNote" class="noteEditInput noteEditInputTextArea" :disabled="isRegistrator && isExecutor && isCoordinator && isRegistrator"></textarea>
        </div>
        <div class="noteEditInputBox">
            <p class="descriptionInputBoxText">Комментарий </p>
            <input type="text" class="noteEditInput noteEditLongInput" v-model="summaryNote" :disabled="isRegistrator && isExecutor && isCoordinator && isRegistrator">
        </div>
    </div>
    <div class="noteEditButtonControlPanel">
        <div class="noteEditButtonControlPanelBox">
            <button v-show="isButtonNoneVision"
                :class="['noteEditButtonControlPanelButton', { 'noteEditButtonControlPanelButtonRed': isButtonRedClass == true }]">{{
                    checkActionsWithStatus('1') }}</button>
            <button v-show="isButtonNoneVision" class="noteEditButtonControlPanelButton"
                :class="['noteEditButtonControlPanelButton', { 'noteEditButtonControlPanelButtonGreen': isButtonGreenClass == true }]">{{
                    checkActionsWithStatus('2') }}</button>
        </div>
        <button class="noteEditButtonControlPanelButton">Печать</button>
        <div class="noteEditButtonControlPanelBox">
            <button class="noteEditButtonControlPanelButton">Закрыть</button>
            <button class="noteEditButtonControlPanelButton">Сохранить</button>
        </div>
    </div>
</template>

<script>
// 2017-06-01 - пример формата времени
import { getRequest } from '../API/requests';
import { useNoteStore, useUserStore } from '../store/userStore';
// ПО ОКОНЧАНИИ ВЕРСТКИ УДАЛИТЬ РЕДИРЕКТ
// ПО ОКОНЧАНИЮ РАБОТ ИСПРАВИТЬ ПОЛУЧЕНИЕ ЗАПИСКИ ИЗ
export default {
    name: 'NoteEdit',
    data() {
        return {
            isExecutor: true,
            isCoordinator: true,
            isSigner: true,
            isRegistrator: true,
            noteStore: useNoteStore(),
            userStore: useUserStore(),
            note: null,
            statusNote: '',
            numberNote: null,
            createDataNote: '',
            regNumberNote: '',
            regDataNote: '',
            summaryNote: '',
            whomNote: '',
            executorNote: '',
            coordinatorNote: '',
            signerNote: '',
            registratorNote: '',
            descriptionNote: '',
            isButtonRedClass: false,
            isButtonGreenClass: false,
            isButtonNoneVision: true,
            executors: [],
            registrators: [],
            coordinators: [],
            signers: []
        }
    },
    mounted() {
        if (this.userStore.loginUser == null) {
            this.$router.push('toLogin')
        } else {
            this.getNote()
            this.executors = this.userStore.getExecutors()
            this.registrators = this.userStore.getRegistrators()
            this.signers = this.userStore.getSigners()
            this.coordinators = this.userStore.getCoordinators()
        }
    },
    methods: {
        getNote() {
            if (this.$data.note == null) {
                this.$data.note = this.noteStore.getNoteByNumber(this.$route.params.id)
                this.$data.statusNote = this.$data.note.status
                this.$data.numberNote = this.$data.note.number
                this.$data.createDataNote = this.$data.note.createData
                this.$data.regNumberNote = this.$data.note.regNumber
                this.$data.regDataNote = this.$data.note.regData
                this.$data.summaryNote = this.$data.note.summary
                this.$data.whomNote = this.$data.note.whom
                this.$data.executorNote = this.$data.note.executor
                this.$data.coordinatorNote = this.$data.note.coordinator
                this.$data.signerNote = this.$data.note.signer
                this.$data.registratorNote = this.$data.note.registrator
                this.$data.descriptionNote = this.$data.note.description
            }
        },
        checkActionsWithStatus(numberButton) {
            if ((this.statusNote == 'created' || this.statusNote == 'onFinalize' || this.statusNote == 'agreed' || this.statusNote == 'signed') && this.userStore.loginUser.login == this.executorNote) {
                this.checkDisabled('executor')
                this.isButtonNoneVision = true
                if (numberButton == '1') {
                    return 'На согласование'
                }
                else {
                    return 'На регистрацию'
                }
            }
            else if (this.statusNote == 'onAgreed' && this.userStore.loginUser.login == this.coordinatorNote) {
                this.checkDisabled('coordinator')
                this.isButtonNoneVision = true
                if (numberButton == 1) {
                    this.isButtonRedClass = true
                    return 'Отклонить'
                } else {
                    this.isButtonGreenClass = true
                    return 'Согласовать'
                }
            }
            else if (this.statusNote == 'onSigned' && this.userStore.loginUser.login == this.signerNote) {
                this.isButtonNoneVision = true
                this.checkDisabled('signer')
                if (numberButton == 1) {
                    this.isButtonRedClass = true
                    return 'Отклонить'
                } else {
                    this.isButtonGreenClass = true
                    return 'Подписать'
                }
            }
            else if (this.statusNote == 'onRegistered' && this.userStore.loginUser.login == this.registratorNote) {
                this.isButtonNoneVision = true
                this.checkDisabled('registrator')
                if (numberButton == 1) {
                    this.isButtonRedClass = true
                    return 'Отклонить'
                } else {
                    this.isButtonGreenClass = true
                    return 'Зарегистрировать'
                }
            } else {
                this.checkDisabled('usuallyUser')
                this.isButtonNoneVision = false
            }
        },
        checkStatus(status) {
            if (status == 'created') {
                return 'Создана'
            } else if (status == 'agreed') {
                return 'Согласована'
            } else if (status == 'onAgreed') {
                return 'На согласовании'
            } else if (status == 'signed') {
                return 'Подписана'
            } else if (status == 'onSigned') {
                return 'На подписании'
            } else if (status == 'registered') {
                return 'Зарегистрирована'
            } else if (status == 'onRegistered') {
                return 'На регистрации'
            } else if (status == 'onFinalize') {
                return 'На доработке'
            }
        },
        checkDisabled(role) {
            if(role == 'executor') {
                this.isExecutor = false
            }
            if(role == 'registrator') {
                this.isRegistrator = false
            }
            if(role == 'signer') {
                this.isSigner = false
            }
            if(role == 'coordinator') {
                this.isCoordinator = false
            }
        },
        getInfo(param) {
            if (this.$data.note == null) {
                return 'Error'
            } else {
                switch (param) {
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
    padding: $paddingMain;
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

.descriptionInputBoxText {
    font-size: $noteEditTextSize;
    font-weight: $boldSmallTextWeight;
    margin-bottom: 5px;
}

.noteEditInput {
    border: $borderNotes;
    border-radius: $borderRadius;
    font-size: $noteEditTextSize;
    font-weight: $boldSmallTextWeight;
    width: 319px;
    min-height: 69px;
    text-align: center;
    word-break: break-all;
    overflow: hidden;
}

.noteEditControlPanel {
    padding: $paddingMain;
    border-bottom: $border;
}

.noteEditControlPanelBox {
    display: flex;
    gap: 15px;
}

.noteEditInputBox {
    width: 100%;
    margin-top: 15px;
}

.noteEditLongInput {
    width: 100%;
    text-align: left;
    padding: 5px;
}

.noteEditInputSelect {
    cursor: pointer;
    font-size: 20px;
}

.noteEditInputTextArea {
    width: 100%;
    height: 150px;
    text-align: left;
    padding: 5px;
    resize: none;
    cursor: pointer;
}

.noteEditButtonControlPanel {
    padding: $paddingMain;
    display: flex;
    justify-content: space-between;
}

.noteEditButtonControlPanelButton {
    border: $border;
    border-radius: $borderRadius;
    background-color: #FFF;
    padding: $paddingMainButton;
    font-size: $noteEditTextSize;
    font-weight: $boldSmallTextWeight;
    cursor: pointer;
}

.noteEditButtonControlPanelBox {
    display: flex;
    gap: 10px;
}

.noteEditButtonControlPanelButtonRed {
    background-color: #D24040;
}

.noteEditButtonControlPanelButtonGreen {
    background-color: #45B433;
}
</style>