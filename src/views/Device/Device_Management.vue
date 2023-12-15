<template>
    <ContentBase>
      <el-table :data='tableData' stripe style="width: 100%" height="250" :border='true' :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" >
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
        </template>
      </el-table-column>
      </el-table>
   
    </ContentBase>
  </template>
   <script>
   import ContentBase from '@/components/ContentBase'
   export default {
       name: "DeviceManagement",
       components: {
           ContentBase: ContentBase,
       },
       data() {
       return {
        tableData:[
                      {id:1,name:1,parameter:1,range:1,year:1,trace:1,expirationdate:1,source:1},
                      
        ],
         categoryType: 'Reference', // 用于选择使用参考分类还是自定义分类
         customCategory: {
           large: '',
           category: ''
         },
         projectName: '', // 项目名称
       };
     },
     methods: {
       submitForm() {
         // 提交表单的逻辑
         // 可以在这里处理表单提交的操作
         console.log('Form submitted!');
       }
     }
   }
   </script>
   