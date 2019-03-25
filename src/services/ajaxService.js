import Mock from "mockjs";
// global.Mock = Mock;

Mock.mock("login", function (options) {
    let return_data = {};
    let userInfo = options.body.split("&");
    let account = userInfo[0].split("=")[1];
    let password = userInfo[1].split("=")[1];
    if (account == "admin" && password == "111111")
        return_data = {
            code: 200,
            msg: "登录成功"
        }
    else
        return_data = {
            code: 1500,
            msg: "密码有误"
        }

    return return_data;
})

Mock.mock("table_list", {
    "data|20-100": [{
        "name": "@cname", //模拟名称
        "date": "@date('yyyy-MM-dd')", //模拟时间
        "address": "@county(true)" //模拟文本
    }]
})

Mock.mock("formData", {
    "cities": ["北京", "上海", "广州", "深圳", "杭州", "苏州", "天津"],
    "select_data|3-8": [{
        "value|+1": "@increment", //模拟文本        
        "label": "@cname" //模拟名称
    }],
    "cascader_data|3-8": [{
        "value": "@increment", //模拟名称
        "label": "@ctitle", //模拟文本
        "children|1-5": [{
            "value": "@increment", //模拟名称
            "label": "@ctitle", //模拟文本
            "children|1-3": [{
                "value": "@increment", //模拟名称
                "label": "@ctitle" //模拟文本
            }]
        }]
    }],
    "tagsData": [{
            name: '标签一',
            type: ''
        },
        {
            name: '标签二',
            type: 'success'
        },
        {
            name: '标签三',
            type: 'info'
        },
        {
            name: '标签四',
            type: 'warning'
        },
        {
            name: '标签五',
            type: 'danger'
        }
    ],
    "progress|5": ["@integer(10,100)"],
    "badge_value|3": ["@integer(10,100)"]

})

export default function (options) {
    const defaultOptions = {
        type: options.type,
        dataType: "json",
        cache: true,
        jsonp: "callback"
    };

    // options.url = options.url;
    options.data = processRequest(options);
    options.headers = {
        "Accept": "application/json",
        "Content-Type": "application/json;charset=utf-8"
    };

    return $.ajax({
        ...defaultOptions,
        ...options
    }).then(processResponse);
};


// 标准化传给后台的参数
function processRequest(r) {
    const str = r.data || {};
    if ('get' == r.method) {
        if ($.isEmptyObject(str) || null == str) {
            return {
                t: new Date().getTime()
            };
        } else {
            return {
                //添加时间戳随机数
                params: JSON.stringify(str),
                t: new Date().getTime()
            };
        }
    } else {
        return JSON.stringify(str);
    }
}

// 标准化后台相应数据格式
function processResponse(r) {
    let str = {};
    if (r.rows) {
        str = r;
        str.code = 0;
        str.list = r.rows;
        delete str.rows;
    } else {
        if (!r.error) {
            if (0 <= r.code) {
                str = r;
            } else {
                str.code = 0;
                str.data = r;
            }
        } else {
            str.code = -1;
            str.message = r.message || r.error;
        }
    }
    return str;
}
