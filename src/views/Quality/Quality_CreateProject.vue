<template>
  <ContentBase>
    <div class="form-group mb-3">
      <h1 class="mb-4">创建新的检验项目</h1>
    </div>

    <el-form :model="form" label-width="120px">
      <el-form-item label="项目名称">
        <el-input v-model="form.projectName" placeholder="" style="width: 235px"></el-input>
      </el-form-item>
      <el-form-item label="立项依据">
        <el-input v-model="form.projectReason" placeholder="即立项原因，包括社会效益分析、经济效益分析等，50字以内" type="textarea" show-word-limit
          maxlength="50" style="width: 600px" />
      </el-form-item>
      <el-form-item label="指派人员">
        <el-select v-model="form.projectAssignee" placeholder="指定实验科主任">
          <el-option label="张三" value="1" />
          <el-option label="李四" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="申报标准清单">
        <el-button type="primary" @click="dialogTableVisible = true;">选择标准</el-button>
      </el-form-item>
      <el-form-item label="已选标准">
        <div class="mb-3 ms-1" v-if="tagVisible">
          <span class="me-3" v-for="standard in selectedStandards" :key="standard.id">
            <el-tag>
              {{ standard.name }}
            </el-tag>
          </span>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
      </el-form-item>
    </el-form>

  </ContentBase>

  <el-dialog v-model="dialogTableVisible" title="选择标准" width="70%">
    <div class="mb-3">
      <span class="me-3" v-for="standard in selectedStandards" :key="standard.id">
        <el-tag closable @close="removeStandard(standard)">
          {{ standard.name }}
        </el-tag>
      </span>
    </div>
    <div class="form-check">
      <div class="mb-3">
        <el-select v-model="selectedClass" placeholder="请选择大类" @change="filterStandards" class="me-3">
          <el-option v-for="item in classes" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>

        <el-select v-model="selectedSubClass" placeholder="请选择类别" @change="filterStandards">
          <el-option v-for="item in subClasses" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>

      <el-table ref="standardsTable" :data="filteredStandards" style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="标准创建日期" prop="createTime" />
        <el-table-column label="大类名称" prop="className" />
        <el-table-column label="类别名称" prop="subClassName" />
        <el-table-column label="标准名称" prop="name" />
      </el-table>
    </div>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false; tagVisible = true; saveSelectedStandards();">
          保存选择
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import ContentBase from '@/components/ContentBase'
import {
  ref,
  reactive,
} from 'vue'
import $ from 'jquery'

export default {
  name: "QualityCreateProject",
  components: {
    ContentBase: ContentBase,
  },
  setup() {
    const standards = ref([{
      id: 0,
      name: '金属平均晶粒度测定方法',
      principal: '王大锤',
      state: 0, // 未分解参数
      number: "GB/T 6394-2017",
      className: "物理性能通用要求及参数",
      subClassName: "金属材料",
      certificate: {
        name: '',
        url: '',
      },
      restrictRange: "限制范围", //限制范围
      instruction: "", // 补充说明
      params: [

      ],
      createTime: "2021-08-01",
    },
    {
      id: 1,
      name: '金属材料 维氏硬度试验 第一部分：试验方法',
      className: "物理性能通用要求及参数",
      subClassName: "金属材料",
      principal: '王大锤',
      state: 1, // 已分解参数
      number: "GB/T 6394-2017",
      certificate: {
        name: '',
        url: '',
      },
      restrictRange: "限制范围", //限制范围
      instruction: "", // 补充说明
      params: [

      ],
      createTime: "2021-08-01",
    },
    {
      id: 2,
      name: '金属平均晶粒度测定方法',
      className: "物理性能通用要求及参数",
      subClassName: "金属材料",
      principal: '王大锤',
      state: 0, // 未分解参数
      number: "GB/T 6394-2017",
      certificate: {
        name: '',
        url: '',
      },
      restrictRange: "限制范围", //限制范围
      instruction: "", // 补充说明
      params: [

      ],
      createTime: "2021-08-01",
    },
    ]);
    const selectedClass = ref('');
    const selectedSubClass = ref('');
    const filteredStandards = ref(standards.value);
    const selectedStandards = ref([]);
    const standardsTable = ref(null);
    const dialogTableVisible = ref(false);
    const tagVisible = ref(false);

    // 类别数据，可以根据实际情况动态生成
    const classes = ref([{
      value: 'class1',
      label: '物理性能通用要求及参数'
    },
    {
      value: 'class2',
      label: '大类2'
    },
      // ... 更多大类 ...
    ]);
    const subClasses = ref([{
      value: 'subclass1',
      label: '金属材料'
    },
    {
      value: 'subclass2',
      label: '类别2'
    },
      // ... 更多类别 ...
    ]);

    const form = reactive({
      projectName: '',
      projectReason: '',
      projectAssignee: '',
      projectStandards: [],
    });

    // 筛选标准的函数
    function filterStandards() {
      filteredStandards.value = standards.value.filter((standard) => {
        return (selectedClass.value === '' || standard.className === selectedClass.value) &&
          (selectedSubClass.value === '' || standard.subClassName === selectedSubClass.value);
      });
    }

    // 保存选中的标准
    function saveSelectedStandards() {
      form.projectStandards = selectedStandards.value.map(standard => standard.id);
    }

    // 移除选中的标准并更新表格选中状态
    function removeStandard(standardToRemove) {
      selectedStandards.value = selectedStandards.value.filter(standard => standard.id !== standardToRemove.id);

      // 更新表格选中状态
      if (standardsTable.value) {
        standardsTable.value.toggleRowSelection(standardToRemove, false);
      }
    }

    // 处理选中项的变化
    function handleSelectionChange(selection) {
      selectedStandards.value = selection;
    }

    return {
      standards,
      selectedClass,
      selectedSubClass,
      filteredStandards,
      classes,
      subClasses,
      filterStandards,
      saveSelectedStandards,
      removeStandard,
      selectedStandards,
      handleSelectionChange,
      standardsTable,
      dialogTableVisible,
      tagVisible,
      form
    };
  },
  data() {
    return {
      standardList: '', // 标准清单
    };
  },
  methods: {
    submitForm() {
      // 提交表单的逻辑
      console.log(this.form);
      $.ajax({
        url: 'YOUR_BACKEND_ENDPOINT',
        type: 'POST', //提交
        contentType: 'application/json', // 根据需要设置
        data: JSON.stringify(this.form), // 将 form 数据转换为 JSON 字符串
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
    print() {
      console.log(this.selectedStandards);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.updatePagedStandards();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.updatePagedStandards();
    },
    updatePagedStandards() {
      // 根据当前页码和页面大小更新 pagedStandards
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.pagedStandards = this.filteredStandards.slice(start, end);
    },
    watch: {
      filteredStandards(newStandards) {
        this.totalStandards = newStandards.length;
        this.updatePagedStandards();
      }
    },
  }
}
</script>

<style>
.text-border {
  font-weight: border;
  font-size: 20px;
}
</style>
