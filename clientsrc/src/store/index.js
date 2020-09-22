import Vue from "vue";
import Vuex from "vuex";
import router from "../router/index";
import { api } from "./AxiosService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: {},
    comments: {},
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    setActiveBoard(state, activeBoard) {
      state.activeBoard = activeBoard;
    },

    setLists(state, lists) {
      state.lists = lists;
    },
    setTasks(state, payload) {
      // state.tasks[payload.id] = payload.tasks;
      // NOTE Vue.set(object from state, your key, your value)
      Vue.set(state.tasks, payload.id, payload.tasks);
    },
    setComments(state, payload) {
      Vue.set(state.comments, payload.id, payload.comments);
    },

    addTask(state, payload) {
      state.tasks[payload.listId].push(payload.task);
    },

    addComment(state, payload) {
      state.comments[payload.taskId].push(payload.comment);
    },

    deleteBoard(state, id) {
      state.boards = state.boards.filter((b) => b.id != id);
    },

    deleteList(state, id) {
      state.lists = state.lists.filter((l) => l.id != id);
    },

    deleteTask(state, payload) {
      state.tasks[payload.listId] = state.tasks[payload.listId].filter(
        (t) => t.id != payload.id
      );
    },
    deleteComment(state, payload) {
      state.comments[payload.taskId] = state.comments[payload.taskId].filter(
        (c) => c.id != payload.id
      );
    },
  },
  actions: {
    //#region -- AUTH STUFF --
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getProfile({ commit }) {
      try {
        let res = await api.get("/profile");
        commit("setUser", res.data);
      } catch (err) {
        console.error(err);
      }
    },
    //#endregion

    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get("boards").then((res) => {
        commit("setBoards", res.data);
      });
    },
    async deleteBoard({ commit }, id) {
      await api.delete("boards/" + id);
      commit("deleteBoard", id);
    },

    async deleteList({ commit }, id) {
      await api.delete("lists/" + id);
      commit("deleteList", id);
    },

    async deleteTask({ commit }, payload) {
      await api.delete("tasks/" + payload.id);
      commit("deleteTask", payload);
    },

    async deleteComment({ commit }, payload) {
      await api.delete("comments/" + payload.id);
      commit("deleteComment", payload);
    },

    addBoard({ commit, dispatch }, boardData) {
      api.post("boards", boardData).then((serverBoard) => {
        dispatch("getBoards");
      });
    },

    async getActiveBoard({ commit }, id) {
      try {
        let res = await api.get("boards/" + id);
        commit("setActiveBoard", res.data);
      } catch (error) {
        console.error("cannot get active board");
      }
    },

    async getListsByBoardId({ commit }, id) {
      try {
        let res = await api.get("boards/" + id + "/lists");
        commit("setLists", res.data);
      } catch (error) {
        console.error("cannot get lists");
      }
    },

    //#endregion

    //#region -- LISTS --
    async getTasksByListId({ commit }, id) {
      try {
        let res = await api.get("lists/" + id + "/tasks");
        commit("setTasks", { tasks: res.data, id });
      } catch (error) {
        console.error("cannot get tasks");
      }
    },

    async getCommentsByTaskId({ commit }, id) {
      try {
        let res = await api.get("tasks/" + id + "/comments");
        commit("setComments", { comments: res.data, id });
      } catch (error) {
        console.error("cannot get comments");
      }
    },

    async createList({ commit, state }, newList) {
      let res = await api.post("lists", newList);
      commit("setLists", [...state.lists, res.data]);
    },

    async createTask({ dispatch, commit }, newTask) {
      let res = await api.post("tasks", newTask);
      commit("addTask", { listId: res.data.listId, task: res.data });
      // NOTE This worked too, but it requires an extra call to the database
      // dispatch("getTasksByListId", res.data.listId);
    },

    async createComment({ commit }, newComment) {
      let res = await api.post("comments", newComment);
      commit("addComment", { taskId: res.data.taskId, comment: res.data });
    },
    //#endregion
  },
});
