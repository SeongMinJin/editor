<template>
  <div>
    <v-card
      width="300"
    >
      <v-app-bar color="orange" dark>
        <v-app-bar-title>주스 / 에이드</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="addMenu"><v-icon>mdi-plus</v-icon></v-btn>
      </v-app-bar>
      <v-card
        v-for="menu in menu"
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
      <v-card>
        <v-app-bar>
          <v-app-bar-title>주스/에이드메뉴 추가하기</v-app-bar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
        </v-app-bar>
        <v-text-field v-model="menuTitle" placeholder="메뉴이름" class="ml-4 mr-4"></v-text-field>
        <v-textarea v-model="menuDescription" placeholder="메뉴설명" class="ml-4 mr-4" no-resize></v-textarea>
        <v-text-field v-model="menuPrice" placeholder="가격" class="ml-4 mr-4"></v-text-field>
        <v-file-input
          v-model="menuMainImg"
          placeholder="메뉴 메인 이미지"
          prepend-icon="mdi-image"
          class="ml-4 mr-4"
          @change="updateMainImg"
        >
        </v-file-input>
        <v-file-input
          v-model="menuSubImg"
          placeholder="메뉴 서브 이미지"
          prepend-icon="mdi-image"
          class="ml-4 mr-4"
          @change="updateSubImg"
        >
        </v-file-input>
        <div class="d-flex justify-end">
          <v-btn class="ma-4" @click="save">저장</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menu: [],
      edit: false,
      dialog: false,
      menuTitle: '',
      menuDescription: '',
      menuPrice: '',
      menuMainImg: [],
      menuSubImg: []
    }
  },
  created () {
    this.$firebase.database().ref('Menu').child('Drink').child('Ade').on('value', (snapshot) => {
      this.menu = snapshot.val()
    })
  },
  methods: {
    addMenu () {
      this.dialog = true
    },
    updateMainImg () {
      this.$firebase.storage().ref('Menu').child('Drink').child('Ade').child(this.menuTitle).child('main').put(this.menuMainImg)
    },
    updateSubImg () {
      this.$firebase.storage().ref('Menu').child('Drink').child('Ade').child(this.menuTitle).child('sub').put(this.menuSubImg)
    },
    save () {
      this.dialog = false
      this.$firebase.storage().ref('Menu').child('Drink').child('Ade').child(this.menuTitle).child('main').getDownloadURL().then((url) => {
        this.$firebase.database().ref('Menu').child('Drink').child('Ade').child(this.menuTitle).update({
          mainURL: url
        })
      })
      this.$firebase.storage().ref('Menu').child('Drink').child('Ade').child(this.menuTitle).child('sub').getDownloadURL().then((url) => {
        this.$firebase.database().ref('Menu').child('Drink').child('Ade').child(this.menuTitle).update({
          subURL: url
        })
      })
      this.$firebase.database().ref('Menu').child('Drink').child('Ade').child(this.menuTitle).set({
        title: this.menuTitle,
        description: this.menuDescription,
        price: this.menuPrice
      })
    },
    remove (title) {
      this.$firebase.database().ref('Menu').child('Drink').child('Ade').child(title).remove()
    }
  }
}
</script>
