<template>
    <div class="notFoundPage">
        <md-empty-state
                md-icon="error"
                md-label="Cтраница не найдена"
                md-description="Cтраница по данному адресу не найдена">
                <md-button to="/" class="md-primary md-raised">На главную страницу</md-button>
        </md-empty-state>
    </div>
</template>

<script>
    export default {
        name: 'notFoundPage',
    }
</script>

<style scoped lang="scss">
    .notFoundPage{
        height: 100vh;
        display: flex;
    }
</style>


