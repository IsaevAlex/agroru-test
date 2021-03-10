<template>
    <div class="md-layout md-gutter md-alignment-center userEditPage userEditPage-mb">
        <h1 class="md-display-1 userPage__title">Редактирование профиля</h1>
        <div class="userEditPage__messages">
            <md-list v-if="GET_LOGIN_ERRORS"  >
                <md-divider></md-divider>
                <md-list-item @click="closeErrorMessage">
                    <span class="md-subheading userEditPage__message">{{ GET_LOGIN_ERRORS }}</span>
                    <md-icon>close</md-icon>
                </md-list-item>
                <md-divider></md-divider>
            </md-list>
        </div>
        <form class="userEditPage__form" @submit.prevent="saveChanges">
            <div class="userEditPage__content">
                <div class="userEditPage__logoSection">
                    <div class="userPageLogo userEditPage__logo" :style="{'background-image': 'url(' + user.photo + ')' }"></div>
                    <input type="file" accept="image/png, image/jpeg" id="file" ref="file" @change="handleFileUpload()"/>
                </div>
                <div class="userEditPage__info">
                    <div class="userEditPage__item userEditPage__name">
                        <md-field>
                            <label>Логин</label>
                            <md-input required v-model="user.login">
                            </md-input>
                        </md-field>
                    </div>
                    <div class="userEditPage__item userEditPage__name">
                        <md-field>
                            <label>Имя</label>
                            <md-input required v-model="user.name"></md-input>
                        </md-field>
                    </div>
                    <div class="userEditPage__item userPage__name">
                        <md-field>
                            <label>Фамилия</label>
                            <md-input required v-model="user.last_name"></md-input>
                        </md-field>
                    </div>
                    <div class="userEditPage__item userPage__name">
                        <md-field>
                            <label>Отчество</label>
                            <md-input required v-model="user.second_name"></md-input>
                        </md-field>
                    </div>
                    <div class="userEditPage__item userPage__name">
                        <md-field>
                            <label>Город</label>
                            <md-input required v-model="user.city"></md-input>
                        </md-field>
                    </div>
                    <div class="userEditPage__item userPage__name">
                        <md-datepicker v-model="user.birthday" >
                            <label>День рождения</label>
                        </md-datepicker>
                    </div>
                    <div class="userEditPage__item userEditPage__item-mb userPage__name">
                        <label>Пол</label>
                        <v-select v-model="user.gender" :options="genders"></v-select>
                    </div>
                    <div class="userEditPage__item userEditPage__item-mb userPage__name">
                        <label>Часовой пояс</label>
                        <v-select v-model="user.timezone" :options="timezones"></v-select>
                    </div>
                </div>
            </div>
            <div class="userEditPage__btn">
                <md-button class="userEditPage__btn md-raised" to="/user">На главную</md-button>
                <md-button class="userEditPage__btn md-raised md-primary" type="submit">Сохранить</md-button>
            </div>
        </form>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    export default {
        name: 'userEditPage',
        created() {
            this.user = this.GET_USER;
        },
        data(){
            return{
                timezones: [1,2,3,4,5,6,7,8,9,10,11],
                genders: ['М','F'],
                file: '',
                user: {},
                imgErrors: ''
            }
        },
        methods:{
            ...mapActions(['CLEAR_ERROR_MESSAGE','SAVE_CHANGES', 'LOADING', 'GET_INFO_USER', 'SAVE_IMAGE_CHANGES']),
            closeErrorMessage(){
                this.CLEAR_ERROR_MESSAGE(null);
            },
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            },
            checkImage(){
              if (this.file){
                  this.saveImageChanges();
              }else{
                  return false;
              }
            },
            async saveImageChanges(){
                let imageData= new FormData();
                imageData.append('file', this.file);
                try{
                    await this.SAVE_IMAGE_CHANGES(imageData);
                } catch (e) {
                    console.log(e);
                }
            },
            async saveChanges() {
                let saveData = {
                    login: this.user.login,
                    last_name: this.user.last_name,
                    name: this.user.name,
                    second_name: this.user.second_name,
                    gender: this.user.gender,
                    birthday: this.user.birthday,
                    timezone: Number(this.user.timezone),
                    city: this.user.city
                };
                this.checkImage();
                this.LOADING(true);
                try {
                    await this.SAVE_CHANGES(saveData);
                    await this.GET_INFO_USER();
                    await this.LOADING(false);
                } catch (err) {
                    await this.LOADING(false);
                    console.log(err);
                }
            }
        },
        computed:{
            ...mapGetters([
                'GET_USER',
                'GET_LOGIN_ERRORS'
            ])
        }
    }
</script>

<style scoped lang="scss">
    .userEditPage{
        display: flex;
        flex-direction: column;
        &__messages{
            margin: 0 0 20px 0;
        }
        &__message{
            white-space: pre-line;
            color: red;
        }
        &__btn{
            text-align: center;
        }
        &__logoSection{
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        &__logo{
            margin-bottom: 1em;
        }
        &-mb{
            margin-bottom: 2em;
        }
        &__content{
            display: grid;
            grid-template-columns: 1fr 2fr;
            margin-bottom: 2em;
            grid-column-gap: 1em;

            @media screen and (max-width: 500px){
                grid-template-columns: 1fr;
            }
        }
        &__item{
            display: flex;
            flex-direction: column;
            &-mb{
                margin-bottom: 24px;
            }
        }
    }

</style>
