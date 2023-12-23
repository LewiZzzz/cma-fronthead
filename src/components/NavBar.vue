<template>
    <nav class="navbar navbar-expand-lg mb-3" style="background-color: #314AA4; color: white;">
        <div class="container-fluid">
            <a class="navbar-brand ms-2 text-white me-3" href="#">{{ roleNames[role] }}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
                aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse ms-2 " id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item" v-for="(item, index) in getItemsByRole" :key="index">
                        <a class="nav-link me-2 text-white" aria-current="page" :href="item.link"
                            style="padding: 10px 10px; border-radius: 10px">{{ item.name }}</a>
                    </li>
                </ul>
                <span class="navbar-text">
                    <!-- <a class="nav-link me-2 text-white" href="/login"> 登录 </a> -->
                    <el-button type="text" class="text-white" style="margin-left: 16px" @click="drawer = true">
                        个人信息
                    </el-button>
                </span>
            </div>

            <el-drawer v-model="drawer" title="个人信息面板" direction="rtl" :before-close="handleClose">
                <template #header>
                    <h4 class="text-black">个人信息面板</h4>
                </template>
                <div class="text-black">
                    <div class="text-big">
                        <el-descriptions title="您的个人信息" :column="1" size="large">
                            <el-descriptions-item label="姓名" class="mb-2">
                                <template v-if="isEditing">
                                    <el-input v-model="userInfo.name" style="width:400px"></el-input>
                                </template>
                                <template v-else>{{ userInfo.name }}</template>
                            </el-descriptions-item>
                            <el-descriptions-item label="工号" class="mb-2">
                                {{ userInfo.eId }}
                            </el-descriptions-item>
                            <el-descriptions-item label="电话" class="mb-2">
                                <template v-if="isEditing">
                                    <el-input v-model="userInfo.tel" style="width:400px"></el-input>
                                </template>
                                <template v-else>{{ userInfo.tel }}</template>
                            </el-descriptions-item>
                            <el-descriptions-item label="邮箱" class="mb-2">
                                <template v-if="isEditing">
                                    <el-input v-model="userInfo.email" style="width:400px"></el-input>
                                </template>
                                <template v-else>{{ userInfo.email }}</template>
                            </el-descriptions-item>
                            <el-descriptions-item label="简历" class="mb-2">
                                <template v-if="isEditing">
                                    <el-upload ref="upload" class="upload-demo" action="后端API" :limit="1"
                                        :on-exceed="handleExceed" :auto-upload="false">
                                        <template #trigger>
                                            <el-button type="danger" plain style="width: 200px;">上传文件
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                    fill="currentColor" class="bi bi-upload ms-2" viewBox="0 0 16 16">
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
                                </template>
                                <template v-else>
                                    <el-link type="danger" :href="userInfo.resumeURL">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                            class="bi bi-filetype-pdf" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd"
                                                d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM1.6 11.85H0v3.999h.791v-1.342h.803c.287 0 .531-.057.732-.173.203-.117.358-.275.463-.474a1.42 1.42 0 0 0 .161-.677c0-.25-.053-.476-.158-.677a1.176 1.176 0 0 0-.46-.477c-.2-.12-.443-.179-.732-.179Zm.545 1.333a.795.795 0 0 1-.085.38.574.574 0 0 1-.238.241.794.794 0 0 1-.375.082H.788V12.48h.66c.218 0 .389.06.512.181.123.122.185.296.185.522Zm1.217-1.333v3.999h1.46c.401 0 .734-.08.998-.237a1.45 1.45 0 0 0 .595-.689c.13-.3.196-.662.196-1.084 0-.42-.065-.778-.196-1.075a1.426 1.426 0 0 0-.589-.68c-.264-.156-.599-.234-1.005-.234H3.362Zm.791.645h.563c.248 0 .45.05.609.152a.89.89 0 0 1 .354.454c.079.201.118.452.118.753a2.3 2.3 0 0 1-.068.592 1.14 1.14 0 0 1-.196.422.8.8 0 0 1-.334.252 1.298 1.298 0 0 1-.483.082h-.563v-2.707Zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638H7.896Z" />
                                        </svg>
                                        简历文件
                                    </el-link>
                                </template>
                            </el-descriptions-item>
                            <el-descriptions-item label="用户权限等级" class="mb-2">
                                <el-tag size="small" type="danger" effect="dark" v-if="userInfo.role == 0">系统管理员</el-tag>
                                <el-tag size="small" type="primary" effect="dark" v-if="userInfo.role == 1">质量科主任</el-tag>
                                <el-tag size="small" type="warning" effect="dark" v-if="userInfo.role == 2">实验科主任</el-tag>
                                <el-tag size="small" type="success" effect="dark" v-if="userInfo.role == 3">实验科人员</el-tag>
                                <el-tag size="small" type="warning" v-if="userInfo.role == 4">设备科主任</el-tag>
                            </el-descriptions-item>
                        </el-descriptions>
                    </div>
                    <div>
                        <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                            class="demo-ruleForm">
                            <el-form-item label="旧密码" prop="pass">
                                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="新密码" prop="pass">
                                <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPass">
                                <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
                                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <template #footer>
                    <div style="flex: auto">
                        <el-button size="default" style="width: 100%" class="mb-2" round type="danger" v-if="!isEditing">
                            修改密码
                        </el-button>
                        <br>
                        <el-button size="default" style="width: 100%" round :type="isEditing ? 'success' : 'primary'"
                            @click="toggleEdit">
                            {{ isEditing ? '保存' : '编辑' }}
                        </el-button>
                    </div>
                </template>
            </el-drawer>
        </div>
    </nav>
