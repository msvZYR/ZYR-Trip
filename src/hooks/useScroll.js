import { onActivated, onDeactivated, onMounted, onUnmounted } from 'vue';
import { ref } from 'vue';
import { throttle } from 'underscore';
// 回调方式
// export default function useScroll(reachBottomCB) {
//     // 监听window窗口的滚动
//     // 1.离开页面时,移除监听
//     // 2.封装代码
//     const scrollListenerHandler = () => {
//         const clientHeight = document.documentElement.clientHeight;
//         const scrollTop = document.documentElement.scrollTop;
//         const scrollHeight = document.documentElement.scrollHeight;
//         if (scrollHeight <= scrollTop + clientHeight) {
//             if (reachBottomCB) reachBottomCB();
//         }
//         // console.log(clientHeight, scrollHeight, scrollTop);
//     };
//     onMounted(() => {
//         window.addEventListener('scroll', scrollListenerHandler);
//     });
//     onActivated(() => {
//         window.addEventListener('scroll', scrollListenerHandler);
//     });
//     onDeactivated(() => {
//         window.removeEventListener('scroll', scrollListenerHandler);
//     });
//     onUnmounted(() => {
//         window.removeEventListener('scroll', scrollListenerHandler);
//     });
// }

// 变量方式
export default function useScroll() {
    const isReachBottom = ref(false);
    const clientHeight = ref(0);
    const scrollTop = ref(0);
    const scrollHeight = ref(0);

    // 防抖/节流
    const scrollListenerHandler = throttle(() => {
        clientHeight.value = document.documentElement.clientHeight;
        scrollTop.value = document.documentElement.scrollTop;
        scrollHeight.value = document.documentElement.scrollHeight;
        // console.log('监听到滚动');
        console.log(clientHeight.value, scrollHeight.value, scrollTop.value);
        if (scrollTop.value + clientHeight.value >= scrollHeight.value - 1) {
            isReachBottom.value = true;
            // console.log(clientHeight.value, scrollHeight.value, scrollTop.value);
        }
    }, 100);
    // console.log(clientHeight, scrollHeight, scrollTop);

    onMounted(() => {
        window.addEventListener('scroll', scrollListenerHandler);
    });
    onActivated(() => {
        window.addEventListener('scroll', scrollListenerHandler);
    });
    onDeactivated(() => {
        window.removeEventListener('scroll', scrollListenerHandler);
    });
    onUnmounted(() => {
        window.removeEventListener('scroll', scrollListenerHandler);
    });

    return { isReachBottom, scrollTop, scrollHeight, clientHeight };
}