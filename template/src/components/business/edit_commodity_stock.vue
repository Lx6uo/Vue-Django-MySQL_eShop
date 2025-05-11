<template>
  <div class="py-2 px-2 height-100pc user-center" elevation="1">
    <v-row no-gutters justify="space-between">
      <v-col class="ml-3">
        <v-toolbar
            dark
            color="blue darken-3"
            class="mb-1"
        >
          <v-spacer></v-spacer>
          <v-toolbar-title>
            <h4>Increase Stock</h4>
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card>
          <v-card flat class="pa-3">
            <v-row>
              <v-col md="6">
                <v-form ref="form">
                  <!-- 字段渲染 -->
                  <v-container>
                    <v-row>
                      <v-col md="12">
                        <v-text-field
                            label="Additional Stock Quantity"
                            :rules="intRule"
                            v-model="stock"
                            clearable
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col md="12">
                        <v-text-field
                            label="Unit Cost Price"
                            :rules="costRule"
                            v-model="cost"
                            clearable
                        />
                      </v-col>
                    </v-row>

                  </v-container>
                </v-form>
              </v-col>

            </v-row>
            <v-divider/>
            <v-row justify="end">
              <v-col md="4" align="end">
                <v-btn
                    small
                    tile
                    class="mr-2"
                    color="primary"
                    @click="saveStock"
                >
                  Add
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>


<script>
import {required} from "@/utils/widget";

export default {
  name: "business_add_commodity",
  data() {
    return {
      id: parseInt(this.$route.params.id),
      cost:"",
      stock:"",
      intRule: [required("Increase Stock"),
          function (v) {
            return  /^[1-9]{1}\d*$/.test(v) || `Stock must be an integer`;
          }
      ],
      costRule:[required("Unit Cost Price"),
          function (v) {
            return  /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,2})?$/.test(v) || `Amount can have at most 2 decimal places`;
          }
      ]

    };
  },

  methods: {
    // TODO：保存商品信息
    async saveStock() {
      await this.axios.get('add_product_stock/',
          {params:{product_id: this.id,stock:this.stock,cost:this.cost}})
        .then((response) => {
            console.log(response);

        })
        .catch(function (error) {
            console.log(error);

        });
      window.alert("Stock added successfully")

      window.location.href = '/#/business/commodity';
    },


  },
};
</script>

<style>

</style>
