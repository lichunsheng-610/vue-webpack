class myWebsocket {
    constructor(url) {
        this.url = url;

        this.closeConfig = {
            resolve: null,
            closing: false
        }

        this.promisePool = {};
    }

    open() {
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
                if (!this.closeConfig.closing) {
                    console.log("重连");
                }

                this.closeConfig.closing = false;
                this._websocket = undefined;
            }
            this._websocket.onmessage = (e) => {
                console.log("onmessage");
                let txt = this.getNum(e.data, "{", "}");
                let data = JSON.parse(`{${txt}}`);
                console.log(data);
                let key = data.token;
                let req = this.promisePool[key];
                req.resolve(e);
                delete this.promisePool[key];
            }
        });
    }

    close() {
        this.closeConfig.closing = true;
        this._websocket.close();
    }

    send(msg) {
        return new Promise((resolve, reject) => {
            this.promisePool[msg.token] = {
                msg,
                resolve,
                reject,
            }
            // let content = JSON.stringify(msg);
            this._websocket.send(JSON.stringify(msg));
        });
    }

    getNum(str, firstStr, secondStr) {
        if (str == "" || str == null || str == undefined) { // "",null,undefined
            return "";
        }
        if (str.indexOf(firstStr) < 0) {
            return "";
        }
        var subFirstStr = str.substring(str.indexOf(firstStr) + firstStr.length, str.length);
        var subSecondStr = subFirstStr.substring(0, subFirstStr.indexOf(secondStr));
        return subSecondStr;
    }
}


export default myWebsocket;
