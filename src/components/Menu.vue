<template>

  <div class="ui mini orange segment">
    <div class="ui secondary small orange menu">
      <a href="#/" id="home" @click="selectMenu('home')" class="active item">Home</a>
      <a href="#/stands" id="stands" @click="selectMenu('stands')" class="item">Stands</a>
      <a href="#/clients" id="clients" @click="selectMenu('clients')" class="item">Clients</a>
      <a href="#/finances" id="finances" @click="selectMenu('finances')" class="item">Finances</a>
      <a href="#/map" id="map" @click="selectMenu('map')" class="item">Map</a>
    </div>

  </div>
</template>

<script>
import menu from '@/modules/menu'

export default {
  data () {
    return {
      menus: [
        'home', 'stands', 'clients', 'finances', 'map'
      ]
    }
  },
  methods: {
    selectMenu (value) {
      menu.changeMenuClases(value, this.menus, this.$el)
    }
  },
  mounted () {
    // define the path
    let path = this.$route.path

    // set the rootPath to an empty string
    var rootPath = ''

    // loop through the path to get the root path
    for (let i = 0; i < path.length; i++) {
      // check if there is a / other than the zero index
      if (i > 0 && path[i] === '/') {
        // if found terminate the loop by setting the index to the higest possible value
        i = path.length
      }

      // Break if any part of the path is undefined. Usually its the last index that of the /.
      if (path[i] === undefined) break

      // make the rootPath start from the 1 index to skip the first instance of /
      rootPath += path[i]
    }

    // check if the rootPth is the 'root' (mounting point) an set a default value
    // else take the substring grom index 1 to ignore the /
    rootPath = rootPath === '/' ? 'home' : rootPath.substring(1, rootPath.length)

    // make the root menu active in the ui
    menu.changeMenuClases(rootPath, this.menus, this.$el)
  }
}
</script>

<style lang="css" scoped>
.ui.mini.orange.segment {
  height: 55px;
  border-radius: 0
}
</style>
