<template>
    <div>
        <div class="radio_panel">
            <p>radio</p>
            <el-radio v-model="radio" label="1">男</el-radio>
            <el-radio v-model="radio" label="2">女</el-radio>
        </div>
        <div class="checkbox_panel">
            <p>checkbox</p>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
            </el-checkbox-group>
        </div>
        <div class="inputNum_panel">
            <p>inputNumber</p>
            <el-input-number v-model="num1" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
            <el-input-number v-model="num2" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
        </div>
        <div class="select_panel">
            <p>select</p>
            <el-select v-model="value1" filterable placeholder="请选择" :filter-method="select_filter">
                <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="">
            <p></p>

        </div>
    </div>
</template>

<script>
import ajax from '../services/ajaxService';
export default {
    data() {
        return {
            radio: "1",
            checkAll: false,
            checkedCities: ['广州'],
            cities: ['上海', '北京', '广州', '深圳'],
            isIndeterminate: true,
            num1: "1",
            num2: "5",
            options: [{
                value: '选项1',
                name: 'sssssss'
            }, {
                value: '选项2',
                name: '双皮奶'
            }, {
                value: '选项3',
                name: '蚵仔煎'
            }, {
                value: '选项4',
                name: '龙须面'
            }, {
                value: '选项5',
                name: '北京烤鸭'
            }],
            options_backup: [{
                value: '选项1',
                name: 'sssssss'
            }, {
                value: '选项2',
                name: '双皮奶'
            }, {
                value: '选项3',
                name: '蚵仔煎'
            }, {
                value: '选项4',
                name: '龙须面'
            }, {
                value: '选项5',
                name: '北京烤鸭'
            }],
            value1: ''
        }
    },
    methods: {
        handleCheckAllChange(val) {
            this.checkedCities = val ? this.cities : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        handleChange(val) {
            console.log(val);
        },
        select_filter(val) {
            if (val) {
                let arr_len = this.options_backup.length;
                let ret_arr = [];
                for (let i = 0; i < arr_len; i++) {
                    if (val.length < this.options_backup[i].value.length && this.options_backup[i].value.indexOf(val) > -1)//需要判断输入值的长度是否大于被判断值，如果大于的话会报错
                        ret_arr.push(this.options_backup[i]);
                    if (val.length < this.options_backup[i].name.length && this.options_backup[i].name.indexOf(val) > -1)
                        ret_arr.push(this.options_backup[i]);
                }
                this.options = ret_arr;
            } else {
                this.options = this.options_backup;
            }
        }
    }
}
</script>
<style scoped>
p {
  font-size: 18px;
  font-weight: bold;
}
</style>
