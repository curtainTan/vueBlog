<template>
    <div class="right">
        <Button @click="show">注册/登录</Button>
        <Modal v-model="showLogin" width="360" @on-cancel="hide1" >
            <Tabs :value="logUrl" @on-click='logType'>
                    <TabPane label="登录" name="1">
                        <Form ref="formInline" :model="formInline" :rules="ruleInline">
                            <FormItem prop="user">
                                <Input type="text" size="large" v-model="formInline.user" placeholder="Username">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="password">
                                <Input type="password" size="large" v-model="formInline.password" placeholder="Password">
                                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                        </Form>
                    </TabPane>
                    <TabPane label="注册" name="2">
                        <Form ref="loginData" :model="loginData" :rules="ruleInlog">
                            <FormItem prop="user">
                                <Input type="text" size="large" v-model="loginData.user" placeholder="Username">
                                    <Icon type="ios-person-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="password1">
                                <Input type="password" size="large" v-model="loginData.password1" placeholder="Password">
                                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                            <FormItem prop="passwdCheck">
                                <Input type="password" size="large" v-model="loginData.passwdCheck" placeholder="rePassword">
                                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                                </Input>
                            </FormItem>
                        </Form>
                    </TabPane>
            </Tabs>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="submi">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
export default {
    data(){
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入你的密码...'));
                } else {
                    var yanzheng  = /^[a-z0-9]{6,16}$/
                    if( yanzheng.test( value ) ){
                        // 对第二个密码框单独验证
                        this.$refs.loginData.validateField('passwdCheck');
                        callback()
                    }else{
                        callback(new Error('请输入至少6位密码....'));
                    }
                }
        };
        const validatePassCheck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入你的密码....'));
            }
            if (value !== this.loginData.password1) {
               callback(new Error('与密码不匹配.....'));
            }
            if ( value === this.loginData.user ){
                callback(new Error('密码不能与用户名相同.....'));
            }
            callback();
        };
        return {
            value: '',
            modal_loading: false,
            logUrl: '1',   //1代表登录  2代表注册
            formInline: {
                user: '',
                password: ''
            },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { required: true, message: '用户名必须由数字或字母组成且长度不小于3', pattern: /^[a-z0-9]{3,16}$/, trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码.', trigger: 'blur' },
                    { required: true, pattern: /^[a-z0-9]{6,16}$/, message: '密码必须由数字和字母组成且长度不小于6...', trigger: 'change' }
                ]
            },
            loginData: {
                user: '',
                password1: '',
                passwdCheck: ''
            },
            ruleInlog: {
                user: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    {  message: '用户名必须由数字或字母组成且长度不小于3', pattern: /^[a-z0-9]{3,16}$/, trigger: 'blur' }
                ],
                password1: [
                    // { required: true, type: 'string', min: 6, message: '请输入不少于6位的密码...', trigger: 'blur' },
                    // { required: true, pattern: /^[a-z0-9]{6,16}$/, message: '密码必须由数字和字母组成...', trigger: 'blur' },
                    { required: true, validator: validatePass, trigger: 'change' }
                ],
                passwdCheck: [
                    { required: true, validator: validatePassCheck, trigger: 'change' }
                ]
            }
        }
    },
    beforeMount() {
        var token = window.localStorage.getItem('token')
        if(token){
            this.autoLogin(token).then( res => {
                if( res.data.bgImg ){
                    let app = document.getElementById('app')
                    app.style.backgroundImage = `url("${res.data.bgImg}")`
                }else{
                    console.log('------------------------没有背景图片-----------------------------')
                }
            })
        }
    },
    computed: {
        ...mapGetters(['showLogin'])
    },
    methods: {
        ...mapActions([ 'hide', 'show', 'login', 'register', 'autoLogin' ]),
        ...mapMutations([ 'RECIVE_USERINFO' ]),
        logType(type){
            this.logUrl = type
        },
        hide1(){
            this.hide()
            return
        },
        submi () {
            if(this.logUrl === '1'){
                this.$refs.formInline.validate( valid => {
                    if( valid ){
                        var fordata = {
                            user: this.formInline.user,
                            psw: this.formInline.password
                        }
                        console.log( fordata )
                        this.modal_loading = true;
                        this.login( fordata ).then(res=>{
                            if( res.success ){
                                if( res.bgImg ){
                                    let app = document.getElementById('app')
                                    app.style.backgroundImage = `url("${res.bgImg}")`
                                }else{
                                    console.log('------------------------没有背景图片-----------------------------')
                                }
                                this.modal_loading = false;
                                this.$Message.info({
                                    content : '登录成功....',
                                    duration: 5,
                                });
                                this.hide()
                            }else{
                                this.modal_loading = false;
                                this.$Message.info({
                                    content : res.info,
                                    duration: 5,
                                });
                            }
                        })
                    }
                } )
            }else{
                this.$refs.loginData.validate( valid => {
                    if( valid ){
                        console.log('-------------valid-----------------------')
                        console.log( valid )
                        this.modal_loading = true;
                        var fordata = {
                            user: this.loginData.user,
                            psw: this.loginData.password1
                        }
                        console.log( fordata )
                        this.register( fordata ).then(res=>{
                            console.log(res.data)
                            if(res.data.success){
                                this.modal_loading = false;
                                this.$Message.success({
                                    content: '注册成功.....',
                                    duration: 3
                                });
                                this.$refs.loginData.resetFields()
                                this.loginData.psw = ''
                            }else{
                                this.modal_loading = false;
                                this.$Message.success(res.data.info);
                            }
                        })
                    }
                })
            }
        },
    }
}
</script>
<style scoped>
.ivu-form{
    width: 100%;
}
</style>


<style>
.right .ivu-tabs-tabpane{
    display: flex; 
    align-items: center;
    width: 100%;
}
</style>
