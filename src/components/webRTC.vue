<template>
    <el-container>
        <el-aside width="800px">
            <div class="videoPanel">
                <span>本地</span>
                <video id="localVideo" width="300px" height="300px" autoplay="autoplay"
                    style="border:1px solid #000000"></video>
                <span>远端</span>
                <video id="remoteVideo" width="300px" height="300px" autoplay="autoplay"
                    style="border:1px solid #000000"></video>
            </div>
        </el-aside>
        <el-main class="main">
            <el-input v-model="deviceIDInput" placeholder="请输入设备id"></el-input>
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
            <div class="panelItem">
                <span v-if="!joinMeetingBtn">暂无会议邀请</span>
                <span v-if="joinMeetingBtn">被邀请参加会议！会议名称：{{meetingName}}</span>
                <el-button @click="joinMeeting" type="primary" :disabled="!joinMeetingBtn">加入会议</el-button>
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
                deviceIDInput: "100003",
                userInfo: {
                    'deviceId': '100003', // 设备登录Id
                    'serverIp': '192.168.55.116', // 设备服务IP
                    'serverPort': '45002', // 设备服务监听的websocket端口
                    'username': 'admin', // 用户名
                    'passward': 'admin', // 密码
                },

                loginLoading: false,
                rtc: null,

                cameraId: "",
                cameraList: [],
                microphoneId: "",
                microphoneList: [],

                volume: 0,

                joinMeetingBtn: false,
                meetingID: "",
                meetingName: "",
            }
        },
        methods: {
            _message(msg, type = 'success', times = '5000') {
                this.$message({
                    showClose: true,
                    message: msg,
                    type,
                    duration: times,
                });
            },
            notify(msg) {
                // 在new GSRTC对象时，传入，可以获取全部websocket回调
                console.log("------------demo收到的通知信息------start-----");
                console.log(msg);
                console.log("------------demo收到的通知信息-------end------");
            },
            login() {
                this.loginLoading = true;
                this.userInfo.deviceId = this.deviceIDInput;
                this.rtc.Login(this.userInfo).then((ret) => {
                    console.log("设备登录回调--------------");
                    console.log(ret);
                    this._message(ret.body.msg, ret.body.result == 0 ? 'success' : 'error');
                    this.loginLoading = false;
                }, (error) => {
                    console.log(error);
                });
            },
            logout() {
                this.userInfo.deviceId = this.deviceIDInput;
                this.rtc.Logout(this.userInfo).then((ret) => {
                    this._message(ret.body.msg, ret.body.result == 0 ? 'success' : 'error');
                    console.log("out");
                    console.log(ret);
                    this.loginLoading = false;
                }, (error) => {
                    console.log(error);
                });
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
                });
            },
            joinMeeting() {
                this.rtc.EnterMeeting(this.meetingID).then((ret) => {
                    console.log("加入会议回调--------------");
                    console.log(ret);
                    // this._message(ret.body.msg, ret.body.result == 0 ? 'success' : 'error');
                    // this.loginLoading = false;
                }, (error) => {
                    console.log(error);
                });
            },
        },
        created() {
            console.log("created");
            this.userInfo.deviceId = this.deviceIDInput;
            this.rtc = new GSRTC(this.userInfo);
            // this.rtc = new GSRTC(this.userInfo, this.notify);
            console.log(navigator.mediaDevices);

            this.rtc.on("Meeting_Invitation", (msg) => {
                // 监听收到 被邀请参加会议 的通知
                console.log("被邀请参加会议哦~~~");
                console.log(msg);
                this.meetingID = msg.body.meeting_id;
                this.meetingName = msg.body.meeting_name;
                this.joinMeetingBtn = true;
            });

            // try {
            //     let pc = new RTCPeerConnection();
            //     pc.createOffer(function (offer) {
            //         console.log(offer);
            //         pc.setLocalDescription(new RTCSessionDescription(offer), function () {
            //             // send the offer to a server to be forwarded to the friend you're calling.
            //         }, error => console.log(error));
            //     }, error => console.log(error));
            //     console.log('>>>>>> createPeerConnection()', pc);
            // } catch (e) {
            //     console.log('>>>>>> createPeerConnection() Failed to create PeerConnection, exception: ' + e.message);
            //     alert('Cannot create RTCPeerConnection object.');
            //     return;
            // }
        },
        beforeDestroy() {
            console.log("beforeDestroy");
            this.rtc.Uninit();
            this.rtc = null;
        },
    }

    function handleIceCandidate(event) {
        var ice = event.candidate;

        if (ice) {
            var isHost = (ice.candidate.indexOf('typ host') !== -1);
            var isSrflx = (ice.candidate.indexOf('srflx') !== -1);
            var isRelay = (ice.candidate.indexOf('relay') !== -1);
            var candidateType = isHost ? 'host' : (isSrflx ? 'srflx' : 'relay');

            if (wantHostMode && ice.candidate.indexOf('typ host') == -1) {
                console.log('>>>>>> handleIceCandidate(event) pass candidate [' + candidateType + ']');
                return;
            }

            if (wantReflexiveMode && ice.candidate.indexOf('srflx') == -1) {
                console.log('>>>>>> handleIceCandidate(event) pass candidate [' + candidateType + ']');
                return;
            }

            if (wantRelayMode && ice.candidate.indexOf('relay') == -1) {
                console.log('>>>>>> handleIceCandidate(event) pass candidate [' + candidateType + ']');
                return;
            }

            console.log('>>>>>> handleIceCandidate(event) selected a ' + candidateType +
                ' candidate and send to the other');
            console.log(event);
            // sendMsgToOthers({
            //     type: 'candidate',
            //     label: event.candidate.sdpMLineIndex,
            //     id: event.candidate.sdpMid,
            //     candidate: event.candidate.candidate
            // }, room);

        } else {
            console.log('>>>>>> handleIceCandidate(event) End of candidates.');
        }
    }

    function handleRemoteStreamAdded(event) {
        console.log('>>>>>> handleRemoteStreamAdded(event) Remote stream added.', event);
        // remoteVideo.src = window.URL.createObjectURL(event.stream);
        // remoteStream = event.stream;
    }

    function handleRemoteStreamRemoved(event) {
        console.log('>>>>>> handleRemoteStreamRemoved(event) Remote stream removed. Event: ', event);
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
