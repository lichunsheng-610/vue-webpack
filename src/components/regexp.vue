<template>
    <div class="regexp_panel">
        <div class="regexpitem">
            <el-input v-model="val_1" placeholder="支持中文、字母、数字"></el-input>
            <el-button type="primary" @click="val_btn_1">是否满足条件</el-button>
        </div>

        <div class="regexpitem">
            <el-input v-model="val_2" placeholder="支持字母"></el-input>
            <el-button type="primary" @click="val_btn_2">是否满足条件</el-button>
        </div>

        <div class="regexpitem">
            <el-input v-model="val_3" placeholder="不支持windows指定特殊字符"></el-input>
            <el-button type="primary" @click="val_btn_3">是否满足条件</el-button>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            val_1: "",
            val_2: "",
            val_3: ""
        }
    },
    mounted() {

    },
    destroyed() {

    },
    methods: {
        val_btn_1() {
            let key_exp = new RegExp("^[a-zA-z0-9\u4E00-\u9FA5-]*$"); //正则判断 中文、字母、数字
            if (key_exp.test(this.val_1))
                this.$message({
                    type: 'success',
                    message: '输入正确'
                });
            else
                this.$message({
                    type: 'error',
                    message: '输入错误'
                });
        },
        val_btn_2() {
            let key_exp = new RegExp("^[a-zA-z]*$"); //正则判断 字母
            if (key_exp.test(this.val_2))
                this.$message({
                    type: 'success',
                    message: '输入正确'
                });
            else
                this.$message({
                    type: 'error',
                    message: '输入错误'
                });
        },
        val_btn_3() {
            let key_exp = new RegExp("^[/\\\\:*?\"<>|]*$"); //windows指定特殊字符
            if (key_exp.test(this.val_3))
                this.$message({
                    type: 'error',
                    message: '输入错误'
                });
            else
                this.$message({
                    type: 'success',
                    message: '输入正确'
                });
        }
    }
};

</script>
<style>
.regexpitem {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
}
.regexpitem .el-input {
    width: 388px;
    float: left;
}

.regexpitem .el-button {
    float: left;
    margin-left: 10px;
}
</style>
