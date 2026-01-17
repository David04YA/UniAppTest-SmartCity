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


const getUrl = () => {
	const ip = uni.getStorageSync('server_ip') || '121.9.253.236';
	const port = uni.getStorageSync('server_port') || '10001';
	return `http://${ip}:${port}`; 
};

// 方便测试，直接获取token
export const getToken = async (username = 'test01' , password = '123456') =>{
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
						return  resolve(res.data);
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




