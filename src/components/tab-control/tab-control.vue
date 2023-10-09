<template>
    <div class="tab-control">
        <template v-for="(item, index) in titles" :key="item">
            <div class="tab-control-item" :class="{ active: currentIndex === index }" @click="itemClick(index)">
                <span>
                    {{ item }}
                </span>
            </div>
        </template>
    </div>
</template>
<!-- 
<script setup name="tab-control">
import { ref } from 'vue';

defineProps({
    titles: {
        type: Array,
        default: () => [],
    },
});

const emit = defineEmits(['tabItemClick']);

const currentIndex = ref(0);
const itemClick = (index) => {
    currentIndex.value = index;
    emit('tabItemClick', index);
};
</script>
<script> -->
<script>
export default {
    props: {
        titles: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            currentIndex: 0,
        };
    },
    emits: ['tabItemClick'],
    methods: {
        itemClick(index) {
            this.currentIndex = index;
            this.$emit('tabItemClick', index);
        },
        setCurrentIndex(index) {
            this.currentIndex = index;
        },
    },
};
</script>
<style lang="less" scoped>
.tab-control {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #fff;

    .tab-control-item {
        flex: 1;
        text-align: center;
        &.active {
            color: var(--primary-color);

            span {
                padding: 5px;
                border-bottom: 2px solid var(--primary-color);
            }
        }
    }
}
</style>
