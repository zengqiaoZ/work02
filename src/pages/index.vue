<template>
    <div>
        <div class="btn">
            <mt-button class="anniu" type="primary" size="large" @click="goSQ()">休学申请</mt-button>
            <mt-button class="anniu" type="primary" size="large" @click="goSH()">休学审核</mt-button>
        </div>
    </div>
</template>
<style>
</style>
<style scoped>
.anniu {
    margin-bottom: 50px;
}
.btn {
    margin: 100px auto;
    width: 75%;
}
</style>
<script>
import { Toast } from "bh-mint-ui2";
import { Get, Post } from "../utils";
import api from "../api";
export default {
    components: {},
    data() {
        return {};
    },
    watch: {},
    created() {
        Get(api.getSalaryList, {}).then(res => {});
    },
    mounted() {},
    methods: {
        goSQ() {
            this.$router.push({
                name: "SQ",
                query: {}
            });
        },
        goSH() {
            this.$router.push({
                name: "SH",
                query: {}
            });
        }
    }
};
</script>
          
        