// utils/request.js


// 模拟服务器 IP 和端口（从本地存储读取，对应任务 2）
const getBaseUrl = () => {
    const ip = uni.getStorageSync('server_ip') || '127.0.0.1';
    const port = uni.getStorageSync('server_port') || '8080';
    return `http://${ip}:${port}`; 
};

const requesttests = (url, method = 'GET', data = {}) => {
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

// export default request;


export const getUrl = () => {
	const ip = uni.getStorageSync('server_ip') || '121.9.253.236';
	const port = uni.getStorageSync('server_port') || '10001';
	return `http://${ip}:${port}`; 
};

// 方便测试，直接获取token
export const getToken = async (username = 'test01' , password = '654321') =>{
	const token = uni.getStorageSync('token')
	if (token){
		return token;
	}else{
		try{
			const res = await getRequest({
				url:'/prod-api/api/login',
				method:'POST',
				header:{"Content-Type":'application/json'},
				data:{'username':username,
						'password':password}
			});
			console.log("get Token:"+res)
			if (res.code==200){
				uni.setStorageSync('token',res.token)
				console.log("get Token:"+res.token)
				return res.token
				
			}else{
				uni.showToast({
					title:'无法获取token'
				})
			}
		}catch(e){
			uni.showToast({
				title:'获取token失败',
				icon:"error",
				duration:2000
			})
			throw new Error("get exception")
		}
	}
}


// 页面直接引入getRequest减少编写次数，只需要传入一个对象
export const getRequest = (info) =>{
	const baseUrl = getUrl()
	const allUrl =  baseUrl + info.url;

	return new Promise((resolve, reject) => {
		uni.request({
			url:allUrl ,
			method:info.method || 'GET',
			header:info.header,
			data:info.data || {},
			success: (res) => {
				if(res.statusCode == 200){
					if(res.data){
						return resolve(res.data);
					}else if(res.rows){
						return resolve(res.rows);
					}else{
						return resolve(res);
					}
				}else{
					uni.showToast({
						title:"操作失败",
						icon:'none'
					});
				}
				// console.log(res)
			},
			fail: (err) => {
				uni.showToast({
					title:"请连接网络",
					icon:"none"
				});
				reject(err);
			},
			complete: () => {
				console.log('请求完成');
			}
		});
	});
};

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




