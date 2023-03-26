<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Platform-Web-Template</div>
        <mi-form :model="param" :rules="rules" ref="login" labmi-width="0px" class="ms-content">
          <mi-form-item prop="username">
            <mi-input v-model="param.username" placeholder="username">
              <template #prepend>
                <mi-icon size="24"><UserFilled /></mi-icon>
              </template>
            </mi-input>
          </mi-form-item>
          <mi-form-item prop="password">
            <mi-input type="password" placeholder="password" v-model="param.password"
              @keyup.enter="submitForm()">
              <template #prepend>
                <mi-icon size="24"><Lock /></mi-icon>
              </template>
            </mi-input>
          </mi-form-item>
          <div class="login-btn">
            <mi-button type="primary" @click="submitForm()">登录</mi-button>
         </div>
        </mi-form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { UserFilled, Lock } from '@element-plus/icons-vue'

import { login as loginRequest } from '@/api/user'
import { setToken } from '@/utils'

export default {
  setup () {
    const router = useRouter()
    const param = reactive({
      username: 'admin',
      password: 'macro123'
    })

    const rules = {
      username: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
      ]
    }
    const login = ref(null)
    const submitForm = () => {
      login.value.validate((valid) => {
        if (valid) {
          loginRequest(param).then(res => {
            console.log(res)
            const data = res
            setToken(data.tokenHead + data.token)
            ElMessage.success('登录成功')
            localStorage.setItem('ms_username', param.username)
            router.push('/')
          })
        }
      })
    }

    return {
      param,
      rules,
      login,
      submitForm
    }
  },
  components: {
    UserFilled,
    Lock
  }
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
</style>
