<template>
    <div class="mainLayout page-container">
        <md-app class="mainLayout__content mainLayout__content-height" md-mode="fixed">
            <md-app-toolbar class="md-primary">
                <h3 class="md-title" style="flex: 1">Agroru Test</h3>
                <md-button v-if="GET_USER" @click="logOut">Выйти</md-button>
            </md-app-toolbar>
            <md-app-content :class="{'mainLayout__loading': GET_LOADING}">
                <div class="mainLayout__content">
                    <md-progress-spinner v-if="GET_LOADING" :md-diameter="100" :md-stroke="10" md-mode="indeterminate"></md-progress-spinner>
                    <slot v-else />
                </div>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import { mapGetters,mapActions } from 'vuex';
    export default {
        name: "mainLayout",
        data(){
            return{
                loading: false
            }
        },
        methods:{
            ...mapActions(['LOGOUT']),
            async logOut(){
                await this.LOGOUT();
                this.$router.push('/');
            }
        },
        computed:{
            ...mapGetters([
                'GET_LOADING',
                'GET_USER'
            ])
        },
    }
</script>

<style scoped lang="scss">
    .mainLayout{
        &__content{
            &-height{
                height: 100vh;
            }
        }
        &__loading{
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>
