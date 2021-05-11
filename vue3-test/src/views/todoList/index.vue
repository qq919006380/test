<template>
  <input type="text" @keyup.enter="pushText" v-model="text" />
  <div
    class="dotoLists"
    :class="{ editing: item == editTodo }"
    v-for="item in todoLists"
  >
    <!-- edit -->
    <div class="todo edit">
      <input type="text" v-todo-focus="item==editTodo" @blur="doneEdit" v-model="item.text" />
    </div>
    <!-- view -->
    <div @dblclick="edTodo(item)" class="todo view">
      <input type="checkbox" v-model="item.isDone" />
      <div>{{ item.text }}</div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    var data = reactive({
      todoLists: [],
      text: "",
      editTodo: null,
    });
    function pushText() {
      data.todoLists.push({ text: data.text });
      data.text = "";
    }
    function edTodo(item) {
      data.editTodo = item;
    }
    function doneEdit() {
      data.editTodo = null;
    }
    return { ...toRefs(data), pushText, edTodo, doneEdit };
  },
  directives:{
    "todo-focus":(el,{value})=>{
      if(value){
        console.log(el)
        el.focus()
      }
    }
  }
};
</script>


<style lang="less" scoped>
.dotoLists {
  width: 300px;
  margin-bottom: 10px;
  .edit {
    display: none;
  }
  .view {
    display: flex;
  }
  .todo {
    border: solid 1px;
  }
}
.dotoLists.editing {
  .edit {
    display: block;
  }
  .view {
    display: none;
  }
}
</style>