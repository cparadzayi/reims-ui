<template>
  <div class="ui container basic segment">
    <div class="ui divided header">
      Clients
    </div>
    <!-- search for client -->
    <form class="ui form">
      <div class="four fields">
          <div class="field">
            <div class="ui input">
              <input v-model:value="search.firstName"  placeholder="first name">
            </div>
          </div>

          <div class="field">
            <input  v-model:value="search.surname" placeholder="last name">
          </div>

          <div class="field">
            <button @click="searchClient" class="ui primary icon button">
              <i class="search icon"></i>
            </button>
          </div>
          <div class="field">
            <!-- create new client -->
            <router-link to="/create/client" class="ui right floated primary icon button">
              <i class="add icon"></i>
               Create new client
             </router-link>
          </div>
      </div>
    </form>

     <!-- the results table -->
    <table class="ui fluid table">
      <thead>
        <tr>
          <th>NAME</th>
          <th>EMAIL</th>
          <th>ADDRESS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="clients.length" v-for="client in clients">
            <td>
              <a @click="selectClient(client)"><i class="user outline icon"></i> {{client.name}} {{client.surname}}</a>
            </td>
            <td><a :href="`mailto:${client.email}`"><i class="envelope icon"></i> {{client.email}}</a></td>
            <td>
                <p><i class="marker icon"></i> {{client.address}}</p>
            </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3">
            <div v-if="!clients.length" class="ui fluid">
              <h5 style="color:orange" v-if="!loading && alert.show==false" class="huge text-muted"><i class="frown icon"></i> Could not find your client.</h5>
              <h5 style="color:lightBlue"v-if="loading" class="ui loading fluid blue basic segment">Loading...</h5>
              <div :class="{ui: true, warning : alert.type == 'warning' ?  true : false, error: alert.type == 'error' ?  true : false, message:true }" v-if="alert.show">

                <p><i class="warning sign icon"></i>{{alert.message}}</p>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
  import axios from '@/modules/axios'

  export default {
    name: 'ViewClients',

    data () {
      return {
        clients: [],
        alert: {
          show: false,
          type: 'info',
          message: ''
        },
        search: {
          firstName: '',
          surname: ''
        },
        loading: () => {
          if (this.clients) {
            return false
          } else {
            return true
          }
        }
      }
    },
    created () {
      // GET /someUrl
      axios.get('/clients')
        .then(response => {
          // get body data
          this.clients = response.data.data
          this.loading = false
          console.log(this.clients)
        })
        .catch(response => {
          // error callback
          this.alert.show = true
          this.alert.type = 'error'
          this.alert.message = 'We are having trouble getting the clients from the server. Please hit refresh or try again later.'

          this.loading = false
        })
    },

    methods: {
      searchClient () {
        this.loading = true

        // Abstracttion for the params to be passed in the request
        let queryOptions = {
          params: {}
        }

        // chose the entries that will be passed as params to the request
        queryOptions.params.firstname = this.search.firstName !== '' ? this.search.firstName : null
        queryOptions.params.surname = this.search.surname !== '' ? this.search.surname : null

        axios.get('/clients/search', queryOptions)
          .then(response => {
            // get body data
            this.clients = []
            this.clients = response.data.data
            this.loading = false
          })
          .catch(error => {
            // error callback
            console.log(error)
            this.alert.show = true
            this.alert.type = 'error'
            this.alert.message = 'We are having trouble getting the clients from the server. Please hit refresh or try again later.'

            this.loading = false
          })
      },
      selectClient (client) {
        this.$router.push({path: `/clients/${client.clientid}`})
      }
    }
  }
</script>

<style lang="css">
</style>
