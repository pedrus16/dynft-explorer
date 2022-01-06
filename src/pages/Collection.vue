<template>
  <q-page class="row items-top">
    <div class="col-12 col-md-8" style="min-height: 400px">
      <div id="wrapper-video">
        <video id="meadow" autoplay muted loop :key="item_id">
            <source :src="archetype.content.videoRoot.replace('ipfs://','https://ipfs.aleph.im/ipfs/') + '/' + item_id + '.mp4'" />
        </video>
      </div>
      <img :src="publisher.menu_logo" :alt="publisher.name" class="q-my-xl" height="50" />
      <q-select
        :model-value="item_id"
        use-input
        hide-selected
        fill-input
        input-debounce="0"
        :options="options"
        @filter="filterFn"
        @input-value="setItem"
        hint="See a particular item"
        style="width: 250px; padding-bottom: 32px"
        standout
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </div>
    <div class="col-12 col-md-4 self-end">
      <q-card class="q-mt-xl">
        <!-- <img :src="archetype.content.image.replace('ipfs://','https://ipfs.aleph.im/ipfs/')" class="bg-black"/> -->
        <q-card-section>
          <div class="text-h6">{{archetype.content.name}}</div>
          <div class="text-subtitle2" v-if="item_id == '0'">up to {{archetype.content.maxInstances}} items</div>
          <div class="text-subtitle2" v-else>item {{item_id}} out of {{archetype.content.maxInstances}}</div>

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
      <div v-if="history.length">
        <h6 class="q-ma-sm">Owners history</h6>
        <q-card>
          <q-list>
            <q-item v-for="item of history" :key="item.txHash">
              
              <q-item-section>
                <q-item-label>{{item.toName}}</q-item-label>
                <q-item-label caption lines="2">
                  <a :href="`https://tzstats.com/${item.to}`" class="text-white">
                  {{item.to}}
                  </a>
                </q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>
                  <a :href="`https://tzstats.com/${item.txHash}`" class="text-white">
                  {{ moment(item.date*1000).fromNow() }} 
                  </a>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { computed , watch } from 'vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { defineComponent } from 'vue'
import { posts, aggregates } from "aleph-js"
import { useRoute, useRouter } from 'vue-router'
import { get_serialized_id, get_profile_name } from '../utils/quartz'
import moment from "moment"

export default defineComponent({
  name: 'PageCollection',
  computed: {

  },
  props: [
    'publisher_id',
    'collection_id',
    'item_id'
  ],
  async setup (props) {
    const $store = useStore()
    const route = useRoute()
    const router = useRouter()
    console.log(props)
    let publisher = $store.state.publishers[props.publisher_id]
    let archetype_info = await aggregates.fetch_one(
        publisher.addresses[0],
        `archetype:${props.collection_id}`
    )
    let archetype = await posts.get_posts(publisher.archetype_posttype, {
      addresses: publisher.addresses,
      hashes: [archetype_info.post]
    })
    if (archetype.posts.length > 0)
      archetype = archetype.posts[0]
    else
      archetype = null

    const item_id = ref(props.item_id)
    const history = ref([])

    if (props.item_id === undefined)
      item_id.value = '0'


    const items = Array.from({ length: archetype.content.maxInstances - 0 + 1 }, (_, i) => i)
    const options = ref(items)

    const update_history = async (it_id) => {
      item_id.value = it_id
      if (Number(it_id) === 0) {
        history.value = []
      } else {
        try {
          const serialized_id = get_serialized_id(props.collection_id, it_id)
          let value = await aggregates.fetch_one(
            publisher.addresses[0],
            `history:${serialized_id}`
          )
          let transfers = value['transfers']
          for (let item of transfers) {
            item.toName = await get_profile_name(publisher.addresses[0], item.to)
          }
          history.value = transfers
        } catch {
          history.value = []
        }
      }
    }
    update_history(item_id.value)

    watch(() => props.item_id, (val) => {
      if (item_id.value !== val)
        update_history(val)
    })
    
    return {
      state: $store.state,
      publisher_id: route.params.publisher_id,
      collection_id: route.params.collection_id,
      item_id,
      publisher,
      archetype_info,
      archetype,
      options,
      history,
      moment,

      filterFn (val, update, abort) {
        update(() => {
          const needle = String(val)
          options.value = items.filter(v => String(v).indexOf(needle) > -1)
        })
      },

      setItem(val) {
        router.push({
          name: 'collection-item',
          params: {
            publisher_id: route.params.publisher_id,
            collection_id: route.params.collection_id,
            item_id: val
          }
        })
        update_history(val)
      }
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