import axios from '../modules/axios'

/*
  Get the cities in which stands are located
  in geojson format.
*/
function getBaseLayer () {
  return new Promise((resolve, reject) => {
    axios.get('/cities')
      .then(res => {
        resolve(res.data.data[0])
      })
      .catch(reject)
  })
}

export default {
  getBaseLayer
}
