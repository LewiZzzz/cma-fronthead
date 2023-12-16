<template>
    <ContentBase>
        <el-main>
            <el-row>
                <el-col :span="9">
                    <el-form-item label="搜索">
                        <el-input v-model="search" class="w-50 me-4" placeholder="请输入任务名称" :prefix-icon="Search">
                        </el-input>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-table :data="tasks" style="width: 100%">
                    <el-table-column label="项目名称" prop="project" />
                    <el-table-column label="标准名称" prop="standard" />
                    <el-table-column label="项目负责人" prop="principal" />
                    <el-table-column label="参数名称" prop="parameter" />
                    <el-table-column label="任务名称" prop="name" />
                    <el-table-column label="下达时间" prop="time" />
                    <el-table-column label="状态">
                            <template #default="scope">
                                <span>{{ scope.row.state === 0 ?'待提交': (scope.row.state === 1 ? '待审核' : (scope.row.state === 2 ? '通过' : '未通过')) }}</span>
                            </template>
                        </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                                <el-button size="small" type="primary" v-if="scope.row.state === 1" data-bs-toggle="modal"
                                    data-bs-target="#submitTask" @click="openModal()">
                                    2
                                </el-button>
                                
                                <el-button size="small" type="info" v-if="scope.row.state === 2" data-bs-toggle="modal"
                                    data-bs-target="#submitTask"
                                    @click="openModal()">1</el-button>
                                
                            </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-main>

        <div class="modal fade" id="submitTask" tabindex="-1" aria-labelledby="submitTask" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="submitTaskLabel">提交项目</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>标准列表：</p>
                        <ul>
                            <li class="mb-3">
                                标准1
                                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                    data-bs-target="#paramDetailModal">
                                    提交
                                </button>
                            </li>
                            <li class="mb-3">
                                标准2
                                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                    data-bs-target="#paramDetailModal">
                                    提交
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">

                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

    </ContentBase>
</template>
<script>
import ContentBase from '@/components/ContentBase'

export default {
    name: "ExperimentSubmitTask",
    components: {
        ContentBase,
    },
    setup() {
        //任务列表
        const tasks = [
            {
                id: 0,  //标识
                name: "人员",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 0
            },
            {
                id: 1,  //标识
                name: "设备",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 1
            },
            {
                id: 2,  //标识
                name: "样品",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 2
            },
            {
                id: 3,  //标识
                name: "检验细则",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 3
            },
            {
                id: 4,  //标识
                name: "设施",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 0
            },
            {
                id: 5,  //标识
                name: "比对验证",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 1
            },
            {
                id: 6,  //标识
                name: "模拟实验",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 0
            },
            {
                id: 7,  //标识
                name: "样品",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 2
            },
            {
                id: 8,  //标识
                name: "额外要求",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 3
            },
        ]
        return {tasks,};
    },

    data() {
        return {
            selectesTasks:{
                name: '',
                project: '',
                standard: '',
                principal: '',
                parameter: '',
                time: '',
                status: ''
            }
        }
    }
}

</script>

<style scoped></style>