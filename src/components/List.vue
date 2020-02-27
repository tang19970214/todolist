<template>
  <div class="bg">
    <div class="vertical-container txt">Welcome To ToDoList!</div>

    <div class="vertical-container">
      <el-input class="ipt" placeholder="請輸入您的備忘事項" v-model="newitem" clearable></el-input>

      <el-button
        class="vertical-container__martwo"
        @click="correct"
        v-on:keyup.enter="submit"
        type="primary"
        icon="el-icon-edit"
        circle
      ></el-button>
    </div>

    <div class="veritcal-container">
      <div class="container content">
        <div class="row content__li" v-for="(item, index) in todolist" :key="index">
          <div class="col-1 vertical-container">
            <i class="el-icon-delete-solid" @click="del(index)"></i>
          </div>
          <div class="col-1 vertical-container">
            <i class="el-icon-edit-outline" @click="fix(index)" v-b-modal.modal-fix></i>
          </div>
          <div class="col">
            <a style="font-size: 36px">{{ item.context }}</a>
          </div>
          <div class="col-3 vertical-container">
            <a style="font-size: 30px">{{ item.name }}</a>
          </div>
          <div class="col-3 vertical-container">
            <a style="font-size: 20px;">{{ item.createtime }}</a>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
    <b-modal id="modal-fix" size="md" title="修改" hide-footer>
      <div class="d-block text-center">
        <b-input-group prepend="留言" class="mt-3">
          <!-- <b-form-input type="text" value="測試中" v-model="fixcontext" /> -->
        </b-input-group>
      </div>
      <div>
        <div class="float-right">
          <b-button class="mt-3" variant="info" @click="correctfix" style="float:left">確定修改</b-button>
          <b-button
            class="mt-3"
            variant="danger"
            @click="$bvModal.hide('modal-fix')"
            style="float:left;margin-left:5px;"
          >取消</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import store from "@/store";
import axios from "axios";
import mem from "@/service/member";

export default {
  data() {
    return {
      name: "",
      newitem: ""
    };
  },
  computed: {
    todolist: {
      get() {
        return store.state.context.todolist;
      },
      set(data) {
        console.log(data);
        store.state.context.todolist = data;
      }
    },
    username: {
      get() {
        return store.state.member.name;
      }
    }
  },
  methods: {
    correct() {
      const vm = this;
      if (vm.newitem === "") {
        alert("您尚未輸入任何有效字元！");
      } else {
        const msg = {
          name: this.username,
          context: this.newitem
        };
        store.dispatch("context/sendcontext", msg).then(data => {
          console.log(data);
          // vm.todolist = data.data;
        });
        vm.newitem = "";
      }
    },
    del(index) {
      const vm = this;
      vm.$confirm("確定要刪除嗎?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          vm.todolist.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // Modal修改
    correctfix() {
      const vm = this;
      alert("success");
      // vm.fixcontext.splice(index, 1);
    }
  },
  created() {
    store.dispatch("context/showcontext").then(data => {
      console.log(data);
    });
  }
};
</script>

<style lang="scss">
.vertical-container {
  position: relative;
  display: -webkit-flex;
  display: flex;
  text-align: center;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  &__martwo {
    margin-left: 2vw;
  }
}
.bg {
  width: 100vw;
  height: auto;
  padding-bottom: 10vh;
  background-size: 100%;
  background-position: center;
  background-image: linear-gradient(
      to right bottom,
      rgba(126, 213, 111, 0.8),
      rgba(40, 180, 133, 0.8)
    ),
    url("https://images.unsplash.com/photo-1563432065121-35b49977c4fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80");
}
.txt {
  font-family: "Lato", sans-serif;
  text-align: center;
  height: 30vh;
  font-size: 3.5rem;
  letter-spacing: 1.5rem;
  color: #fff;
}
.ipt {
  width: 30vw;
}
.content {
  margin-top: 3vw;
  &__li {
    border-bottom-style: solid;
    border-bottom-color: rgba(100, 100, 100, 0.6);
    border-bottom-width: 0.05rem;
    i {
      cursor: pointer;
      color: rgba(100, 100, 100, 0.6);
      font-size: 28px;
      &:hover {
        color: rgba(255, 0, 0, 0.7);
        position: relative;
        display: inline-block;
        transition: all 0.5s;
        transform: translateX(5px);
      }
    }
    a {
      font-family: monospace, "Microsoft JhengHei";
      -webkit-text-stroke: 2px black;
      font-weight: bold;
      color: white;
      letter-spacing: 1px;
      margin-left: 1vw;
    }
  }
}
</style>
