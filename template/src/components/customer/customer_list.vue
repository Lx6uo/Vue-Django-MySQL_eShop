<template>
  <div v-show="list.length">

    <div class="list-control">
      <div class="list-control-filter">
        <span>Brand:</span>
        <span class="list-control-filter-item"
              :class="{on: item === filterBrand}"
              v-for="item in brands" :key="item.index"
              @click="handleFilterBrand(item)" >{{item}}</span>
      </div>
      <div class="list-control-filter">
        <span>Color:</span>
        <span class="list-control-filter-item"
              :class="{on: item === filterColor}"
              v-for="item in colors" :key="item.index"
              @click="handleFilterColor(item)">{{item}}</span>
      </div>

      <div class="list-control-order">
        <span>Sort:</span>
        <span class="list-control-order-item"
              :class="{on: order === ''}"
              @click="handleOrderDefault">Default</span>
        <span class="list-control-order-item"
              :class="{on: order === 'sales'}"
              @click="handleOrderSales">
                    Sales
                    <template v-if="order === 'sales'">↓</template>
                </span>
        <span class="list-control-order-item"
              :class="{on: order.indexOf('cost') > -1}"
              @click="handleOrderCost">
                    Price
                    <template v-if="order === 'cost-desc'">↓</template>
                    <template v-if="order === 'cost-asc'">↑</template>
                </span>
      </div>
    </div>
    <div class="productsList">
      <Customer_Product v-for="item in filteredAndOrderedList" :info="item" :key="item.fields.id"></Customer_Product>
    </div>
    <div class="product-not-found"
         v-show="!filteredAndOrderedList.length">No relevant products</div>
    <!--You May Also Like-->
    <!--转换成 v-for--后端实现 todo
<br><br>
    <div class="like">
      <h4 class="kt">You May Also Like</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">6 Reviews</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike02.png" />
          </div>
          <div class="attr">Apple苹果iPhone 6s/6s Plus 16G 64G 128G</div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">700 Reviews</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">700 Reviews</div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="./images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">700 Reviews</div>
        </li>
      </ul>
    </div>
-->
  </div>


</template>

<script>
//Import product introduction component
import Customer_Product from './customer_product.vue';
import util from "@/components/customer/util";
export default {
  components: {Customer_Product},

  data(){
    return {
      list:[],
      //Brand filter
      filterBrand: '',
      //Color filter
      filterColor: '',
      //Sorting criteria, optional values:
      //cost-desc price descending
      //cost-asc price ascending
      //sales sales volume
      order: ''
    }
  },
  computed:{
    brands(){
      //return this.$store.getters.brands;
      console.log("bb22");
      const brands = this.list.map(item => item.fields.product_brand);
      console.log("bbbbb22");
      console.log(brands);
      return util.getFilterArray(brands);

    },
    colors(){
      const colors = this.list.map(item => item.fields.product_color);
      return util.getFilterArray(colors);
    },
    filteredAndOrderedList(){
      //Copy the original array
      let list = [...this.list];
      //Brand filter
      if(this.filterBrand !== ''){
        list = list.filter(item => item.fields.product_brand === this.filterBrand);
      }
      //Color filter
      if(this.filterColor !== ''){
        list = list.filter(item => item.fields.product_color === this.filterColor);
      }
      //Sorting
      if(this.order !== ''){
        if(this.order === 'sales'){
          list = list.sort((a, b) => b.fields.product_sales - a.fields.product_sales);
        }else if(this.order === 'cost-desc'){
          list = list.sort((a, b) => b.fields.product_cost - a.fields.product_cost);
        }else if(this.order === 'cost-asc'){
          list = list.sort((a, b) => a.fields.product_cost - b.fields.product_cost);
        }
      }
      return list;
    }
  },
  methods: {
    async getProductsList(){
      //Get product list information from Vuex
      //return this.$store.state.productList;
      await this.axios.get('show_customer_products/')
        .then((response) => {
            console.log(response.data.list);
            this.list = response.data.list
        })
        .catch(function (error) {
            console.log(error);
        });
    },

    //Brand filtering
    handleFilterBrand(brand){
      //Click to filter by brand, click again to cancel
      if (this.filterBrand === brand) {
        this.filterBrand = '';
      }else{
        this.filterBrand = brand;
      }
    },
    //Color filtering
    handleFilterColor(color){
      //Click to filter by color, click again to cancel
      if (this.filterColor === color) {
        this.filterColor = '';
      }else{
        this.filterColor = color;
      }
    },
    handleOrderDefault(){
      this.order = '';
    },
    handleOrderSales(){
      this.order = 'sales';
    },
    handleOrderCost(){
      //When clicking ascending, update arrow to ↓, set descending to ↑
      if(this.order === 'cost-desc'){
        this.order = 'cost-asc';
      }else{
        this.order = 'cost-desc';
      }
    },

  },

  async created(){
    //Initialize by getting product list information through Vuex actions
    console.log("22");
    await this.getProductsList()
    console.log(this.list);
    console.log(this.list.map(item => item.fields.product_brand))
    console.log(this.list[0].pk)
  }
}
</script>

<style scoped>
.list-control{
  background: #fff;
  border-radius: 6px;
  margin: 16px;
  padding: 16px;
  box-shadow: 0 1px 1px rgba(0,0,0,.2);
}
.list-control-filter{
  margin-bottom: 16px;
}
.container {

  width: 500px;

  margin: 50px auto;

  overflow: hidden;

  border: 1px solid #ccc;

}
.bar1 {background: #A3D0C3; }
.bar1 input {
  border: 2px solid #7BA7AB;
  border-radius: 5px;
  background: #F9F0DA;
  color: #9E9C9C;
}
.bar1 button {
  top: 0;
  right: 0;
  background: #7BA7AB;
  border-radius: 0 5px 5px 0;
}
.bar1 button:before {
  font-family: FontAwesome,serif;
  font-size: 16px;
  color: #F9F0DA;
}
.list-control-filter-item,
.list-control-order-item {
  cursor: pointer;
  display: inline-block;
  border: 1px solid #e9eaec;
  border-radius: 4px;
  margin-right: 6px;
  padding: 2px 6px;
}
.list-control-filter-item.on,
.list-control-order-item.on{
  background: #f2352e;
  border: 1px solid #f2352e;
  color: #fff;
}
.product-not-found{
  text-align: center;
  padding: 32px;
}
.like {
  width: 1000px;

  margin: 50px auto;

  overflow: hidden;

  border: 1px solid #ccc;
}
.likeItem {
  display:inline-block; width:200px; height:200px;
}
</style>