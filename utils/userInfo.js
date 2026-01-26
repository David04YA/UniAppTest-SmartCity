import  getRequest, { getToken }  from "./request"

export const getUserInfo = async ()=>{
	const user = await getRequest({
		url:'/prod-api/api/common/user/getInfo',
		header:{"Content-Type":"application/x-www-form-urlencoded",
				"Authorization":await getToken()}
	})
	if(user.code == 200){
		// console.log(user.user.userId)
		return user.user
	}else{
		console.log(user)
		uni.showToast({
			icon:"error",
			title:"无法获取用户信息"
		})
	}
}