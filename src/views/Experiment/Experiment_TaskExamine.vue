<template>
  <ContentBase>
    <el-table :data='projects' stripe style="width: 100%" height="250" :border='true' :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" >
      <el-table-column fixed:true prop="id" label="序号" width="180" />
      <el-table-column prop="project" label="项目名称" width="280" />
      <el-table-column prop="standard" label="标准名称" width="280" />
      <el-table-column prop="parameter" label="参数" width="280" />
      <el-table-column  label="要求" width="280">
        <template #default>
          <el-button size="small" type="primary"  data-bs-toggle="modal"
                    data-bs-target="#projectModal" @click="openModal(scope.row)">
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
        //设备详细信息
        project: {
                id: '',
                project: '',
                standard: '',
                parameter: '',         
                result: 0,
                state:0,
            }, 
      
         
       };
     },
   methods: {
     submitForm() {
       // 提交表单的逻辑
       // 可以在这里处理表单提交的操作
       console.log('Form submitted!');
       console.log(this.creationMethod);
     }
   }
 }
 </script>
 

  
