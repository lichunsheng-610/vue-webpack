<template>
    <el-container>
        <el-aside width="800px">
            <div class="videoPanel">video</div>
        </el-aside>
        <el-main>
            <el-button @click="login" type="primary" :loading="loginLoading">设备登录</el-button>
            <el-button @click="logout" type="danger">设备登出</el-button>
            <el-button @click="getCameraList" type="info">获取摄像头列表</el-button>
            <el-button @click="getMicrophoneList" type="info">获取麦克风列表</el-button>

        </el-main>
    </el-container>
</template>

<script>
    import GSRTC from '../GSRTC/GSRTC';

    export default {
        name: 'webRTC',
        data() {
            return {
                loginLoading: false,
                rtc: null,
            }
        },
        methods: {
            login() {
                this.loginLoading = true;
                this.rtc.Login({
                    'deviceId': '1234567890', // 设备登录Id
                    'serverIp': '192.168.55.116', // 设备服务IP
                    'serverPort': '8080', // 设备服务监听的websocket端口
                    'username': 'admin', // 用户名
                    'passward': 'admin', // 密码
                }).then((ret) => {
                    console.log("设备登录成功");
                    console.log(ret);
                    this.loginLoading = false;
                });
            },
            logout() {
                this.rtc.Logout();
            },
            getCameraList() {
                console.log("GetCameraList");
                this.rtc.GetDeviceList("video").then((ret) => {
                    console.log(ret);
                }, (error) => {
                    console.log(error);
                });
            },
            getMicrophoneList() {
                console.log("getMicrophoneList");
                this.rtc.GetDeviceList("audio").then((ret) => {
                    console.log(ret);
                }, (error) => {
                    console.log(error);
                });
            },
        },
        created() {
            console.log("created");
            this.rtc = new GSRTC();
            console.log(navigator.mediaDevices);
        },
        beforeDestroy() {
            this.rtc = null;
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .videoPanel {
        width: auto;
        height: 600px;
        border: 1px solid #eee;
    }

</style>
