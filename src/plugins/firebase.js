import Vue from 'vue'
import firebase from 'firebase/app'

import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firebase-database'
import 'firebase/firebase-storage'

Vue.config.productionTip = false
var firebaseConfig = {
  apiKey: 'AIzaSyAEcKmJX3DAMxXyVVOw-rbXOzftsyqUUxo',
  authDomain: 'new-haims.firebaseapp.com',
  projectId: 'new-haims',
  storageBucket: 'new-haims.appspot.com',
  messagingSenderId: '90693249839',
  appId: '1:90693249839:web:28380b834ea82919268fda',
  measurementId: 'G-20RMK3C0TN'
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

Vue.prototype.$firebase = firebase
