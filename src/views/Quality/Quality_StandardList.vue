<template>
    <ContentBase>
        <el-main>
            <el-form :model="form" label-width="100px">
                <el-row>
                    <el-col :span="5">
                        <el-form-item label="标准大类">
                            <el-select v-model="form.category" placeholder="请选择">
                                <el-option label="选项1" value="option1"></el-option>
                                <el-option label="选项2" value="option2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col :span="5">
                        <el-form-item label="标准类别">
                            <el-select v-model="form.category" placeholder="请选择">
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

                </el-row>

                <el-row>
                    <el-table :data="projects" style="width: 100%">
                        <el-table-column label="项目开始日期" prop="date" />
                        <el-table-column label="项目标准数量" prop="standardSize" />
                        <el-table-column label="项目名称" prop="name" />
                        <el-table-column label="项目负责人" prop="principal" />
                        <el-table-column label="项目进度">
                            <template #default="scope">
                                <el-progress :percentage="scope.row.progress" />
                            </template>
                        </el-table-column>
                        <el-table-column label="项目状态">
                            <template #default="scope">
                                <span>{{ scope.row.state === 0 ? '已完成' : (scope.row.state === 1 ? '未完成' : '待审核') }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template #default="scope">
                                <el-button size="small" type="primary" v-if="scope.row.state === 0" data-bs-toggle="modal"
                                    data-bs-target="#projectModal" @click="openModal(scope.row)">
                                    查看详情
                                </el-button>
                                <el-button size="small" type="success" v-if="scope.row.state === 0">导出表格</el-button>
                                <el-button size="small" type="info" v-if="scope.row.state === 1" data-bs-toggle="modal"
                                    data-bs-target="#projectProgressModal" @click="openModal(scope.row)">查看项目进度</el-button>
                                <el-button size="small" type="warning" v-if="scope.row.state === 2">审核</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-form>
        </el-main>
    </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase'
import {
    Search
} from '@element-plus/icons-vue'

export default {
    name: "QualityStandardList",
    components: {
        ContentBase,
        Search,
    }
}
</script>

<style scoped></style>