<template>
    <div class="tab-bar">
        <template v-for="(item,index) in tabbarData" :key="item">
            <div 
                class="tab-bar-item" 
                :class="{active: currentIndex===index}" 
                @click="itemClick(index,item.path)"
            >
                <img v-if="currentIndex !==index" :src="getAssetURL(item.image)" alt="">
                <img v-else :src="getAssetURL(item.imageActive)" alt="">
                <span class="text">{{item.text}}</span>
            </div>
        </template>
    </div>
</template>

<script setup>
    import tabbarData from "@/assets/data/tabbar.js"
    import {getAssetURL} from "@/utils/load_assets.js"
    import {ref} from 'vue'
    import {useRouter} from 'vue-router'

    const router=useRouter()

    const currentIndex=ref(0)
    const itemClick=(index,path)=>{
        currentIndex.value=index
        router.push(path)
    }
    // function itemClick(index) {
    //     currentIndex.value=index
    // }
</script>

<style lang="less" scoped>
    .tab-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0; 
        display: flex;
        height: 50px;
        border-top: 1px solid #f3f3f3;

        .tab-bar-item {
            flex: 1;
            display: flex;
            flex-direction:column;
            justify-content: center;
            align-items: center;
        }

        .active {
            color: var(--primary-color);
        }
        img {
            width: 36px;
        }

        .text{
            font-size:12px;
            margin-top:2px;
        }

        
    }
</style>