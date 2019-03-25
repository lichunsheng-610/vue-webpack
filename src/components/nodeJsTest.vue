<template>
    <div class="hello">
        <h1>{{msg}}</h1>
        <!-- <img src="../../static/file/vue.jpg"> -->
    </div>
</template>

<script>
    export default {
        name: 'helloWorld',
        data() {
            return {
                msg: 'nodeJs'
            }
        },

        methods: {
            connectMySQL: function () {
                $ajax({
                    url: "/api/user/checkUser",
                    type: "get",
                    data: {}
                }).then(ret => { //测试接口
                    console.log(ret);
                });
            },
        },

        mounted: function () {
            this.connectMySQL();
        },
    }

</script>

<style scoped>
    h1 {
        text-align: center;
    }

</style>
