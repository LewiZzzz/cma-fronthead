<template>
  <ContentBase>
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
