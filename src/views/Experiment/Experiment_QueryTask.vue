<template>
 <ContentBase>

    <el-col :span="9">
                    <el-form-item label="搜索">
                        <el-input v-model="search" class="w-50 me-4" placeholder="请输入任务名称" :prefix-icon="Search">
                        </el-input>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
    </el-col>
    <el-table :data='tableData2.slice((currentPage-1)*pageSize,currentPage*pageSize)' stripe style="width: 100%" height="250" :border='true' :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}">
      <el-table-column fixed:true prop="id" label="序号" width="180" />
      <el-table-column prop="name" label="任务名称" width="280" />
      <el-table-column  label="任务详情" width="280">
        <template #default>
          <el-button size="small" type="primary"  data-bs-toggle="modal" data-bs-target="#taskModal" @click="openModal(scope.row)">
          任务详情
          </el-button>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="任务状态" width="180" />
      <el-table-column  label="审核结果" width="280">
        <template #default>
          <el-button size="small" type="primary"  data-bs-toggle="modal" data-bs-target="#resultModal" @click="openModal(scope.row)">
            审核结果
          </el-button>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small">提交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination align:center 
       @size-change="handleSizeChange" 
       @current-change="handleCurrentChange"
       :current-page="currentPage" 
       :page-sizes="[1,5,10,20]" 
       :page-size="pageSize" 
       layout="total, sizes, prev, pager, next, jumper" 
       :total="tableData2.length">
    </el-pagination>
    <div class="modal fade" id="taskModal" tabindex="-1" aria-labelledby="taskModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="taskModalLabel">任务详情</h5>
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

  </ContentBase>
</template>
  
  <script>
  import ContentBase from '@/components/ContentBase'
  

  export default {
      name: "ExperimentQueryTask",
      components: {
          ContentBase: ContentBase,
      },
      data() {
      return {
        search:"",
        tableData2:[
                    {id:1,name:1,parameter:1,status:1,result:1},
                    {id:2,name:2,parameter:2,status:2,result:2},
                   ],
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
      submitForm() {
        // 提交表单的逻辑
        // 可以在这里处理表单提交的操作
        console.log('Form submitted!');
        //console.log(this.creationMethod);
      },
      openModal(task) {
            this.selectedProject = Object.assign({}, task);
            console.log(this.selectedProject.param);
        },
        //每页条数改变时触发 选择一页显示多少行
     handleSizeChange(val) {
         console.log(`每页 ${val} 条`);
         this.currentPage = 1;
         this.pageSize = val;
     },
     //当前页改变时触发 跳转其他页
     handleCurrentChange(val) {
         console.log(`当前页: ${val}`);
         this.currentPage = val;
     }
    }
    
  }
  </script>
  
  
  <style scoped>
  
  </style>