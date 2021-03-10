<template>
    <div class="md-layout md-gutter md-alignment-center loginPage">
        <form class="md-layout-item md-size-35 md-medium-size-33 md-small-size-50 md-xsmall-size-100 loginPage__form" @submit.prevent="login">
            <h1 class="md-display-1 loginPage__title">Вход</h1>
            <div class="loginPage__errors">
                <div v-for="error in GET_LOGIN_ERRORS" :key="error">
                    <span class="md-subheading loginPage__error">{{ error }}</span>
                </div>
            </div>
            <md-field>
                <md-icon>email</md-icon>
                <md-input placeholder="Логин" required v-model="email"></md-input>
            </md-field>
            <md-field>
                <md-icon>password</md-icon>
                <md-input placeholder="Пароль" required v-model="password" type="password"></md-input>
            </md-field>
            <div class="loginPage__btnSection">
                <md-button class="loginPage__btn md-raised md-primary" type="submit">Войти</md-button>
            </div>
        </form>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: 'loginPage',
        data(){
            return{
                email: '',
                password: ''
            }

        },
        methods: {
            ...mapActions(['LOGIN_USER', 'GET_INFO_USER', 'LOADING']),
            async login() {
                let loginData = {
                    email: this.email,
                    password: this.password
                };
                await this.LOADING(true);
                try{
                    await this.LOGIN_USER(loginData);
                    await this.GET_INFO_USER(true);
                    await this.LOADING(false);
                }
                catch (err) {
                    console.dir(err);
                    await this.LOADING(false);
                }
            }
        },
        computed:{
            ...mapGetters([
                'GET_LOGIN_ERRORS'
            ])
        }
    }
</script>

<style scoped lang="scss">
    .loginPage{
        padding: 1em;
        &__title{
            text-align: center;
        }
        &__btnSection{
            text-align: center;
        }
        &__error{
            color: red;
        }
    }
</style>
