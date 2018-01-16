<template>
    <div>
        <div class="reload">
            <el-button type="primary" @click="getData">更新数据</el-button>
        </div>
        <div class="tag_panel">
            <p>Tag 标签</p>
            <el-tag v-for="tag in tagsData" :key="tag.name" closable :type="tag.type" @close="handleClose(tag)">{{tag.name}}</el-tag>
        </div>
        <div class="progress">
            <p>Progress 进度条</p>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="0"></el-progress>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="progress[0]"></el-progress>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="progress[1]" status="success"></el-progress>
            <el-progress :text-inside="true" :stroke-width="18" :percentage="progress[2]" status="exception"></el-progress>

            <el-progress type="circle" :percentage="0"></el-progress>
            <el-progress type="circle" :percentage="100"></el-progress>
            <el-progress type="circle" :percentage="progress[3]"></el-progress>
            <el-progress type="circle" :percentage="progress[4]"></el-progress>
        </div>
    </div>
</template>

<script>
import ajax from '../services/ajaxService';
export default {
    data() {
        return {
            tagsData: [],
            progress: []
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let _this = this;
            ajax({
                url: "formData"
            }).then(ret => {
                console.log(ret.progress);
                _this.tagsData = ret.tagsData;
                _this.progress = ret.progress;
            });
        },
        handleClose(tag) {
            this.tagsData.splice(this.tagsData.indexOf(tag), 1);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
}
</script>
<style>
.reload {
  width: 98px;
  height: 40px;
  position: absolute;
  left: 600px;
  top: 20px;
}
.el-tag {
  margin: 0 5px;
}
.el-progress--line {
  width: 500px;
  margin: 10px 0;
}
</style>
