<template>
    <div class="map">
        <detail-section title="位置周边" more-text="查看更多周边信息">
            <div class="baidu" ref="mapRef">百度地图</div>
        </detail-section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import DetailSection from '@/components/detail-section/detail-section.vue';

const router = useRouter();

const props = defineProps({
    position: {
        type: Object,
        default: () => ({}),
    },
});
const mapRef = ref();
onMounted(() => {
    const map = new BMapGL.Map(mapRef.value); // 创建地图实例
    const point = new BMapGL.Point(props.position.longitude, props.position.latitude); // 创建点坐标
    map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
    const marker = new BMapGL.Marker(point); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
});
</script>

<style lang="less" scoped>
.baidu {
    height: 200px;
}
</style>
