/**
 * GSRTCReturnCode 部分返回码定义
 * @return {Number} 0 - 成功
 * @return {Number} 1001 - 初始化SDK失败
 * @return {Number} 1002 - 反初始化SDK失败
 * @return {Number} 1003 - 登录失败
 * @return {Number} 1004 - 登出失败
 * @return {Number} 1005 - 进入会议失败
 * @return {Number} 1006 - 离开会议失败
 * @return {Number} 1007 - 请求码流失败
 * @return {Number} 1008 - 上麦/下麦失败
 * @return {Number} 1009 - 设置本地渲染窗口失败
 * @return {Number} 1010 - 设置远端数据渲染窗口失败
 * @return {Number} 1011 - 启用本地音频失败
 * @return {Number} 1012 - 启用远端音频失败
 * @return {Number} 1013 - 启用本地视频失败
 * @return {Number} 1014 - 启用远端视频失败
 * @return {Number} 1015 - 获取麦克风音量失败
 * @return {Number} 1016 - 设置麦克风音量失败
 * @return {Number} 1017 - 获取扬声器音量失败
 * @return {Number} 1018 - 设置扬声器音量失败
 * @return {Number} 1019 - 获取摄像头列表失败
 * @return {Number} 1020 - 选用摄像头失败
 * @return {Number} 1021 - 获取麦克风列表失败
 * @return {Number} 1022 - 选用麦克风失败
 */

import './adapter-latest';
import myWebsocket from './myWebsocket';

let conf = {
    iceTransportPolicy: "all",
    // sdpSemantics:""
}
let rtcPeerConnection = new RTCPeerConnection(conf);

// GSRTC对象
class GSRTC {
    constructor(userInfo, notify) {
        this.sequence = 1;
        this.eventListeningPool = {};
        this.userInfo = userInfo;
        this.websocketNotify = notify;
        // this._websocketDGW = new myWebsocket("ws://192.168.55.116:45002/");
        // this._websocketDGW.open();
    }

    /**
     * 初始化函数，创建一个pc0，预览capturer捕捉到的媒体流
     * @method Init
     * @param {Object} capturer 摄像头句柄
     * @return {Number} GSRTCReturnCode
     */

    Init(capturer) {}

    /**
     * 反初始化函数，清理资源
     * @method Uninit
     * @return {Number} GSRTCReturnCode
     */

    Uninit() {
        this._websocketDGW.close();
        this._websocketDGW = null;

        this.cameraId = "";
        this.microphoneId = "";
        this.userInfo = {};
        this.eventListeningPool = {};
        this.websocketNotify = null;
        this.sequence = 1;
        this.meetingId = "";
        this.sourceId = "";

        rtcPeerConnection.close();
        rtcPeerConnection = null;
    }

    /**
     * 登录，signaling（websocket)链接到DGW服务，解析链接收到的信令并作出相应处理后，通知上层
     * @method Login
     * @param {Object} LoginParam 登录参数。包含如下
     *      {
     *          'deviceId': '1234567890', -- 设备登录Id
     *          'serverIp': '192.168.55.116', -- 设备服务IP
     *          'serverPort': '8080', -- 设备服务监听的websocket端口
     *          'username': 'admin', -- 用户名
     *          'passward': 'admin', -- 密码
     *      }
     * @return {Number} GSRTCReturnCode
     */

    Login(LoginParam) {
        return new Promise((resolve, reject) => {
            // console.log(LoginParam);
            console.log("Login start");
            this._websocketDGW = new myWebsocket(`ws://${LoginParam.serverIp}:${LoginParam.serverPort}/rtc?id=${LoginParam.deviceId}`);
            // this._websocketDGW = new myWebsocket("ws://192.168.55.116:45002/");
            this._websocketDGW.open(msg => this.onMessageDGW(msg)).then(() => {
                this._websocketDGW.send(this.getSendMessage("Dev_Login", `{"username": ${LoginParam.username},"passward": ${LoginParam.passward}}`)).then(ret => {
                    // this._websocketDGW.send({
                    //     'cmd': 'Dev_Login',
                    //     'dev_id': LoginParam.deviceId,
                    //     'sequence': this.sequence++,
                    //     'cmd_type': 0,
                    //     'body': `{"username": ${LoginParam.username},"passward": ${LoginParam.passward}}`,
                    // }).then(ret => {
                    // console.log("Login resolve");
                    resolve(ret);
                }, err => {
                    reject(err);
                });
            });
        });
    }

