<template>
  <div>
    <v-container fluid>
      <v-toolbar
          dark
          color="blue darken-3"
          class="mb-1"
      >

        <v-spacer></v-spacer>
        <v-toolbar-title>
          <h4>Order Information</h4>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-col class="ml-3">
        <v-tabs v-model="tab" >
            <v-tabs-slider color="blue"></v-tabs-slider>
            <v-tab >Unpaid by Buyer</v-tab>
            <v-tab >Unshipped by Seller</v-tab>
            <v-tab >In Transit</v-tab>
            <v-tab>Unconfirmed by Buyer</v-tab>
            <v-tab>Order Confirmed</v-tab>

            <!-- Unpaid by Buyer -->
            <v-tab-item>
              <Order_weifukuan :tabkey="tab"></Order_weifukuan>
            </v-tab-item>

            <!-- Unshipped by Seller -->
            <v-tab-item>
              <!-- <Order_content></Order_content> -->
              <Order_toDelivery :tabkey="tab"></Order_toDelivery>
            </v-tab-item>

            <!-- Shipped by Seller -->
            <v-tab-item>
              <v-card flat>
                <!-- <Order_content></Order_content> -->
                <Order_inDelivery :tabkey="tab"></Order_inDelivery>
              </v-card>
            </v-tab-item>

            <!-- Received by Buyer -->
            <v-tab-item>
              <!-- <Order_content></Order_content> -->
              <Order_toFetch :tabkey="tab"></Order_toFetch>
            </v-tab-item>

            <!-- Order Confirmed by Buyer -->
            <v-tab-item>
              <!-- <Order_content></Order_content> -->
              <Order_finished :tabkey="tab"></Order_finished>
            </v-tab-item>
          </v-tabs>
      </v-col>
    </v-container>
  </div>
</template>

<script>
// import Order_content from "@/components/business/order_content";
import Order_weifukuan from "@/components/business/order_weifukuan";
import Order_toDelivery from "@/components/business/order_toDelivery";
import Order_inDelivery from "@/components/business/order_inDelivery";
import Order_toFetch from "@/components/business/order_toFetch";
import Order_finished from "@/components/business/order_finished";
export default {
  name: "business_order",
  components: {Order_weifukuan,Order_toDelivery,Order_inDelivery,Order_toFetch,Order_finished},
  data () {
    return {
      tab:null
    }
  },

}
</script>

<style scoped>

</style>