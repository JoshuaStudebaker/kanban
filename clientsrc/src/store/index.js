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

    //#endregion

    //#region -- LISTS --

    //#endregion
  },
});