</template>

<script>
import {
    ref
} from 'vue'
import {
    ElMessageBox
} from 'element-plus'

export default {
    props: {
        role: Number,
    },
    setup() {
        const drawer = ref(false);
        const handleClose = (done) => {
            ElMessageBox.confirm('Are you sure you want to close this?')
                .then(() => {
                    done()
                })
                .catch(() => {
                    // catch error
                })
        };
        const userInfo = ref({
            name: 'kooriookami',
            role: 1,
            eId: "123456789",
            tel: "111000000",
            email: "@qq.com",
            resumeURL: "https://kooriookami.github.io/resume.pdf",
        });

        const isEditing = ref(false);

        return {
            drawer,
            handleClose,
            userInfo,
            isEditing,
        }
    },
    data() {
        return {
            roleNames: ['系统管理员', '质量科', '实验科主任', '实验科人员', '设备科', '未登录用户'], // 根据角色对应名称的数组
            navigationItems: [
                [{
                    name: '设备管理',
                    link: '/systemadmin/devicemanagement'
                },
                {
                    name: '项目管理',
                    link: '/project2'
                },
                {
                    name: '标准管理',
                    link: '/project2'
                },
                {
                    name: '用户管理',
                    link: '/project2'
                }
                    // 导航项数组针对角色1
                ],
                [{
                    name: '创建项目',
                    link: '/qualitydepartment/createproject/'
                },
                {
                    name: '查看项目',
                    link: '/qualitydepartment/project/'
                },
                {
                    name: '标准库',
                    link: '/qualitydepartment/standardlist/'
                },
                    // 导航项数组针对角色2
                ],
                [{
                    name: '查看任务',
                    link: '/experiment/querytask/'
                },
                {
                    name: '任务审核',
                    link: '/experiment/taskexamine/'
                },
                {
                    name: '项目分解',
                    link: '/experiment/resolvetask/'
                },
                {
                    name: '创建项目',
                    link: '/qualitydepartment/createproject/'
                },
                {
                    name: '查看项目',
                    link: '/qualitydepartment/project/'
                },
                    // 导航项数组针对角色3
                ],
                [{
                    name: '提交任务',
                    link: '/experiment/submitask/'
                },
                    //导航向数组针对角色4，实验科人员
                ],
                [{
                    name: '设备管理',
                    link: '/device/management'
                },

                ],
                [

                ],
            ],
        };
    },
    computed: {
        getItemsByRole() {
            return this.navigationItems[this.role] || [];
        },
    },
    methods: {
        toggleEdit() {
            this.isEditing = !this.isEditing;
            if (!this.isEditing) {
                // 如果不是编辑模式，则保存信息
                this.saveUserInfo();
            }
        },
        saveUserInfo() {
            // 实现保存逻辑，可能涉及调用 API 更新后端数据
            console.log('保存用户信息', this.userInfo);
        },
        confirmClose(done) {
            // 确认是否关闭编辑器
            this.$confirm('是否保存更改？', '确认', {
                confirmButtonText: '保存',
                cancelButtonText: '不保存',
                type: 'warning'
            }).then(() => {
                this.saveUserInfo();
                done();
            }).catch(() => {
                done();
            });
        }
    },
}
</script>

<style scoped>
.nav-link:focus {
    background-color: #112675;
    font-weight: 500;
}

.text-big {
    font-size: 20px;
}
</style>
