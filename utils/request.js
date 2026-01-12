// utils/request.js

// 模拟服务器 IP 和端口（从本地存储读取，对应任务 2）
const getBaseUrl = () => {
    const ip = uni.getStorageSync('server_ip') || '127.0.0.1';
    const port = uni.getStorageSync('server_port') || '8080';
    return `http://${ip}:${port}`; 
};

const request = (url, method = 'GET', data = {}) => {
    // 真实项目中这里是 getBaseUrl() + url
    // 现在模拟状态，我们直接映射到本地 static/mock 文件夹
    const mockUrl = `/static/mock${url}.json`;

    return new Promise((resolve, reject) => {
        // 模拟网络延迟感
        setTimeout(() => {
            uni.request({
                url: mockUrl,
                method: 'GET', // 读本地文件只能用 GET
                success: (res) => {
                    console.log('请求成功:', url, res.data);
                    resolve(res.data);
                },
                fail: (err) => {
                    uni.showToast({ title: '加载失败', icon: 'none' });
                    reject(err);
                }
            });
        }, 500); 
    });
};

export default request;