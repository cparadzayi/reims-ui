<template >
  <div class="ui container segment">
    <div class="ui stackable grid">

      <div class="four wide column">
        <div class="ui card">
          <div class="content">
            <button class="ui mini left floated icon button">
              <i class="pencil icon"></i>
              Edit
            </button>

            <button class="ui mini red right floated icon button" >
              <i class="remove icon"></i>
              Delete
            </button>
          </div>
          <div class="image">
            <img src="../assets/img/ProfilePlaceholder250x250.png" alt="">
          </div>
          <div class="content" v-if="client.name">
            <div class="description">
              <div class="ui list">

                <li class="item">{{client.name}} {{client.surname}}</li>
                <li class="item"><a :href="`mailto:${client.email}`">{{client.email}}</a></li>
                <li class="item"><i class="marker icon"></i> {{client.address}}</li>
              </div>
            </div>
          </div>

          <div v-else style="height: 30px">
            <div class="ui mini loading basic segment"></div>
          </div>
        </div>
      </div>

      <div class="twelve wide column">
        <h3 class="ui header">History</h3>
        <div class="ui clearing divider">

        </div>
        <table class="ui fluid table">
          <thead>
            <tr>
              <th>STAND ID</th>
              <th>AMOUNT</th>
              <th>RECEIPT</th>
              <th>PAYMENT CODE</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="history in clientHistory">
              <td><i class="home icon"></i> {{history.standid}}</td>
              <td>${{history.amount}}</td>
              <td>
                <div class="ui orange basic label">
                  {{history.receiptnum}}
                </div>
              </td>
              <td>{{history.paymentmode}}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">
                <div v-if="!clientHistory.length">
                  <div :class="{ui: true, warning : true,  message:true }" >
                    <i class="warning sign icon"></i>
                    We are having trouble fetching the client history. Check if you are online and retry.
                    </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '@/modules/axios'

  export default {
    created () {
      this.getClient()
      this.getClientHistory()
    },
    data () {
      return {
        client: {},
        clientHistory: []
      }
    },
    methods: {
      getClient () {
        let id = this.$route.params.id
        axios.get('/clients/' + id)
          .then(response => {
            this.client = response.data.data[0]
          })
          .catch(error => {
            console.log(error)
          })
      },

      getClientHistory () {
        let id = this.$route.params.id
        axios.get('/payments/history/' + id)
          .then(response => {
            this.clientHistory = response.data.data
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>

<style lang="css">
</style>
