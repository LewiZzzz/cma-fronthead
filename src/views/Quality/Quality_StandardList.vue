<template>
    <ContentBase>
        <el-main>
            <el-form :model="form" label-width="100px">
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="标准大类">
                            <el-select placeholder="请选择">
                                <el-option label="选项1" value="option1"></el-option>
                                <el-option label="选项2" value="option2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="5">
                        <el-form-item label="标准类别">
                            <el-select placeholder="请选择">
                                <el-option label="选项1" value="option1"></el-option>
                                <el-option label="选项2" value="option2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="9">
                        <el-form-item label="搜索">
                            <el-input v-model="search" class="w-50 me-4" placeholder="查询指定标准" :prefix-icon="Search">
                            </el-input>
                            <el-button type="primary">查询</el-button>
                        </el-form-item>
                    </el-col>

                    <el-col :span="5">
                        <el-button type="primary" data-bs-toggle="modal" data-bs-target="#createStandardModal" plain>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-clipboard2-plus-fill me-1" viewBox="0 0 16 16">
                                <path
                                    d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                                <path
                                    d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM8.5 6.5V8H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h1.5V6.5a.5.5 0 0 1 1 0Z" />
                            </svg>
                            添加标准
                        </el-button>
                    </el-col>

                </el-row>

                <el-row>
                    <el-table :data="standards" style="width: 100%">
                        <el-table-column label="标准创建日期" prop="createTime" />
                        <el-table-column label="标准大类" prop="className" />
                        <el-table-column label="标准类别" prop="subClassName" />
                        <el-table-column label="标准名称" prop="name" />
                        <el-table-column label="标准状态">
                            <template #default="scope">
                                <el-tag v-if="scope.row.state == 0" type="danger"> 未分解参数</el-tag>
                                <el-tag v-if="scope.row.state == 1" type="success"> 已分解参数</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="标准创建者" prop="principal" />
                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-button size="small" type="primary" data-bs-toggle="modal" data-bs-target="#projectModal"
                                    @click="openModal(scope.row)">
                                    查看详情
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-form>
        </el-main>
    </ContentBase>

    <div class="modal fade" id="createStandardModal" tabindex="-1" aria-labelledby="createStandardModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">创建标准</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <el-switch v-model="categoryType" class="mb-2"
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #0d6efd; active-color: #0d6efd"
                        active-text="参考分类" inactive-text="自定义分类" />
                    <div v-if="categoryType === true" style="display: flex; flex-wrap: wrap;">
                        <div class="form-group mb-3" style="display: flex; align-items: center; margin-right: 20px;">
                            <label class="mb-2" style="margin-right: 10px;"><span class="red-text">*</span>参考大类</label>
                            <select class="form-select" style="width: 200px;">
                                <option value="option1">参考大类选项1</option>
                                <option value="option2">参考大类选项2</option>
                            </select>

                        </div>
                        <div class="form-group mb-3" style="display: flex; align-items: center;">
                            <label style="margin-right: 10px;"><span class="red-text">*</span>参考类别</label>
                            <select class="form-select" style="width: 200px;">
                                <option value="option1">参考类别选项1</option>
                                <option value="option2">参考类别选项2</option>
                            </select>
                        </div>
                    </div>

                    <div v-else>
                        <div class="form-group mb-3">
                            <label><span class="red-text">*</span>自定义大类</label>
                            <input type="text" class="form-control" v-model="customCategory.class" style="width:200px;">
                        </div>
                        <div class="form-group mb-3">
                            <label><span class="red-text">*</span>自定义类别</label>
                            <input type="text" class="form-control" v-model="customCategory.subclass" style="width:200px;">
                        </div>
                    </div>

                    <div class="form-group mb-3">
                        <label style="text-border mb-2"><span class="red-text">*</span>标准名称</label>
                        <input type="text" class="form-control" style="width: 400px;" v-model="projectName">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ContentBase from '@/components/ContentBase'
import {
    ref
} from 'vue'

export default {
    name: "QualityStandardList",
    components: {
        ContentBase,

    },
    setup() {
        const standards = ref([{
            id: 0,
            name: '金属平均晶粒度测定方法',
            principal: '王大锤',
            state: 0, // 未分解参数
            number: "GB/T 6394-2017",
            className: "物理性能通用要求及参数",
            subClassName: "金属材料",
            certificate: {
                name: '',
                url: '',
            },
            restrictRange: "限制范围", //限制范围
            instruction: "", // 补充说明
            params: [

            ],
            createTime: "2021-08-01",
        },
        {
            id: 1,
            name: '金属材料 维氏硬度试验 第一部分：试验方法',
            className: "物理性能通用要求及参数",
            subClassName: "金属材料",
            principal: '王大锤',
            state: 1, // 已分解参数
            number: "GB/T 6394-2017",
            certificate: {
                name: '',
                url: '',
            },
            restrictRange: "限制范围", //限制范围
            instruction: "", // 补充说明
            params: [

            ],
            createTime: "2021-08-01",
        },
        {
            id: 2,
            name: '金属平均晶粒度测定方法',
            className: "物理性能通用要求及参数",
            subClassName: "金属材料",
            principal: '王大锤',
            state: 0, // 未分解参数
            number: "GB/T 6394-2017",
            certificate: {
                name: '',
                url: '',
            },
            restrictRange: "限制范围", //限制范围
            instruction: "", // 补充说明
            params: [

            ],
            createTime: "2021-08-01",
        },
        ]);

        var categoryType = ref(1);
        var customCategory = ref({
            class: "",
            subclass: "",
        });

        return {
            standards,
            categoryType,
            customCategory,
        }
    },
}
</script>

<style scoped>
.red-text {
    color: red;
}
</style>
