<template>
    <div class="userPage">
        <h1>userPage</h1>
        <button @click="getInfo">
            Get User Info
        </button>
    </div>
</template>

<script>
    export default {
        name: 'userPage',
        methods:{
            getInfo(){
                this.$store.dispatch('GET_INFO_USER');
            }
        }
    }
</script>

<style scoped>

</style>
