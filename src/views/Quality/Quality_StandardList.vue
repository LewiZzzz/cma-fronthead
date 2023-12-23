<template>
    <ContentBase>
        <el-main>
            <el-form :model="form" label-width="auto">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="">
                            <el-cascader v-model="selectedClass" :options="classList" @change="filterStandards"
                                placeholder="选择标准大类类别" filterable style="width: 400px;" />
                            <el-button type="default" @click="resetSelection" class="ms-2">显示全部</el-button>
                        </el-form-item>
                    </el-col>

                    <el-col :span="10">
                        <el-form-item label="">
                            <el-input v-model="search" class="w-50 me-2" placeholder="查询指定标准" :prefix-icon="Search"
                                style="width: 200px;">
                            </el-input>
                            <el-button type="primary">查询</el-button>

                            <el-button class="ms-3" type="primary" data-bs-toggle="modal" data-bs-target="#StandardModal"
                                plain>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-clipboard2-plus-fill me-1" viewBox="0 0 16 16">
                                    <path
                                        d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                                    <path
                                        d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM8.5 6.5V8H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h1.5V6.5a.5.5 0 0 1 1 0Z" />
                                </svg>
                                添加标准
                            </el-button>
                        </el-form-item>
                    </el-col>

                </el-row>

                <el-row>
                    <el-table :data="filteredStandards" style="width: 100%">
                        <el-table-column label="标准创建日期" prop="createTime" />
                        <el-table-column label="标准大类" prop="className" />
                        <el-table-column label="标准类别" prop="subClassName" />
                        <el-table-column label="标准名称" prop="name" />
                        <el-table-column label="标准状态">
                            <template #default="scope">
                                <el-tag v-if="scope.row.state == 0" type="danger"> 未分解参数</el-tag>
                                <el-tag v-if="scope.row.state == 1" type="success"> 已分解参数</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column label="标准创建者" prop="principal" />
                        <el-table-column label="操作">
                            <template #default="scope">
                                <div style="display: flex; flex-direction: column;">
                                    <div>
                                        <el-button v-if="scope.row.state == 0" size="small" type="warning" class="mb-2"
                                            style="width:100%" data-bs-toggle="modal" data-bs-target="#paramModal"
                                            @click="openModal(scope.row)">
                                            分解参数
                                        </el-button>
                                    </div>
                                    <div>
                                        <el-button size="small" type="primary" data-bs-toggle="modal"
                                            data-bs-target="#standardDetailModal" @click="selectStandard(scope.row)"
                                            style="width:100%">
                                            查看详情
                                        </el-button>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-form>
        </el-main>
    </ContentBase>

    <div class="modal fade" id="paramModal" tabindex="-1" aria-labelledby="paramModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">创建标准</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div v-for="(param, index) in addingParams" :key="index">
                        <el-input v-model="param.name" placeholder="请输入参数名称" style="margin-bottom: 10px;">
                        </el-input>
                        <el-checkbox v-model="param.facilityChecked" style="margin-bottom: 20px;">
                            设施要求
                        </el-checkbox>
                        <el-checkbox v-model="param.verificationChecked" style="margin-bottom: 20px;">
                            比对验证要求
                        </el-checkbox>
                        <el-checkbox v-model="param.extraRequired" @change="handleExtraRequiredChange(index)"
                            style="margin-bottom: 10px;">
                            增加额外要求
                        </el-checkbox>
                        <el-select v-if="param.extraRequired" v-model="param.extraCount" placeholder="选择额外要求数量"
                            style="margin-bottom: 10px;">
                            <el-option v-for="n in 8" :key="n" :label="n + '个额外要求'" :value="n">
                            </el-option>
                        </el-select>
                        <div v-for="n in param.extraCount" :key="n">
                            <el-input v-model="param.extras[n - 1].name" placeholder="要求名称" style="margin-bottom: 5px;">
                            </el-input>
                            <el-input v-model="param.extras[n - 1].content" type="textarea" placeholder="要求内容"
                                style="margin-bottom: 10px;">
                            </el-input>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="addParam()">添加参数</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">提交</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>


    <div class="modal fade" id="StandardModal" tabindex="-1" aria-labelledby="StandardModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">创建标准</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <el-upload ref="upload" class="upload-demo"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1"
                        :on-exceed="handleExceed" :on-change="handleFileChange" :auto-upload="false">
                        <template #trigger>
                            <el-button type="primary" plain round style="width: 200px;">上传文件
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-upload ms-2" viewBox="0 0 16 16">
                                    <path
                                        d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                    <path
                                        d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                </svg>
                            </el-button>
                        </template>
                        <el-button class="ms-3" type="success" plain round @click="submitUpload" style="width: 200px;">
                            Excel 导入 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-cloud-arrow-up-fill ms-2" viewBox="0 0 16 16">
                                <path
                                    d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z" />
                            </svg>
                        </el-button>
                        <template #tip>
                            <div class="el-upload__tip red-text">
                                限制上传1个文件，上传Excel文件后点击导入按钮
                            </div>
                        </template>
                    </el-upload>

                    <el-button class="" type="primary" data-bs-toggle="modal" data-bs-target="#createStandardModal" plain
                        @click="resetSelection">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-clipboard2-plus-fill me-1" viewBox="0 0 16 16">
                            <path
                                d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                            <path
                                d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM8.5 6.5V8H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V9H6a.5.5 0 0 1 0-1h1.5V6.5a.5.5 0 0 1 1 0Z" />
                        </svg>
                        手动添加
                    </el-button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="createStandardModal" tabindex="-1" aria-labelledby="createStandardModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">手动创建标准</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <el-switch v-model="categoryType" class="mb-2"
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #0d6efd; active-color: #0d6efd"
                        active-text="参考分类" inactive-text="自定义分类" />
                    <el-form label-width="120px">
                        <el-form-item v-if="categoryType === true" label="标准大类类别" required>
                            <el-cascader v-model="selectedClass" :options="classList" placeholder="选择标准大类类别" filterable />
                        </el-form-item>

                        <el-form-item v-if="categoryType === false" label="自定义大类" required>
                            <el-input v-model="customCategory.class" style="width:200px;" />
                        </el-form-item>

                        <el-form-item v-if="categoryType === false" label="自定义类别 " required>
                            <el-input v-model="customCategory.subclass" style="width:200px;" />
                        </el-form-item>

                        <el-form-item label="标准名称" required>
                            <el-input v-model="addingStandardName" style="width:200px;" />
                        </el-form-item>

                        <el-form-item label="标准编号" required>
                            <el-input v-model="addingStandardNumber" style="width:200px;" />
                        </el-form-item>

                        <el-form-item label="标准文件" required>
                            <el-upload ref="upload" class="upload-demo" action="后端API" :limit="1" :on-exceed="handleExceed"
                                :auto-upload="false">
                                <template #trigger>
                                    <el-button type="danger" plain style="width: 200px;">上传文件
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-upload ms-2" viewBox="0 0 16 16">
                                            <path
                                                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                            <path
                                                d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z" />
                                        </svg>
                                    </el-button>
                                </template>
                                <template #tip>
                                    <div class="el-upload__tip red-text">
                                        限制上传1个文件，上传PDF文件后点击导入按钮
                                    </div>
                                </template>
                            </el-upload>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="standardDetailModal" tabindex="-1" aria-labelledby="createStandardModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">标准详情</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><span>标准名称：</span>{{ this.selectedStandard?.name }}</p>
                    <p><span>标准编号：</span>{{ this.selectedStandard?.number }}</p>
                    <p><span>标准大类：</span>{{ this.selectedStandard?.className }}</p>
                    <p><span>标准类别：</span>{{ this.selectedStandard?.subClassName }}</p>
                    <p><span>标准文件：</span>
                        <el-link type="danger" :href="this.selectedStandard?.certificate?.url">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                            </svg>
                            {{ this.selectedStandard?.certificate?.name }}
                        </el-link>
                    </p>
                    <p><span>限制范围：</span>{{ this.selectedStandard?.restrictRange }}</p>
                    <p><span>补充说明：</span>{{ this.selectedStandard?.instruction }}</p>
                    <p><span>创建时间：</span>{{ this.selectedStandard?.createTime }}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">关闭</button>
                </div>
            </div>
        </div>
    </div>
