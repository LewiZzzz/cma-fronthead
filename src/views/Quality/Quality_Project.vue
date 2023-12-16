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
                        <el-table-column label="项目标准数量" prop="paramSize" />
                        <el-table-column label="项目名称" prop="name" />
                        <el-table-column label="项目标准">
                            <template #default="scope">
                                <p v-for="(s) in scope.row.standard" :key="s.id">{{ s.name }}</p>
                            </template>
                        </el-table-column>
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
                                    data-bs-target="#projectStandardListModal"
                                    @click="openModal(scope.row)">查看项目进度</el-button>
                                <el-button size="small" type="warning" v-if="scope.row.state === 2">审核</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-form>
        </el-main>

        <div class="modal fade" id="projectStandardListModal" tabindex="-1" aria-labelledby="projectStandardListModal"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="projectModalLabel">项目标准列表</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <el-row :gutter="12" v-for="(item) in this.selectedProject.standard" :key="item.id" class="mb-3">
                            <el-col :span="24">
                                <el-card shadow="hover">
                                    <el-container>
                                        <el-aside width="350px">
                                            <el-text size="large">{{ item.name }}</el-text>
                                            <br>
                                            <el-text>大类名称：{{ item.class }}</el-text>
                                            <br>
                                            <el-text>类别名称：{{ item.subclass }}</el-text>
                                            <br>
                                            <el-text size="small">标准编号：{{ item.number }}</el-text>
                                            <br>
                                            <el-text size="small">限制范围：{{ item.restrictRange }}</el-text>
                                            <br>
                                            <el-text size="small">补充说明：{{ item.instruction }}</el-text>
                                            <br>
                                            <el-text size="small">提交者：{{ item.submitter }}</el-text>
                                            <br>
                                            <el-text size="small">提交时间：{{ item.submitTime }}</el-text>
                                            <br>
                                            <el-progress :text-inside="true" :stroke-width="26"
                                                :percentage="item.progress" />
                                        </el-aside>
                                        <el-main>
                                            <el-button type="primary" :icon="Search" circle @click="selectStandard(item)"
                                                data-bs-toggle="modal" data-bs-target="#projectParmModal" />
                                        </el-main>
                                    </el-container>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="modal-footer">

                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="projectParmModal" tabindex="-1" aria-labelledby="projectParmModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="projectModalLabel">标准导航框</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p>项目参数：</p>
                        <ul>
                            <li v-for="(param) in this.selectedStandard.params" :key="param.id" class="mb-3">
                                <span class="me-2">{{ param.name }}</span>
                                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                    data-bs-target="#paramDetailModal" @click="openParam(param)">
                                    查看参数详情
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#projectStandardListModal">返回</button>
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
                        <p>具体要求详细信息</p>
                        <p><span>人员</span><button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal"
                                data-bs-target="#paramPersonnelModal">查看详细信息</button></p>
                        <p><span>设备</span><button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal"
                                data-bs-target="#paramInstrumentModal">查看详细信息</button></p>
                        <p><span>样品</span><button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal"
                                data-bs-target="#paramSampleModal">查看详细信息</button></p>
                        <p><span>检验细则</span><button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal"
                                data-bs-target="#paramSOPModal">查看详细信息</button></p>
                        <p><span>设施</span><button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal"
                                data-bs-target="#paramFacilityModal">查看详细信息</button></p>
                        <p><span>比对验证</span><button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal"
                                data-bs-target="#paramVerificationModal">查看详细信息</button></p>
                        <p><span>模拟实验</span><button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal"
                                data-bs-target="#paramSimulationExperimentModal">查看详细信息</button></p>
                        <p><span>样品</span><button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal"
                                data-bs-target="#paramSampleModal">查看详细信息</button></p>
                        <p v-for="(requirement) in this.selectedParam.extraRequirement" :key="requirement.id">
                            <span>额外要求</span>
                            <button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal"
                                @click="selectRequirement(requirement)" data-bs-target="#paramExtraRequirementModal">
                                查看详细信息
                            </button>
                        </p>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#projectParmModal">返回</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="paramPersonnelModal" tabindex="-1" aria-labelledby="paramPersonnelModal"
            aria-hidden="true">
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
                            <el-collapse-item v-for="(person) in selectedParam.personnel.personnels" :key="person.id"
                                v-model="activeNames" @change="handleChange" :name="person.name">
                                <template #title>
                                    {{ person.name }}
                                </template>
                                <p>基本信息：
                                    <el-link type="danger" :href="person.information.url">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                        </svg>
                                        {{ person.information.name }}
                                    </el-link>
                                </p>
                                <p>培训情况：
                                    <el-link type="danger" :href="person.trainingSituation.url">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                        </svg>
                                        {{ person.trainingSituation.name }}
                                    </el-link>
                                </p>
                                <p>考核资料：
                                    <el-link type="danger" :href="person.assessmentData.url">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                        </svg>
                                        {{ person.assessmentData.name }}
                                    </el-link>
                                </p>
                                <p>授权批准：
                                    <el-link type="danger" :href="person.assessmentData.url">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                        </svg>
                                        {{ person.authorization.name }}
                                    </el-link>
                                </p>
                            </el-collapse-item>
                        </el-collapse>
                        <br>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#paramDetailModal">返回</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="paramInstrumentModal" tabindex="-1" aria-labelledby="paramInstrumentModal"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">具体要求: 设备</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <el-tag v-if="this.selectedParam.instrument.state == 0" type="success">已完成</el-tag>
                        <el-tag v-if="this.selectedParam.instrument.state == 1" type="danger">未完成</el-tag>
                        <br>
                        <p>仪器型号：{{ this.selectedParam.instrument.modelType }}</p>
                        <p>仪器编号：{{ this.selectedParam.instrument.number }}</p>
                        <p>测量范围：{{ this.selectedParam.instrument.measuringRange }}</p>
                        <p>溯源方式：{{ this.selectedParam.instrument.traceMode }}</p>
                        <p>有效日期：{{ this.selectedParam.instrument.effectiveDate }}</p>
                        <p>购买年份：{{ this.selectedParam.instrument.purchaseYear }}</p>
                        <p>购买方式：{{ this.selectedParam.instrument.resource }}</p>
                        <p>计量证书：
                            <el-link type="danger" :href="this.selectedParam.instrument.certificate.url">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                </svg>
                                {{ this.selectedParam.instrument.certificate.name }}
                            </el-link>
                        </p>
                        <p>操作说明：
                            <el-link type="danger" :href="this.selectedParam.instrument.operatingInstruction.url">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                </svg>
                                {{ this.selectedParam.instrument.operatingInstruction.name }}
                            </el-link>
                        </p>
                        <p>仪器授权用户列表：
                            <el-link type="success" :href="this.selectedParam.instrument.authorizedUserList.url">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-filetype-xlsx" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M14 4.5V11h-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM7.86 14.841a1.13 1.13 0 0 0 .401.823c.13.108.29.192.479.252.19.061.411.091.665.091.338 0 .624-.053.858-.158.237-.105.416-.252.54-.44a1.17 1.17 0 0 0 .187-.656c0-.224-.045-.41-.135-.56a1.002 1.002 0 0 0-.375-.357 2.028 2.028 0 0 0-.565-.21l-.621-.144a.97.97 0 0 1-.405-.176.37.37 0 0 1-.143-.299c0-.156.061-.284.184-.384.125-.101.296-.152.513-.152.143 0 .266.023.37.068a.624.624 0 0 1 .245.181.56.56 0 0 1 .12.258h.75a1.093 1.093 0 0 0-.199-.566 1.21 1.21 0 0 0-.5-.41 1.813 1.813 0 0 0-.78-.152c-.293 0-.552.05-.777.15-.224.099-.4.24-.527.421-.127.182-.19.395-.19.639 0 .201.04.376.123.524.082.149.199.27.351.367.153.095.332.167.54.213l.618.144c.207.049.36.113.462.193a.387.387 0 0 1 .153.326.512.512 0 0 1-.085.29.558.558 0 0 1-.255.193c-.111.047-.25.07-.413.07-.117 0-.224-.013-.32-.04a.837.837 0 0 1-.249-.115.578.578 0 0 1-.255-.384h-.764Zm-3.726-2.909h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415H1.5l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Zm1.923 3.325h1.697v.674H5.266v-3.999h.791v3.325Zm7.636-3.325h.893l-1.274 2.007 1.254 1.992h-.908l-.85-1.415h-.035l-.853 1.415h-.861l1.24-2.016-1.228-1.983h.931l.832 1.438h.036l.823-1.438Z" />
                                </svg>
                                {{ this.selectedParam.instrument.authorizedUserList.name }}
                            </el-link>
                        </p>
                        <p>提交者：{{ this.selectedParam.instrument.submitter }}</p>
                        <p>提交时间：{{ this.selectedParam.instrument.submitTime }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#paramDetailModal">返回</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="paramSampleModal" tabindex="-1" aria-labelledby="paramSampleModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">具体要求: 样品</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <el-tag v-if="this.selectedParam.sample.state == 0" type="success">已完成</el-tag>
                        <el-tag v-if="this.selectedParam.sample.state == 1" type="danger">未完成</el-tag>
                        <br>
                        <p>样本名称：{{ this.selectedParam.sample.name }}</p>
                        <p>样本型号：{{ this.selectedParam.sample.sampleType }}</p>
                        <p>样品批号：{{ this.selectedParam.sample.sampleBatchNumber }}</p>
                        <p>样品负责人：{{ this.selectedParam.sample.samplePrincipal }}</p>
                        <p>样品照片：</p>
                        <el-image style="width: 100px; height: 100px" :src="this.selectedParam.sample.samplePhoto"
                            :fit="fit" />
                        <p>提交者：{{ this.selectedParam.instrument.submitter }}</p>
                        <p>提交时间：{{ this.selectedParam.instrument.submitTime }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#paramDetailModal">返回</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="paramFacilityModal" tabindex="-1" aria-labelledby="paramFacilityModal"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">具体要求: 设施</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <el-tag v-if="this.selectedParam.facility.state == 0" type="success">已完成</el-tag>
                        <el-tag v-if="this.selectedParam.facility.state == 1" type="danger">未完成</el-tag>
                        <el-tag v-if="this.selectedParam.facility.isRequired == 0" type="success">无特殊要求</el-tag>
                        <el-tag v-if="this.selectedParam.facility.isRequired == 1" type="danger">有特殊要求</el-tag>
                        <br>
                        <div v-if="this.selectedParam.facility.isRequired == 1">
                            <p>证明文件：
                                <el-link type="danger" :href="this.selectedParam.facility.certificate.url">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                    </svg>
                                    {{ this.selectedParam.facility.certificate.name }}
                                </el-link>
                            </p>
                            <p>提交者：{{ this.selectedParam.facility.submitter }}</p>
                            <p>提交时间：{{ this.selectedParam.facility.submitTime }}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#paramDetailModal">返回</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="paramVerificationModal" tabindex="-1" aria-labelledby="paramVerificationModal"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">具体要求: 比对验证</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <el-tag v-if="this.selectedParam.verification.state == 0" type="success">已完成</el-tag>
                        <el-tag v-if="this.selectedParam.verification.state == 1" type="danger">未完成</el-tag>
                        <el-tag v-if="this.selectedParam.verification.isRequired == 0" type="success">无特殊要求</el-tag>
                        <el-tag v-if="this.selectedParam.verification.isRequired == 1" type="danger">有特殊要求</el-tag>
                        <br>
                        <div v-if="this.selectedParam.verification.isRequired == 1">
                            <p>证明文件：
                                <el-link type="danger" :href="this.selectedParam.verification.certificate.url">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                    </svg>
                                    {{ this.selectedParam.verification.certificate.name }}
                                </el-link>
                            </p>
                            <p>提交者：{{ this.selectedParam.verification.submitter }}</p>
                            <p>提交时间：{{ this.selectedParam.verification.submitTime }}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#paramDetailModal">返回</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="paramSimulationExperimentModal" tabindex="-1"
            aria-labelledby="paramSimulationExperimentModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">具体要求: 模拟实验</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <el-tag v-if="this.selectedParam.simulationExperiment.state == 0" type="success">已完成</el-tag>
                        <el-tag v-if="this.selectedParam.simulationExperiment.state == 1" type="danger">未完成</el-tag>
                        <p>实验报告：
                            <el-link type="danger" :href="this.selectedParam.simulationExperiment.labReport.url">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                </svg>
                                {{ this.selectedParam.simulationExperiment.labReport.name }}
                            </el-link>
                        </p>
                        <p>原始记录：
                            <el-link type="danger" :href="this.selectedParam.simulationExperiment.SourceRecord.url">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                </svg>
                                {{ this.selectedParam.simulationExperiment.SourceRecord.name }}
                            </el-link>
                        </p>
                        <p>提交者：{{ this.selectedParam.simulationExperiment.submitter }}</p>
                        <p>提交时间：{{ this.selectedParam.simulationExperiment.submitTime }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#paramDetailModal">返回</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="paramSOPModal" tabindex="-1" aria-labelledby="paramSOPModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">具体要求: 检验细则（SOP）</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <el-tag v-if="this.selectedParam.SOP.state == 0" type="success">已完成</el-tag>
                        <el-tag v-if="this.selectedParam.SOP.state == 1" type="danger">未完成</el-tag>
                        <p>检验细则：
                            <el-link type="danger" :href="this.selectedParam.SOP.certificate.url">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                </svg>
                                {{ this.selectedParam.SOP.certificate.name }}
                            </el-link>
                        </p>
                        <p>提交者：{{ this.selectedParam.SOP.submitter }}</p>
                        <p>提交时间：{{ this.selectedParam.SOP.submitTime }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#paramDetailModal">返回</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="paramSimulationExperimentModal" tabindex="-1"
            aria-labelledby="paramSimulationExperimentModal" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">具体要求: 模拟实验</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <el-tag v-if="this.selectedParam.simulationExperiment.state == 0" type="success">已完成</el-tag>
                        <el-tag v-if="this.selectedParam.simulationExperiment.state == 1" type="danger">未完成</el-tag>
                        <p>实验报告：
                            <el-link type="danger" :href="this.selectedParam.simulationExperiment.labReport.url">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                </svg>
                                {{ this.selectedParam.simulationExperiment.labReport.name }}
                            </el-link>
                        </p>
                        <p>原始记录：
                            <el-link type="danger" :href="this.selectedParam.simulationExperiment.SourceRecord.url">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                </svg>
                                {{ this.selectedParam.simulationExperiment.SourceRecord.name }}
                            </el-link>
                        </p>
                        <p>提交者：{{ this.selectedParam.simulationExperiment.submitter }}</p>
                        <p>提交时间：{{ this.selectedParam.simulationExperiment.submitTime }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#paramDetailModal">返回</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="paramExtraRequirementModal" tabindex="-1" aria-labelledby="paramExtraRequirementModal"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">额外要求</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <el-tag v-if="this.selectedRequirement.state == 0" type="success">已完成</el-tag>
                        <el-tag v-if="this.selectedRequirement.state == 1" type="danger">未完成</el-tag>
                        <p>要求名称：{{ this.selectedRequirement.name }}</p>
                        <p>要求内容：{{ this.selectedRequirement.content }}</p>
                        <p>要求附件：</p>
                        <el-link v-for="(attachment) in this.selectedRequirement.attachments" :key="attachment.id"
                            type="danger" :href="attachment.name">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                            </svg>
                            {{ attachment.name }}
                        </el-link>
                        <p>提交者：{{ this.selectedRequirement.submitter }}</p>
                        <p>提交时间：{{ this.selectedRequirement.submitTime }}</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                            data-bs-target="#paramDetailModal">返回</button>
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
    Search,
    Edit
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
            paramSize: 2, // 项目标准数量
            principal: "李四", //项目负责人，某实验主任
            standard: [{
                id: 1, // 标准唯一标识
                name: "金属平均晶粒度测定方法",
                number: "GB/T 6394-2017", // 标准编号
                state: 1, // 标准状态 0 - 已完成 1 - 未完成
                classId: 1, // 大类序号
                class: "物理性能通用要求及参数", // 标准大类
                subclassId: 1, //类别序号 x.y x是大类序号 y是具体类别  其实类别序号可以唯一确定项目标识 但是保险起见还是加一个id
                subclass: "金属材料", // 标准具体类别（子类）
                restrictRange: "限制范围", //限制范围
                instruction: "", // 补充说明
                params: [
                    //第一个参数
                    {
                        id: 0, //参数唯一标识
                        name: "比较法",
                        num: 1, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接" // 培训情况
                                },
                                assessmentData: {
                                    name: "考核资料名称",
                                    url: "考核资料链接",
                                },
                                authorization: {
                                    name: "授权批准名称",
                                    url: "授权批准pdf连接",
                                },
                            },],
                            submitter: "赵六", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设备
                        instrument: {
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 1, //参数唯一标识
                        name: "截点法",
                        num: 2, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                ],
            },
            {
                id: 2, // 标准唯一标识
                name: "金属材料 维氏硬度试验 第一部分：试验方法",
                number: "GB/T 4340.1-2009", // 标准编号
                state: 1, // 标准状态 0 - 已完成 1 - 未完成
                classId: 1, // 大类序号
                class: "物理性能通用要求及参数", // 标准大类
                subclassId: 2, //类别序号 x.y x是大类序号 y是具体类别  其实类别序号可以唯一确定项目标识 但是保险起见还是加一个id
                subclass: "金属材料", // 标准具体类别（子类）
                restrictRange: "限制范围", //限制范围
                instruction: "", // 补充说明
                params: [
                    //第一个参数
                    {
                        id: 2, //参数唯一标识
                        name: "硬度",
                        num: 1, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                ],
            },
            {
                id: 3, // 标准唯一标识
                name: "外科金属植入物液体渗透检测",
                number: "YY/T 0343-2002", // 标准编号
                state: 1, // 标准状态 0 - 已完成 1 - 未完成
                classId: 1, // 大类序号
                class: "物理性能通用要求及参数", // 标准大类
                subclassId: 3, //类别序号 x.y x是大类序号 y是具体类别  其实类别序号可以唯一确定项目标识 但是保险起见还是加一个id
                subclass: "外科金属植入物 表面质量", // 标准具体类别（子类）
                restrictRange: "限制范围", //限制范围
                instruction: "", // 补充说明
                params: [
                    //第一个参数
                    {
                        id: 3, //参数唯一标识
                        name: "着色渗透",
                        num: 1, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [
                                {
                                    id: 0,
                                    name: "张三", //人员姓名
                                    information: {
                                        name: "基本情况",
                                        url: "基本情况链接"
                                    }, //基本情况
                                    trainingSituation: {
                                        name: "培训情况",
                                        url: "培训情况链接",
                                    },
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
                                    information: {
                                        name: "基本情况",
                                        url: "基本情况链接",
                                    }, //基本情况
                                    trainingSituation: {
                                        name: "培训情况",
                                        url: "培训情况链接",
                                    },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                ],
            },
            {
                id: 4, // 标准唯一标识
                name: "医用气体和液体用小孔径连接件 第3部分：胃肠道应用连接件",
                number: "YY/T 0916.3-2022", // 标准编号
                state: 1, // 标准状态 0 - 已完成 1 - 未完成
                classId: 1, // 大类序号
                class: "物理性能通用要求及参数", // 标准大类
                subclassId: 4, //类别序号 x.y x是大类序号 y是具体类别  其实类别序号可以唯一确定项目标识 但是保险起见还是加一个id
                subclass: "医用气体和液体用小孔径连接件 胃肠道应用连接件", // 标准具体类别（子类）
                restrictRange: "限制范围", //限制范围
                instruction: "", // 补充说明
                params: [
                    //第一个参数
                    {
                        id: 4, //参数唯一标识
                        name: "压力衰减泄漏",
                        num: 1, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 5, //参数唯一标识
                        name: "正压液体泄漏",
                        num: 2, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 6, //参数唯一标识
                        name: "应力开裂",
                        num: 3, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 7, //参数唯一标识
                        name: "抗轴向负载分离",
                        num: 4, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 8, //参数唯一标识
                        name: "抗旋开扭矩分离",
                        num: 5, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 9, //参数唯一标识
                        name: "抗过载（滑丝）",
                        num: 6, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 10, //参数唯一标识
                        name: "旋开分离",
                        num: 7, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                ],
            },
            {
                id: 5, // 标准唯一标识
                name: "医用气体和液体用小孔径连接件 第20部分：通用试验方法",
                number: "YY/T 0916.20-2019", // 标准编号
                state: 1, // 标准状态 0 - 已完成 1 - 未完成
                classId: 1, // 大类序号
                class: "物理性能通用要求及参数", // 标准大类
                subclassId: 5, //类别序号 x.y x是大类序号 y是具体类别  其实类别序号可以唯一确定项目标识 但是保险起见还是加一个id
                subclass: "医用气体和液体用小孔径连接件", // 标准具体类别（子类）
                restrictRange: "限制范围", //限制范围
                instruction: "", // 补充说明
                params: [
                    //第一个参数
                    {
                        id: 11, //参数唯一标识
                        name: "压力衰减泄漏试验方法",
                        num: 1, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 12, //参数唯一标识
                        name: "正压液体滴落泄漏试验方法",
                        num: 2, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 13, //参数唯一标识
                        name: "负压空气泄漏试验方法",
                        num: 3, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 14, //参数唯一标识
                        name: "应力开裂试验方法",
                        num: 4, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 15, //参数唯一标识
                        name: "抗轴向负载分离试验方法",
                        num: 5, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 16, //参数唯一标识
                        name: "抗旋开扭矩分离试验方法",
                        num: 6, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 17, //参数唯一标识
                        name: "抗过载（滑丝）试验方法",
                        num: 7, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 18, //参数唯一标识
                        name: "旋开分离试验方法",
                        num: 8, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                ],
            },
            {
                id: 6, // 标准唯一标识
                name: "非血管内导管 第1部分：一般性能试验方法",
                number: "GB/T 15812.1-2005", // 标准编号
                state: 1, // 标准状态 0 - 已完成 1 - 未完成
                classId: 1, // 大类序号
                class: "物理性能通用要求及参数", // 标准大类
                subclassId: 6, //类别序号 x.y x是大类序号 y是具体类别  其实类别序号可以唯一确定项目标识 但是保险起见还是加一个id
                subclass: "非血管内导管", // 标准具体类别（子类）
                restrictRange: "限制范围", //限制范围
                instruction: "", // 补充说明
                params: [
                    //第一个参数
                    {
                        id: 19, //参数唯一标识
                        name: "金属部件的耐腐蚀性试验方法",
                        num: 1, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 20, //参数唯一标识
                        name: "拉伸性能试验方法",
                        num: 2, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 21, //参数唯一标识
                        name: "耐液压泄漏试验方法",
                        num: 3, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 22, //参数唯一标识
                        name: "耐吸引或真空泄漏试验方法",
                        num: 4, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 23, //参数唯一标识
                        name: "测定导管水流量试验方法",
                        num: 5, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                    //第一个参数
                    {
                        id: 24, //参数唯一标识
                        name: "连接器牢固度试验方法",
                        num: 6, //参数序号
                        //人员
                        personnel: {
                            state: 0, //0 - 已完成， 1 - 未完成
                            personnels: [{
                                id: 0,
                                name: "张三", //人员姓名
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                                information: {
                                    name: "基本情况",
                                    url: "基本情况链接"
                                }, //基本情况
                                trainingSituation: {
                                    name: "培训情况",
                                    url: "培训情况链接",
                                },
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
                            state: 0, // 0 - 未完成 1 - 已完成
                            submitter: "", // 提交者
                            submitTime: "", // 提交时间
                            id: 0, // 检测仪器唯一标识
                            number: "GW015", // 检测仪器编号
                            name: "标准渗透样块", // 检测仪器名称
                            modelType: "B5", // 检测仪器型号
                            measuringRange: "中灵敏度-超灵敏度", // 检测仪器测量范围
                            traceMode: "其他方式", //溯源方式
                            effectiveDate: "2027-6-25", //有效日期
                            purchaseYear: 2021, // 购买年份
                            resource: "自购", // 购买方式
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            }, // 计量证书pdf链接
                            operatingInstruction: { //操作说明
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            authorizedUserList: {
                                name: "excel名称", // 仪器授权用户列表excel名称
                                url: "excelurl",
                            },
                        },
                        //样品
                        sample: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
                            name: "样本名称",
                            sampleType: "样本型号",
                            sampleBatchNumber: "样本批号",
                            samplePrincipal: "样本负责人",
                            samplePhoto: "照片", //照片url
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // SOP 检验细则
                        SOP: {
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "检验细则名称",
                                url: "检验细则url",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 设施
                        facility: {
                            isRequired: 1, // 0为无特殊要求，无需链接证明 1是测试房间有要求，需要链接证明文件
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            isRequired: 1, // 默认0为无要求 1为有要求，需要链接比对/验证结果PDF
                            state: 0, // 0 - 已完成 1 - 未完成
                            certificate: {
                                name: "pdf名称",
                                url: "pdfurl",
                            },
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        },
                        // 模拟实验
                        simulationExperiment: {
                            state: 0, // 0 - 已完成 1 - 未完成
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
                            state: 0,
                            //要求名称
                            name: '额外要求',
                            //要求内容、说明
                            content: '额外内容要求',
                            //要求附件
                            attachments: [{
                                id: 0, // 附件id
                                //附件名称
                                name: '附件名称',
                                //附件链接
                                url: '链接',
                            },],
                            submitter: "ABC", // 提交者
                            submitTime: "", // 提交时间
                        }],
                    },
                ],
            },
            ]
        },
        ];

        const activeNames = ref(['1'])
        const handleChange = (val) => {
            console.log(val)
        }

        return {
            form,
            search,
            projects,
            activeNames,
            handleChange,
            Search,
            Edit
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
                paramSize: 0,
                principal: '',
            }, // 用于存储被选中项目的详细信息
            selectedStandard: {

            },
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
                instrument: {
                    certificate: {
                        name: "",
                        url: "",
                    },
                    operatingInstruction: {
                        name: "",
                        url: "",
                    },
                    authorizedUserList: {
                        name: "",
                        url: "",
                    }
                },
                // 样品
                sample: {},
                // 设施
                facility: {
                    certificate: {
                        name: "",
                        url: "",
                    },
                },
                // 比对验证
                verification: {
                    certificate: {
                        name: "",
                        url: "",
                    },
                },
                SOP: {
                    certificate: {
                        name: "",
                        url: "",
                    },
                },
                // 模拟实验
                simulationExperiment: {
                    labReport: {
                        name: "",
                        url: "",
                    },
                    SourceRecord: {
                        name: "",
                        url: "",
                    }
                },
                // 项目额外要求
                extraRequirement: [],
            },
            selectedRequirement: {

            }
        };
    },
    methods: {
        openModal(project) {
            this.selectedProject = Object.assign({}, project);
            console.log(this.selectedProject.param);
        },
        selectStandard(standard) {
            this.selectedStandard = Object.assign({}, standard);
            console.log(this.selectedStandard)
        },
        openParam(param) {
            this.selectedParam = Object.assign({}, param);
        },
        selectRequirement(requirement) {
            this.selectedRequirement = Object.assign({}, requirement);
        }
    },
}
</script>

<style scoped>
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.flex-content {
    /* 保持内容在左侧 */
    flex-grow: 1;
}
</style>
