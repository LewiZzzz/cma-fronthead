<template>
    <ContentBase>
        <div>
        <h1 class="mb-4">用户名</h1>
        <table class="table">
    <thead>
        <tr>
            <th scope="col">参数名称</th>
            <th scope="col">状态</th>
            <th scope="col">操作</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">xxx</th>
            <td>已分解</td>
            <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    查看详细参数    
                </button>
                <!-- 开始进行分解 -->
                <Modal_e>
                </Modal_e>
            </td>
        </tr>
        <tr>
            <th scope="row">yyy</th>
            <td>未分解</td>
            <td><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    开始分解   
                </button>
                <!-- 开始进行分解 -->
                <Modal_e>
                </Modal_e>
            </td>
        </tr>
        <tr>
            <th scope="row"></th>
            <td></td>
            <td></td>
        </tr>
        </tbody>
    </table>
    </div>
    <br>
    <button type="button" class="btn btn-primary" @click="replacePage">返回</button>
    </ContentBase>
    
    </template>
    
    <script >
    import ContentBase from '@/components/ContentBase'
    import Modal_e from '@/components/Modal_e.vue';
    export default {
        name: "ExperimentDirector2",
        components: {
            ContentBase,
            Modal_e
        },
    methods:{
        replacePage(){
                this.$router.push('/experimentdepartment/director1/')
            },
        }
    }
    
    </script>
    
    <style scoped>
    </style>