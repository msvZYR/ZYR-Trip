<template>
    <div class="swipe">
        <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
            <template v-for="(item, index) in swipeData">
                <van-swipe-item class="item">
                    <img :src="item.url" alt="" />
                </van-swipe-item>
            </template>

            <template #indicator="{ active, total }">
                <!-- <div class="indicator">{{ active }}/{{ total }}-{{ swipeData.length }}</div> -->
                <div class="indicator">
                    <template v-for="(value, key, index) in swipeGroup" :key="key">
                        <span class="item" :class="{ active: swipeData[active]?.enumPictureCategory == key }">
                            <span class="text">
                                {{ getName(value[0].title) }}
                            </span>
                            <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                                {{ getCategoryIndex(swipeData[active]) }}/{{ value.length }}
                            </span>
                        </span>
                    </template>
                </div>
            </template>
        </van-swipe>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const props = defineProps({
    swipeData: {
        type: Array,
        default: () => [],
    },
});

// 对数据进行转换
// 思路1
// const swipeGroup={}
// for(const item of props.swipeData){
//   swipeGroup[item.enumPictureCategory]=[]
// }
// for(const item of props.swipeData){
//   const valueArray= swipeGroup[item.enumPictureCategory]
//   valueArray.push(item)
// }
// 思路2
const swipeGroup = {};
for (const item of props.swipeData) {
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&\nitem：', item);
    let valueArray = swipeGroup[item.enumPictureCategory];
    // console.log('###', valueArray === swipeGroup[item.enumPictureCategory]);
    if (!valueArray) {
        //判断valueArray为undefined
        valueArray = [];
        swipeGroup[item.enumPictureCategory] = valueArray;
        // console.log('-----swipeGroup[item.enumPictureCategory]:', item.enumPictureCategory);
    }
    valueArray.push(item);
    // console.log('***valueArray：', valueArray);
}

// 定义转换数据的方法

const nameReg = /【(.*?)】/i;
const getName = (name) => {
    // 方法1：
    // return name.replace('：', '');

    // 方法2：
    // let a = name.indexOf('【');
    // let b = name.indexOf('】');
    // let c = name.substring(a + 1, b);
    // return c;
    // 方法3：使用正则表达式
    const results = nameReg.exec(name);
    return results[1];
};

const getCategoryIndex = (item) => {
    const valueArray = swipeGroup[item.enumPictureCategory];
    return valueArray.findIndex((data) => data === item) + 1;
};
</script>

<style lang="less" scoped>
.swipe {
    .swipe-list {
        // position: relative;
        .item {
            img {
                width: 100%;
            }
        }
        .indicator {
            position: absolute;
            right: 5px;
            bottom: 5px;
            display: flex;

            padding: 2px 5px;
            font-size: 12px;
            background: rgba(0, 0, 0, 0.8);
            color: #fff;
            .item {
                margin: 0 3px;
                &.active {
                    padding: 0 3px;
                    border-radius: 5px;
                    background-color: #fff;
                    color: #333;
                }
            }
        }
    }
}
</style>
