<template>
  <div class="d-flex justify-start flex-wrap">
    <Coffee></Coffee>
    <Latte></Latte>
    <Tea></Tea>
    <Ade></Ade>
    <Bakery></Bakery>
    <New></New>
    <Recommend></Recommend>

  </div>
</template>

<script>
import Coffee from '@/components/Coffee.vue'
import Latte from '@/components/Latte.vue'
import Tea from '@/components/Tea.vue'
import Ade from '@/components/Ade.vue'
import Bakery from '@/components/Bakery.vue'
import New from '@/components/NewMenu.vue'
import Recommend from '@/components/Recommend.vue'

export default {
  components: {
    Coffee,
    Latte,
    Tea,
    Ade,
    Bakery,
    New,
    Recommend
  }
}
</script>
