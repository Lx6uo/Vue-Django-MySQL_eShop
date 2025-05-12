<template>

<div>
      <v-list-item
            v-for="item in tocheck"
        :key="item.pk"
        >
<v-list-item-content>
  <v-row>
    <v-col class="product">
      <!--Product image and detail photo above, product information below-->
      <img class="picture1" :src="`http://127.0.0.1:8001/media/${item.fields.product_image}`" alt=""
           height="50px" width="50px">
      <img class="picture2" :src="`http://127.0.0.1:8001/media/${item.fields.product_imageDetail}`" alt=""
           height="50px" width="50px">
      <v-row>
        <v-col>
          <v-list-item-title>{{ item.fields.product_name }}</v-list-item-title>
        </v-col>
        <v-col>
          <v-list-item-title>{{ item.fields.product_brand  }}</v-list-item-title>
        </v-col>
        <v-col>
          <v-list-item-title>{{ item.fields.product_cost  }}</v-list-item-title>
        </v-col>
        <v-col>
          <v-list-item-title>{{ item.fields.product_color }}</v-list-item-title>
        </v-col>
      </v-row>
    </v-col>
    <v-col class="saler">
      <img :src="`http://127.0.0.1:8001/media/${business_list_dict[item.fields.product_business].fields.user_avatar}`" alt=""
           height="50px" width="50px">
      <v-row>
        <v-col>
          <v-list-item-title>{{ business_list_dict[item.fields.product_business].fields.user_name }}</v-list-item-title>
        </v-col>

        <!--Address-->
        <v-col>
          <!--<v-list-item-title>{{ item.address }}</v-list-item-title>-->
          <region-text
              separator="-"
              :town="false"
              v-model="business_list_dict[item.fields.product_business].fields.region"
          />
        </v-col>
        <v-col>
          <v-list-item-title>{{ business_list_dict[item.fields.product_business].fields.user_address  }}</v-list-item-title>

        </v-col>
        <v-col>
          <v-list-item-title>{{ business_list_dict[item.fields.product_business].fields.user_mobile  }}</v-list-item-title>

        </v-col>
      </v-row>
    </v-col>
    <v-col class="status">
        <br>
        <v-list-item-title>{{ item.fields.checktime | format  }}</v-list-item-title>
        <v-list-item-action>
            <v-row>
              <v-col>
          <v-btn
            color="success"
            @click="changestatus(item.pk,'Approved')"
          >
            {{btn_content}}
          </v-btn>
                </v-col>
               <v-col>
          <v-btn
            color="success"
            @click="changestatus(item.pk,'Rejected')"
          >
            {{btn_content2}}
          </v-btn>
                </v-col>
              </v-row>
                      </v-list-item-action>
    </v-col>
  </v-row>
</v-list-item-content>

        </v-list-item>
</div>
</template>

<script>

import {RegionText} from 'v-region'
export default {
  name: 'order_toDelivery',
  props:{
    tabkey:Object
  },
    watch: {
  tabkey: function () {
    this.initBusinessInfo()
  }
},
  components: {

    RegionText
  },

  data: () => ({
    btn_content: 'Approve',
    btn_content2: 'Reject',

    business_orders:[],
    orderProducts:[],
    nowProduct:[],
    userAvatar:[],

    business_lists:[],
    business_list_dict:[],
    check_lists:[],
    tocheck:[]


  }),

  methods:{
    async initBusinessInfo(){
      await this.axios.get('get_users/',
          {params:{status:'Pending'}})
        .then((response) => {
            console.log(response);
            this.business_lists = response.data.business_lists;

            this.business_lists.forEach(item => {
                    this.business_list_dict[item.pk] = item;
                    this.userAvatar[item.pk] = item.fields.user_avatar;});

            this.business_lists.forEach(item => {
                    item.fields['region']={
                      province:item.fields.user_province,
                      city:item.fields.user_city,
                      area:item.fields.user_area,
                      town:''
                    }

                });

        })
        .catch(function (error) {
            console.log(error);
        });



      await this.axios.get('get_check/',
          {params:{product_status:'Modification Request',check_status:'Pending Review'}})
        .then((response) => {
            console.log(response);

            this.tocheck=response.data.list

        })
        .catch(function (error) {
            console.log(error);
        });




    },



    async changestatus(click_order_id,result) {


      await this.axios.get('alterEditCheckStatus/',
          {params:{order_id: click_order_id,status:result}})
        .then((response) => {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
await this.initBusinessInfo();
    },
  },
  async created(){
    await this.initBusinessInfo()
  },
}
</script>

<style scoped>
.picture1{
  margin-right: 10px;
}
.picture2{
  margin-left: 10px;
}
.saler{
  margin-left: 20px;
  margin-right: 10px;
  border-style:dashed;
  border-width:3px;
  border-color: rgba(63, 150, 245, 0.50);
  border-radius: 6px;
  margin-bottom: 10px;
}

.product{
  border-style:dashed;
  border-width:3px;
  border-color: rgba(63, 150, 245, 0.50);
  margin-right: 10px;
  margin-left: 20px;
  border-radius: 6px;
  margin-bottom: 10px;
}
.status{
  border-style:dashed;
  border-width:3px;
  border-color: rgba(63, 150, 245, 0.50);
  margin-right: 15px;
  border-radius: 6px;
  margin-bottom: 10px;
}
</style>
