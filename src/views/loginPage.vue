<template>
    <div class="loginPage">
        <form class="login" @submit.prevent="login">
            <h1>Sign in</h1>
            <label>Email</label>
            <input required v-model="email" type="email" placeholder="Name"/>
            <label>Password</label>
            <input required v-model="password" type="password" placeholder="Password"/>
            <hr/>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';
    export default {
        name: 'loginPage',
        data(){
            return{
                email: '',
                password: ''
            }
        },
        methods: {
            ...mapActions([
                'LOGIN_USER'
            ]),
            login() {
                let loginData = {
                    email: this.email,
                    password: this.password
                };
                this.LOGIN_USER(loginData).then(() => this.$router.push('/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>

</style>
