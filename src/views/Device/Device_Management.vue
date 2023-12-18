<template>
  <ContentBase>
    <el-table :data='devices' stripe style="width: 100%" height="250" :border='true' :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" >
      <el-table-column fixed:true prop="id" label="仪器设备编号" width="180" />
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="parameter" label="型号/规格/等级" width="180"/>
      <el-table-column prop="range" label="测量范围" width="180"/>
      <el-table-column prop="year" label="购买年份" width="180" />
      <el-table-column prop="trace" label="溯源方式" width="180" />
      <el-table-column prop="expirationdate" label="有效截止日期至" width="180" />
      <el-table-column prop="source" label="设备来源" width="180" />
      <el-table-column fixed="right" label="操作" width="120">
      <template #default>
        <el-button link type="primary" size="small">修改</el-button>
        <el-button link type="primary" size="small">删除</el-button>
      </template>
    </el-table-column>
    </el-table>  
    <el-button link type="primary" size="small" data-bs-toggle="modal" data-bs-target="#addModal" >
                    新增</el-button>
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
                      <el-form-item label="项目编号">
                           <el-input v-model="equip.projectId" placeholder="" style="width: 235px"></el-input>
                      </el-form-item>
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
                           
                      </el-form-item>
                      <el-form-item label="仪器操作规范">
                           
                      </el-form-item>
                      <el-form-item label="仪器授权使用人员一览表"  >
                           
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
// ref,
reactive,
} from 'vue'
 import $ from 'jquery'
 export default {
     name: "DeviceManagement",
     components: {
         ContentBase: ContentBase,
     },
     setup() {
      const equip =reactive({
          projectId:0,
          equipId: '', // 设备唯一标识
          equipName: '',
          specification: '',
          measureRange: '',
          purchaseYear: 2023,
          traceWay: '',
          validDate: '',
          equipmentSource: '',
          qualityCertificate:'',
          operationSpecification:'',
          userTable:'',
       });

      return {
          equip,
      };
     },
     data() {
     return {
      //设备详细信息
      deviceInfor: {
              id: '',
              name: '',
              parameter: '',
              range: '',
              year: 0,
              trace: '',
              expirationdate: '',
              source: '',
          }, 
    
       
     };
   },
   methods: {
    // 新增设备的逻辑
     addEquip() {
      $.ajax({
      url: '/addEquip',
      type: 'POST', //提交 DELETE GET ..
      contentType: 'application/json', // 根据需要设置
      data: JSON.stringify(this.equip), // 将 form 数据转换为 JSON 字符串
      success(response) {
        // 处理成功响应
        console.log('Form submitted successfully:', response);
      },
      error(jqXHR, textStatus, errorThrown) {
        // 处理错误响应
        console.error('Error submitting form:', textStatus, errorThrown);
      }
    });
       
       // 可以在这里处理表单提交的操作
       console.log('Form submitted!');
     },
    

   }
 }
 </script>
 