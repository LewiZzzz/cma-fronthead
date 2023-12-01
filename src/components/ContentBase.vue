<template>
    <div class="container" style="min-height: 100vh; height: 100%; width: 100vw;">
        <div class="card" style="min-height: 100vh; height=100%; width:100%">
        <div class="card-body" style="padding:40px 40px ; height=100%; width:100%">
        <slot>

        </slot>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ContentBase",
}
</script>

<style scoped>
.card {
    background-color: #F9F8FF;
    border: 0; /* 设置边框为0 */
    box-shadow: 0 4px 8px rgba(118, 117, 134, 0.1); /* 添加阴影，这里的参数可以根据需要进行调整 */;
}
</style>