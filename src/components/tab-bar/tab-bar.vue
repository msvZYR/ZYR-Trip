<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854">
            
            <template v-for="(item,index) in tabbarData" :key="item">
                <van-tabbar-item :to="item.path">
                    <!-- 默认插槽 -->
                    <template #default>
                        <span>{{item.text}}</span>
                    </template>
                    <!-- 具名插槽 -->
                    <template #icon>
                        <img v-if="currentIndex !==index" :src="getAssetURL(item.image)" alt="">
                        <img v-else :src="getAssetURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template> 
        </van-tabbar>
    </div>
</template>

<script setup>
    import tabbarData from "@/assets/data/tabbar.js"
    import {getAssetURL} from "@/utils/load_assets.js"
    import {ref} from 'vue'

    const currentIndex=ref(0)
  
</script>

<style lang="less" scoped>
    .tab-bar {
        img{
            height: 26px;
        }

        // 局部定义一个变量：只针对tab-bar子元素才生效
        // --van-tabs-line-height: 50px !important;

        //找到类，对类中的css属性进行重写
        // :deep()找到子组件，让子组件的类生效
        // :deep(.van-tabbar-item__icon){
        //     font-size:50px
        // }
    }
</style>