<template>
    <el-container>
        <el-aside width="800px">
            <div class="videoPanel">video</div>
        </el-aside>
        <el-main class="main">
            <el-button @click="login" type="primary" :loading="loginLoading">设备登录</el-button>
            <el-button @click="logout" type="danger">设备登出</el-button>
            <div class="panelItem">
                摄像头列表：
                <el-select v-model="cameraId" clearable placeholder="请选择" @change="selectChangeC">
                    <el-option v-for="item in cameraList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button @click="getCameraList" type="info">获取摄像头列表</el-button>
            </div>
            <div class="panelItem">
                麦克风列表：
                <el-select v-model="microphoneId" clearable placeholder="请选择" @change="selectChangeM">
                    <el-option v-for="item in microphoneList" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button @click="getMicrophoneList" type="info">获取麦克风列表</el-button>
            </div>
            <div class="panelItem">
                麦克风音量：
                <el-progress :percentage="volume"></el-progress>
                <el-button @click="getMicrophoneVolume" type="info">获取麦克风实时音量</el-button>
            </div>

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

                cameraId: "",
                cameraList: [],
                microphoneId: "",
                microphoneList: [],

                volume: 0,
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
            selectChangeC(e) {
                console.log(e);
                this.rtc.SetCamera(e);
            },
            getCameraList() {
                console.log("GetCameraList");
                this.rtc.GetDeviceList("video").then((ret) => {
                    console.log(ret);
                    let temp = [];
                    ret.data.forEach(element => {
                        let obj = {
                            value: element.deviceId,
                            label: element.label
                        }
                        temp.push(obj);
                    });
                    this.cameraList = temp;
                }, (error) => {
                    console.log(error);
                    this.$message({
                        showClose: true,
                        message: error.data.message,
                        type: 'error'
                    });
                });
            },
            selectChangeM(e) {
                console.log(e);
                this.rtc.SetMicrophone(e);
            },
            getMicrophoneList() {
                console.log("getMicrophoneList");
                this.rtc.GetDeviceList("audio").then((ret) => {
                    console.log(ret);
                    let temp = [];
                    ret.data.forEach(element => {
                        let obj = {
                            value: element.deviceId,
                            label: element.label
                        }
                        temp.push(obj);
                    });
                    this.microphoneList = temp;
                }, (error) => {
                    console.log(error);
                    this.$message({
                        showClose: true,
                        message: error.data.message,
                        type: 'error'
                    });
                });
            },
            getMicrophoneVolume() {
                this.rtc.on("getMicrophoneVolume", (volume) => {
                    console.log("getMicrophoneVolumeCallback");
                    console.log(volume);
                    this.volume = volume;
                })
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

    .main {
        color: #606266;
    }

    .panelItem {
        margin: 10px 0;
    }


    .el-progress {
        width: 217px;
        display: inline-block;
    }

</style>
