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

// GSRTC对象
class GSRTC {
    constructor(options) {
        // this._websocket = new myWebsocket("ws://123.207.136.134:9010/ajaxchattest");
        // this._websocket.open();
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
        this._websocket = null;
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
            console.log(LoginParam);
            console.log("LoginLoginLoginLoginLogin");
            // this._websocket.send({
            //     'token': '888',
            //     'content': '123'
            // }).then(ret => {
            //     console.log("login");
            //     resolve(ret);
            // }, err => {
            //     reject(err);
            // });
        });
    }

    /**
     * 登出，断开signaling与DGW的链接，同时断开所有pc链接并还原所有状态
     * @method Logout
     * @return {Number} GSRTCReturnCode
     */

    Logout() {
        console.log("Logout");
        // this._websocket.close();
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

    EnterMeeting(meetingId, mediaDirect) {}

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

    GetMicrophoneVolume() {}

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
            navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
                navigator.mediaDevices.enumerateDevices().then((deviceInfos) => {
                    /**
                     * 以下情况均会进入success
                     * 1. 浏览器弹窗提示用户给予使用媒体输入的许可时，选择允许
                     * 2. 摄像头/麦克风正常使用
                     */
                    resolve({
                        deviceInfos
                    });
                });
            }).catch((error) => {
                console.log("error");
                /**
                 * 以下情况均会进入error
                 * 1. 浏览器弹窗提示用户给予使用媒体输入的许可时，选择禁止
                 * 2. 摄像头/麦克风不能正常使用
                 */
                let code = (type == "video" ? 1019 : 1021);
                reject({
                    code,
                    error,
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

    SetCamera(cameraId) {}

    /**
     * 获取麦克风列表
     * @method GetMicrophoneList
     * @return {Object} { state, data } state: GSRTCReturnCode, data: 返回麦克风列表或获取失败信息
     */

    GetMicrophoneList() {}

    /**
     * 根据获取的麦克风列表，确定使用哪个麦克风
     * @method SetMicrophone
     * @param {String} microphoneId 麦克风Id
     * @return {Number} GSRTCReturnCode
     */

    SetMicrophone(microphoneId) {}

    /* ------------------------------ GSRTC消息回调 ------------------------------ */
    /**
     * 收到会议邀请信令的处理函数
     * @method OnInvitation
     * @param {String} meetingId 会议id
     * @param {String} meetingName 会议名称
     * @return {Object} { meetingId, meetingName }
     */

    OnInvitation(meetingId, meetingName) {}

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

}

export default GSRTC;
