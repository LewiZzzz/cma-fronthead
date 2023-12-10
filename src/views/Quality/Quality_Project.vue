<template>
<ContentBase>
    <el-main>
        <el-form :model="form" label-width="100px">
            <el-row>
                <el-col :span="5">
                    <el-form-item label="项目状态">
                        <el-select v-model="form.category" placeholder="请选择">
                            <el-option label="选项1" value="option1"></el-option>
                            <el-option label="选项2" value="option2"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="9">
                    <el-form-item label="搜索">
                        <el-input v-model="search" class="w-50 me-4" placeholder="查询指定项目" :prefix-icon="Search">
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
                            <el-button size="small" type="primary" v-if="scope.row.state === 0" data-bs-toggle="modal" data-bs-target="#projectModal" @click="openModal(scope.row)">
                                查看详情
                            </el-button>
                            <el-button size="small" type="success" v-if="scope.row.state === 0">导出表格</el-button>
                            <el-button size="small" type="info" v-if="scope.row.state === 1" data-bs-toggle="modal" data-bs-target="#projectProgressModal" @click="openModal(scope.row)">查看项目进度</el-button>
                            <el-button size="small" type="warning" v-if="scope.row.state === 2">审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-row>
        </el-form>
    </el-main>

    <div class="modal fade" id="projectModal" tabindex="-1" aria-labelledby="projectModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="projectModalLabel">项目详情</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- 在这里展示项目的详细信息 -->
                    <p>日期: {{ selectedProject.date }}</p>
                    <p>项目名称: {{ selectedProject.name }}</p>
                    <p>项目状态: {{ selectedProject.state === 0 ? '已完成' : (selectedProject.state === 1 ? '未完成' : '待审核') }}</p>
                    <el-progress :percentage="this.selectedProject.progress" />
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="projectProgressModal" tabindex="-1" aria-labelledby="projectModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="projectModalLabel">项目详情</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- 在这里展示项目的详细信息 -->
                    <p>日期: {{ this.selectedProject.date }}</p>
                    <p>项目名称: {{ this.selectedProject.name }}</p>
                    <p>项目状态: {{ selectedProject.state === 0 ? '已完成' : (selectedProject.state === 1 ? '未完成' : '待审核') }}</p>
                    <el-progress :percentage="this.selectedProject.progress" />
                    <p>项目参数：</p>
                    <ul>
                        <li v-for="(param) in selectedProject.param" :key="param.id">
                            <span class="me-2">{{ param.name }}</span>
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#paramDetailModal" @click="openParam(param)">
                                查看参数详情
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

    <div class="modal fade" id="paramDetailModal" tabindex="-1" aria-labelledby="paramModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">参数详情: {{ this.selectedParam.name }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- 展示参数的详细信息 -->
                    <p>参数序号: {{ this.selectedParam.num }}</p>
                    <el-tag v-if="this.selectedParam.standard.state == 0" type="success">已完成</el-tag>
                    <el-tag v-if="this.selectedParam.standard.state == 1" type="danger">未完成</el-tag>
                    <br>
                    <p>依据标准详细信息</p>
                    <p>大类序号: {{ this.selectedParam.standard.classId }}</p>
                    <p>大类名称: {{ this.selectedParam.standard.class }}</p>
                    <p>类别序号: {{ this.selectedParam.standard.subclassId }}</p>
                    <p>类别名称: {{ this.selectedParam.standard.subclass }}</p>
                    <p>标准名称: {{ this.selectedParam.standard.name }}</p>
                    <p>标准编号：{{ this.selectedParam.standard.number }}</p>
                    <p>限制范围: {{ this.selectedParam.standard.restrictRange }}</p>
                    <p>补充说明: {{ this.selectedParam.standard.instruction }}</p>
                    <p>提交者: {{ this.selectedParam.standard.submitter }}</p>
                    <p>提交时间: {{ this.selectedParam.standard.submitTime }}</p>
                    <br>
                    <p>具体要求详细信息</p>
                    <p><span>人员</span><button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#paramPersonnelModal">查看详细信息</button></p>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#projectProgressModal">返回</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="paramPersonnelModal" tabindex="-1" aria-labelledby="paramPersonnelModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">具体要求: 人员</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <el-tag v-if="this.selectedParam.personnel.state == 0" type="success">已完成</el-tag>
                    <el-tag v-if="this.selectedParam.personnel.state == 1" type="danger">未完成</el-tag>
                    <br>
                    <el-collapse class="mt-3">
                        <el-collapse-item v-for="(person) in selectedParam.personnel.personnels" :key="person.id" v-model="activeNames" @change="handleChange" :name="person.name">
                            <template #title>
                                {{ person.name}}
                            </template>
                            <p>电话号码：{{ person.tel }}</p>
                            <p>培训情况：{{ person.trainingSituation }}</p>
                            <p>考核资料：
                                <el-link type="danger" :href="person.assessmentData.url">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                    </svg>
                                    {{ person.assessmentData.name }}
                                </el-link>
                            </p>
                            <p>授权批准：
                                <el-link type="danger" :href="person.assessmentData.url">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                    </svg>
                                    {{ person.authorization.name }}
                                </el-link>
                            </p>
                        </el-collapse-item>
                    </el-collapse>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#paramDetailModal">返回</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="paramPersonnelModal" tabindex="-1" aria-labelledby="paramPersonnelModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">具体要求: 人员</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <el-tag v-if="this.selectedParam.personnel.state == 0" type="success">已完成</el-tag>
                    <el-tag v-if="this.selectedParam.personnel.state == 1" type="danger">未完成</el-tag>
                    <br>
                    <el-collapse class="mt-3">
                        <el-collapse-item v-for="(person) in selectedParam.personnel.personnels" :key="person.id" v-model="activeNames" @change="handleChange" :name="person.name">
                            <template #title>
                                {{ person.name}}
                            </template>
                            <p>电话号码：{{ person.tel }}</p>
                            <p>培训情况：{{ person.trainingSituation }}</p>
                            <p>考核资料：
                                <el-link type="danger" :href="person.assessmentData.url">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                    </svg>
                                    {{ person.assessmentData.name }}
                                </el-link>
                            </p>
                            <p>授权批准：
                                <el-link type="danger" :href="person.assessmentData.url">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                    </svg>
                                    {{ person.authorization.name }}
                                </el-link>
                            </p>
                        </el-collapse-item>
                    </el-collapse>
                    <br>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#paramDetailModal">返回</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
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
import {
    Search
} from '@element-plus/icons-vue'

export default {
    name: "QualityCreate",
    components: {
        ContentBase,
    },
    setup() {
        const form = ref({
            category: '',
        });
        const search = '';
        const projects = [{
            id: 0, // 项目的唯一标识
            date: "2023-01-01", // 项目开始日期 后续可能加入具体时间
            name: "项目名称", // 项目名称
            state: 1, // 项目状态 0 - 已完成 1 - 未完成 2 - 待审核
            progress: 50, // 项目进展 1-100
            standardSize: 2, // 项目标准数量
            principal: "李四", //项目负责人，某实验主任
            param: [{
                id: 1, //参数唯一标识
                name: "着色渗透",
                num: 1, //参数序号
                //参数依据的标准
                standard: {
                    id: 0, // 标准的唯一标识
                    name: "外科金属植入物液体渗透分析", // 标准名称
                    number: "YY/T 0343-2002", // 标准编号classId
                    state: 1, // 标准状态 0 - 已完成 1 - 未完成
                    classId: 1, // 大类序号
                    class: "物理性能通用要求及参数", // 标准大类
                    subclassId: 1, //类别序号 x.y x是大类序号 y是具体类别  其实类别序号可以唯一确定项目标识 但是保险起见还是加一个id
                    subclass: "外科金属植入物 表面质量", // 标准具体类别（子类）
                    restrictRange: "限制范围", //限制范围
                    instruction: "", // 补充说明
                    submitter: "王五", // 提交者
                    submitTime: "", // 提交时间
                },
                //人员
                personnel: {
                    state: 0, //0 - 已完成， 1 - 未完成
                    personnels: [{
                            id: 0,
                            name: "张三", //人员姓名
                            tel: "123456789", //电话号码
                            trainingSituation: "通过", //培训情况
                            assessmentData: {
                                name: "考核资料名称",
                                url: "考核资料链接",
                            },
                            authorization: {
                                name: "授权批准名称",
                                url: "授权批准pdf连接",
                            },
                        },
                        {
                            id: 1,
                            name: "李四", //人员姓名
                            tel: "123456789", //电话号码
                            trainingSituation: "通过", //培训情况
                            assessmentData: {
                                name: "考核资料名称",
                                url: "考核资料链接",
                            },
                            authorization: {
                                name: "授权批准名称",
                                url: "授权批准pdf连接",
                            },
                        },
                    ],
                    submitter: "赵六", // 提交者
                    submitTime: "", // 提交时间
                },
                // 设备
                instrument: {
                    submitter: "", // 提交者
                    submitTime: "", // 提交时间
                    instruments: [{
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            state: 1, // 0 - 未完成 1 - 已完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            OperatingInstruction: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        {
                            id: 1, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            state: 1, // 0 - 未完成 1 - 已完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            OperatingInstruction: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                    ],
                },
                //样品
                sample: {
                    name: "样本名称",
                    sampleType: "样本型号",
                    sampleBatchNumber: "样本批号",
                    samplePrincipal: "样本负责人",
                    samplePhoto: "照片", //照片url
                    submitter: "ABC", // 提交者
                    submitTime: "", // 提交时间
                },
                // 设施
                facility: {
                    state: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                    certificate: {
                        name: "pdf名称",
                        url: "pdfurl",
                    },
                    submitter: "ABC", // 提交者
                    submitTime: "", // 提交时间
                },
                // 比对验证
                verification: {
                    // 比对验证
                    state: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                    certificate: {
                        name: "pdf名称",
                        url: "pdfurl",
                    },
                    submitter: "ABC", // 提交者
                    submitTime: "", // 提交时间
                },
                // 模拟实验
                simulationExperiment: {
                    labReport: {
                        name: "pdf名称",
                        url: "pdfurl",
                    },
                    SourceRecord: {
                        name: "pdf名称",
                        url: "pdfurl",
                    },
                    submitter: "ABC", // 提交者
                    submitTime: "ABC", // 提交时间
                },
                // 项目额外要求
                extraRequirement: [{
                    //要求名称
                    name: '额外要求',
                    //要求内容、说明
                    content: '额外内容要求',
                    //要求附件
                    attachments: [{
                        //附件名称
                        name: '附件名称',
                        //附件链接
                        url: '链接',
                    }, ],
                    submitter: "ABC", // 提交者
                    submitTime: "", // 提交时间
                }],
            }, ],
        }, ];

        const activeNames = ref(['1'])
        const handleChange = (val) => {
            console.log(val)
        }

        return {
            form,
            search,
            Search,
            projects,
            activeNames,
            handleChange,
        };
    },
    data() {
        return {
            selectedProject: {
                date: '',
                name: '',
                state: 0,
                progress: 0,
                param: [],
                starndardSize: 0,
                principal: '',
            }, // 用于存储被选中项目的详细信息
            selectedParam: {
                id: 0, //参数唯一标识
                name: "",
                num: 0, //参数序号
                //参数依据的标准
                standard: {
                    id: 0,
                    number: "",
                    classId: 0,
                    class: "",
                    subclassId: 0,
                    subclass: "",
                    name: "",
                    restrictRange: "",
                    instruction: "",
                    submitter: "",
                    submitTime: "",
                },
                // 人员
                personnel: {},
                // 设备
                instrument: {},
                // 样品
                sample: {},
                // 设施
                facility: {},
                // 比对验证
                verification: {},
                // 模拟实验
                simulationExperiment: {},
                // 项目额外要求
                extraRequirement: [],
            },
        };
    },
    methods: {
        openModal(project) {
            this.selectedProject = Object.assign({}, project);
            console.log(this.selectedProject.param);
        },
        openParam(param) {
            this.selectedParam = Object.assign({}, param);
        },
    },
}
</script>
