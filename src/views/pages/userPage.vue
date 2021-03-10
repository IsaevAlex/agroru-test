<template>
    <div class="md-layout md-gutter md-alignment-center userPage">
        <h1 class="md-display-1 userPage__title">Личная страница</h1>
        <div class="userPage__messages">
            <md-list v-if="GET_INFO_MESSAGE"  >
                <md-divider></md-divider>
                <md-list-item @click="closeInfoMessage">
                    <span class="md-subheading userPage__message">{{ GET_INFO_MESSAGE }}</span>
                    <md-icon>close</md-icon>
                </md-list-item>
                <md-divider></md-divider>
            </md-list>
        </div>
        <div class="userPage__content">
            <div class="userPage__logoSection">
                <div class="userPageLogo userPage__logo" :style="{'background-image': 'url(' + user.photo + ')' }"></div>
            </div>
            <div class="userPage__info">
                <div class="userPage__item userPage__item-mb userPage__name">
                    <span class="md-caption">Логин</span>
                    <span class="md-headline">{{ user.login }}</span>
                </div>
                <div class="userPage__item userPage__item-mb userPage__name">
                    <span class="md-caption">Имя</span>
                    <span class="md-headline">{{ user.name }}</span>
                </div>
                <div class="userPage__item userPage__item-mb userPage__name">
                    <span class="md-caption">Фамилия</span>
                    <span class="md-headline">{{ user.last_name }}</span>
                </div>
                <div class="userPage__item userPage__item-mb userPage__name">
                    <span class="md-caption">Отчество</span>
                    <span class="md-headline">{{ user.second_name }}</span>
                </div>
                <div class="userPage__item userPage__item-mb userPage__name">
                    <span class="md-caption">Город</span>
                    <span class="md-headline">{{ user.city }}</span>
                </div>
                <div class="userPage__item userPage__item-mb userPage__name">
                    <span class="md-caption">День рождения</span>
                    <span class="md-headline">{{ user.birthday }}</span>
                </div>
                <div class="userPage__item userPage__item-mb userPage__name">
                    <span class="md-caption">Пол</span>
                    <span class="md-headline">{{ user.gender }}</span>
                </div>
                <div class="userPage__item userPage__item-mb userPage__name">
                    <span class="md-caption">Часовой пояс</span>
                    <span class="md-headline">{{ user.timezone }}</span>
                </div>
                <div class="userPage__item userPage__item-mb userPage__name">
                    <span class="md-caption">Список контактов</span>
                    <span class="md-headline" v-if="user.contacts.length > 0">{{ user.contacts }}</span>
                    <span class="md-headline" v-else>Пуст</span>

                </div>
            </div>
        </div>
        <div class="userPage__btn">
            <router-link to="/user/edit">
                <md-button class="userPage__btn md-raised md-primary">Редактировать профиль</md-button>
            </router-link>
        </div>

    </div>
</template>

<script>
    import { mapGetters,mapActions } from 'vuex';
    export default {
        name: 'userPage',
        methods:{
            ...mapActions(['CLEAR_INFO_MESSAGE']),
            closeInfoMessage(){
                this.CLEAR_INFO_MESSAGE(null);
            }
        },
        created() {
            this.user = this.GET_USER;
        },
        computed:{
            ...mapGetters([
                'GET_USER',
                'GET_INFO_MESSAGE'
            ])
        }
    }
</script>

<style scoped lang="scss">
    .userPage{
        display: flex;
        flex-direction: column;
        &__messages{
            margin: 0 0 20px 0;
        }
        &__message{
            white-space: pre-line;
            color: green;
        }
       &__content{
           display: grid;
           grid-template-columns: 1fr 2fr;
           margin-bottom: 2em;
       }
        &__item{
            display: flex;
            flex-direction: column;
            &-mb{
                margin-bottom: 1em;
            }
        }
    }
</style>
