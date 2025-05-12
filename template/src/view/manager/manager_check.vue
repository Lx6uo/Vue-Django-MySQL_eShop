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
          <h4>Review Records</h4>
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-col class="ml-3">
        <v-tabs v-model="tab" >
            <v-tabs-slider color="blue"></v-tabs-slider>
            <v-tab >Listing Applications</v-tab>
            <v-tab >Modification Requests</v-tab>

          <v-tab >Approved</v-tab>
          <v-tab >Rejected Applications</v-tab>


            <!-- Listing Applications -->
            <v-tab-item>
              <toCheck :tabkey="tab"></toCheck>
            </v-tab-item>

          <v-tab-item>
              <editCheck :tabkey="tab"></editCheck>
            </v-tab-item>

          <v-tab-item>
              <hasCheck :tabkey="tab"></hasCheck>
            </v-tab-item>

            <!-- Rejected Applications -->
            <v-tab-item>
              <!-- <Order_content></Order_content> -->
              <rejectCheck :tabkey="tab"></rejectCheck>
            </v-tab-item>


          </v-tabs>
      </v-col>
    </v-container>
  </div>
</template>

<script>
// import Order_content from "@/components/business/order_content";
import toCheck from "@/view/manager/toCheck";
import hasCheck from "@/view/manager/hasCheck";
import editCheck from "@/view/manager/editCheck";
import rejectCheck from "@/view/manager/rejectCheck";

export default {
  name: "business_order",
  components: {toCheck,hasCheck,editCheck,rejectCheck},
  data () {
    return {
      tab:null
    }
  },

}
</script>

<style scoped>

</style>