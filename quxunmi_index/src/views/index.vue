<template>
    <div>
        <router-view></router-view>
        <div class="tab-bar">
            <router-link to="/index/home"></router-link>
            <router-link to="/index/find"></router-link>
            <router-link to="/"></router-link>
            <router-link to="/index/like"></router-link>
            <router-link to="/index/user"></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        }
    };
</script>


