import { createStore } from "vuex";
// 创建一个新的 store 实例
const store = createStore({
  strict: true, //严格模式
  state() {
    return {
      count: 0,
      todos: [
        { id: 1, text: "...", done: true },
        { id: 2, text: "...", done: false },
      ],
    };
  },
  getters: {
    doneTodos: (state) => {
      return state.todos.filter(todo => todo.done)
    }
  },
  mutations: {
    increment(state) {
      state.count++;
    },
  },
});

export default store;
