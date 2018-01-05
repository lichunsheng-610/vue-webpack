import Mock from "mockjs";
// global.Mock = Mock;

Mock.mock("table_list", {
    "data|20-100": [{
        "name": '@cname', //模拟名称
        "date": "@date('yyyy-MM-dd')", //模拟时间
        "address": "@county(true)" //模拟文本
    }]
})

export default function (options) {
    const defaultOptions = {
        dataType: 'json',
        cache: true,
        jsonp: 'callback'
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
