<template>
  <ContentBase>
     <div class="form-group mb-3">
      <h1 class="mb-4">创建新的检验项目</h1>
      <label class="text-border mb-2">创建方式</label>
      <br>
      <el-switch
        v-model="creationMethod"
        class="mb-2"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #0d6efd"
        active-text="界面创建"
        inactive-text="Excel导入"
      />
      <!-- 下面的代码使用bootstrap创建，上面使用Element-Plus构建，更加美观，下面预留代码防止不兼容 -->
      <!-- <div class="form-check mb-1">
        <input class="form-check-input mb-1" type="radio" name="creationMethod" id="uiInput" v-model="creationMethod" value="UI">
        <label class="form-check-label" for="uiInput">
          从界面输入
        </label>
      </div>
      <div class="form-check mb-1">
        <input class="form-check-input" type="radio" name="creationMethod" id="excelInput" v-model="creationMethod" value="Excel">
        <label class="form-check-label" for="excelInput">
          从Excel输入
        </label>
      </div> -->
    </div>

    <div v-if="creationMethod === true">
      <div class="form-group mb-3">
        <label class="text-border mb-2">项目分类</label>
        <br>
        <el-switch
        v-model="categoryType"
        class="mb-2"
        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #0d6efd; active-color: #0d6efd"
        active-text="参考分类"
        inactive-text="自定义分类"
      />
        <!-- <div class="form-check">
          <input class="form-check-input" type="radio" name="category" id="referenceCategory" v-model="categoryType" value="Reference">
          <label class="form-check-label" for="referenceCategory">
            使用参考分类
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" name="category" id="customCategory" v-model="categoryType" value="Custom">
          <label class="form-check-label" for="customCategory">
            使用自定义分类
          </label>
        </div> -->
      </div>

      <div v-if="categoryType === true" style="display: flex; flex-wrap: wrap;">
      <div class="form-group mb-3" style="display: flex; align-items: center; margin-right: 20px;">
        <label class="mb-2" style="margin-right: 10px;">参考大类</label>
        <select class="form-select" style="width: 200px;">
          <option value="option1">参考大类选项1</option>
          <option value="option2">参考大类选项2</option>
          <!-- ... -->
        </select>
      </div>
      <div class="form-group mb-3" style="display: flex; align-items: center;">
        <label style="margin-right: 10px;">参考类别</label>
        <select class="form-select" style="width: 200px;">
          <option value="option1">参考类别选项1</option>
          <option value="option2">参考类别选项2</option>
          <!-- ... -->
        </select>
      </div>
    </div>


      <div v-else>
        <div class="form-group mb-3">
          <label class="text-border">自定义大类</label>
          <input type="text" class="form-control" v-model="customCategory.large">
        </div>
        <div class="form-group mb-3">
          <label>自定义类别</label>
          <input type="text" class="form-control" v-model="customCategory.category">
        </div>
      </div>

    <div class="form-group mb-3">
      <label style="text-border mb-2">项目名称</label>
      <input type="text" class="form-control" style="width: 400px;" v-model="projectName">
    </div>

      <div class="form-group mb-3">
        <label>立项依据</label>
        <textarea class="form-control" rows="3" v-model="justification"></textarea>
      </div>
      <div class="form-group mb-3">
        <label>指派对象</label>
        <select class="form-select" v-model="assignee">
          <!-- 下拉框选项 -->
          <option value="option1">指派对象1</option>
          <option value="option2">指派对象2</option>
          <!-- ... -->
        </select>
      </div>
      <div class="form-group mb-3">
        <label>标准清单</label>
        <select class="form-select" v-model="standardList">
          <!-- 下拉框选项 -->
          <option value="option1">标准清单1</option>
          <option value="option2">标准清单2</option>
          <!-- ... -->
        </select>
      </div>
      <button class="btn btn-primary" @click="submitForm">提交</button>
    </div>


    <!-- Excel 输入的内容 -->
    <div v-else>
      <!-- Excel 表格输入内容的代码 -->
      <!-- ... -->
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from '@/components/ContentBase'
export default {
    name: "QualityCreateProject",
    components: {
        ContentBase: ContentBase,
    },
    data() {
    return {
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

<style>
.text-border {
  font-weight: border;
  font-size: 20px;
}

</style>