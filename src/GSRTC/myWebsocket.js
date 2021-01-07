class myWebsocket {
    constructor(url) {
        this.url = url;

        this.closeConfig = {
            resolve: null,
            closing: false
        }

        this.promisePool = {};
    }

    open(notify) {
        return new Promise((resolve, reject) => {
            if (typeof this._websocket === 'undefined') {
                this._websocket = new WebSocket(this.url);
                this._websocket.onopen = (e) => {
                    console.log("onopen");
                    resolve({
                        e,
                        ws: this
                    });
                }
                this._websocket.onerror = (e) => {
                    reject(e);
                }
            }
            this._websocket.onclose = (e) => {
                console.log("onclose");
                console.log(e);
                if (!this.closeConfig.closing) {
                    console.log("重连");
                }

                this.closeConfig.closing = false;
                this._websocket = undefined;
            }
            this._websocket.onmessage = (e) => {
                // console.log("onmessage");
                // console.log(e);
                let data = JSON.parse(e.data);
                data.body = JSON.parse(data.body);
                // console.log(data);
                let key = data.cmd;
                let req = this.promisePool[key];
                if (req) {
                    // promisePool存在该对象，即证明是主动send的。回调需要回到send的then里面去
                    req.resolve(data);
                    delete this.promisePool[key];
                }
                // console.log(data);
                // console.log(notify);
                // 所有onmessage都回调出去
                notify(data);
            }
        });
    }

    close() {
        this.closeConfig.closing = true;
        this._websocket.close();
    }

    send(msg) {
        return new Promise((resolve, reject) => {
            this.promisePool[msg.cmd] = {
                msg,
                resolve,
                reject,
            }
            this._websocket.send(JSON.stringify(msg));
        });
    }
}


export default myWebsocket;
