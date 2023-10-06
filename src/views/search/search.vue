<template>
    <div class="search">
        <h2>search:{{ $route.query.startDate }}</h2>
        <h2>search:{{ $route.query.endDate }}</h2>
        <h2>search:{{ $route.query.currentCity }}</h2>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<style lang="less" scoped></style>
