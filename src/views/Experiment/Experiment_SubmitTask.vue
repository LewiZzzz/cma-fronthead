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
                    <el-table-column label="任务名称" prop="name">
                        <template #default="scope">
                            <span v-if="scope.row.id === 0">{{ '人员' }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="下达时间" prop="time" />
                    <el-table-column label="状态">
                        <template #default="scope">
                            <span>{{ scope.row.state === 0 ? '待提交' : (scope.row.state === 1 ? '待审核' : (scope.row.state === 2
                                ?
                                '通过' : '未通过')) }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <!-- 不同的任务跳转到不同的Modal -->
                            <el-button size="small" type="primary" v-if="scope.row.state === 0 && scope.row.id === 0"
                                data-bs-toggle="modal" data-bs-target="#submitTask_0" @click="openModal()">
                                提交
                            </el-button>
                            <el-button size="small" type="primary" v-if="scope.row.state === 0 && scope.row.id === 1"
                                data-bs-toggle="modal" data-bs-target="#submitTask_1" @click="openModal()">
                                提交
                            </el-button>
                            <el-button size="small" type="primary" v-if="scope.row.state === 0 && scope.row.id === 2"
                                data-bs-toggle="modal" data-bs-target="#submitTask_2" @click="openModal()">
                                提交
                            </el-button>
                            <el-button size="small" type="primary" v-if="scope.row.state === 0 && scope.row.id === 3"
                                data-bs-toggle="modal" data-bs-target="#submitTask_3" @click="openModal()">
                                提交
                            </el-button>
                            <el-button size="small" type="primary" v-if="scope.row.state === 0 && scope.row.id === 4"
                                data-bs-toggle="modal" data-bs-target="#submitTask_4" @click="openModal()">
                                提交
                            </el-button>
                            <el-button size="small" type="primary" v-if="scope.row.state === 0 && scope.row.id === 5"
                                data-bs-toggle="modal" data-bs-target="#submitTask_5" @click="openModal()">
                                提交
                            </el-button>
                            <el-button size="small" type="primary" v-if="scope.row.state === 0 && scope.row.id === 6"
                                data-bs-toggle="modal" data-bs-target="#submitTask_6" @click="openModal()">
                                提交
                            </el-button>
                            <el-button size="small" type="primary" v-if="scope.row.state === 0 && scope.row.id === 7"
                                data-bs-toggle="modal" data-bs-target="#submitTask_7" @click="openModal()">
                                提交
                            </el-button>
                            <el-button size="small" type="primary" v-if="scope.row.state === 0 && scope.row.id === 8"
                                data-bs-toggle="modal" data-bs-target="#submitTask_8" @click="openModal()">
                                提交
                            </el-button>
                            <el-button size="small" type="warning" v-if="scope.row.state === 1">审核</el-button>
                            <el-button size="small" type="warning" v-if="scope.row.state === 2">提交</el-button>
                            <el-button size="small" type="primary" v-if="scope.row.state === 3" data-bs-toggle="modal"
                                data-bs-target="#examineRes" @click="openModal()">查看审核结果
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-main>

        <div class="modal fade" id="submitTask_0" tabindex="-1" aria-labelledby="submitTask_0" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="submitTaskLabel">人员</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <el-collapse class="mt-3">
                            <li class="mb-3">基本信息：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
                            </li>
                            <li class="mb-3">培训情况：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
                            </li>
                            <li class="mb-3">考核资料：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
                            </li>
                            <li class="mb-3">授权批准：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
                            </li>
                        </el-collapse>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                        <button type="button" class="btn btn-primary">提交</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="submitTask_1" tabindex="-1" aria-labelledby="submitTask_1" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="submitTaskLabel">提交</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>设备</p>
                        <ul>
                            <li class="mb-3">
                                仪器型号：
                                <el-input v-model="equipment.model" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                仪器编号：
                                <el-input v-model="equipment.number" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                测量范围：
                                <el-input v-model="equipment.measuringRange" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                溯源方式：
                                <el-input v-model="equipment.traceabilityMode" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                有效日期：
                                <el-input v-model="equipment.effectiveDate" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                购买方式：
                                <el-input v-model="equipment.buy" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">计量证书：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
                            </li>
                            <li class="mb-3">操作说明：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
                            </li>
                            <li class="mb-3">仪器用户授权列表：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
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

        <div class="modal fade" id="submitTask_2" tabindex="-1" aria-labelledby="submitTask_2" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="submitTaskLabel">提交</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>样品</p>
                        <ul>
                            <li class="mb-3">
                                样本名称：
                                <el-input v-model="sample.name" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                样本型号：
                                <el-input v-model="sample.mode" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                样品批号：
                                <el-input v-model="sample.batch" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                样品负责人：
                                <el-input v-model="sample.principal" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                样品照片：
                                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                                    <el-icon>
                                        <Plus />
                                    </el-icon>

                                    <template #file="{ file }">
                                        <div>
                                            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                            <span class="el-upload-list__item-actions">
                                                <span class="el-upload-list__item-preview"
                                                    @click="handlePictureCardPreview(file)">
                                                    <el-icon><zoom-in /></el-icon>
                                                </span>
                                                <span v-if="!disabled" class="el-upload-list__item-delete"
                                                    @click="handleDownload(file)">
                                                    <el-icon>
                                                        <Download />
                                                    </el-icon>
                                                </span>
                                                <span v-if="!disabled" class="el-upload-list__item-delete"
                                                    @click="handleRemove(file)">
                                                    <el-icon>
                                                        <Delete />
                                                    </el-icon>
                                                </span>
                                            </span>
                                        </div>
                                    </template>
                                </el-upload>

                                <el-dialog v-model="dialogVisible">
                                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                                </el-dialog>
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

        <div class="modal fade" id="submitTask_3" tabindex="-1" aria-labelledby="submitTask_3" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="submitTaskLabel">提交</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>检验细则（SOP）：</p>
                        <ul>
                            <li class="mb-3">检验细则：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
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

        <div class="modal fade" id="submitTask_4" tabindex="-1" aria-labelledby="submitTask_4" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="submitTaskLabel">提交</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>设施：</p>
                        <ul>
                            <li class="mb-3">证明文件：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
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

        <div class="modal fade" id="submitTask_5" tabindex="-1" aria-labelledby="submitTask_5" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="submitTaskLabel">提交</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>比对验证：</p>
                        <ul>
                            <li class="mb-3">证明文件：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
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

        <div class="modal fade" id="submitTask_6" tabindex="-1" aria-labelledby="submitTask_6" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="submitTaskLabel">提交</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>模拟实验：</p>
                        <ul>
                            <li class="mb-3">实验报告：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
                            </li>
                            <li class="mb-3">原始记录：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
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

        <div class="modal fade" id="submitTask_7" tabindex="-1" aria-labelledby="submitTask_7" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="submitTaskLabel">提交</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>额外要求：</p>
                        <ul>
                            <li class="mb-3">
                                要求名称：
                                <el-input v-model="requirement.name" style="width: 240px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">
                                要求内容：
                                <el-input v-model="requirement.content" style="width: 350x; height: 150px;" placeholder="请输入" />
                            </li>
                            <li class="mb-3">要求附件：
                                <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">select file</el-button>
                                    </template>
                                </el-upload>
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
                state: 0
            },
            {
                id: 2,  //标识
                name: "样品",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 0
            },
            {
                id: 3,  //标识
                name: "检验细则",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 0
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
                state: 0
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
                name: "额外要求",
                project: "项目1",
                standard: "比较法",
                principal: "李四",
                parameter: "金属平均晶粒度测定方法",
                time: "2023-01-01",
                state: 0
            },
        ]
        return { tasks, };

    },

    data() {
        return {
            selectesTasks: {
                id: '',
                // name: '',
                project: '',
                standard: '',
                principal: '',
                parameter: '',
                time: '',
                status: ''
            },

            equipment : {
            model: '',
            number: '',
            measuringRange: '',
            traceabilityMode: '',
            effectiveDate: '',
            buy: '',
            },

            sample:{
                name:'',
                mode:'',
                batch:'',
                principal:''
            },

            requirement:{
                name:'',
                content:'',
            }
        }
    }
}

</script>

<style scoped>
.flex-content {
    /* 保持内容在左侧 */
    flex-grow: 1;
}
</style>