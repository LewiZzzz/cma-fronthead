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
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                查看详细参数
                            </button>

                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">要求指派</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <h1 class="mb-4">项目名称-参数</h1>

                                            <label class="text-border">人员</label>
                                            <br>
                                            <br>
                                            <label class="text-border">data1</label>
                                            <br>
                                            <br>

                                            <label class="text-border">设备</label>
                                            <br>
                                            <br>
                                            <label class="text-border">data2</label>
                                            <br>
                                            <br>

                                            <label class="text-border">样品</label>
                                            <br>
                                            <br>
                                            <label class="text-border">data3</label>
                                            <br>
                                            <br>

                                            <label class="text-border">方法</label>
                                            <br>
                                            <br>
                                            <label class="text-border">data4</label>
                                            <br>
                                            <br>

                                            <label class="text-border">设施</label>
                                            <br>
                                            <br>
                                            <label class="text-border">data5</label>
                                            <br>
                                            <br>

                                            <label class="text-border">比对验证</label>
                                            <br>
                                            <br>
                                            <label class="text-border">data6</label>
                                            <br>
                                            <br>

                                            <label class="text-border">模式实验</label>
                                            <br>
                                            <br>
                                            <label class="text-border">data7</label>
                                            <br>
                                            <br>

                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">关闭</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">yyy</th>
                        <td>未分解</td>
                        <td><button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleMo">
                                开始分解
                            </button>
                            <!-- 开始进行分解 -->
                            <div class="modal fa" id="exampleMo" tabindex="-1" aria-labelledby="exampleModalLa"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">要求指派</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <h1 class="mb-4">项目名称-参数</h1>

                                            <label class="text-border">人员</label>
                                            <select class="form-select" style="width:240px">
                                                <option selected>指派人员</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>

                                            <label class="text-border">设备</label>
                                            <select class="form-select" style="width:240px">
                                                <option selected></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>

                                            <label class="text-border">样品</label>
                                            <select class="form-select" style="width:240px">
                                                <option selected></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>

                                            <label class="text-border">方法</label>
                                            <select class="form-select" style="width:240px">
                                                <option selected></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>

                                            <label class="text-border">设施</label>
                                            <select class="form-select" style="width:240px">
                                                <option selected></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>

                                            <label class="text-border">比对验证</label>
                                            <select class="form-select" style="width:240px">
                                                <option selected></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>

                                            <label class="text-border">模式实验</label>
                                            <select class="form-select" style="width:240px">
                                                <option selected></option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                            </select>

                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">取消</button>
                                            <button type="button" class="btn btn-primary">确认</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
export default {
    name: "ExperimentDirector2",
    components: {
        ContentBase,
    },
    methods: {
        replacePage() {
            this.$router.push('/experimentdepartment/director1/')
        },
    }
}

</script>
    
<style scoped></style>