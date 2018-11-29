<template>
    <div class="about">
        <ButtonGroup vertical>
            <Button @click="goBack" icon="ios-undo-outline"></Button>
            <Button @click="show" icon="ios-menu"></Button>
        </ButtonGroup>
        <Drawer placement="left" :closable="false" v-model="value2">
            <div class="title" slot>
                <h1>我是头部</h1>
            </div>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
        <div class="showAll">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            value2 : false
        }
    },
    methods: {
        show(){
            this.value2 = true
        },
        goBack(){
            this.$router.go( -1 )
        }
    }
}
</script>
<style scoped>
.about{
    position: relative;
    top: 40px;
    width: 960px;
    margin: 0px auto;
    background-color: rgba(255, 255, 255, 0.575);
    border-radius: 8px;
    min-height: 90vh;
}
.showAll{
    margin-top: 0px;
}
</style>

<style>
.about .ivu-btn-group{
    position: fixed;
    left: 100px;
    top: 200px;
}

</style>
