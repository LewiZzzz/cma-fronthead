<template>
  <ContentBase>
<<<<<<< HEAD
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
 
=======
    <el-table :data='tableData1' stripe style="width: 100%" height="250" :border='true'
      :header-cell-style="{ 'text-align': 'center' }" :cell-style="{ 'text-align': 'center' }">
      <el-table-column fixed:true prop="id" label="序号" width="180" />
      <el-table-column prop="name" label="项目名称" width="180" />
      <el-table-column prop="parameter" label="项目参数" width="180" />
      <el-table-column prop="file" label="任务文件" width="180" />
      <el-table-column prop="staff" label="负责人员" width="180" />
      <el-table-column prop="status" label="状态" width="180" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small">通过</el-button>
          <el-button link type="primary" size="small">不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <div class="example-pagination-block">
        <div class="example-demonstration">When you have more than 7 pages</div>
        <el-pagination layout="prev, pager, next" :total="1000" />
      </div>
    </template>
  </ContentBase>
</template>

 
<script>
import ContentBase from '@/components/ContentBase'
export default {
  name: "ExperimentTaskExamine",
  components: {
    ContentBase: ContentBase,
  },
  data() {
    return {
      tableData1: [{
        id: 1,
        name: 1,
        parameter: 1,
        file: 1,
        staff: 1,
        status: 1
      },
      {
        id: 2,
        name: 2,
        parameter: 2,
        file: 2,
        staff: 2,
        status: 2
      },

      ],
      creationMethod: true, // 用于单选选择从界面输入还是从Excel输入
      categoryType: 'Reference', // 用于选择使用参考分类还是自定义分类
      customCategory: {
        large: '',
        category: ''
      },
      projectName: '', // 项目名称
      justification: '', // 立项依据
      assignee: '', // 指派对象
      standardList: '', // 标准清单
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
>>>>>>> 6fb565095acec037d9128e1d0e3d142441ca3b91
