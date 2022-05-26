<template>
  <div id="login" class="container-fluid">
    <div class="row">
      <button class="btn btn-primary" @click="handleGetProduct()">
        Get Product
      </button>

      <table v-if="products.length > 0" class="table table-hover">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in products" :key="index">
            <td>{{ product.product_name }}</td>
            <td>{{ product.description }}</td>
            <td>{{ formatPrice(product.price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getProduct } from "../../api/module/product";
import { formatPrice } from "../../utils/formatPrice";
export default {
  name: "Login",
  data() {
    return {
      username: "username",
      products: [],
      formatPrice
    };
  },
  methods: {
    async handleGetProduct() {
      try {
        const response = await getProduct();
        this.products = response.data;
        console.log(this.products);
      } catch (error) {
        console.error(error);
      }
    },
    
  },
};
</script>
