<template>
	<view>
		<view style=" font-size: 30px;font-weight: bold;text-align: center;">{{title}}</view>
		<rich-text style="font-size: 20px;" :nodes="content"></rich-text>
	</view>
</template>

<script setup>
	import {onLoad} from '@dcloudio/uni-app'
import { ref } from 'vue';

	const title = ref()
	const content = ref()
	
        const garbageContent = [
            {
                title: "厨余垃圾-菜梗菜叶",
                content: `菜梗菜叶是典型的厨余垃圾，含有丰富的有机物。在自然环境下容易腐烂发酵，产生难闻气味并吸引蚊虫。<strong>正确处理方式</strong>：沥干水分后投入厨余垃圾桶，可进行堆肥处理，转化为有机肥料。堆积发酵过程中会产生热量，杀死部分病原菌。`,
                type: "kitchen"
            },
            {
                title: "厨余垃圾-剩菜剩饭", 
                content: `剩菜剩饭含有较高的水分、盐分和油脂，容易滋生细菌。若混入其他垃圾会污染可回收物。<strong>危害说明</strong>：直接填埋会产生渗滤液污染土壤和地下水。<strong>处理建议</strong>：尽量源头减量，投放前沥干汤汁，可送往处理厂进行生物降解或堆肥。`,
                type: "kitchen"
            },
            {
                title: "厨余垃圾-果壳",
                content: `坚果壳、椰子壳等硬质果壳属于厨余垃圾，但降解速度较慢。<strong>注意事项</strong>：特别坚硬的果壳（如榴莲壳、椰子壳）建议作为其他垃圾处理，以免损坏处理设备。普通果壳可粉碎后与其他厨余垃圾一同堆肥。`,
                type: "kitchen"
            },
            {
                title: "厨余垃圾-残枝落叶",
                content: `家庭盆栽、庭院绿化产生的植物性废弃物。含有丰富的纤维素和木质素，碳氮比较高，是优质的堆肥原料。<strong>资源化利用</strong>：可通过堆肥转化为有机肥料，改善土壤结构。避免焚烧造成大气污染。`,
                type: "kitchen"
            },
            {
                title: "厨余垃圾-果皮",
                content: `果皮富含果胶、纤维素和维生素，容易腐败但生物降解性好。<strong>利用价值</strong>：可制作环保酵素或堆肥。柑橘类果皮含有精油成分，能抑制某些害虫。香蕉皮富含钾元素，是优良的天然肥料。`,
                type: "kitchen"
            },
            {
                title: "有害垃圾-废旧灯泡",
                content: `特别是荧光灯、节能灯等含有汞蒸气，具有神经毒性。<strong>危险特性</strong>：灯管破裂后汞会挥发，吸入可能损害中枢神经系统。<strong>安全处理</strong>：轻拿轻放，妥善包裹后投入有害垃圾箱，由专业机构进行无害化处理。`,
                type: "hazardous"
            },
            {
                title: "有害垃圾-废旧小家电",
                content: `含有铅、镉、汞等重金属和溴化阻燃剂等有害物质。<strong>环境影响</strong>：随意拆解会使有毒物质渗入土壤和水体。<strong>回收要求</strong>：应通过正规电子废物回收渠道，专业机构会分离有毒部件并进行安全处置。`,
                type: "hazardous" 
            },
            {
                title: "有害垃圾-过期化妆品",
                content: `含有化学防腐剂、重金属等成分，过期后可能变质产生有害物质。<strong>潜在风险</strong>：随意丢弃会渗入环境，影响生态系统。<strong>处理方式</strong>：瓶装产品应密封后投入有害垃圾箱，目前多采用安全焚烧方式处理。`,
                type: "hazardous"
            },
            {
                title: "有害垃圾-废弃温度计",
                content: `水银温度计含有剧毒金属汞，一支温度计中的汞可污染大量水源。<strong>高危特性</strong>：汞具有挥发性，吸入会导致严重中毒。<strong>应急处理</strong>：破碎后应立即通风并专业收集，送至指定回收点进行无害化处理。`,
                type: "hazardous"
            },
            {
                title: "有害垃圾-过期药品",
                content: `过期药品可能发生化学变化产生毒性，抗生素类会催生超级细菌。<strong>特殊危害</strong>：激素类药物会干扰内分泌系统。<strong>处理方法</strong>：保持原包装投入有害垃圾桶，由专业机构进行高温焚烧彻底分解有害成分。`,
                type: "hazardous"
            },
            {
                title: "有害垃圾-蓄电池",
                content: `含有铅、镉、硫酸等强污染物质，镉致癌，铅损害儿童智力发育。<strong>长期影响</strong>：重金属在自然界无法降解，会通过食物链富集。<strong>专业处理</strong>：必须由有资质的公司回收，采用破碎分选、熔炼再生等工艺。`,
                type: "hazardous"
            },
            {
                title: "其他垃圾-烟头",
                content: `由醋酸纤维滤嘴和纸构成，难以降解，残留尼古丁、焦油等有害物质。<strong>污染特点</strong>：是常见的环境污染物，有害物会溶出污染水体。<strong>处置方式</strong>：确保完全熄灭后投入其他垃圾桶，主要通过卫生填埋或焚烧发电处理[4](@ref)。`,
                type: "other"
            },
            {
                title: "其他垃圾-一次性餐具",
                content: `因被污染或材质复杂，回收价值低。大量废弃会导致“白色污染”。<strong>现状问题</strong>：填埋难以降解，焚烧可能产生有害气体。<strong>改善方向</strong>：使用可降解材质，源头减量。当前主要采用焚烧或填埋方式处理。`,
                type: "other"
            },
            {
                title: "其他垃圾-破旧陶瓷品",
                content: `陶瓷制品无法与其他材料分离且没有回收价值。<strong>特性分析</strong>：质地坚硬，不适合焚烧处理，填埋是主要方式。<strong>处理建议</strong>：尽量修复利用，无法修复的应包扎好后投入其他垃圾桶，避免划伤保洁人员。`,
                type: "other"
            },
            {
                title: "其他垃圾-宠物粪便",
                content: `可能含有病原菌和寄生虫卵，处理不当会传播疾病。<strong>处理方式</strong>：目前多数城市归为其他垃圾。建议冲入马桶随污水系统处理；如需丢弃，应密封后投入其他垃圾桶。<strong>注意</strong>：不适合投入厨余垃圾处理器[4](@ref)。`,
                type: "other"
            }
        ];
		
		onLoad((options)=>{
			var grabageId = options.id
			// console.log(id)
			console.log(grabageId)
			if(grabageId!=undefined){
				title.value = garbageContent[grabageId-1].title
				content.value = garbageContent[grabageId-1].content
			}else{
				uni.showToast({
					icon:'error',
					title:"id is underfine"
				})
			}
		})
		

</script>

<style>
	       
</style>
