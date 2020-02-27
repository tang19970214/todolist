import mem from "@/service/member";
import axios from 'axios';

export default {
  namespaced: true,
  state: {
    login: false,
    name: ""
  },
  getters: {},
  actions: {
    msg({
      commit
    }, data) {
      alert(data);
    },
    login({
      commit,
      dispatch
    }, data) {
      const result = mem.login(data.account, data.password);
      result.then((data) => {
        console.log(data);
        // dispatch("msg","XXXXXXXX");

        // let userlogin = {
        //   status: false,
        //   name: 
        // };
        if (data.data.status == "success") {
          // state.name = data.data.data.name;
          localStorage.setItem("token", data.data.data.api_token);
          dispatch("msg", "登入成功！");
          commit("setUser", {
            status: true,
            name: data.data.data.name
          });
        } else {
          dispatch("msg", "登入失敗，請重新嘗試!");
        }
      });
      return result;
    },
    checkuser({
      commit
    }) {
      const result = mem.checkuser();
      result.then((data) => {
        // console.log(data.data);
        let user = {
          status: false,
          name: "匿名"
        }
        if (data.data.status) {
          user.status = true;
          user.name = data.data.result.name;
        }
        commit("setUser", user);
      });
      return result;
    },
    logout({
      commit
    }) {
      commit("signoutUser", data);
      return;
    },
    register({commit}, data) {
      let name = data.name;
      let account = data.account;
      let password = data.password
      const result = mem.register(name, account, password);
      result.then((data) => {
        console.log(data);
      });
      return result;
    }
  },
  mutations: {
    setlogin(state, data) {
      state.login = data;
    },
    setUser(state, data) {
      // console.log(data);
      state.login = data.status;
      state.name = data.name;
    },
    // signout
    signoutUser(state, data) {
      state.login = false;
      console.log(data);
    }
  }
}
