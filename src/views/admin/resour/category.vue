<template>
    <div class="app-container">
        <!--查询表单-->
        <div class="search-div">
            <el-form label-width="70px" size="small">
                <!-- <el-row>
                    <el-col :span="24">
                        <el-form-item label="关键字">
                            <el-input v-model="searchObj.keyword" style="width: 95%" placeholder="关键字"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-row style="display:flex">
                    <!-- <el-button type="primary" icon="el-icon-search" size="mini"  @click="fetchData()">搜索</el-button> -->
                    <el-button type="success" icon="el-icon-plus" size="mini" @click="appendOneLevelType()">添加一级分类</el-button>
                </el-row>
            </el-form>
        </div>

        <!--表格-->
        <el-table  :data="listData"  style="width: 100%;margin-bottom: 20px;"  row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="categoryName" label="分类名称" sortable  width="270"></el-table-column>
            <el-table-column prop="categoryLevel" label="分类级别" sortable  width="180"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button  size="mini" type="success" @click="appendNextType(scope.$index, scope.row)">添加下级分类</el-button>
                    <el-button  size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button v-show="!scope.row.children || scope.row.children.length < 1" size="mini" type="danger" @click="removeType(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>


        <el-dialog title="添加分类"  :visible.sync="addTypeDialogVisible"  width="70%">
            <el-form ref="form" :model="typeObj" label-width="120px">
                <el-form-item v-if="typeObj.parentId > 0" label="父级分类">
                    <el-input disabled v-model="typeObj.parentName"></el-input>
                </el-form-item>
                <el-form-item label="分类名称">
                    <el-input v-model="typeObj.categoryName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addTypeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmAddType()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="修改分类"  :visible.sync="editTypeDialogVisible"  width="70%">
            <el-form ref="form" :model="typeObj" label-width="120px">
                <el-form-item label="分类名称">
                    <el-input v-model="typeObj.categoryName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addTypeDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmUpdateType()">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import categoryApi from '@/api/categoryApi'

export default {
    data() {
        return {
            searchObj: {
                keyword: '',
            },
            listData: [],
            total: 0, // 总记录数
            page: 1, // 当前页
            limit: 9999, // 每页显示记录数
            typeObj: {
                parentId: 0,
                categoryLevel: 1,
                categoryName: '',
                parentName: ''
            },
            addTypeDialogVisible: false,
            editTypeDialogVisible: false
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData(page = 1) {
            this.page = page
            categoryApi.getCategory(this.page, this.limit,this.searchObj).then(res => {
                console.log(res)
                if(res.code === 200) {
                    this.listData = res.data.data.records
                }
            })
        },
        appendOneLevelType() {
            this.typeObj = {
                parentId: 0,
                categoryLevel: 1,
                categoryName: '',
                parentName: ''
            }
            this.addTypeDialogVisible = true
        },
        appendNextType(index,row) {
            this.typeObj = {
                categoryName: '',
                parentName: row.categoryName,
                categoryLevel: row.categoryLevel + 1,
                parentId: row.id
            }
            this.addTypeDialogVisible = true
        },
        handleEdit(index,row) {
            this.typeObj = {
                id: row.id,
                categoryName: row.categoryName,
                categoryLevel: row.categoryLevel,
            }
            this.editTypeDialogVisible = true
        },
        confirmAddType() {
            categoryApi.addCategory(this.typeObj).then(res => {
                if(res.code === 200) {
                    this.$message.success('添加成功')
                    this.addTypeDialogVisible = false
                    this.fetchData()
                }
            })
        },
        confirmUpdateType() {
            categoryApi.updateCategory(this.typeObj).then(res => {
                if(res.code === 200) {
                    this.$message.success('修改成功')
                    this.editTypeDialogVisible = false
                    this.fetchData()
                }
            })
        },
        removeType(row) {
            this.$confirm('此操作将删除该分类, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                categoryApi.removeCategoryById(row.id).then(res => {
                    if(res.code === 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        })
                        this.fetchData()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })      
            })
        }
    }
}
</script>

<style>

</style>