import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tree: [
      {id: 1, style: "position: absolute; left: 39vw; top: 220px;"},
      {id: 2, style: "position: absolute; left: 42vw; top: 230px;"},
      {id: 3, style: "position: absolute;  left: 55vw;  top: 200px;"},
      {id: 4, style: "position: absolute;  left: 44vw;  top: 180px;"},
      {id: 5, style: "position: absolute;  left: 60vw;  top: 250px;"},
      {id: 6, style: "position: absolute;  left: 49vw;  top: 130px;"},
  ],
  basket: []
  },
  mutations: {
    removeFromTree(state, apples) {
        for (let i = 0; i < apples.length; i++) {
            const apple = apples[i]
            let index = state.tree.findIndex(treeApple => apple.id == treeApple.id)
            state.tree.splice(index, 1)
        }
    },
    addToBasket(state, apples) {
        state.basket.unshift(...apples)
    }
},
actions: {
    removeFromTree({ commit }, apple) {
        commit("removeFromTree", apple)
    },
    addToBasket({ commit }, apple) {
        commit("addToBasket", apple)
    }
},
getters: {
    getBasket: state => state.basket,
    getTree: state => state.tree
}
})
