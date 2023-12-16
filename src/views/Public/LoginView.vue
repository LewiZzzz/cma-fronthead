<template>
    <div class="center-container">
        <el-card class="box-card" shadow="always">
            <template #header>
                <div class="card-header">
                    <h3>登录</h3>
                </div>
            </template>
            <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="0px">
                <el-form-item prop="employeeId" size="large">
                    <el-input v-model.number="ruleForm.employeeId" placeholder="请输入工号ID" />
                </el-form-item>
                <el-form-item prop="password" size="large">
                    <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="请输入密码" />
                </el-form-item>
                <el-form-item>
                    <el-popover placement="bottom" :width="200" trigger="hover" content="请联系系统管理员重置密码">
                        <template #reference>
                            <el-button text type="info" style="margin-left: -10px;">忘记密码</el-button>
                        </template>
                    </el-popover>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(ruleFormRef)" round style="width: 100%">
                        登录
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="resetForm(ruleFormRef)" round style="width: 100%">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {
    reactive,
    ref
} from 'vue';

export default {
    name: 'LoginView',
    components: {},
    setup() {
        const ruleFormRef = ref();

        const checkEmployeeId = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入工号'));
            } else {
                callback();
            }
        };

        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (ruleForm.checkPass !== '') {
                    if (!ruleFormRef.value) return;
                    ruleFormRef.value.validateField('checkPass', () => null);
                }
                callback();
            }
        };

        const ruleForm = reactive({
            employeeId: '',
            password: '',
        });

        const rules = reactive({
            password: [{
                validator: validatePass,
                trigger: 'blur'
            }],
            employeeId: [{
                validator: checkEmployeeId,
                trigger: 'blur'
            }],
        });

        const submitForm = (formEl) => {
            if (!formEl) return;
            formEl.validate((valid) => {
                if (valid) {
                    console.log('submit!');
                } else {
                    console.log('error submit!');
                    return false;
                }
            });
        };

        const resetForm = (formEl) => {
            if (!formEl) return;
            formEl.resetFields();
        };

        const activeNames = ref(['1']);

        const handleChange = (val) => {
            console.log(val);
        };


        return {
            ruleForm,
            rules,
            submitForm,
            resetForm,
            ruleFormRef,
            validatePass,
            activeNames,
            handleChange
        };
    },

}
</script>

<style>
.center-container {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中 */
    height: 80vh;
    /* 容器高度设为视口高度 */
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.box-card {
    width: 480px;
}
</style>
