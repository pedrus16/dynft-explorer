<template>
  <q-layout view="lhh LpR lff" class="q-mb-xl">
    <q-header :class="($q.dark.isActive?'text-white':'text-black') + ' bg-black q-pa-xs'">
      <q-toolbar>
        <q-tabs indicator-color="transparent" no-caps>
          <q-route-tab
            to="/"
            label="All Publishers"
            exact
          />
          <q-route-tab
            v-for="publisher of publishers"
            :key="publisher.publisher_id"
            :to="{name: 'publisher', params: {publisher_id: publisher.publisher_id}}"
            :label="publisher.name"
          />
        </q-tabs>
        <template v-if="$q.screen.gt.sm">
          <q-space />
          <span class="q-mr-sm">by</span>
          <a href="https://aleph.im" target="_blank" rel="noopener" class="text-white text-decoration-none">
            aleph.im
          </a>
        </template>
      </q-toolbar>
    </q-header>

    <q-page-container class="content">
      <template #default>
        <router-view />
      </template>
      <template #fallback>
        <span>Loading!</span>
      </template>
    </q-page-container>
    <q-footer class="bg-transparent">
      <q-toolbar>
        <template v-if="$q.screen.lt.md">
          <q-space />
          <span class="q-mr-sm">by</span>
          <a href="https://aleph.im" target="_blank" rel="noopener" class="text-white text-decoration-none">
            aleph.im
          </a>
        </template>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>

import { defineComponent, ref, onErrorCaptured } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  async setup () {
    const leftDrawerOpen = ref(false)
    const $store = useStore()

    return {
      publishers: $store.state.publishers
    }
  }
})
</script>

<style lang="scss">
.logo {
  .q-badge {
    position: absolute;
    margin-top: -0.2rem;
    margin-left: -1rem;
  }
}

.q-drawer {

  .q-separator.q-separator--horizontal {
    width: auto;
    margin: 0 16px;
  }
}

.q-list.menu {
  .q-item {
      min-height: 36px;
      padding-bottom: 0;
      padding-top: 0;
  }

  .q-item__label--header {
    font-weight: 700;
    padding-bottom: 0.5em;
    padding-top: 1.5em;
  }
}

.q-drawer--dark {
  background: #172025;

  .q-list.menu {
    .q-item {
      opacity: 0.5;
      color: #F6F8FB;

      &.q-router-link--active {
        color: #fff;
        opacity: 1.0;
      }
    }

    .q-item__label--header {
      color: #FFF;
    }
  }
}

.content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 10px;
  word-wrap: normal;

  .title {
    font-size: 3rem;

    @media (max-width: $breakpoint-sm-max) {
      font-size: 4.4vw;
    }
  }

  .menu {
    background: #7a40f2;
    border-radius: 20px !important;
    margin: 10px;
    padding: 10px;
  }
}

#left {
  .q-drawer {
    :first-child {
      border-radius: 15px;
    }
    padding: 5px !important;

    .q-item.q-item--active {
      background: #fff;
      margin-left: 10px;
      padding-right: 10px;
      border-radius: 15px 0 0 15px;

      border-top-right-radius: 0;
      border-bottom-right-radius: 0;

      &:before, &:after{
        box-sizing: content-box;
        content: '';
        position: absolute;
        left: 100%; /* I use this instead of right: 0 to avoid 1px rounding errors */
        margin-left: -15px; /* I use this because I am using left: 100% */
        width: 15px;
        height: 15px;
        border-right: 15px solid #fff ;
        z-index: 10;
      }

      &:before {
        top: -15px;
        border-bottom: 15px solid  #fff;
        border-bottom-right-radius: 30px;
      }

      &:after {
        bottom: -15px;
        border-top: 15px solid  #fff;
        border-top-right-radius: 30px;
      }
    }
  }
}

.rounded-large {
  border-radius: 25px;
}

.rounded-forced {
  border-radius: 10px !important;
}
</style>
