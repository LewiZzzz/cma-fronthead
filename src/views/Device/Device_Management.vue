<template>
  <ContentBase>
    <el-row>
                <el-col :span="9">
                    <el-form-item label="搜索">
                        <el-input v-model="search" class="w-50 me-4" placeholder="请输入设备名称" :prefix-icon="Search">
                        </el-input>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>  
                </el-col>
                <el-col :span="9">
                    <el-button type="primary" data-bs-toggle="modal" data-bs-target="#addModal" >
                    新增</el-button>
                </el-col>
    </el-row>
    <el-table :data='equipList' stripe style="width: 100%" height="250" :border='true' :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" >
      <!-- <el-table-column fixed:true prop="projectId" label="项目编号" width="180" /> -->
      <el-table-column prop="equipId" label="仪器设备编号" width="180" />
      <el-table-column prop="equipName" label="名称" width="180" />
      <el-table-column prop="specification" label="型号/规格/等级" width="180"/>
      <el-table-column prop="measureRange" label="测量范围" width="180"/>
      <el-table-column prop="purchaseYear" label="购买年份" width="180" />
      <el-table-column  prop="traceWay" label="溯源方式" width="180" >
        <template #default="scope">
            <span>{{ scope.row.state === 1 ?'检定':(scope.row.state === 2 ? '校准' : (scope.row.state === 3 ? '内部校准' : '其他方式'))}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="validDate" label="有效截止日期至" width="180" />
      <el-table-column prop="equipmentSource" label="设备来源" width="180" />
      <el-table-column  prop="qualityCertificate" label="设备计量证书" width="180" >
        <template #default="scope">
          <el-link type="danger" :href="scope.row.qualityCertificate">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-filetype-pdf" viewBox="0 0 16 16">
               <path fill-rule="evenodd"
                    d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
             </svg>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column  prop="operationSpecification" label="仪器操作规范" width="180" >
        <template #default="scope">
          <el-link type="danger" :href="scope.row.operationSpecification">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-filetype-pdf" viewBox="0 0 16 16">
               <path fill-rule="evenodd"
                    d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
             </svg>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column  prop="userTable" label="仪器授权使用人员一览表" width="180" >
        <template #default="scope">
          <el-link type="danger" :href="scope.row.userTable">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
               class="bi bi-filetype-pdf" viewBox="0 0 16 16">
               <path fill-rule="evenodd"
                    d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
             </svg>
          </el-link>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" data-bs-toggle="modal" data-bs-target="#editModal" @click="openEquip(scope.row)">修改</el-button>
        <el-button link type="primary" size="small" @click="openEquip(scope.row); deleteEquip()">删除</el-button>
      </template>
    </el-table-column>
    </el-table>  
    <!-- 分页 -->
    <el-pagination background layout="prev, pager, next" :total="totalEquips" :page-size="50" @current-change="fetchPagedEquips"/>
    <!-- 新增设备模态框 -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModal"
          aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="projectModalLabel">新增设备</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <el-form :model="equip" label-width="120px">
                      <!-- <el-form-item label="项目编号">
                           <el-input v-model="equip.projectId" placeholder="" style="width: 235px"></el-input>
                      </el-form-item> -->
                      <el-form-item label="仪器设备编号">
                           <el-input v-model="equip.equipId" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="名称">
                           <el-input v-model="equip.equipName" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="型号/规格/等级">
                           <el-input v-model="equip.specification" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="测量范围">
                           <el-input v-model="equip.measureRange" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="购买年份">
                           <el-input v-model="equip.purchaseYear" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="溯源方式">
                        <el-select v-model="equip.traceWay" placeholder=" ">
                         <el-option label="检定" value="1" />
                         <el-option label="校准" value="2" />
                         <el-option label="内部校准" value="3" />
                         <el-option label="其他方式" value="4" />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="有效截止日期至">
                           <el-input v-model="equip.validDate" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="设备来源">
                           <el-input v-model="equip.equipmentSource" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="设备计量证书" >
                                <el-upload ref="upload" class="upload-demo" action="后端API" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="danger" plain style="width: 200px;">上传文件
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-upload ms-2" viewBox="0 0 16 16">
                                                <path
                                                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                            </svg>
                                        </el-button>
                                    </template>
                                    <template #tip>
                                        <div class="el-upload__tip red-text">
                                            限制上传1个文件，上传PDF文件后点击导入按钮
                                        </div>
                                    </template>
                                </el-upload>
                      </el-form-item>
                      <!-- <el-form-item label="设备计量证书">                        
                        <el-upload  ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">选择pdf文件</el-button>
                                    </template>
                        </el-upload> 
                      </el-form-item> -->
                      <el-form-item label="设备计量证书" >
                                <el-upload ref="upload" class="upload-demo" action="后端API" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="danger" plain style="width: 200px;">上传文件
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-upload ms-2" viewBox="0 0 16 16">
                                                <path
                                                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                            </svg>
                                        </el-button>
                                    </template>
                                    <template #tip>
                                        <div class="el-upload__tip red-text">
                                            限制上传1个文件，上传PDF文件后点击导入按钮
                                        </div>
                                    </template>
                                </el-upload>
                      </el-form-item>
                      <el-form-item label="仪器操作规范" >
                                <el-upload ref="upload" class="upload-demo" action="后端API" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="danger" plain style="width: 200px;">上传文件
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-upload ms-2" viewBox="0 0 16 16">
                                                <path
                                                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                            </svg>
                                        </el-button>
                                    </template>
                                    <template #tip>
                                        <div class="el-upload__tip red-text">
                                            限制上传1个文件，上传PDF文件后点击导入按钮
                                        </div>
                                    </template>
                                </el-upload>
                      </el-form-item>
                      <!-- <el-form-item label="仪器操作规范">
                        <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">选择pdf文件</el-button>
                                    </template>
                        </el-upload> 
                      </el-form-item> -->
                      <el-form-item label="仪器授权使用人员一览表" >
                                <el-upload ref="upload" class="upload-demo" action="后端API" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="danger" plain style="width: 200px;">上传文件
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                fill="currentColor" class="bi bi-upload ms-2" viewBox="0 0 16 16">
                                                <path
                                                    d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                                <path
                                                    d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                            </svg>
                                        </el-button>
                                    </template>
                                    <template #tip>
                                        <div class="el-upload__tip red-text">
                                            限制上传1个文件，上传PDF文件后点击导入按钮
                                        </div>
                                    </template>
                                </el-upload>
                      </el-form-item>
                      <!-- <el-form-item label="仪器授权使用人员一览表"  >
                        <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">选择pdf文件</el-button>
                                    </template>
                        </el-upload> 
                      </el-form-item> -->
                      <el-form-item>
                        <el-button type="primary" @click="addEquip">提交</el-button>
                      </el-form-item>
                    </el-form>
                      <!-- <p><span>项目编号</span></p> 
                      <p><span>仪器设备编号</span></p>
                      <p><span>名称</span></p>
                      <p><span>型号/规格/等级</span></p>
                      <p><span>测量范围</span></p>
                      <p><span>购买年份</span></p>
                      <p><span>溯源方式</span></p>
                      <p><span>有效截止日期至</span></p>
                      <p><span>设备来源</span></p>
                      <p><span>设备计量证书</span></p>
                      <p><span>仪器操作规范</span></p>
                      <p><span>仪器授权使用人员一览表</span></p> -->
                  </div>
                  <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">确认</button> -->
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                  </div>
              </div>
          </div>
      </div>
      <!-- 修改设备模态框 -->
      <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModal"
          aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="projectModalLabel">修改设备</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <el-form :model="equip" label-width="120px">
                      <!-- <el-form-item label="项目编号">
                           <el-input v-model="equip.projectId" placeholder="{{ this.selectedEquip.equipId}}" style="width: 235px"></el-input>
                      </el-form-item> -->
                      <el-form-item label="仪器设备编号">
                           <el-input v-model="equip.equipId" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="名称">
                           <el-input v-model="equip.equipName" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="型号/规格/等级">
                           <el-input v-model="equip.specification" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="测量范围">
                           <el-input v-model="equip.measureRange" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="购买年份">
                           <el-input v-model="equip.purchaseYear" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="溯源方式">
                        <el-select v-model="equip.traceWay" placeholder=" ">
                         <el-option label="检定" value="1" />
                         <el-option label="校准" value="2" />
                         <el-option label="内部校准" value="3" />
                         <el-option label="其他方式" value="4" />
                        </el-select>
                      </el-form-item>
                      <el-form-item label="有效截止日期至">
                           <el-input v-model="equip.validDate" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="设备来源">
                           <el-input v-model="equip.equipmentSource" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
                      <el-form-item label="设备计量证书">
                        <el-upload v-model="equip.validDate" ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">选择pdf文件</el-button>
                                    </template>
                        </el-upload> 
                      </el-form-item>
                      <el-form-item label="仪器操作规范">
                        <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">选择pdf文件</el-button>
                                    </template>
                        </el-upload> 
                      </el-form-item>
                      <el-form-item label="仪器授权使用人员一览表"  >
                        <el-upload ref="upload" class="upload-demo"
                                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                                    :on-exceed="handleExceed" :auto-upload="false">
                                    <template #trigger>
                                        <el-button type="primary">选择pdf文件</el-button>
                                    </template>
                        </el-upload> 
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="addEquip">提交</el-button>
                      </el-form-item>
                    </el-form>
                      <!-- <p><span>项目编号</span></p> 
                      <p><span>仪器设备编号</span></p>
                      <p><span>名称</span></p>
                      <p><span>型号/规格/等级</span></p>
                      <p><span>测量范围</span></p>
                      <p><span>购买年份</span></p>
                      <p><span>溯源方式</span></p>
                      <p><span>有效截止日期至</span></p>
                      <p><span>设备来源</span></p>
                      <p><span>设备计量证书</span></p>
                      <p><span>仪器操作规范</span></p>
                      <p><span>仪器授权使用人员一览表</span></p> -->
                  </div>
                  <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">确认</button> -->
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
 ref,
 reactive,
 } from 'vue'
 import $ from 'jquery'
 import {
    Search,  
 } from '@element-plus/icons-vue'
 export default {
     name: "DeviceManagement",
     components: {
         ContentBase: ContentBase,
     },
     setup() {
      const search = '';
      const equipList=ref([]);
      //显示已有设备
      const loadEquipList=()=>{
        $.ajax({
          url:'http://localhost:8080/equipment/list',
          type:'GET',
          dataType:'json',
          success:(resp)=>{
            if(resp.code===1){
              equipList.value=resp.data;
              console.log('获取数据成功')
            }else{
              console.log('获取数据失败')
            }
          },
          error:(error)=>{
            console.log(error);
          },
        });
      };

      loadEquipList();

      const equip = reactive({
          projectId:0,
          equipId: '', // 设备唯一标识
          equipName: '',
          specification: '',
          measureRange: '',
          purchaseYear: 2023,
          traceWay: '',
          validDate: '',
          equipmentSource: '',
          qualityCertificate:'',//pdf路径
          operationSpecification:'',//pdf路径
          userTable:'',//pdf路径
       });

      return {
          equip,
          equipList,
          loadEquipList,
          search,
          Search,
      };
     },
     data() {
     return {
      selectedEquip:{
          projectId:0,
          equipId: '', // 设备唯一标识
          equipName: '',
          specification: '',
          measureRange: '',
          purchaseYear: 2023,
          traceWay: '',
          validDate: '',
          equipmentSource: '',
          qualityCertificate:'',//pdf路径
          operationSpecification:'',//pdf路径
          userTable:'',//pdf路径
      },
        
     };
   },
   methods: {
    // 新增设备
     addEquip() {
      $.ajax({
      url: 'http://localhost:8080/equipment/addEquip',
      type: 'POST', //提交 DELETE GET ..
      contentType: 'application/json', // 根据需要设置
      data: JSON.stringify({
        "equipId": this.equip.equipId,
    "equipName": this.equip.equipName,
    "specification": this.equip.specification,
    "measureRange": this.equip.measureRange,
    "purchaseYear": this.equip.purchaseYear,
    "traceWay": this.equip.traceWay,
    "validDate":this.equip.validDate,
    " equipmentSource":this.equip. equipmentSource,

          equipmentSource: '',
          qualityCertificate:'',//pdf路径
          operationSpecification:'',//pdf路径
          userTable:'',//pdf路径
      }), // 将 form 数据转换为 JSON 字符串
      success(response) {
        // 处理成功响应
        console.log('Form submitted successfully:', response);
      },
      error(jqXHR, textStatus, errorThrown) {
        // 处理错误响应
        console.error('Error submitting form:', textStatus, errorThrown);
      }
    });
     },
    //删除设备 
    deleteEquip(){
    const equipId=this.selectedEquip.equipId; 
    $.ajax({
      url: 'http://localhost:8080/equipment/deleteEquip/'+equipId,
      type: 'DELETE', //提交 DELETE GET ..
      // contentType: 'application/json', // 根据需要设置
      // data: JSON.stringify(this.equip), 
      success(response) {
        // 处理成功响应
        console.log(response);
        this.loadEquipList();
        alert('设备删除成功');

      },
      error:(error)=>{
        // 处理错误响应
        console.error('设备删除失败', error);
      },
    });
    },
    //编辑设备
    modifyEquip() {
      const editedEquipName=this.selectedEquip.equipName;
      const editedEquip={
        title:editedEquipName,
        //··· ···
      };
      console.log(editedEquip);
      $.ajax({
      url: '/equipment/editEquip',
      type: 'PUT', //提交 DELETE GET ..
      contentType: 'application/json', // 根据需要设置
      data: JSON.stringify(editedEquip), // 将 form 数据转换为 JSON 字符串
      success:(response)=>{
        this.loadEquipList();
        // 处理成功响应
        console.log('修改成功', response);
      },
      error:(error)=>{
        // 处理错误响应
        console.error('设备修改失败', error);
      },
    });
      
     },
   openEquip(equip){
    this.selectedEquip = Object.assign({}, equip);//传入当前设备
    console.log(this.selectedEquip);
   },
   }
 }
 </script>
 