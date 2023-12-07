<template>
 <ContentBase>
  <form> <el-space direction="vertical"><input type="text" v-model="search" placeholder="请输入任务名称" ></el-space>  </form>
    <el-table :data='tableData2' stripe style="width: 100%" height="250" :border='true' :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" >
      <el-table-column fixed:true prop="id" label="序号" width="180" />
      <el-table-column prop="name" label="任务名称" width="280" />
      <el-table-column  label="任务详情" width="280">
        <template #default>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          任务详情
          </button>
          <!-- Modal -->
             <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
               <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                !
                </div>
                <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                 <button type="button" class="btn btn-primary">Save changes</button>
                </div>
               </div>
              </div>
             </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="任务状态" width="180" />
      <el-table-column  label="审核结果" width="280">
        <template #default>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
          审核结果
          </button>
          <!-- Modal -->
             <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
              <div class="modal-dialog">
               <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel2">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                !
                </div>
                <div class="modal-footer">
                 <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                 <button type="button" class="btn btn-primary">Save changes</button>
                </div>
               </div>
              </div>
             </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small">提交</el-button>
        </template>
      </el-table-column>
    </el-table>
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
                   ],
      };
    },
    methods: {
      submitForm() {
        // 提交表单的逻辑
        // 可以在这里处理表单提交的操作
        console.log('Form submitted!');
        //console.log(this.creationMethod);
      }
    }
  }
  </script>
  
  
  <style scoped>
  
  </style>