import Vue from 'vue';
import Vuex from 'vuex';
import mem from './modules/member';
import context from './modules/context';
Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    member: mem,
    context: context
  }
});
// return ;
// export default new Vuex.Store({

//     state:{
//         content: "this",
//         todolist:[],
//         member:{
//             name:""    
//         },
//         login:false,

//     },
//     actions: {
//         test({commit},data){
//             commit("settodolist",{
//                 name: data.name,
//                 content: data.content
//             });
//         },
//         checkuser(){
//             axios.get("checkuser");
//             commit("setuser",{
//                 name:"",
//             });
//         }
//     },
//     mutations: {
//         setlogin(state,data){
//             state.login=data;
//         },
//         setuser(state,data){
//             state.member.name=data.name;
//         },
//         settodolist(state,data){
//             state.todolist.push({
//                 name:data.name,
//                 content:data.content
//             });
//             // console.log(data);

//         }
//     }
// });