</template>




<script>
import ContentBase from '@/components/ContentBase'
import $ from 'jquery'
import {
    ref
} from 'vue'
import {
    genFileId
} from 'element-plus'


export default {
    name: "QualityStandardList",
    components: {
        ContentBase,

    },
    setup() {

        const selectedClass = ref([]);

        const handleChange = (selectedClass) => {
            // this.selectedClassName.value = this.selectedClass.
            console.log(selectedClass);
        };

        const standards = ref([{
            id: 0,
            name: '金属平均晶粒度测定方法',
            principal: '王大锤',
            state: 0, // 未分解参数
            number: "GB/T 6394-2017",
            className: "物理性能通用要求及参数",
            subClassName: "金属材料",
            certificate: {
                name: '标准证书',
                url: '标准url',
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
                name: '标准证书',
                url: '标准url',
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

        const filteredStandards = ref(standards.value);

        // 筛选标准的函数
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

        // 标准类型
        var categoryType = ref(1);
        // 标准分类
        const customCategory = ref({
            class: "",
            subclass: "",
        });
        // 添加标准名称
        const addingStandardName = "";
        // 添加标准编号
        const addingStandardNumber = "";

        // 上传文件
        const upload = ref();

        // 文件超出限制时触发的函数
        const handleExceed = (files) => {
            // 清除上传的文件
            upload.value.clearFiles();
            // 获取上传的文件
            const file = files[0];
            // 生成文件ID
            file.uid = genFileId();
            // 开始上传文件
            upload.value.handleStart(file);
        };

        // 文件上传成功后触发的函数
        const submitUpload = () => {
            console.log(upload.value)
        };

        return {
            standards,
            categoryType,
            customCategory,
            handleChange,
            selectedClass,
            filterStandards,
            filteredStandards,
            handleExceed,
            submitUpload,
            upload,
            addingStandardName,
            addingStandardNumber,
        }
    },
    data() {
        return {
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
                            value: '外科金属植入物 表面质量',
                            label: '外科金属植入物 表面质量',
                        },
                        {
                            value: '医用气体和液体用小孔径连接件 胃肠道应用连接件',
                            label: '医用气体和液体用小孔径连接件 胃肠道应用连接件',
                        },
                        {
                            value: '医用气体和液体用小孔径连接件',
                            label: '医用气体和液体用小孔径连接件',
                        },
                        {
                            value: '非血管内导管',
                            label: '非血管内导管',
                        }
                    ],
                },
            ],
            selectedClassName: ref(''),
            selectedSubClassName: ref(''),
            addingClass: null,
            addingSubClass: null,
            addingParams: [
                {
                    name: '',
                    facilityChecked: false,
                    verificationChecked: false,
                    extraRequired: false,
                    extraCount: 0,
                    extras: []
                },
            ],
            selectedStandard: {},
        }
    },
    computed: {
        isSubclassDisabled() {
            return !this.selectedClass;
        },
        isAddingSubClassDisabled() {
            return !this.addingClass;
        }
    },
    methods: {
        resetSelection() {
            this.selectedClass = []; // 清空选择
            this.filterStandards(); // 重新应用筛选以显示所有标准
        },
        updateSubClasses() {
            this.selectedSubclass = null;
            console.log(this.selectedClass);
        },
        updateAddingSubClasses() {
            this.addingSubClass = null;
        },
        fetchClassList() {
            $.ajax({
                url: 'YOUR_BACKEND_ENDPOINT/class-list', // 替换为你的后端接口 URL
                method: 'GET',
                success: (response) => {
                    this.classList.value = response.classList; // 假设响应数据中有一个 classList 字段
                },
                error: (error) => {
                    console.error('Error fetching class list:', error);
                }
            });
        },
        addParam() {
            this.addingParams.push(
                {
                    name: '',
                    facilityChecked: false,
                    verificationChecked: false,
                    extraRequired: false,
                    extraCount: 0,
                    extras: [],
                });
        },
        updateExtras(param) {
            while (param.extras.length < param.extraCount) {
                param.extras.push({ name: '', content: '' });
            }
            while (param.extras.length > param.extraCount) {
                param.extras.pop();
            }
        },
        handleExtraRequiredChange(index) {
            if (!this.addingParams[index].extraRequired) {
                this.addingParams[index].extraCount = 0;
                this.addingParams[index].extras = [];
            }
        },
        submitParams() {
            // 在这里处理参数提交的逻辑
            console.log(this.params);
            this.dialogVisible = false;
        },
        selectStandard(standard) {
            this.selectedStandard = Object.assign({}, standard);
            console.log(this.selectedStandard);
        },
    },
    watch: {
        'addingParams': {
            handler: function (addingParams) {
                addingParams.forEach(param => {
                    if (param.extraRequired) {
                        this.updateExtras(param);
                    }
                });
            },
            deep: true
        }
    }

}
</script>

<style scoped>
.red-text {
    color: red;
}
</style>
