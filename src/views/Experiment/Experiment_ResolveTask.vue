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
        </el-main>

        <div class="modal fade" id="resolve" tabindex="-1" aria-labelledby="resolve" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"> 分解项目 </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <el-col>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addParam"
                                @click="openModal()">新增</button>
                            <br>
                        </el-col>

                        <ul>
                            <li class="mb-3">比较法</li>
                            <el-text size="small">项目负责人：李四</el-text>
                            <br>
                            <el-text size="small">人员：张三</el-text>
                            <br>
                            <li class="mb-3">截点法
                            </li>
                            <el-text size="small">项目负责人：李四</el-text>
                            <br>
                            <el-text size="small">人员：张三</el-text>
                            <br>
                        </ul>

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
                        <h5 class="modal-title"> 新增参数 </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <ul>
                            <li class="mb-3">
                                参数名称：
                                <el-input v-model="input" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                指派项目负责人：
                                <el-input v-model="input" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                指派人员：
                                <el-input v-model="input" style="width: 240px;" placeholder="请输入" />
                            </li>
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


export default {
    name: "ExperimentResolveTask",
    components: {
        ContentBase,
    },

    setup() {
        const standards = [
            {
                id: 1,
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
                params:[
                    {
                        id: 0, //参数唯一标识
                        name: "比较法",
                        num: 1, 
                        person:''
                    }
                ]
            },
            
        ]

        return { standards, };
    },

    date() {
        return {
            selectedStandards: {
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
            },
            param:{
                name:'',
                person:'',
            }

        }
    },

    methods: {
        openModal(project) {
            this.selectedProject = Object.assign({}, project);
            console.log(this.selectedProject.name);
        },
    }
}

</script>

<style scoped></style>