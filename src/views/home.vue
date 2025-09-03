<script>
import Layout from "@/layouts/main.vue";


export default {

  components: {
    Layout,

  },

};
</script>

<template>
  <Layout>
    <!-- start page title -->
    <BRow class="align-items-center">
      <BCol sm="12">
        <div class="page-title-box">
          <h4 class="font-size-18">Dashboard</h4>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item active">Welcome to Velzon Dashboard</li>
          </ol>
        </div>
      </BCol>
    </BRow>
  </Layout>
</template>