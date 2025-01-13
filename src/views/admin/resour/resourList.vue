<template>
    <div>
        <div class="search-box">
            <el-form label-width="70px" size="small">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="第一类型" style="">
                            <el-select v-model="searchObj.firstType" placeholder="请选择">
                                <el-option v-for="item in firstTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="资源类型">
                            <el-select v-model="searchObj.resourType" placeholder="请选择">
                                <el-option v-for="item in resourTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="资源名称">
                            <el-input v-model="searchObj.resourName" style="width: 95%" placeholder="资源名称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row style="display:flex;justify-content: right;">
                    <el-button type="success" icon="el-icon-plus" size="mini" @click="add()">添加</el-button>
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
                </el-row>
            </el-form>
        </div>
        <div class="table-box">
            <el-table :data="datalist"  style="width: 100%">
                <el-table-column  prop="resourIcon" label="图标"  width="180">
                    <template slot-scope="scope">
                        <img :src="scope.row.resourIcon"  style="width: 24px;height: 24px;"/>
                    </template>
                </el-table-column>
                <el-table-column prop="resourName" label="资源名称" width="180"></el-table-column>
                <el-table-column prop="resourType" label="资源类型">
                    <template slot-scope="scope">
                        <span style="background: #39bda7;color: white;padding: 7px;">{{ scope.row.firstType }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="resourType" label="资源类型">
                    <template slot-scope="scope">
                        <span style="background: #e9d554;color: white;padding: 7px;">{{ scope.row.resourType }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>

                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" title="修改" @click="edit(scope.row.id)" />
                        <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" @click="removeDataById(scope.row.id)" />
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-pagination :current-page="page" :total="total" :page-size="limit" style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper" @current-change="fetchData"/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            datalist: [
                {
                    id: 11,
                    resourIcon: 'http://10.134.149.222:9000/duogongneng/evaluation.png',
                    resourName: '岗位适应性评估',
                    resourType: '工具类',
                    firstType: '选',
                    createTime: '2024-07-10 10:00:10'
                }
            ],
            resourTypeOptions: [
                {
                    label: '工具类',
                    value: '工具类'
                }
            ],
            firstTypeOptions: [
                {
                    label: '选',
                    value: '选'
                },
                {
                    label: '用',
                    value: '用'
                },
                {
                    label: '育',
                    value: '育'
                },
                {
                    label: '留',
                    value: '留'
                },
            ],
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
            searchObj: {
                firstType: '',
                resourType: '',
                factory: '',
                unit: ''
            }, // 查询表单对象
        }
    },
    methods: {
        add() {

        },
        // 列表
        fetchData(page = 1) {
            this.page = page
            userApi.getPageList(this.page, this.limit, this.searchObj).then(response => {
                this.datalist = response.data.data.records
                this.total = response.data.data.total
            })
        },
        edit(id) {

        },
        removeDataById(id) {

        }
    }
}
</script>

<style scoped>
.search-box {
    background: white;
    width: calc(100% - 40px);
    min-height:100px;
    margin-bottom: 20px;
    padding: 20px;
}

.table-box {
    padding: 10px; 
    background: white;

}
</style>