<template>
    <div class="qrCode_panel">
        <p>自定义二维码</p>
        <div id="code"></div>
        <el-input v-model="code_txt" placeholder="请输入自定义二维码内容"></el-input>
        <el-button @click='submit'>更新二维码</el-button>
    </div>
</template>

<script>

export default {
    data() {
        return {
            code_txt: ""
        }
    },
    created() {

    },
    mounted() {
        let _this = this;
        this.$nextTick(function () {
            require('../../static/plugin/jquery-qrcode-0.14.0.min.js');
            _this.qrcode();
        })
    },
    methods: {
        qrcode() {
            $("#code").qrcode({
                text: "请输入自定义内容",
                width: 200,
                height: 200
            });
        },
        submit() {
            let _this = this;
            $("#code").children().remove();
            $("#code").qrcode({
                text: _this.code_txt,
                width: 200,
                height: 200
            });
        }
    }
};
</script>
<style>
.qrCode_panel {
    width: 500px;
}
.qrCode_panel .el-input,
.qrCode_panel .el-button {
    margin-top: 20px;
}
</style>
