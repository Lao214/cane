<template>
    <div>
        <el-tabs :tab-position="tabPosition" v-model="activeName" style="height: 91vh;">
            <el-tab-pane name="全部" :label="'全部 (' + total + ')'">
                <div class="mes-body">
                    <div style="margin-top: 20px;margin-bottom: 20px; text-align: left;">
                        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
                        <!-- <el-button size="mini" @click="toggleSelection()">取消选择</el-button>s -->
                    </div>
                    <el-table ref="multipleTable" border  :data="tableData"  tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
                        <!-- <el-table-column  type="selection"  width="55"> </el-table-column> -->
                        <el-table-column label="标题">
                            <template slot-scope="scope">【{{ scope.row.contactType }}】{{ scope.row.contactTitle }}</template> 
                        </el-table-column>
                        <el-table-column label="内容">
                            <template slot-scope="scope"><span style="  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ scope.row.contactText }}</span></template> 
                        </el-table-column>
                        <el-table-column prop="createTime" label="时间" width="170" show-overflow-tooltip> </el-table-column>
                        <el-table-column label="状态" width="80">
                            <template slot-scope="scope">
                                <span class="status" :style="{ background: scope.row.isRead === '已读' ? '#67C23A' : '#F56C6C' }">
                                    {{ scope.row.isRead }}
                                </span>
                            </template> 
                        </el-table-column>

                        <el-table-column label="操作" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-view" size="mini" title="查看" @click="view(scope.row)" />
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页组件 -->
                    <el-pagination :current-page="page" :total="total" :page-size="limit" style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper" @current-change="fetchData"/>
                </div>
            </el-tab-pane>
            <el-tab-pane name="未读" :label="'未读 (' + notReadTotal + ')'">
                <div class="mes-body">
                    <div style="margin-top: 20px;margin-bottom: 20px; text-align: left;">
                        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
                        <!-- <el-button size="mini" @click="toggleSelection()">取消选择</el-button>s -->
                    </div>
                    <el-table ref="multipleTable" border  :data="tableData"  tooltip-effect="dark" style="width: 100%"  @selection-change="handleSelectionChange">
                        <!-- <el-table-column  type="selection"  width="55"> </el-table-column> -->
                        <el-table-column label="标题">
                            <template slot-scope="scope">【{{ scope.row.contactType }}】{{ scope.row.contactTitle }}</template> 
                        </el-table-column>
                        <el-table-column label="内容">
                            <template slot-scope="scope"><span style="  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ scope.row.contactText }}</span></template> 
                        </el-table-column>
                        <el-table-column prop="createTime" label="时间" width="170" show-overflow-tooltip> </el-table-column>
                        <el-table-column label="状态" width="80">
                            <template slot-scope="scope">
                                <span class="status" :style="{ background: scope.row.isRead === '已读' ? '#67C23A' : '#F56C6C' }">
                                    {{ scope.row.isRead }}
                                </span>
                            </template> 
                        </el-table-column>

                        <el-table-column label="操作" align="center" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="primary" icon="el-icon-view" size="mini" title="查看" @click="view(scope.row)" />
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页组件 -->
                    <el-pagination :current-page="page" :total="total" :page-size="limit" style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper" @current-change="fetchData"/>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import contactApi from '@/api/contactApi'

export default {
    data() {
        return {
            total: 0, // 数据库中的总记录数
            notReadTotal: 0,
            page: 1, // 默认页码
            limit: 10, // 每页记录数
            searchObj: {}, // 查询表单对象
            tabPosition: 'right',
            tableData: [],
            multipleSelection: [],
            activeName: '全部'
        }
    },
    watch: {
        activeName(newVal, oldVal) {
            if(newVal === '全部') {
                this.searchObj.isRead = ''
                this.fetchData()
            } else if(newVal === '未读') {
                this.searchObj.isRead = '未读'
                this.fetchData()
            }
        }
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row)
            })
            } else {
            this.$refs.multipleTable.clearSelection()
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        // 列表
        fetchData(page = 1) {
            this.page = page
            contactApi.getPageList(this.page, this.limit, this.searchObj).then(response => {
                this.tableData = response.data.data.records
                this.total = response.data.data.total
                this.notReadTotal = response.data.count
            })
        },
        view(row) {
            this.$router.push(
                {
                    path: '/admin/view',
                    query:  { 
                        viewKey: row.id
                    }
                }
            )
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>

<style scoped>
.mes-body {
    background: white;
    width: 97%;
    height: 90vh;
    padding: 20px;
}
.status {
    color: white;
    padding: 10px;
}
</style>