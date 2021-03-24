<template>
  <div>
    <v-card
      width="300"
    >
      <v-app-bar color="red" dark>
        <v-app-bar-title>신메뉴</v-app-bar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="openDialog"><v-icon>mdi-pencil</v-icon></v-btn>
      </v-app-bar>
      <v-img
        :src="this.newMenuImageURL"
      ></v-img>
    </v-card>

    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card>
        <v-app-bar color="red" dark>
          <v-btn @click="dialog = false" icon><v-icon>mdi-close</v-icon></v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="loadNewMenuImage" icon>저장</v-btn>
        </v-app-bar>
        <v-card height="100" class="d-flex justify-center">
          <v-file-input
            v-model="newMenuImage"
            placeholder="사진을 선택 해주세요."
            prepend-icon="mdi-image"
            class="ma-8"
            @change="updateNewMenuImage"
          >
          </v-file-input>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialog: false,
      newMenuImage: [],
      newMenuImageURL: ''
    }
  },
  created () {
    this.$firebase.database().ref('NewMenu/NewMenuImage').on('value', (snapshot) => {
      this.newMenuImageURL = snapshot.val().imgURL
    })
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    updateNewMenuImage () {
      this.$firebase.storage().ref('NewMenu').child('NewMenuImage').put(this.newMenuImage)
    },
    loadNewMenuImage () {
      this.$firebase.storage().ref('NewMenu').child('NewMenuImage').getDownloadURL().then((url) => {
        this.$firebase.database().ref('NewMenu').child('NewMenuImage').set({
          imgURL: url
        })
      })
      this.dialog = false
    }
  }
}
</script>
