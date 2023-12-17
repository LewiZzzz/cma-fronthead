<template>
  <ContentBase>
    <el-table :data='projects' stripe style="width: 100%" height="250" :border='true' :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" >
      <el-table-column fixed:true prop="id" label="序号" width="180" />
      <el-table-column prop="project" label="项目名称" width="280" />
      <el-table-column prop="standard" label="标准名称" width="280" />
      <el-table-column prop="parameter" label="参数" width="280" />
      <el-table-column  label="要求" width="280">
        <template #default>
          <el-button  size="small" type="info" data-bs-toggle="modal"
                      data-bs-target="#projectRequireListModal" @click="openModal(scope.row)">
              要求详情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column  label="审核结果" width="280" >
        <template #default="scope">
            <span>{{ scope.row.state === 0 ? '待审核' : (scope.row.state === 1 ? '审核未通过' : '审核通过') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
          <template #default="scope">
                               
                                <el-button size="small" type="primary" v-if="scope.row.state === 1||scope.row.state === 0" >
                                    通过</el-button>
                                <el-button size="small" type="primary" v-if="scope.row.state === 1||scope.row.state === 0" >
                                    不通过</el-button> 
                                <el-button size="small" type="primary" v-else >
                                    查看详情
                                </el-button>
          </template>
      </el-table-column>
    </el-table>
    <div class="modal fade" id="projectRequireListModal" tabindex="-1" aria-labelledby="projectRequireListModal"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="projectModalLabel">项目要求列表</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">          
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
                            data-bs-target="#projectRequireListModal">返回</button>
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

        <!-- <div class="modal fade" id="paramExtraRequirementModal" tabindex="-1" aria-labelledby="paramExtraRequirementModal"
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
        </div> -->
  </ContentBase>
</template>
 <script>
 import ContentBase from '@/components/ContentBase'
 export default {
     name: "ExperimentTaskExamine",
     components: {
         ContentBase: ContentBase,
     },
     setup() {
        const projects =[
          {
            id: '1',
            project: '4',
            standard: '5',
            parameter: '5',  
            require:['人员','设备'],
            state:1,       
            result: 0,
          },
        ]
        const search = '';
        return {
            projects,
            search,
        };
       },
       data() {
       return {
        //详细项目信息
        selectedProject: {
                id: '',
                project: '',
                standard: '',
                parameter: '',
                require:[],         
                state:0,  
                result: 0,
                
            }, 
        //详细参数信息    
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
         
       };
     },
   methods: {
     submitForm() {
       // 提交表单的逻辑
       // 可以在这里处理表单提交的操作
       console.log('Form submitted!');
       console.log(this.creationMethod);
     },
     openModal(project) {
            this.selectedProject = Object.assign({}, project);
            console.log(this.selectedProject);
        },
     openParam(param) {
            this.selectedParam = Object.assign({}, param);
        },
   }
 }
 </script>
 

  
