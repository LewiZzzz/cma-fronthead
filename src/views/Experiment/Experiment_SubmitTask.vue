<template>
    <ContentBase>
        <el-col :span="9">
                    <el-form-item label="搜索">
                        <el-input v-model="search" class="w-50 me-4" placeholder="请输入任务名称" :prefix-icon="Search">
                        </el-input>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
    </el-col>

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </ContentBase>
</template>
<script>
import ContentBase from '@/components/ContentBase'

export default {
    name: "ExperimentSubmitTask",
    components: {
        ContentBase,
    },
    data() {
        return{
            tableData : [
            {
                date: '2016-05-03',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-02',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-04',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                date: '2016-05-01',
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ]
        }
    }
}

</script>

<style scoped></style>