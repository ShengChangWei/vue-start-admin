<template>
  <div class="login-container"
       @keyup.enter.native="handleLogin">
    <el-form ref="loginForm"
             class="login-form"
             auto-complete="on"
             :model="loginForm"
             :rules="loginRules"
             label-position="left">
      <h3 class="title">essence</h3>
      <el-form-item prop="username">
        <span class="fontcontainer">
          <span class="fa fa-user-o"></span>
        </span>
        <el-input v-model="loginForm.username"
                  name="username"
                  type="text"
                  auto-complete="on"
                  placeholder="username" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="fontcontainer">
          <span class="fa fa-key"></span>
        </span>
        <el-input v-model="loginForm.password"
                  name="password"
                  :type="pwdType"
                  placeholder="password"
                  @keyup.enter.native="handleLogin"></el-input>
        <span class="show-pwd fa fa-eye"
              @click="showPwd"></span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   style="width:100%"
                   :loading="loading"
                   @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import loginService from '@/api/login.js';
import { saveUserInfo } from '../../services/auth.service';
import md5 from 'js-md5';

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value.trim().length <= 0) {
        callback(new Error('用户名不能为空'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.trim().length > 5) {
        callback(new Error('密码不能大于5位'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: 'sys',
        password: '1'
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }
        ],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: ''
    };
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = '';
      } else {
        this.pwdType = 'password';
        console.log('2342');
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          const params = {
            username: this.loginForm.username,
            password: md5(this.loginForm.password)
          };
          loginService.loginByUserName(params).then(res => {
            if (res.code === 'ok') {
              this.loading = false;
              saveUserInfo(res.result);
              this.$router.push({ path: '/' });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 16px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .fontcontainer {
    color: #889aa4;
    padding-left: 10px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 90%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-top: 20px;
  }
}
</style>
