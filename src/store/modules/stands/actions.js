import * as types from '@/store/mutation-types'
import api from '@/api'

export default {
  getBaseLayer ({ commit, state }) {
    api.stands.getBaseLayer()
      .then(cities => {
        commit(types.RECIEVE_CITIES, cities)
      })
      .catch(error => {
        console.log(error)
      })
  },

  getAllStands ({ commit }) {
    api.stands.getAllStands()
      .then(allStands => {
        commit(types.RECIEVE_ALL_STANDS, allStands)
      })
  },

  getAvailableStands ({ commit }) {
    api.stands.getAvailableStands()
      .then(availableStands => {
        commit(types.RECIEVE_AVAILABLE_STANDS, availableStands)
      })
  }
}
