<template>
    <div>
        <div class="newl-search">
            <el-form label-width="90px" size="small">
                <el-row>
                    <el-col :span="9">
                        <el-form-item label="标题关键字" style="">
                            <el-input v-model="searchObj.username" style="width: 95%" placeholder="工号" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="9">
                        <el-form-item label="关键字">
                            <el-input v-model="searchObj.nickname" style="width: 95%" placeholder="姓名" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="success" icon="el-icon-plus" size="mini" @click="goAddNews()">添加</el-button>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="newl-table">
            <el-table  :data="datalist"  border  style="width: 100%">
                <el-table-column  prop="newTitle" label="标题"  ></el-table-column>
                <el-table-column  prop="createTime" label="创建时间" width="180"> </el-table-column>
                <el-table-column label="操作" align="center" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" title="修改" @click="edit(scope.row.newKey)" />
                        <el-button type="danger" icon="el-icon-delete" size="mini" title="删除" @click="removeDataById(scope.row.id)" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import newApi from '@/api/newApi'

export default {
    data() {
        return {
            searchObj: {},
            datalist: null,
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        goAddNews() {
            this.$router.push('/admin/new')
        },
        edit(newKey) {
            this.$router.push(
                {
                    path: '/admin/new',
                    query:  { 
                        newKey: newKey
                    }
                }
            )
        },
        // 列表
        fetchData(page = 1) {
            this.page = page
            newApi.getPageList(this.page, this.limit, this.searchObj).then(response => {
                this.datalist = response.data.data.records
                this.total = response.data.data.total
            })
        },
    }
}
</script>

<style scoped>
    .newl-search {
        min-height: 50px;
        padding: 20px;
        background: white;
    }
    .newl-table {
        margin-top: 10px;
        min-height: 350px;
        padding: 20px;
        background: white;
    }
</style>