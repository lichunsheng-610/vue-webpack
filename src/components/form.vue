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
            <el-select v-model="select_value" filterable placeholder="请选择" :filter-method="select_filter">
                <el-option v-for="item in select_data" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
        </div>
        <div class="cascader_panel">
            <p>Cascader 级联选择器</p>
            <el-cascader expand-trigger="hover" :options="cascader_data" v-model="cascader_select" @change="handleChange"></el-cascader>
        </div>
        <div class="datePicker_panel">
            <p>DatePicker 日期选择器</p>
            <el-date-picker v-model="datePicker_value" type="date" placeholder="选择日期"></el-date-picker>
        </div>
    </div>
</template>

<script>
import ajax from '../services/ajaxService';
import moment from 'moment';

export default {
    data() {
        return {
            radio: "1",
            checkAll: false,
            checkedCities: [],
            cities: [],
            isIndeterminate: true,
            num1: "1",
            num2: "5",
            select_data: [],
            select_data_backup: [],
            select_value: '',
            cascader_data: [],
            cascader_select: [],
            datePicker_value: moment().format("YYYY-MM-DD")
        }
    },
    created: function () {
        let _this = this;
        ajax({
            url: "formData"
        }).then(ret => {
            console.log(ret.cities);
            _this.cities = ret.cities;
            _this.checkedCities = new Array(ret.cities[1]);
            _this.select_data = ret.select_data;
            _this.select_data_backup = ret.select_data;
            _this.cascader_data = ret.cascader_data;
        });
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
                let arr_len = this.select_data_backup.length;
                let ret_arr = [];
                for (let i = 0; i < arr_len; i++) {
                    if (val.length < this.select_data_backup[i].value.length && this.select_data_backup[i].value.indexOf(val) > -1)//需要判断输入值的长度是否大于被判断值，如果大于的话会报错
                        ret_arr.push(this.select_data_backup[i]);
                    if (val.length < this.select_data_backup[i].label.length && this.select_data_backup[i].label.indexOf(val) > -1)
                        ret_arr.push(this.select_data_backup[i]);
                }
                this.select_data = ret_arr;
            } else {
                this.select_data = this.select_data_backup;
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
