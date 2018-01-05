<template>
    <div>
        <el-button @click="searchBtn">查询</el-button>
        <el-table :data="table_data" height="500" border style="width: 100%">
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[100, 200, 300, 400]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="data_total">
        </el-pagination>
    </div>
</template>

<script>
import ajax from '../services/ajaxService';
export default {
    data() {
        return {
            table_data: [],
            data_total: 0,
            pageSize: 100
        }
    },
    methods: {
        searchBtn() {
            ajax({
                url: "table_list"
            }).then(ret => {
                this.table_data = ret.data;
                this.data_total = ret.data.length;
            });
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