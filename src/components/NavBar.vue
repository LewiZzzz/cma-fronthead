<template>
<nav class="navbar navbar-expand-lg mb-3" style="background-color: #314AA4; color: white;">
    <div class="container-fluid">
        <a class="navbar-brand ms-2 text-white me-3" href="#">{{ roleNames[role] }}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse ms-2 " id="navbarText" >
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item" v-for="(item, index) in getItemsByRole" :key="index"  >
                    <a class="nav-link me-2 text-white" aria-current="page" :href="item.link" style="padding: 10px 10px; border-radius: 10px">{{ item.name }}</a>

                </li>
            </ul>
            <span class="navbar-text">
                登录
            </span>
        </div>
    </div>
</nav>
</template>

<script>
export default {
    props: {
        role: Number,
    },
    setup() {

    },
    data() {
        return {
            roleNames: ['系统管理员', '质量科', '角色3名称'], // 根据角色对应名称的数组
            navigationItems: [
                [
                    {
                        name: '项目1',
                        link: '/project1'
                    },
                    {
                        name: '项目2',
                        link: '/project2'
                    },
                    // 导航项数组针对角色1
                ],
                [
                    {
                        name: '首页',
                        link: '/feature1'
                    },
                    {
                        name: '创建项目',
                        link: '/qualitydepartment/createproject/'
                    },
                    {
                        name: '创建',
                        link: '/qualitydepartment/create/'
                    }
                    // 导航项数组针对角色2
                ],
                [
                    {
                        name: '选项1',
                        link: '/option1'
                    },
                    {
                        name: '选项2',
                        link: '/option2'
                    },
                    // 导航项数组针对角色3
                ],
            ],
        };
    },
    computed: {
        getItemsByRole() {
            return this.navigationItems[this.role] || [];
        },
    },
}
</script>

<style scoped>
.nav-link:focus {
  background-color: #112675; 
  font-weight: 500;
}

</style>
