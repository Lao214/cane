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
                            <el-input v-model="searchObj.keyword" style="width: 95%" placeholder="资源名称" />
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
                        <span style="background: #39bda7;color: white;padding: 7px;">{{ scope.row.categoryName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="caneAlias" label="甘蔗别名">
                    <template slot-scope="scope">
                        <span style="background: #e9d554;color: white;padding: 7px;">{{ scope.row.caneAlias }}</span>
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

        <el-dialog :title="dialogtitle" :visible.sync="dialogVisible" :close-on-click-modal="false" width="87%">
            <el-form label-width="100px" size="small">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="甘蔗名称" style="">
                            <el-input v-model="caneObj.caneName" style="width: 90%" placeholder="请输入甘蔗名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="甘蔗别名" style="">
                            <el-input v-model="caneObj.caneAlias" style="width: 90%" placeholder="请输入甘蔗别名" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="属名" style="">
                            <el-input v-model="caneObj.genericname" style="width: 90%" placeholder="请输入属名" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="亲本信息父" style="">
                            <el-select v-model="caneObj.parentId" style="width: 90%" filterable placeholder="请选择">
                                <el-option  v-for="item in parentOptions" :key="item.value"  :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="亲本信息母" style="">
                            <el-select v-model="caneObj.motherId" style="width: 90%" filterable placeholder="请选择">
                                <el-option  v-for="item in parentOptions" :key="item.value"  :label="item.label" :value="item.value"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="分类" style="">
                            <el-cascader style="width: 90%" placeholder="请选择" v-model="caneObj.categoryChose" :options="categoryOptions"  @change="caneCategoryChange"></el-cascader>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="熟期" style="">
                            <el-input v-model="caneObj.ripePeriod" style="width: 90%" placeholder="请输入熟期" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="株高" style="">
                            <el-input v-model="caneObj.plantHeight" style="width: 90%" placeholder="请输入株高" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="茎径" style="">
                            <el-input v-model="caneObj.stemDiamet" style="width: 90%" placeholder="请输入茎径" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="引进单位" style="">
                            <el-input v-model="caneObj.intorBusiness" style="width: 90%" placeholder="请输入引进单位" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="引进年代" style="">
                            <el-date-picker v-model="caneObj.intorDates" style="width: 90%" type="datetime" format="yyyy 年 MM 月 dd 日 HH时 mm分 ss秒"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择引进年代"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="状态" style="">
                            <el-radio-group v-model="caneObj.status">
                                <el-radio :label="'正常'">正常</el-radio>
                                <el-radio :label="'停用'">停用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="主要种植地区" style="">
                            <el-select v-model="caneObj.cityCodes" style="width: 90%" placeholder="请选择">
                                <el-option v-for="item in options"  :key="item.value" :label="item.label"  :value="item.value"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="品种获取" style="">
                            <el-input v-model="caneObj.germplasm" style="width: 90%" placeholder="请输入品种获取" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="审定编号" style="">
                            <el-input v-model="caneObj.apprcode" style="width: 90%" placeholder="请输入审定编号" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="抗旱属性" style="">
                            <el-input v-model="caneObj.droughtResistance" style="width: 90%" placeholder="请输入抗旱属性" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="抗寒属性" style="">
                            <el-input v-model="caneObj.coldResistance" style="width: 90%" placeholder="请输入抗寒属性" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="抗黑穗病属性" style="">
                            <el-input v-model="caneObj.smutResistance" style="width: 90%" placeholder="请输入抗黑穗病属性" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="8">
                        <el-form-item label="选育单位" style="">
                            <el-input v-model="caneObj.breedUnits" style="width: 90%" placeholder="请输入选育单位" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="选育年代" style="">
                            <el-date-picker v-model="caneObj.breedYear" style="width: 90%" type="datetime" format="yyyy 年 MM 月 dd 日 HH时 mm分 ss秒"  value-format="yyyy-MM-dd HH:mm:ss" placeholder="请选择选育单位"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="描述信息" style="">
                            <el-input v-model="caneObj.description"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入描述信息" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="品种特性" style="">
                            <el-input v-model="caneObj.variFeatures"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入品种特性" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="推荐种植区域和季节" style="">
                            <el-input v-model="caneObj.recommendedPlanting"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入选育单位" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="参考文献" style="">
                            <el-input v-model="caneObj.reference"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入参考文献" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="专家建议" style="">
                            <el-input v-model="caneObj.expertAdvice"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入专家建议" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <div>
                    <el-button type="info" plain @click="dialogVisible = false"> <i class="el-icon-close"></i> 取消</el-button>
                    <el-button v-if="dialogtitle === '添加'" type="success" @click="confirmAdd()"> <i class="el-icon-plus"></i> 添加</el-button>
                    <el-button v-if="dialogtitle === '修改'" type="primary" @click="confirmUpdate()"> <i class="el-icon-edit"></i> 修改</el-button>
                </div>

            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import categoryApi from '@/api/categoryApi'
import caneApi from '@/api/caneApi'

export default {
    data() {
        return {
            datalist: [],
            categoryOptions: [],
            options: [
                {
                    label: '广西壮族自治区',
                    value: '广西壮族自治区'
                }
            ],
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
            searchObj: {
                keyword: '',
                categoryId: ''
            }, // 查询表单对象
            dialogVisible: false,
            dialogtitle: '',
            caneObj: '',
            parentOptions: []
        }
    },
    mounted() {
        this.getCategoryOptions()
        this.fetchData()
        this.getOptions()
    },
    methods: {
        getOptions() {
            caneApi.getOptions().then(res => {
                if (res.code === 200) {
                    this.parentOptions = res.data.data
                    this.parentOptions.unshift({ value: 0, label: '无亲本' })
                }
            })
        },
        getCategoryOptions() {
            categoryApi.getCategoryTree({}).then(res => {
                console.log(res)
                if (res.code === 200) {
                    this.categoryOptions = res.data.data
                    // console.log(this.categoryOptions)
                }
            })
        },
        caneCategoryChange(val) {
            this.caneObj.categoryId = val[val.length-1]
        },
        handleChange(val) {
            this.searchObj.categoryId = val[val.length-1]
        },
        add() {
            this.dialogtitle = '添加'
            this.dialogVisible = true
            this.caneObj = {}
        },
        confirmAdd() {
            caneApi.addCane(this.caneObj).then(res => {
                if(res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    })
                    this.dialogVisible = false
                    this.fetchData()
                }
            })
        },
        confirmUpdate() {
            caneApi.updateCane(this.caneObj).then(res => {
                if(res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    })
                    this.dialogVisible = false
                    this.fetchData()
                }
            })
        },
        // 列表
        fetchData(page = 1) {
            this.page = page
            caneApi.getPageList(this.page, this.limit, this.searchObj).then(response => {
                if(response.code === 200) {
                    this.datalist = response.data.data.records
                    this.total = response.data.data.total
                }
            })
        },
        edit(id) {
            this.dialogtitle = '修改'
            this.dialogVisible = true
            this.caneObj = {}
            caneApi.getCaneById(id).then(res => {
                if (res.code === 200) {
                    this.caneObj = res.data.data;
                    this.caneObj.categoryChose = [];

                    // 检查 categoryOptions 是否为数组
                    if (!Array.isArray(this.categoryOptions) || this.categoryOptions.length === 0) {
                        console.error("categoryOptions 未初始化或为空:", this.categoryOptions);
                        return;
                    }

                    // 检查 categoryId 是否存在
                    if (!this.caneObj.categoryId) {
                        console.error("categoryId 未定义:", this.caneObj.categoryId);
                        return;
                    }

                    // 递归查找函数
                    const findCategory = (categories, targetValue, path = []) => {
                        for (const category of categories) {
                            if (!category) continue; // 避免 category 为空
                            const newPath = [...path, category.value]; // 路径记录 value

                            if (parseInt(category.value) === targetValue) {
                                // 找到目标值
                                this.caneObj.categoryChose = newPath;
                                console.log("找到匹配项，路径为:", newPath);
                                return true;
                            }

                            // 如果存在 children，继续递归
                            if (Array.isArray(category.children) && category.children.length > 0) {
                                const found = findCategory(category.children, targetValue, newPath);
                                if (found) return true; // 找到后停止递归
                            }
                        }
                        return false;
                    };

                    const found = findCategory(this.categoryOptions, this.caneObj.categoryId);

                    if (!found) {
                        console.warn("未找到匹配的 categoryId:", this.caneObj.categoryId);
                    }
                }
            })
        },
        removeDataById(id) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                caneApi.delCane(id).then(res => {
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