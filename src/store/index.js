import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
    },

    state: {
      api_server: "https://api2.aleph.im",
      publishers: {
        quartz: {
          name: 'Ubisoft Quartz',
          publisher_id: 'quartz',
          addresses: [
            "0x59f1f0464540073Bc70edAab069496366c128115"
          ],
          logo: "publishers/LogoQuartz-v-white-beta.png",
          menu_logo: "publishers/LogoQuartz-h-white-color-beta.png",
          background: "publishers/UbisoftQuartz-background.jpg",
          archetype_posttype: "quartz_archetype"
        }
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: process.env.DEBUGGING
  })

  return Store
})
