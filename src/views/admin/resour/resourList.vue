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
                        <el-button type="success" icon="el-icon-plus" size="mini" @click="addBatch()">批量添加</el-button>
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
                        <el-form-item label="主要种植地区" style="">
                            <el-select v-model="caneObj.cityCodes" style="width: 90%" placeholder="请选择">
                                <el-option v-for="item in options"  :key="item.value" :label="item.label"  :value="item.value"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    
                    <el-col :span="8">
                        <el-form-item label="编号" style="">
                            <el-input v-model="caneObj.apprcode" style="width: 90%" placeholder="请输入编号" />
                        </el-form-item>
                    </el-col>

                    <el-col :span="8">
                        <el-form-item label="注意事项" style="">
                            <el-input v-model="caneObj.remark" style="width: 90%" placeholder="请输入注意事项" />
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
                            <el-date-picker v-model="caneObj.intorDates" style="width: 90%" type="datetime" format="yyyy 年"  value-format="yyyy" placeholder="请选择引进年代"></el-date-picker>
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
                            <el-input v-model="caneObj.recommendedPlanting"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入推荐种植区域和季节" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="栽培技术" style="">
                            <el-input v-model="caneObj.cultivationTechniques"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入栽培技术" />
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
                    <el-button type="primary" plain @click="checkCopy"> <i class="el-icon-document-copy"></i> 速填</el-button>
                    <el-button v-if="dialogtitle === '添加'" type="success" @click="confirmAdd()"> <i class="el-icon-plus"></i> 添加</el-button>
                    <el-button v-if="dialogtitle === '修改'" type="primary" @click="confirmUpdate()"> <i class="el-icon-edit"></i> 修改</el-button>
                </div>

            </el-form>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="dialogBatchVisible"  width="60%" >
            <el-input v-model="textCopy"  type="textarea" :autosize="{ minRows: 5, maxRows: 9 }" maxlength="100000"  show-word-limit style="width: 97%" placeholder="请把品种网站的value复制到此处" />
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogBatchVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCaneConfirm(textCopy)">确 定</el-button>
            </span>
            </el-dialog>
    </div>
</template>

<script>
import categoryApi from '@/api/categoryApi'
import caneApi from '@/api/caneApi'

export default {
    data() {
        return {
            textCopy: '',
            datalist: [],
            categoryOptions: [],
            options: [
                {
                    label: '广西壮族自治区',
                    value: '广西壮族自治区'
                },
                {
                    label: '云南省',
                    value: '云南省'
                },
                {
                    label: '福建省',
                    value: '福建省'
                },
                {
                    label: '广东省',
                    value: '广东省'
                },
                {
                    label: '四川省',
                    value: '四川省'
                },
                {
                    label: '浙江省',
                    value: '浙江省'
                },
                {
                    label: '台湾省',
                    value: '台湾省'
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
            dialogBatchVisible: false,
            dialogtitle: '',
            caneObj: {},
            parentOptions: [],
            batch: [],
            texg: {
            "RowNumber": 0,
            "RegistrationNo": "GPD甘蔗(2019)350023",
            "CropName": "甘蔗",
            "VarietyName": "百年蔗",
            "DJYear": null,
            "SHDW": null,
            "ApplyName": "松溪县农业局",
            "IsTransgenosis": null,
            "VarietySource": "地方品种",
            "VarietyFeature": "糖料。萌芽率为66.7%；分蘖力达350%；宿根性强，亩发株3110～5663株；前中期生长快且整齐、生长势好，植株高大、直立；茎小，茎径1.635厘米，单茎重0.289～0.332千克；亩有效茎数为2687～4688条。",
            "SuitableAreaAndSeason": "适宜在福建南平市松溪县春季种植。",
            "Yield": "第1年新植亩产2500千克，比对照巴西蔗减产16.70%；第1年宿根亩产2500千克，比对照巴西蔗减产16.70%；第2年宿根亩产4000千克，比对照巴西蔗减产11.10%。",
            "Quality": "蔗糖含量当年11～12月8.16%，次年1～3月8.32%。",
            "Resistance": "中抗黑穗病，高抗花叶病，耐冷耐旱不抗倒伏。",
            "Status": null,
            "BreederName": "/",
            "CultureTechnique": "相对于常规糖蔗品种，百年蔗栽培少了整地、选种、种茎处理及播种等环节，栽培技术相对简单。1.清明前后：蔗地破垄松蔸（开蔗泥），用锄头将蔗头周围的土挖开，深达蔗头以下，蔗头形成上大下小的头状物。2.深施肥，一般破畦后10～15天土壤晒白后，即施用一次水粪肥，淋在蔗根部四周，施后再经10～15天才覆土，促进根系往下扎，蔗兜基部芽萌发生长，既有利于以后抗旱，又不使生长部位抬高。3.立夏：补棵、施用低毒农药防治甘蔗蛀螟。2.小芒、夏至：人工除草各一次。4.立秋：蔗蔸培土，下有机肥（亩施250千克农家肥）。5.12月下旬：砍蔗收割，用快锄于土下1.65～3.33厘米处砍断。蔗茬与畦面平，既防止冻头，也防止蔗茎暴露在空中干枯。收割后用蔗叶蔗梢覆盖畦面减轻冻害发生。6.春分前：清理蔗叶，减少病虫害发生。",
            "Attentions": "成熟期易倒伏，注意搭建支架。",
            "IsAnnouncement": null,
            "VarietyHasLincense": null,
            "HasGrant": null,
            "HasPromotion": null,
            "HasFilling": null
            }
        }
    },
    mounted() {
        this.getCategoryOptions()
        this.fetchData()
        this.getOptions()
    },
    methods: {
        checkCopy() {
            this.$prompt('请输入复制好的value值', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                inputErrorMessage: 'value格式不正确'
                }).then(({ value }) => {
                    value = JSON.parse(value)
                    console.log(value)
                    this.caneObj.cultivationTechniques = value.CultureTechnique
                    this.caneObj.remark = value.Attentions
                    this.caneObj.description = value.Resistance
                    this.caneObj.variFeatures = value.VarietyFeature,

                    this.$message({
                        type: 'success',
                        message: '输入成功'
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    })     
            })
        },
        addBatch() {
            this.dialogBatchVisible = true
        },
        addCaneConfirm(text) {
            this.batch = JSON.parse(text)
            const dataList = []
            this.batch.forEach(element => {
                var dataItem = {
                    caneName: element.VarietyName,
                    intorDates: element.DJYear,
                    apprcode: element.RegistrationNo,
                    variFeatures: element.VarietyFeature,
                    recommendedPlanting: element.SuitableAreaAndSeason,
                }
                dataList.push(dataItem)
            })
            caneApi.addCaneBatch(dataList).then(res => {
                if(res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '添加成功'
                    })
                    this.dialogBatchVisible = false
                    this.textCopy = ''
                    this.fetchData()
                }
            })
        },
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