    /**
     * 登出，断开signaling与DGW的链接，同时断开所有pc链接并还原所有状态
     * @method Logout
     * @return {Number} GSRTCReturnCode
     */

    Logout(LogoutParam) {
        return new Promise((resolve, reject) => {
            console.log("Logout");
            if (!this._websocketDGW) {
                reject("0909090");
            }
            this._websocketDGW.send({
                'cmd': 'Dev_Logout',
                'dev_id': LogoutParam.deviceId,
                'sequence': this.sequence++,
                'cmd_type': 0,
                'body': `{"username": ${LogoutParam.username},"passward": ${LogoutParam.passward}}`,
            }).then(ret => {
                console.log("Logout resolve");
                this._websocketDGW.close();
                this._websocketDGW = null;
                resolve(ret);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 进入会议，signaling向服务端发出进入会议的申请报文
     * @method EnterMeeting
     * @param {String} meetingId 会议Id
     * @param {Object} mediaDirect 媒体收发方向
     *      {
     *          'videoDirect': 'sendOnly', -- 视频方向： sendOnly|RecvOnly|sendRecv|Inactive
     *          'audioDirect': 'RecvOnly', -- 音频方向： sendOnly|RecvOnly|sendRecv|Inactive
     *      }
     * @return {Number} GSRTCReturnCode
     */

    EnterMeeting(meetingId, mediaDirect) {
        return new Promise((resolve, reject) => {
            console.log("EnterMeeting");
            if (!this._websocketDGW) {
                reject("0909090");
            }
            this._websocketDGW.send(this.getSendMessage("Meeting_Enter", `{"meeting_id": ${meetingId}}`)).then(ret => {
                console.log("EnterMeeting resolve");
                resolve(ret);
            }, err => {
                reject(err);
            });
        });
    }

    /**
     * 离开会议，signaling向服务端发出离开会议的申请报文
     * @method LeaveMeeting
     * @param {String} meetingId 会议Id
     * @return {Number} GSRTCReturnCode
     */

    LeaveMeeting(meetingId) {}

    /**
     * RTC设备向MTS重新请求参会者peer码流的通知
     * @method RequestStream
     * @param {String} peerId 参会者Id
     * @param {String} meetingId 会议Id
     * @return {Number} GSRTCReturnCode
     */

    RequestStream(peerId, meetingId) {}

    /**
     * 抢麦，获取集群语音对讲会议的麦克风
     * @method TakeMic
     * @param {String} meetingId 会议Id
     * @param {Boolean} enable 为true表示上麦，false表示下麦
     * @return {Number} GSRTCReturnCode
     */

    TakeMic(meetingId, enable) {}

    /**
     * 设置本地渲染窗口
     * @method SetLocalMediaRender
     * @param {String} render 渲染数据处理对象
     * @return {Number} GSRTCReturnCode
     */

    SetLocalMediaRender(render) {}

    /**
     * 设置远端数据渲染窗口
     * @method SetRemoteMediaRender
     * @param {String} peerId 远端Id
     * @param {String} render 渲染数据处理对象
     * @return {Number} GSRTCReturnCode
     */

    SetRemoteMediaRender(peerId, render) {}

    /**
     * 启用本地音频采集发送，默认为启用，禁用后对端将接受静音帧。
     * @method EnableLocalAudio
     * @param {Boolean} enable 是否启用
     * @return {Number} GSRTCReturnCode
     */

    EnableLocalAudio(enable) {}

    /**
     * 启用远端音频接受渲染，默认为启用，禁用后将收到的对端音频渲染为静音帧。
     * @method EnableRemoteAudio
     * @param {String} peerId 远端Id
     * @param {Boolean} enable 是否启用
     * @return {Number} GSRTCReturnCode
     */

    EnableRemoteAudio(peerId, enable) {}

    /**
     * 启用本地视频采集发送，默认为启用，禁用后对端将接收黑屏帧。
     * @method EnableLocalVideo
     * @param {Boolean} enable 是否启用
     * @return {Number} GSRTCReturnCode
     */

    EnableLocalVideo(enable) {}

    /**
     * 启用远端视频接受渲染，默认为启用，禁用后将收到的对端视频渲染为黑屏帧。
     * @method EnableRemoteVideo
     * @param {String} peerId 远端Id
     * @param {Boolean} enable 是否启用
     * @return {Number} GSRTCReturnCode
     */

    EnableRemoteVideo(peerId, enable) {}

    /**
     * 获取麦克风音量
     * @method GetMicrophoneVolume
     * @param {String} volume 音量
     * @return {Object} { state, data } state: GSRTCReturnCode, data: 返回音量信息或获取失败信息
     */

    GetMicrophoneVolume() {
        let that = this;
        // return new Promise((resolve, reject) => {
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then((stream) => {
            console.log(stream.getTracks());
            let audioContext = new AudioContext();
            // 将麦克风的声音输入这个对象
            let mediaStreamSource = audioContext.createMediaStreamSource(stream);
            // 创建一个音频分析对象，采样的缓冲区大小为4096，输入和输出都是单声道
            let scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
            // 将该分析对象与麦克风音频进行连接
            mediaStreamSource.connect(scriptProcessor);
            // 此举无甚效果，仅仅是因为解决 Chrome 自身的 bug
            scriptProcessor.connect(audioContext.destination);
            // 开始处理音频
            scriptProcessor.onaudioprocess = function (e) {
                // 获得缓冲区的输入音频，转换为包含了PCM通道数据的32位浮点数组
                let buffer = e.inputBuffer.getChannelData(0);
                // 获取缓冲区中最大的音量值
                let maxVal = Math.max.apply(Math, buffer);
                // 显示音量值
                let volume = Math.round(maxVal * 100);
                // console.log(volume);
                that.eventListeningPool["getMicrophoneVolume"](volume);
                // resolve(volume);
            };
        }).catch((error) => {
            // console.log('获取音频时好像出了点问题。' + error);
            // reject(error);
        });
        // });
    }

    /**
     * 设置麦克风音量
     * @method SetMicrophoneVolume
     * @param {String} volume 音量
     * @return {Number} GSRTCReturnCode
     */

    SetMicrophoneVolume(volume) {}

    /**
     * 获取扬声器音量
     * @method GetSpeakerVolume
     * @param {String} volume 音量
     * @return {Object} { state, data } state: GSRTCReturnCode, data: 返回音量信息或获取失败信息
     */

    GetSpeakerVolume() {}

    /**
     * 设置扬声器音量
     * @method SetSpeakerVolume
     * @param {String} volume 音量
     * @return {Number} GSRTCReturnCode
     */

    SetSpeakerVolume(volume) {}

    /**
     * 获取设备列表
     * @method GetDeviceList
     * @param {String} type 设备类型 video--摄像头; audio--麦克风
     * @return {Object} { state, data } state: GSRTCReturnCode, data: 返回摄像头列表或获取失败信息
     */

    GetDeviceList(type) {
        return new Promise((resolve, reject) => {
            let constraints = {};
            constraints[type] = true;

            // enumerateDevices无法直接获取设备列表，需要getUserMedia获取浏览器使用设备权限，才能拿到设备列表
            navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
                navigator.mediaDevices.enumerateDevices().then((ret) => {
                    /**
                     * 以下情况均会进入success
                     * 1. 浏览器弹窗提示用户给予使用媒体输入的许可时，选择允许
                     * 2. 摄像头/麦克风正常使用
                     */
                    // console.log(mediaStream.getTracks());
                    mediaStream.getTracks().forEach(element => {
                        // 停止getUserMedia获取到的流媒体
                        element.stop();
                    });
                    let deviceInfos = ret.filter((item) => item.kind === `${type}input`);
                    // console.log(deviceInfos[0].deviceId);
                    // let test = {
                    //     audio: {
                    //         deviceId: deviceInfos[0].deviceId
                    //     }
                    // }
                    // navigator.mediaDevices.getUserMedia(test).then((stream) => {
                    //     console.log(stream.getTracks());
                    // });
                    resolve({
                        code: 0,
                        data: deviceInfos
                    });
                });
            }).catch((data) => {
                /**
                 * 以下情况均会进入error
                 * 1. 浏览器弹窗提示用户给予使用媒体输入的许可时，选择禁止
                 * 2. 摄像头/麦克风不能正常使用
                 */
                let code = (type == "video" ? 1019 : 1021);
                reject({
                    code,
                    data,
                });
            });
        });
    }

    /**
     * 根据获取的摄像头列表，确定使用哪个摄像头
     * @method SetCamera
     * @param {String} cameraId 摄像头Id
     * @return {Number} GSRTCReturnCode
     */

    SetCamera(cameraId) {
        this.cameraId = cameraId;
    }

    /**
     * 根据获取的麦克风列表，确定使用哪个麦克风
     * @method SetMicrophone
     * @param {String} microphoneId 麦克风Id
     * @return {Number} GSRTCReturnCode
     */

    SetMicrophone(microphoneId) {
        this.microphoneId = microphoneId;
    }

    /* ------------------------------ GSRTC消息回调 ------------------------------ */
    /**
     * 收到会议邀请信令的处理函数
     * @method OnInvitation
     * @param {String} meetingId 会议id
     * @param {String} meetingName 会议名称
     * @return {Object} { meetingId, meetingName }
     */

    OnInvitation(meetingId, meetingName) {
        // console.log("OnInvitation");
        // console.log(meetingId);
        // console.log(meetingName);
        this.meetingId = meetingId;
    }

    /**
     * 收到会议剔除信令的处理函数
     * @method OnKickedOut
     * @param {String} meetingId 会议id
     * @param {String} meetingName 会议名称
     * @return {Object} { meetingId, meetingName }
     */

    OnKickedOut(meetingId, meetingName) {}

    /**
     * 收到会议结束时间通知的处理函数
     * @method OnMeetingEndtime
     * @param {String} meetingId 会议id
     * @param {String} meetingName 会议名称
     * @param {String} endTime 结束时间 "YYYY-MM-DD HH:MM:SS"
     * @return {Object} { meetingId, meetingName, endTime }
     */

    OnMeetingEndtime(meetingId, meetingName) {}

    /**
     * 收到会议结束通知的处理函数
     * @method OnMeetingEnd
     * @param {String} meetingId 会议id
     * @param {String} meetingName 会议名称
     * @return {Object} { meetingId, meetingName }
     */

    OnMeetingEnd(meetingId, meetingName) {}

    /**
     * 收到会议点流状态的处理函数
     * @method OnStreamState
     * @param {String} meetingId 会议id
     * @param {String} state 点流状态 0-成功 其他都是失败
     * @return {Object} { meetingId, state }
     */

    OnStreamState(meetingId, state) {}

    /**
     * 会议错误的处理函数
     * @method OnMeetingError
     * @param {String} meetingId 会议id
     * @return {Object} { meetingId }
     */

    OnMeetingError(meetingId) {}

    /**
     * 收到会议人员进入的处理函数
     * @method OnPeerEnter
     * @param {String} peerId 入会人员ID
     * @param {String} meetingId 会议id
     * @param {String} meetingName 会议名称
     * @return {Object} { peerId, meetingId, meetingName }
     */

    OnPeerEnter(peerId, meetingId, meetingName) {}

    /**
     * 收到会议人员离开的处理函数
     * @method OnPeerLeave
     * @param {String} peerId 入会人员ID
     * @param {String} meetingId 会议id
     * @param {String} meetingName 会议名称
     * @return {Object} { peerId, meetingId, meetingName }
     */

    OnPeerLeave(peerId, meetingId, meetingName) {}

    /**
     * 收到会议人员链接错误的处理函数
     * @method OnPeerError
     * @param {String} peerId 入会人员ID
     * @param {String} errorCode 错误码
     * @param {String} describ 错误描述
     * @return {Object} { peerId, errorCode, describ }
     */

    OnPeerError(peerId, errorCode, describ) {}

    /**
     * 收到MTS控制RTC设备的麦克风采集的处理函数
     * @method OnMicphoneCtrl
     * @param {String} meetingId 会议ID
     * @return {Object} { meetingId }
     */

    OnMicphoneCtrl(meetingId) {}

    /**
     * 收到MTS控制RTC设备的扬声器渲染的处理函数
     * @method OnSpeakerCtrl
     * @param {String} meetingId 会议ID
     * @return {Object} { meetingId }
     */

    OnSpeakerCtrl(meetingId) {}

    /**
     * 用户注册监听函数
     * @method on
     * @param {String} type 事件类型
     * @param {Function} callback 监听回调
     * @return {Object} { meetingId }
     */
    on(type, callback) {
        // console.log(type);
        this.eventListeningPool[type] = callback;
        if (type == "getMicrophoneVolume") {
            // 获取麦克风音量
            this.GetMicrophoneVolume();
        }
    }

    /**
     * 用户移除注册监听函数
     * @method off
     * @param {String} type 事件类型，如不填，则移除全部事件监听
     * @param {Function} callback 可移除指定监听回调
     * @return {Object} { meetingId }
     */
    off(type, callback) {
        console.log(this.eventListeningPool);
    }

    /**
     * websocket onMessageDGW 信息回调
     * @method onMessageDGW
     * @param {String} msg 回调消息
     * @return {Object} { meetingId }
     */
    onMessageDGW(msg) {
        this.websocketNotify && this.websocketNotify(msg);
        console.log("websocket onMessageDGW 信息回调");
        console.log(msg);
        // if (msg.cmd_type == 2) { // DGW主动向RTC发送的通知类信息
        this.eventListeningPool[msg.cmd] && this.eventListeningPool[msg.cmd](msg);
        switch (msg.cmd) {
            case "Meeting_Invitation":
                // 被邀请参加会议
                this.OnInvitation(msg.body.meeting_id, msg.body.meeting_name);
                break;
            case "Stream_Invite":
                this.sourceId = msg.body.source_id;
                let url = msg.body.source_id;
                console.log("Stream_Invite", url);
                // DGW向rtc设备发出的invite消息，rtc收到后需要与ss建立ws链接
                this._websocketSS = new myWebsocket("ws://192.168.55.116:46001/rtc?id=100003&mode=0");
                this._websocketSS = new myWebsocket(url);
                this._websocketSS.open(msg => this.onMessageSS(msg)).then(() => {
                    console.log("与ss建立ws链接");
                    // this._websocketSS.send({
                    //     'cmd': 'cready',
                    //     'sid': msg.sid,
                    //     'body': `{"device_id":${this.userInfo.deviceId}, "source_id":${this.sourceId}, "meeting_id":${this.meetingId}, "mode": 0, "role": 1}`,
                    // }).then(ret => {
                    //     console.log(ret);
                    // });
                    this._websocketDGW.send(this.getSendMessage("Stream_Invite", `{"result":0, "msg":"success", "expand":""}`, 1)).then(ret => {
                        console.log("主动Stream_Invite");
                        console.log(ret);
                    });
                });
                break;
            default:
                break;
        }
        // }
    }

    /**
     * websocket onMessageSS 信息回调
     * @method onMessageSS
     * @param {String} msg 回调消息
     * @return {Object} { meetingId }
     */
    onMessageSS(msg) {
        // this.websocketNotify && this.websocketNotify(msg);
        console.log("websocket onMessageSS 信息回调");
        console.log(msg);
        // let conf = {
        //     iceTransportPolicy: "all",
        //     // sdpSemantics:""
        // }
        // let rtcPeerConnection = new RTCPeerConnection(conf);
        let iceCandidateArr = [];

        // if (msg.cmd_type == 2) { // DGW主动向RTC发送的通知类信息
        switch (msg.cmd) {
            case "sready":
                console.log("sready");
                let obj = {
                    'cmd': 'cready',
                    'sid': msg.sid,
                    'body': `{"device_id":${this.userInfo.deviceId}, "source_id":"${this.sourceId}", "meeting_id":${this.meetingId}, "mode": 0, "role": 0}`,
                };
                console.log(obj);
                this._websocketSS.send(obj).then(ret => {
                    console.log("creadythen");
                    console.log(ret);
                });
                break;
            case "sdp":
                let sid = msg.sid;

                try {
                    navigator.mediaDevices.getUserMedia({
                        video: true
                    }).then((stream) => {
                        let that = this;
                        let localMediaStream = stream;
                        let localVideo = document.getElementById("localVideo");
                        localVideo.srcObject = localMediaStream;
                        localVideo.play();


                        rtcPeerConnection.onicecandidate = function (event) {
                            if (event.candidate) {
                                console.log("发送啊啊啊啊 ice candidate");
                                // console.log(event);
                                let iceCandidateObj = {
                                    'cmd': 'candidate',
                                    'sid': sid,
                                    'body': `{"candidate":"${event.candidate.candidate}", "sdpMLineIndex":${event.candidate.sdpMLineIndex}, "sdpMid":"${event.candidate.sdpMid}"}`,
                                };
                                console.log(iceCandidateObj);
                                that._websocketSS.send(iceCandidateObj).then(ret => {});
                                iceCandidateArr.push(iceCandidateObj);
                            }
                        };

                        rtcPeerConnection.ontrack = function (event) {
                            let remoteMediaStream = event.streams[0];
                            console.log("ontrack");
                            console.log(event);
                            // let remoteVideo = document.getElementById("remoteVideo");
                            // remoteVideo.srcObject = remoteMediaStream;
                            // remoteVideo.play();
                        };

                        for (const track of localMediaStream.getTracks()) {
                            console.log("本地liu");
                            console.log(track);
                            console.log(localMediaStream);
                            rtcPeerConnection.addTrack(track, localMediaStream);
                        }

                        // 拿到服务器发过来的offer
                        // console.log(msg.body.sdp);
                        // console.log(JSON.stringify(msg.body.sdp));
                        // console.log(msg.body.sdp.replace(/[\r]/g, "\\r").replace(/[\n]/g, "\\n"));
                        let offer = {
                            sdp: msg.body.sdp,
                            type: "offer"
                        }
                        let offerOptions = {
                            // iceRestart: true,
                            offerToReceiveAudio: false, //true,由于没有麦克风，所有如果请求音频，会报错，不过不会影响视频流播放
                            offerToReceiveVideo: true
                        };

                        // 设置服务器发过来的sdp
                        rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
                            console.log(offer);
                            console.log(rtcPeerConnection.remoteDescription);
                            console.log("setRemoteDescription 完毕");
                            // 创建answer
                            rtcPeerConnection.createAnswer(offerOptions).then((sessionDescription) => {
                                console.log(sessionDescription);

                                // 设置本地创建的spd
                                rtcPeerConnection.setLocalDescription(sessionDescription).then(console.log("setLocalDescription 完毕"));
                                console.log("000000000000000");
                                let sdpObj = {
                                    'cmd': 'sdp',
                                    'sid': msg.sid,
                                    'body': `{"type":"answer", "sdp":"${sessionDescription.sdp.replace(/[\r]/g, "\\r").replace(/[\n]/g, "\\n")}"}`,
                                };
                                console.log(sdpObj);
                                this._websocketSS.send(sdpObj).then(ret => {
                                    console.log("sdpthen");
                                    console.log(ret);
                                });
                                console.log("1111111111");

                            }).catch(() => {
                                console.log("setLocalAndAnswer error");
                            });
                        });
                    });
                } catch (e) {
                    console.log('>>>>>> createPeerConnection() Failed to create PeerConnection, exception: ' + e.message);
                    alert('Cannot create RTCPeerConnection object.');
                    return;
                }
                break;
            case "candidate":
                let candidateMessage = msg.body;
                console.log("-------------------------------------------------------------");
                console.log(candidateMessage);
                let rtcIceCandidate = new RTCIceCandidate({
                    sdpMid: candidateMessage.sdpMid,
                    sdpMLineIndex: candidateMessage.sdpMLineIndex,
                    candidate: candidateMessage.candidate
                });
                console.log(rtcPeerConnection.localDescription)
                console.log(rtcPeerConnection.remoteDescription)
                rtcPeerConnection.addIceCandidate(rtcIceCandidate).then(console.log("addIceCandidate 完毕"));
                setInterval(() => { 
                    console.log(rtcPeerConnection.iceConnectionState);
                }, 1000);
                
                // iceCandidateArr.forEach(element => {
                //     this._websocketSS.send(element).then(ret => {});
                // });
                break;
            default:
                break;
        }
        // }
    }

    /**
     * websocket send 信息回调
     * @method getSendMessage
     * @param {String} cmd 报文类型
     * @param {String} body 发送的消息体
     * @return {Object} { meetingId }
     */
    getSendMessage(cmd, body, type = 0) {
        let obj = {
            'cmd': cmd,
            'dev_id': this.userInfo.deviceId,
            'sequence': this.sequence++,
            'cmd_type': type,
            'body': body,
        };
        // console.log("getSendMessage");
        // console.log(obj);
        return obj;
    }
}

function error(error) {
    console.log(error);
}

export default GSRTC;
