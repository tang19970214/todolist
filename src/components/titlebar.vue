<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="light">
      <b-navbar-brand class="h1" href="/" style="color:black">ToDoList {{userlogin}}</b-navbar-brand>

      <b-navbar-nav class="ml-auto">
        <div v-show="!userlogin">
          <b-button variant="outline-primary" right @click="showLogin=true">會員登入</b-button>
        </div>
        <div v-show="userlogin">
          <a>歡迎回來，{{name}}</a>
          <b-button
            class="ct-3"
            style="margin-left:8px"
            @click="signout"
            variant="outline-secondary"
            pill
          >登出</b-button>
        </div>
      </b-navbar-nav>
    </b-navbar>

    <!-- 登入Modal -->
    <b-modal v-model="showLogin" id="modal-multi-1" size="md" title="會員登入" hide-footer>
      <div class="d-block text-center">
        <b-input-group prepend="帳號" class="mt-3">
          <b-form-input type="email" placeholder="請輸入您的電子郵件" v-model="account" />
        </b-input-group>
        <b-input-group prepend="密碼" class="mt-3">
          <b-form-input type="password" v-model="password" />
        </b-input-group>
      </div>
      <div>
        <div class="float-left">
          <b-button class="mt-3" @click="showRegister=true" variant="success">註冊</b-button>
        </div>
        <div class="float-right">
          <b-button class="mt-3" variant="info" @click="signin" style="float:left">登入</b-button>
          <b-button
            class="mt-3"
            variant="danger"
            @click="$bvModal.hide('modal-multi-1')"
            style="float:left;margin-left:5px;"
          >取消</b-button>
        </div>
      </div>
    </b-modal>

    <!-- 註冊Modal -->
    <b-modal v-model="showRegister" id="modal-multi-2" size="md" title="註冊" hide-footer>
      <div class="d-block text-center">
        <b-input-group prepend="使用者名稱" class="mt-3">
          <b-form-input placeholder="請輸入您的暱稱" v-model="username" />
        </b-input-group>
        <b-input-group prepend="帳號" class="mt-3">
          <b-form-input type="email" placeholder="請輸入您的電子郵件" v-model="account" />
        </b-input-group>
        <b-input-group prepend="密碼" class="mt-3">
          <b-form-input type="password" placeholder="請輸入您的密碼" v-model="password" />
        </b-input-group>
        <b-input-group prepend="確認密碼" class="mt-3">
          <b-form-input type="password" placeholder="重新輸入一次您的密碼" v-model="checkpassword" />
        </b-input-group>
      </div>
      <div>
        <div class="float-right">
          <b-button class="mt-3" variant="info" @click="register" style="float:left">註冊</b-button>
          <b-button
            class="mt-3"
            variant="danger"
            @click="$bvModal.hide('modal-multi-2')"
            style="float:left;margin-left:5px;"
          >取消</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import store from "@/store";
import sup from "@/service/support";
import mem from "@/service/member";

export default {
  data() {
    return {
      username: "",
      account: "",
      password: "",
      checkpassword: "",
      // name: this.name,
      showLogin: false,
      showRegister: false
      // userlogin: false
    };
  },
  computed: {
    userlogin: {
      get() {
        return store.state.member.login;
      },
      set(data) {
        // console.log(data);
        store.state.member.login = data;
        // let whologin = store.state.member.login;
        // if (!whologin) {
        //   this.name = "匿名使用者";
        // }
      }
    },
    name: {
      get() {
        return store.state.member.name;
      },
      set(data) {
        console.log(data);
        store.state.member.name = data;
      }
    }
  },
  methods: {
    signout() {
      const r = confirm("確定要登出嗎？");
      if (r == true) {
        localStorage["token"] = "";
        this.userlogin = false;
        alert("已成功登出!");
      }
    },
    signin() {
      const information = {
        account: this.account,
        password: this.password
      };
      store.dispatch("member/login", information).then(data => {
        if (data.data == "login fail") {
          // alert("登入失敗，請重新嘗試！");
          this.account = this.password = "";
        } else {
          this.showLogin = false;
        }
      });
      // .then(data => {
      //   console.log(data);
      //   if (data.data == "login fail") {
      //     alert("登入失敗，請重新嘗試！");
      //     this.account = this.password = "";
      //   } else {
      //     alert("登入成功！");
      //     this.showLogin = false;
      //     this.userlogin = true;
      //     this.name = data.data.data.name;
      //   }
      // });
    },
    register() {
      // 註冊
      const memberdata = {
        name: this.username,
        account: this.account,
        password: this.password,
        checkpassword: this.checkpassword
      };
      // console.log(memberdata);
      if (
        this.username == "" ||
        this.account == "" ||
        this.password == "" ||
        this.checkpassword == ""
      ) {
        alert("有欄位尚未填寫，請再確認！");
      } else if (this.password !== this.checkpassword) {
        alert("密碼輸入不同，請重新輸入");
        this.password = "";
        this.checkpassword = "";
      } else {
        store.dispatch("member/register", memberdata).then(data => {
          console.log(data);
          if (data.status === 200) {
            alert("註冊成功！");
            this.showRegister = false;
          } else {
            alert("電子信箱重複，請重新輸入！");
            this.account = "";
          }
        });
        // mem.post("register", memberdata).then(data => {
        //   console.log(data);
        //   if (data.status === 200) {
        //     alert("註冊成功！");
        //     this.showRegister = false;
        //   } else {
        //     alert("電子信箱重複，請重新輸入！");
        //     this.account = "";
        //   }
        // });
      }
    }
  }
};
</script>

<style lang="scss">
</style>