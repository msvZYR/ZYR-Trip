//vue cli/vite
module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            viewportWidth: 375,
            // 黑名单---对应css选择器不进行相应的转换
            selectorBlackList: ['favor'],
        },
    },
};