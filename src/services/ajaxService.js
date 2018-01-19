import Mock from "mockjs";
// global.Mock = Mock;

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
        dataType: "json",
        cache: true,
        jsonp: "callback"
    };

    // options.url = options.url;
    options.headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    return $.ajax({ ...defaultOptions,
        ...options
    }).then();
};
