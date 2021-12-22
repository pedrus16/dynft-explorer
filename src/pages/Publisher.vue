<template>
  <q-page class="column items-center">
    <img :src="publisher.logo" :alt="publisher.name" class="q-my-xl" />
    <div class="row q-col-gutter-md collection">
      <div class="col-auto col-md-4 col-lg-3" v-for="apost of archetype_posts" :key="apost.item_hash">
        <router-link :to="{
          name: 'collection', params: {
            publisher_id: publisher_id,
            collection_id: apost.content.archetype_id
          }}">
          <q-card class="bg-white text-black">
            <img :src="apost.content.image.replace('ipfs://','https://ipfs.aleph.im/ipfs/')" class="bg-black"/>
            <q-card-section>
              <div class="text-h6">{{apost.content.name}}</div>
              <div class="text-subtitle2">up to {{apost.content.maxInstances}} items</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              {{apost.content.description}}
            </q-card-section>
          </q-card>
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { defineComponent } from 'vue';
import { posts } from "aleph-js";
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PagePublisher',
  async setup () {
    const $store = useStore()
    const route = useRoute()
    let publisher = $store.state.publishers[route.params.publisher_id]
    let items = null
    let archetypes = await posts.get_posts(publisher.archetype_posttype, {
      addresses: publisher.addresses
    })
    return {
      state: $store.state,
      publisher_id: route.params.publisher_id,
      publisher: publisher,
      archetype_posts: archetypes.posts
    }
  }
})
</script>

<style lang="scss" scoped>
  .collection {
    .q-card {
      transition: margin-top 0.3s ease-in-out;
      &:hover {
        margin-top: -10px;
      }
    }
    a {
      text-decoration: none;
    }
  }
</style>