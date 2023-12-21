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
        <el-select v-model="form.projectAssignee" placeholder="指定实验科主任" filterable>
          <el-option v-for="director in directors" :key="director.id" :label="director.name" :value="director.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="申报标准清单">
        <el-button type="primary" @click="dialogTableVisible = true; this.fetchPagedStandards(1);">选择标准</el-button>
      </el-form-item>
      <el-form-item label="已选标准" v-if="tagVisible">
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
        <el-form-item label="标准大类类别选择">
          <el-cascader v-model="selectedClass" :options="classList" @change="filterStandards" placeholder="选择标准大类类别"
            filterable />
          <el-button type="default" @click="resetSelection" class="ms-2">显示全部</el-button>
        </el-form-item>
      </div>

      <el-table ref="standardsTable" :data="pagedStandards" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="标准创建日期" prop="createTime" />
        <el-table-column label="大类名称" prop="className" />
        <el-table-column label="类别名称" prop="subClassName" />
        <el-table-column label="标准名称" prop="name" />
      </el-table>
      <!-- 分页组件 -->
      <el-pagination background layout="prev, pager, next" :total="totalStandards" :page-size="pageSize"
        @current-change="fetchPagedStandards" class="center-block mt-3" />
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
    const selectedClass = ref([]);
    const filteredStandards = ref(standards.value);
    const selectedStandards = ref([]);
    const standardsTable = ref(null);
    const dialogTableVisible = ref(false);
    const tagVisible = ref(false);
    const handleChange = (selectedClass) => {
      // this.selectedClassName.value = this.selectedClass.
      console.log(selectedClass);
    };


    const form = reactive({
      projectName: '',
      projectReason: '',
      projectAssignee: '',
      projectStandards: [],
    });


    function filterStandards() {
      if (selectedClass.value.length === 2) { // 确保选择了大类和子类
        const [selectedClassName, selectedSubClassName] = selectedClass.value;
        filteredStandards.value = standards.value.filter(standard =>
          standard.className === selectedClassName && standard.subClassName === selectedSubClassName
        );
      } else {
        filteredStandards.value = standards.value; // 显示所有标准
      }
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
      filteredStandards,
      filterStandards,
      saveSelectedStandards,
      removeStandard,
      selectedStandards,
      handleSelectionChange,
      standardsTable,
      dialogTableVisible,
      tagVisible,
      form,
      handleChange,
    };
  },
  data() {
    return {
      currentPage: 1, // 当前页码
      pageSize: 10,   // 每页显示数量
      totalStandards: 0, // 总标准数量
      pagedStandards: [], // 当前页的标准列表
      standardList: '', // 标准清单
      directors: ref([]), // 存储实验科主任列表
      classList: [
        {
          value: '物理性能通用要求及参数',
          label: '物理性能通用要求及参数',
          children: [
            {
              value: '金属材料',
              label: '金属材料',
            },
            {
              value: '类别1-2',
              label: '类别1-2',
            }
          ],
        },
        {
          value: '大类BCD',
          label: '大类BCD',
          children: [
            {
              value: '类别1-1',
              label: '类别1-1',
            },
            {
              value: '类别1-2',
              label: '类别1-2',
            }
          ],
        },
      ],
    };
  },
  methods: {
    resetSelection() {
      this.selectedClass = []; // 清空选择
      this.filterStandards(); // 重新应用筛选以显示所有标准
    },
    submitForm() {
      // 提交表单的逻辑
      console.log(this.form);
      $.ajax({
        url: 'YOUR_BACKEND_ENDPOINT',
        type: 'POST', //提交 DELETE GET ..
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
    fetchPagedStandards(page) {
      this.currentPage = page || this.currentPage;
      // 调用后端 API 获取数据
      console.log("获取第" + page + "页")
      $.ajax({
        url: 'YOUR_BACKEND_ENDPOINT',
        type: 'GET',
        data: {
          page: this.currentPage,
          pageSize: this.pageSize,
          // 可以添加其他筛选参数
        },
        success: (response) => {
          this.pagedStandards = response.standards;
          this.totalStandards = response.total;
        },
        error: (error) => {
          console.error('Error fetching paged standards:', error);
        }
      });
    },

    fetchDirectors() {
      const self = this;
      $.ajax({
        url: 'YOUR_BACKEND_ENDPOINT/directors', // 后端 URL
        method: 'GET',
        success(response) {
          self.directors.value = response.directors; // 假设响应格式为 { directors: [{ label: '张三', value: '1' }, ...] }
        },
        error(jqXHR, textStatus) {
          console.error('Error fetching directors:', textStatus);
        }
      });
    },
    print() {
      console.log(this.selectedStandards);
    },
  }
}
</script>

<style>
.text-border {
  font-weight: border;
  font-size: 20px;
}

.center-block {
  display: flex;
  justify-content: center;
  /* 或者其他固定宽度 */
}
</style>
