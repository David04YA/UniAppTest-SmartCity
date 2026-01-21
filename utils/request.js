const baseUrl = 'http://121.9.253.236:10001';

export default function request(options) {
    return new Promise((resolve, reject) => {
        // 1. 从本地缓存中获取刚刚存入的 token
        const token = uni.getStorageSync('token');

        uni.request({
            url: baseUrl + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            header: {
                'Content-Type': 'application/json',
                // 2. 这里的键名通常是 Authorization，值要根据后端要求看是否加 'Bearer '
                // 如果后端直接要字符串，就写 token；如果要规范格式就写 `Bearer ${token}`
                'Authorization': token || '', 
                ...options.header // 允许页面调用时覆盖 header
            },
            success: (res) => {
                // 3. 处理不同的状态码
                if (res.data.code === 200) {
                    resolve(res.data); 
                } else if (res.data.code === 401) {
                    // 4. 如果是 401，说明 token 失效或没登录
                    uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' });
                    // 清除无效 token 并跳回登录/引导页
                    uni.removeStorageSync('token');
                    setTimeout(() => {
                        uni.reLaunch({ url: '/pages/guide/guide' });
                    }, 1500);
                    reject(res.data);
                } else {
                    uni.showToast({ 
                        title: res.data.msg || '请求失败', 
                        icon: 'none' 
                    });
                    reject(res.data);
                }
            },
            fail: (err) => {
                uni.showToast({ title: '网络异常，请重试', icon: 'none' });
                reject(err);
            }
        });
    });
}