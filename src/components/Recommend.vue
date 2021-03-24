<template>
  <div>
    <v-card
      width="300"
    >
      <v-app-bar color="primary" dark>
        <v-app-bar-title>추천메뉴</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = true"><v-icon>mdi-plus</v-icon></v-btn>
      </v-app-bar>
      <v-card
        v-for="menu in newMenuList"
        :key="menu.title"
      >
        <v-card-title>
          {{ menu.title }}
          <v-spacer></v-spacer>
          <v-btn icon color="red" @click="remove(menu.title)"><v-icon>mdi-minus</v-icon></v-btn>
        </v-card-title>
      </v-card>
    </v-card>
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card class="d-flex align-center">
        <v-select
          v-model="mainCategory"
          :items="['음료','제과류']"
        ></v-select>
        <v-btn @click="getSubCategory">적용</v-btn>
      </v-card>
      <v-card class="d-flex align-center">
        <v-select
          v-model="nextCategory"
          :items="subCategory"
        ></v-select>
        <v-btn @click="getLastCategory">적용</v-btn>
      </v-card>
      <v-card
        v-for="menu in lastCategory"
        :key="menu.title"
        class="d-flex align-center"
      >
        <v-card-title>
          {{ menu.title }}
          <v-spacer></v-spacer>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-btn @click="addToRecommendMenuList(menu.title)">선택</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      mainCategory: '',
      subCategory: [],
      nextCategory: 'null',
      lastCategory: [],
      newMenuList: []
    }
  },
  created () {
    this.getNewMenuList()
  },
  methods: {
    getSubCategory () {
      if (this.mainCategory === '음료') {
        this.$firebase.database().ref('Menu/Drink').once('value', (snapshot) => {
          snapshot.forEach((childSnapshot) => {
            this.subCategory.push(childSnapshot.key)
          })
        })
      } else {
        this.$firebase.database().ref('Menu/Food/Bakery').once('value', (snapshot) => {
          this.lastCategory = snapshot.val()
        })
      }
    },
    getLastCategory () {
      this.$firebase.database().ref('Menu/Drink').child(this.nextCategory).once('value', (snapshot) => {
        this.lastCategory = snapshot.val()
      })
    },
    addToRecommendMenuList (title) {
      if (this.mainCategory === '음료') {
        this.$firebase.database().ref('Menu/Drink').child(this.nextCategory).child(title).once('value', (snapshot) => {
          this.$firebase.database().ref('RecommendMenu').child(title).set(snapshot.val())
        })
      } else {
        this.$firebase.database().ref('Menu/Food/Bakery').child(title).once('value', (snapshot) => {
          this.$firebase.database().ref('RecommendMenu').child(title).set(snapshot.val())
        })
      }
      this.mainCategory = ''
      this.subCategory = []
      this.nextCategory = 'null'
      this.lastCategory = []
      this.dialog = false
    },
    getNewMenuList () {
      this.$firebase.database().ref('RecommendMenu').on('value', (snapshot) => {
        this.newMenuList = snapshot.val()
      })
    },
    remove (title) {
      this.$firebase.database().ref('RecommendMenu').child(title).remove()
    }
  }
}
</script>
