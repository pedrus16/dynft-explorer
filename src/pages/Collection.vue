<template>
  <q-page class="row items-top">
    <div class="col-12 col-md-8" style="min-height: 400px">
      <div id="wrapper-video">
        <video id="meadow" autoplay muted loop>
            <source :src="archetype.content.videoRoot.replace('ipfs://','https://ipfs.aleph.im/ipfs/') + '/250.mp4'" />
        </video>
      </div>
      <img :src="publisher.menu_logo" :alt="publisher.name" class="q-my-xl" height="50" />
      <q-select
        filled
        :model-value="model"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        @input-value="setModel"
        hint="See a particular item"
        style="width: 250px; padding-bottom: 32px"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <!-- <q-media-player
        type="video"
        :source="archetype.content.videoRoot.replace('ipfs://','https://ipfs.aleph.im/ipfs/') + '/0.mp4'"
        :poster="archetype.content.image.replace('ipfs://','https://ipfs.aleph.im/ipfs/')"
      /> -->
    </div>
    <div class="col-12 col-md-4 self-end">
      <q-card class="q-mt-xl">
        <!-- <img :src="archetype.content.image.replace('ipfs://','https://ipfs.aleph.im/ipfs/')" class="bg-black"/> -->
        <q-card-section>
          <div class="text-h6">{{archetype.content.name}}</div>
          <div class="text-subtitle2">up to {{archetype.content.maxInstances}} items</div>

        <img :src="publisher.sticker" 
          class="absolute"
          width="30"
          style="top: 0; right: 12px; transform: translateY(-50%);"
          :alt="publisher.name"
          :title="publisher.name" />
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{archetype.content.description}}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { computed } from 'vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { defineComponent } from 'vue';
import { posts, aggregates } from "aleph-js";
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'PageCollection',
  computed: {

  },
  async setup () {
    const $store = useStore()
    const route = useRoute()
    let publisher = $store.state.publishers[route.params.publisher_id]
    let archetype_info = await aggregates.fetch_one(
        publisher.addresses[0],
        `archetype:${route.params.collection_id}`
    )
    let archetype = await posts.get_posts(publisher.archetype_posttype, {
      addresses: publisher.addresses,
      hashes: [archetype_info.post]
    })
    if (archetype.posts.length > 0)
      archetype = archetype.posts[0]
    else
      archetype = null


    const items = Array.from({ length: archetype.content.maxInstances - 0 + 1 }, (_, i) => i)
    const options = ref(items)

    
    return {
      state: $store.state,
      publisher_id: route.params.publisher_id,
      collection_id: route.params.collection_id,
      publisher: publisher,
      archetype_info: archetype_info,
      archetype: archetype,
      options: options,

      filterFn (val, update, abort) {
        update(() => {
          const needle = String(val)
          options.value = items.filter(v => String(v).indexOf(needle) > -1)
        })
      },
    }
  }
})
</script>
<style lang="scss">
#wrapper-video {
  position: fixed;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  z-index: -100;
}
#wrapper-video video {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  min-width: 50%;
  min-height: 50%;
}
</style>