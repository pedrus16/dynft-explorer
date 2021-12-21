<template>
  <q-page>
    <h1 class="text-center">NFT Publishers</h1>
    <div class="row q-col-gutter-md">
      <div class="col-auto col-md-4 col-lg-3 column items-end" v-for="publisher of publishers" :key="publisher.publisher_id">
        <router-link :to="{name: 'publisher', params: {publisher_id: publisher.publisher_id}}" class="">
          <img :src="publisher.logo" class=""/>
        </router-link>
        <q-btn color="quartz-gradient"  :to="{name: 'publisher', params: {publisher_id: publisher.publisher_id}}">{{publisher.name}}</q-btn>
      </div>
    </div>
    <!-- {{ state }}
    {{ archetype_posts }}
    <div class="row q-col-gutter-md">
      <div class="col-auto col-md-4 col-lg-3" v-for="apost of archetype_posts" :key="apost.item_hash">
        <q-card class="bg-white text-black">
          <img :src="apost.content.image.replace('ipfs://','https://ipfs.io/ipfs/')" class="bg-black"/>
          <q-card-section>
            <div class="text-h6">{{apost.content.name}}</div>
            <div class="text-subtitle2">up to {{apost.content.maxInstances}} items</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{apost.content.description}}
          </q-card-section>
        </q-card>
      </div>
    </div> -->
  </q-page>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { defineComponent } from 'vue';
import { posts } from "aleph-js";

export default defineComponent({
  name: 'PageIndex',
  async setup () {
    const $store = useStore()
    return {
      state: $store.state,
      publishers: $store.state.publishers
    }
  }
})
</script>
