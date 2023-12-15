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
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column label="序号" prop="id" />
                    <el-table-column label="任务名称" prop="name" />
                    <el-table-column label="任务状态" prop="status" />
                    <el-table-column label="操作">
                        <el-button size="small" type="primary" data-bs-toggle="modal" data-bs-target="#submitTask"
                            @click="openModal()">提交</el-button>
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
    data() {
        return {
            tableData: [
                {
                    id: '1',
                    name: '项目1',
                    status: '待提交',
                },
                {
                    id: '2',
                    name: '项目2',
                    status: '待提交',
                },
            ]
        }
    }
}

</script>

<style scoped></style>