import mem from "@/service/member";
export default {
  namespaced: true,
  state: {
    context: "",
    todolist: []
  },
  getters: {
    showcontext: (state, getters) => {
      return getters.todolist.length;
    }
  },
  actions: {
    sendcontext({commit}, data) {
      let name = data.name;
      let context = data.context;
      const result = mem.sendcontext(name, context);
      result.then((data) => {
        console.log(data);
      });
      return result;
    },
    showcontext({commit}) {
      const result = mem.showcontext();
      result.then((data) => {
        // console.log(data);
        commit("showcontext", data.data);
      })
        return result;
    }
  },
  mutations: {
    showcontext(state, data) {
      state.todolist = data;
    }
  }
}
