# vue-pro

- ==2018-4-2 10:12:24==

> A Vue.js project          

> vue + vue-router + webpack + element-ui

###### 运行前首先安装依赖包
npm install

###### 开发时候使用到的命令，会在 http://localhost:8080 看到运行后的网页
npm run dev

###### 打包命令
###### --------会执行删除原有的dist文件夹，webpack打包好后会自动出包到指定位置（需要配置build_copy.bat）
npm run build


- ==2019-3-25 14:40:49==

1. 如何新增mysql数据库。

```
mysql官网下载需要用到的mysql版本。解压后将 /bin 路径添加到系统环境变量
   登录mysql --- mysql -uroot -p
   停止mysql服务 --- net stop mysql
   启动mysql服务 --- net start mysql
   修改mysql默认密码 https://blog.csdn.net/try_try_try/article/details/80281899
```

2. 新增 /server 目录，内含nodejs代码，用于连接mysql数据库，进行前后端同时开发。
3. webpack打包后，通过配置nginx转发，也可访问接口