<template>
    <!-- The menu-->
      <div class='ui vertical  orange fluid mini menu'>
        <div class="ui top attached orange segment">
          <button class="ui right floated mini red icon button" @click="clearAllFeatures">
            <i class="remove icon"></i>
            Clear All
          </button>
          <div class="header">
            Select to show in map
          </div>
        </div>

        <!-- The allStands menu item-->
        <div :class="{active: allStands.features, item: true, link: true}">
          <!-- Fetch reserved items when you click here -->
          <a @click="fetchAllStands">All Stands</a>

          <!-- show the user a red zero if there are no stands at all -->
          <div
            class="ui red basic label"
            v-if = "allStands.type && !!allStands.features === false">
            0
          </div>

          <!-- show the user the number of all stands -->
          <div
            class="ui brown basic label"
            v-if="allStands.features">
            {{ allStands.features.length }}
          </div>

          <!-- Allow the user to toggle the layers if they are present -->
          <div v-if="allStands.features">
            <p>
              <div class="ui slider checkbox">
                <input
                  type="checkbox"
                  :checked="isLayerActive('allStands')"
                  @click="toggleLayer('allStands')">
                <label>Show in map</label>
              </div>
            </p>
          </div>

        </div><!--/ The allStands menu item -->

        <!-- The availableStads menu item-->
        <div :class="{active: availableStands.features, item: true, link: true}">
          <!-- Fetch reserved items when you click here -->
          <a @click="fetchAvailableStands">Available Stands</a>

          <!-- show the user a red zero if there are no available items -->
          <div
            class="ui red basic label"
            v-if = "availableStands.type && !!availableStands.features === false">
            0
          </div>

          <!-- show the user the number of available items -->
          <div
            class="ui purple basic label"
            v-if = "availableStands.features">
            {{ availableStands.features.length }}
          </div>

          <!-- Allow the user to toggle the layers if they are present -->
          <div v-if="availableStands.features">
            <p>
              <div class="ui slider checkbox">
                <input
                  type="checkbox"
                  :checked="isLayerActive('availableStands')"
                  @click="toggleLayer('availableStands')">
                <label>Show in map</label>
              </div>
            </p>
          </div>

        </div><!--/ The availableStands menu item -->

        <!-- The reservedStads menu item-->
        <div :class="{active: reservedStands.features, item: true, link: true}">
          <!-- Fetch reserved items when you click here -->
          <a @click="fetchReservedStands">Reserved Stands</a>

          <!-- show the user a red zero if there are no reserved items -->
          <div
            class="ui red basic label"
            v-if = "reservedStands.type && !!reservedStands.features === false">
            0
          </div>

          <!-- show the user the number of reserved items -->
          <div
            class="ui orange basic label"
            v-if = "reservedStands.features">
            {{ reservedStands.features.length }}
          </div>

          <!-- Allow the user to toggle the layers if they are present -->
          <div v-if="reservedStands.features">
            <p>
              <div class="ui slider checkbox">
                <input
                  type="checkbox"
                  :checked="isLayerActive('reservedStands')"
                  @click="toggleLayer('reservedStands')">
                <label>Show in map</label>
              </div>
            </p>
          </div>

        </div><!--/ The reservedStands menu item -->

        <!-- The soldStands menu item-->
        <div :class="{active: soldStands.features, item: true, link: true}">
          <!-- Fetch reserved items when you click here -->
          <a @click="fetchSoldStands">Sold Stands</a>

          <!-- show the user a red zero if there are no sold items -->
          <div
            class="ui red basic label"
            v-if = "soldStands.type && !!soldStands.features === false">
            0
          </div>

          <!-- show the user the number of reserved items -->
          <div
            class="ui green basic label"
            v-if = "soldStands.features">
            {{ soldStands.features.length }}
          </div>

          <!-- Allow the user to toggle the layers if they are present -->
          <div v-if = "soldStands.features">
            <p>
              <div class="ui slider checkbox">
                <input
                  type="checkbox"
                  :checked="isLayerActive('soldStands')"
                  @click="toggleLayer('soldStands')">
                <label>Show in map</label>
              </div>
            </p>
          </div>

        </div><!--/ The soldStands menu item -->

      </div>
</template>

<script>
  export default {
    name: 'MapSideMenu',
    computed: {
      activeLayers () {
        return this.$store.getters.activeLayers
      },
      allStands () {
        return this.$store.getters.allStands
      },

      availableStands () {
        return this.$store.getters.availableStands
      },

      reservedStands () {
        return this.$store.getters.reservedStands
      },

      soldStands () {
        return this.$store.getters.soldStands
      }
    },

    methods: {
      clearAllFeatures () {
        // Loop through the geojsons and clear them all
        this.$store.commit('CLEAR_ALL_STANDS')

        // notify the parent that all stands have been cleared
        this.$emit('clearAllFeatures')
      },

      fetchAllStands () {
        this.$emit('fetchAllStands')
      },

      fetchAvailableStands () {
        this.$emit('fetchAvailableStands')
      },

      fetchReservedStands () {
        this.$emit('fetchReservedStands')
      },

      fetchSoldStands () {
        this.$emit('fetchSoldStands')
      },

      toggleLayer (layer) {
        this.$emit('toggleLayer', layer)
      },

      isLayerActive (layerId) {
        return this.activeLayers.find(layer => layer.id === layerId)
      }
    }
  }
</script>
