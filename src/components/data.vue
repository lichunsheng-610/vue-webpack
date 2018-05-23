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
        <div>
            <p>Badge 标记</p>
            <el-badge :value="badge_value[0]" class="badge_item">
                <el-button size="small">评论</el-button>
            </el-badge>
            <el-badge :value="badge_value[1]" :max="10" class="badge_item">
                <el-button size="small">回复</el-button>
            </el-badge>
            <el-badge :value="badge_value[2]" :max="50" class="badge_item">
                <el-button size="small">查看</el-button>
            </el-badge>
        </div>
        <div>
            <p>Message 消息提示</p>
            <el-button @click="open_info" type="primary">消息</el-button>
            <el-button @click="open_success" type="success">成功</el-button>
            <el-button @click="open_warn" type="warning">警告</el-button>
            <el-button @click="open_error" type="danger">错误</el-button>
        </div>
    </div>
</template>

<script>
import ajax from '../services/ajaxService';
export default {
    data() {
        return {
            tagsData: [],
            progress: [],
            badge_value: []
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
                _this.tagsData = ret.tagsData;
                _this.progress = ret.progress;
                _this.badge_value = ret.badge_value;
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
        },
        open_info() {
            this.$message({
                showClose: true,
                message: '这是一条消息提示'
            });
        },

        open_success() {
            this.$message({
                showClose: true,
                message: '恭喜你，这是一条成功消息',
                type: 'success'
            });
        },

        open_warn() {
            this.$message({
                showClose: true,
                message: '警告哦，这是一条警告消息',
                type: 'warning'
            });
        },

        open_error() {
            this.$message({
                showClose: true,
                message: '错了哦，这是一条错误消息',
                type: 'error'
            });
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

.badge_item {
    margin-right: 50px;
}
</style>
