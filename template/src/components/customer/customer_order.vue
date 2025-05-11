<template>

  <div class="order-right">
    <br><br><br><br>
    <div class="order-content">

      <div class="title">
        <h3>My Orders</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
          <tr>
            <th style="width:29%">Product</th>
            <th style="width:31%">Order Details</th>
            <th style="width:13%">Recipient</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Operation</th>
          </tr>
          </thead>
        </table>
      </div>
      <div class="orders">
        <!-- Each order -->
        <table class="order-item" v-for="order in myOrder" :key="order.id">
          <thead>
          <tr>
            <th colspan="5">
                <span class="ordertitle">{{ order.createTime }} Order Number: {{ order.outTradeNo }}
                  <span class="pull-right delete"><img src="./images/delete.png" />
                  </span></span>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(cart,index) in order.orderDetailList" :key="cart.id">
            <td style="width: 60%"  >
                <div class="typographic">
                  <img :src="cart.imgUrl" style="width:100px;height:100px;"/>
                  <a style="width: 30%" href="#" class="block-text">{{cart.skuName}}</a>
                  <a style="width: 40%">x{{cart.skuNum}}</a>
                  <a style="width: 30%" href="#" class="service">After-sales Service</a>
                </div>
            </td>

            <td :rowspan="order.orderDetailList.length" v-if="index==0" style="width:8%" class="center">{{order.consignee}}</td>
            <td :rowspan="order.orderDetailList.length" v-if="index==0" style="width:13%" class="center">
              <ul class="unstyled">
                <li>Total Amount: ¥{{order.totalAmount}}.00</li>
                <li>Online Payment</li>
              </ul>
            </td>
            <td :rowspan="order.orderDetailList.length" v-if="index==0" style="width:8%" class="center">
              <a href="#" class="btn">{{order.orderStatusName}} </a>
            </td>
            <td :rowspan="order.orderDetailList.length" v-if="index==0" style="width:13%" class="center">
              <ul class="unstyled">
                <li>
                  <a href="" target="_blank">Review | Share</a>
                </li>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import order_data from "./myOrders";
export default {
  name:"orderS",
  data() {
    return {
      //Initialize parameters
      //Current page number
      page: 1,
      //Number of items per page
      limit: 3,
      //Store my order data
      myOrder:{}
    }
  },
  mounted () {
    //Method to get my order data
    this.getData()
  },
  methods: {
    //Method to get my orders
    async getData() {
      //Destructure parameters
      this.myOrder = order_data;
    },
    //Get the currently clicked page
  },
};
</script>

<style lang="scss" scoped>
table{
  border: 1px solid #e7e7e7;
  border-collapse: collapse;
  font-size: 12px;
  color: #666;
  text-align: left;
  width: 1000px;
}
.order-content{
  top: 200px;
}

</style>
