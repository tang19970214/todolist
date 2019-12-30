<template>
  <div class="bg">
    <div class="vertical-container txt">
      Welcome To ToDoList !
    </div>

    <div class="vertical-container">
      <el-input class="ipt" placeholder="請輸入您的備忘事項" v-model="newitem" clearable>
      </el-input>

      <el-button
        class="vertical-container__martwo"
        @click="correct"
        v-on:keyup.enter="submit"
        type="primary"
        icon="el-icon-edit"
        circle
      ></el-button>
    </div>

    <div class="vertical-container t_tenp">
      <ul class="content__ul">
        <li class="content__ul-li" v-for="(item, index) in list" :key="index">
          <i class="el-icon-delete-solid" @click="del(index)"></i>
          <a class="" style="font-family: monospace,Microsoft JhengHei;">{{ item.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newitem: '',
      list: [],
    };
  },
  methods: {
    correct() {
      const vm = this;
      if (vm.newitem === '') {
        alert('您尚未輸入任何有效字元！');
      } else {
        // alert('success!');
        vm.list.push({
          name: vm.newitem,
        });
        vm.newitem = '';
      }
    },
    del(index) {
      const vm = this;
      vm.$confirm('確定要刪除嗎?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
          vm.list.splice(index, 1);
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
  },
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
.t {
  &_tenp {
    top: 10%;
  }
}
.bg {
  width: 100vw;
  height: 100vh;
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
  // position: relative;
  text-align: center;
  // top: 10%;
  height: 30vh;
  font-size: 3.5rem;
  letter-spacing: 1.5rem;
  color: #fff;
}
.ipt {
  width: 20vw;
}

.content {
  position: relative;
  width: 100vw;
  top: 10%;
  text-align: center;
  &__ul {
    list-style-type: none;
    &-li {
      text-align: left;
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
        font-size: 36px;
        -webkit-text-stroke: 2px black;
        font-weight: bold;
        color: white;
        letter-spacing: 1px;
        margin-left: 1vw;
      }
    }
  }
}
</style>
