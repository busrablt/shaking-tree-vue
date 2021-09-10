<template>
<div id="app">
  <div class="main-view">
    <div class="tree-area">
      <img
        id="tree"
        alt="tree"
        src="./assets/tree.png"
        :class="{ shake: shakeAnimated }"
      />
      <img
        v-for="apple in treeApples"
        :key="apple.id"
        :style="apple.style"
        :id="apple.id"
        src="./assets/apple.svg"
        alt="apple"
        class="apple"
        :class="[{drop: selectedDropApples.findIndex((element) => element.id == apple.id) != -1}]"
      />
    </div>
    <img src="./assets/basket0.png" alt="basket" height="100" />
    <img
      v-for="apple in basket"
      :key="apple.id"
      :id="apple.id"
      src="./assets/apple.svg"
      alt="apple"
    />
  </div>

  <button @click="shakeIt" class="button-style" :disabled="loading">
    SHAKE
  </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
  data: () => ({
    shakeAnimated: false,
    dropAnimated: false,
    selectedDropApples: [],
    loading: false,
  }),
  computed: {
    ...mapGetters({ treeApples: "getTree", basket: "getBasket" }),
  },
  methods: {
    ...mapActions({
      removeFromTree: "removeFromTree",
      addToBasket: "addToBasket",
    }),
    randomIntFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    // Starts the logic and shakes the tree
    async shakeIt() {
      try {
        // To deactivate the shake button
        this.loading = true
        if (this.treeApples.length != 0) {
          this.selectedDropApples = []
          const self = this
          self.shakeAnimated = true
          // To finish the animation, I created a 'Promise'
          await new Promise((resolve) =>
            setTimeout(() => {
              self.shakeAnimated = false
              self.selectRandom()
              self.dropApple()
              resolve("done")
            }, 3000)
          )
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }

    },
    // Triggers the .drop animation for apple
    dropApple() {
      const self = this
      self.dropAnimated = true
      setTimeout(() => {
        self.dropAnimated = false
        this.moveApple()
      }, 1000)
    },
    // Moves the dropping apples through store
    moveApple() {
      this.removeFromTree(this.selectedDropApples)
      this.addToBasket(this.selectedDropApples)
    },
    // Select randomly apples from tree
    selectRandom() {
      let selectedOnes = []
      let nApplesToDrop
      if (this.treeApples.length != 1) {
        nApplesToDrop = this.randomIntFromInterval(
          0,
          Math.floor(this.treeApples.length / 2)
        )
      } else {
        nApplesToDrop = 1
      }

      if (nApplesToDrop != 0) {
        for (let i = 0; i < nApplesToDrop; i++) {
          let randomIndex = this.randomIntFromInterval(
            0,
            this.treeApples.length - 1
          )
          let randomApple = this.treeApples[randomIndex]
          if (
            selectedOnes.findIndex(
              (element) => element.id === randomApple.id
            ) == -1
          ) {
            selectedOnes.push(randomApple)
          }
        }
        this.selectedDropApples = selectedOnes
      } else {
        alert("Şansına küs, bu sefer düşüremedin!")
      }
    },
  },
}
</script>

<style>
.main-view {
  display: block;
  margin-bottom: 2rem;
}

#tree {
  position: relative;
}

.apple {
  position: absolute;
}

.button-style {
  font-size: 20px;
  box-sizing: border-box;
  border: none;
  border-radius: 4px;
  padding: 0 16px;
  min-width: 64px;
  height: 36px;
  background-color: #DDD;
  cursor: pointer;
}

.drop {
  animation: drop 1s forwards;
}
@keyframes drop {
  0% {

  }
  
  to {
    opacity: 0;
    transform: translate3d(0, 100px, 0);

  }
}
.shake {
  animation: shake 3s cubic-bezier(.36,.07,.19,.97) both;
  transform: translate3d(0, 0, 0);  
}
@keyframes shake {
  10%, 15%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%, 25%, 80% {
    transform: translate3d(2px, 0, 0);
  }
  30%, 35%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%, 45%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
