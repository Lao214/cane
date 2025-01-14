<template>
    <div>
        <div class="search-box">
            <el-form label-width="70px" size="small">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="甘蔗分类" style="">
                            <el-cascader placeholder="请选择" v-model="searchObj.firstType" :options="categoryOptions"  @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="资源名称">
                            <el-input v-model="searchObj.resourName" style="width: 95%" placeholder="资源名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="success" icon="el-icon-plus" size="mini" @click="add()">添加</el-button>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
                    </el-col>
                </el-row>
                <!-- <el-row style="display:flex;justify-content: right;">
                    <el-button type="success" icon="el-icon-plus" size="mini" @click="add()">添加</el-button>
                    <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
                </el-row> -->
            </el-form>
        </div>
        <div class="table-box">
            <el-table :data="datalist" style="width: 100%">
                <el-table-column prop="caneName" label="甘蔗名称" width="180"></el-table-column>
                <el-table-column prop="categoryName" label="甘蔗分类">
                    <template slot-scope="scope">
                        <span style="background: #39bda7;color: white;padding: 7px;">{{ scope.row.firstType }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="caneAlias" label="甘蔗别名">
                    <template slot-scope="scope">
                        <span style="background: #e9d554;color: white;padding: 7px;">{{ scope.row.resourType }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>

                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" title="修改"
                            @click="edit(scope.row.id)" />
                        <el-button type="danger" icon="el-icon-delete" size="mini" title="删除"
                            @click="removeDataById(scope.row.id)" />
                    </template>
                </el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-pagination :current-page="page" :total="total" :page-size="limit"
                style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper"
                @current-change="fetchData" />
        </div>

        <el-dialog title="添加/修改" :visible.sync="dialogVisible" width="87%">

        </el-dialog>
    </div>
</template>

<script>
import categoryApi from '@/api/categoryApi';

export default {
    data() {
        return {
            datalist: [],
            categoryOptions: [],
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
            searchObj: {
                firstType: '',
                resourType: '',
                factory: '',
                unit: ''
            }, // 查询表单对象
            dialogVisible: false,
        }
    },
    mounted() {
        this.getCategoryOptions()
    },
    methods: {
        getCategoryOptions() {
            categoryApi.getCategoryTree({}).then(res => {
                console.log(res)
                if (res.code === 200) {
                    this.categoryOptions = res.data.data
                }
            })
        },
        handleChange(val) {
            console.log(val)
        },
        add() {
            this.dialogVisible = true
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
    min-height: 60;
    margin-bottom: 20px;
    padding: 20px;
}

.table-box {
    padding: 10px;
    background: white;

}
</style>