const baseUrl = 'http://121.9.253.236:10001';

export default function request(options) {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + options.url,
            method: options.method || 'GET',
            data: options.data || {},
            success: (res) => {
                // 如果后端返回 200，说明成功，把数据塞给 resolve 发走
                if (res.data.code === 200) {
                    resolve(res.data); 
                } else {
                    uni.showToast({ title: res.data.msg, icon: 'none' });
                    reject(res.data);
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
}