<template>
  <q-page class="column items-center">
    <img :src="publisher.menu_logo" :alt="publisher.name" class="q-my-xl" />
    {{ collection_id }}
    {{archetype_info}}
  </q-page>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { defineComponent } from 'vue';
import { posts, aggregates } from "aleph-js";
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PageCollection',
  async setup () {
    const $store = useStore()
    const route = useRoute()
    let publisher = $store.state.publishers[route.params.publisher_id]
    let items = null
    let archetype_info = await aggregates.fetch_one(
        publisher.addresses[0],
        `archetype:${route.params.collection_id}`
    )
    let archetype = await posts.get_posts(publisher.archetype_posttype, {
      addresses: publisher.addresses,
      hashes: [archetype_info.post]
    })
    
    return {
      state: $store.state,
      publisher_id: route.params.publisher_id,
      collection_id: route.params.collection_id,
      publisher: publisher,
      archetype_info: archetype_info
    }
  }
})
</script>