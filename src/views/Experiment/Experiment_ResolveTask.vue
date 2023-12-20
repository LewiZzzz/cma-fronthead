<template>
    <ContentBase>
        <el-main>
            <el-form :model="form" label-width="100px">
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
                    <el-table :data="standards" style="width: 100%">
                        <el-table-column label="状态">
                            <template #default="scope">
                                <span>{{ scope.row.state === 0 ? '待分解' : '已分解' }}</span>
                            </template>
                        </el-table-column>

                        <el-table-column label="标准大类" prop="class"> </el-table-column>
                        <el-table-column label="标准类别" prop="subclass"> </el-table-column>
                        <el-table-column label="标准名称" prop="name"> </el-table-column>
                        <el-table-column label="操作">
                            <template #default="scope">
                                <!-- 不同的状态跳转到不同的Modal -->
                                <el-button size="small" type="primary" v-if="scope.row.state === 0" data-bs-toggle="modal"
                                    data-bs-target="#resolve" @click="openModal(scope.row)">
                                    分解项目
                                </el-button>
                                <el-button size="small" type="primary" v-if="scope.row.state === 1" data-bs-toggle="modal"
                                    data-bs-target="#query" @click="openModal()">
                                    查看
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-form>
        </el-main>

        <div class="modal fade" id="resolve" tabindex="-1" aria-labelledby="resolve" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> 分解项目： </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <el-col>
                            <template #default="scope">
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                    data-bs-target="#addParam" @click="openModal(scope.row)">新增</button>
                            </template>
                        </el-col>

                        <el-row :gutter="12" v-for="(item) in this.selectedStandard.param" :key="item.id" class="mb-3">
                            <el-col :span="24">

                                <el-container>
                                    <el-aside width="350px">
                                        <el-text size="large">{{ item.name }}</el-text>
                                        <br>
                                        <el-text>负责人：{{ item.principal }}</el-text>
                                        <br>
                                        <el-text>人员：{{ item.personnel }}</el-text>
                                        <br>

                                    </el-aside>

                                </el-container>

                            </el-col>
                        </el-row>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">提交</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="addParam" tabindex="-1" aria-labelledby="addParam" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> 新增参数: </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <ul>
                            <el-form-item label="项目名称">

                                <el-input v-model="selectedStandard.param.name" style="width: 240px;" placeholder="请输入" />
                            </el-form-item>
                            <el-col :span="5">
                                <el-form-item label="项目负责人">
                                    <el-select v-model="selectedStandard.param.principal" placeholder="请选择">
                                        <el-option label="张三" value="option1"></el-option>
                                        <el-option label="李四" value="option2"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-form-item label="指派人员">

                                <el-input v-model="selectedStandard.param.personnel" style="width: 240px;"
                                    placeholder="请输入" />
                            </el-form-item>
                        </ul>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">提交</button>
                    </div>
                </div>
            </div>
        </div>


    </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase'
import {
    ref
} from 'vue';

export default {
    name: "ExperimentResolveTask",
    components: {
        ContentBase,
    },

    setup() {
        const form = ref({
            category: '',
        });
        const standards = [
            {
                id: 0,
                name: "金属平均晶粒度测定方法",
                number: "GB/T 6394-2017",
                //0 未分解 1 已分解
                state: 0,
                classId: 1, // 大类序号
                class: "物理性能通用要求及参数", // 标准大类
                subclassId: 1, //类别序号 x.y x是大类序号 y是具体类别  其实类别序号可以唯一确定项目标识 但是保险起见还是加一个id
                subclass: "金属材料", // 标准具体类别（子类）
                restrictRange: "限制范围", //限制范围
                instruction: "", // 补充说明
                param: [
                    {
                        id: 0,
                        name: "比较法",
                        principal: "李四",
                        personnel: "张三",
                    },
                    {
                        id: 1,
                        name: "截点法",
                        principal: "李四",
                        personnel: "张三",
                    }
                ]

            },

        ]

        return { form, standards, };
    },

    data() {
        return {
            selectedStandard: {
                id: '',
                name: '',
                number: '',
                state: '',
                classId: '', // 大类序号
                class: '', // 标准大类
                subclassId: '', //类别序号 x.y x是大类序号 y是具体类别  其实类别序号可以唯一确定项目标识 但是保险起见还是加一个id
                subclass: '', // 标准具体类别（子类）
                restrictRange: '', //限制范围
                instruction: '', // 补充说明
                param: [],
            },

        }
    },

    methods: {
        openModal(standard) {
            this.selectedStandard = Object.assign({}, standard);
            console.log(this.selectedStandard.param);
        },
    }
}

</script>

<style scoped></style>