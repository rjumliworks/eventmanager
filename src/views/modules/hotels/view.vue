<template>
    <Layout>
        <div class="page-title-box" style=" border-top: 1px solid #e0e0e0; position: fixed; width: 100%; margin-top: -24px; z-index: 100;">
            <h6 class="fw-bold mb-0">VIEW HOTEL</h6>
            <ol class="breadcrumb mb-0">
                <li class="breadcrumb-item active fs-10">Talks highlighting science, technology, and innovation.</li>
            </ol>
        </div>
        <br/><br/>
        

        

        
    
    
        <footer class="footer p-2">
            <div class="p-3 mt-n1">
               
            </div>
        </footer>
    </Layout>
</template>
<script>
import Layout from "@/layouts/main.vue";
export default {
    components: { Layout },
    data(){
        return {
        }
    },
};
</script>
<style>
 .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 80px;
        border-top: 0.1rem solid #e4e2e2;
        background-color: #fff;
        z-index: 10;
    }
</style>