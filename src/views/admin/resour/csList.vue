<template>
    <div>
        <div class="search-box">
            <el-form label-width="70px" size="small">
                <el-row>
                    <!-- <el-col :span="6">
                        <el-form-item label="甘蔗分类" style="">
                            <el-cascader placeholder="请选择" v-model="searchObj.firstType" :options="categoryOptions"  @change="handleChange"></el-cascader>
                        </el-form-item>
                    </el-col> -->
                    <el-col :span="12">
                        <el-form-item label="甘蔗名称">
                            <el-input v-model="searchObj.keyword" style="width: 95%" placeholder="甘蔗名称" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="success" icon="el-icon-plus" size="mini" @click="add()">添加</el-button>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <div class="table-box">
            <el-table :data="datalist" style="width: 100%">
                <el-table-column prop="caneName" label="甘蔗名称" width="180"></el-table-column>
                <el-table-column prop="resistanceLevel" label="品种抗寒级别">
                    <template slot-scope="scope">
                        <span style="background: #39bda7;color: white;padding: 7px;">{{ scope.row.resistanceLevel }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="resistanceLevel" label="抗旱级别">
                    <template slot-scope="scope">
                        <span style="background: #e9483f;color: white;padding: 7px;">{{ scope.row.resistanceLevelHan }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="resistanceLevel" label="抗黑穗病级别">
                    <template slot-scope="scope">
                        <span style="background: #5d5ce0;color: white;padding: 7px;">{{ scope.row.resistanceLevelHei }}</span>
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
            <label style="width: 8%" for="">甘蔗名称：</label> <el-input v-model="caneObj.caneName" style="width: 60%" placeholder="请输入甘蔗名称" />
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="抗寒属性" name="抗寒属性">
                    <el-form label-width="100px" size="small">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="品种抗寒级别" style="">
                                    <el-input v-model="caneObj.resistanceLevel" style="width: 90%" placeholder="请输入品种抗寒级别" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="毛状体" style="">
                                    <el-input v-model="caneObj.trichome" style="width: 90%" placeholder="请输入毛状体" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="芽型" style="">
                                    <el-input v-model="caneObj.budType" style="width: 90%" placeholder="请输入芽型" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="茎" style="">
                                    <el-input v-model="caneObj.stem" style="width: 90%" placeholder="请输入茎" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="叶鞘" style="">
                                    <el-input v-model="caneObj.leafSheath" style="width: 90%" placeholder="请输入茎" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="表皮细胞" style="">
                                    <el-input v-model="caneObj.epidermalCells" style="width: 90%" placeholder="请输入表皮细胞" />
                                </el-form-item>
                            </el-col>

                            <el-col :span="8">
                                <el-form-item label="楚质层、角质层" style="">
                                    <el-input v-model="caneObj.cuticleStratumCorneum" style="width: 90%" placeholder="请输入楚质层、角质层" />
                                </el-form-item>
                            </el-col>

                            <el-col :span="8">
                                <el-form-item label="硅细胞" style="">
                                    <el-input v-model="caneObj.siliconCell" style="width: 90%" placeholder="请输入硅细胞" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="栓细胞" style="">
                                    <el-input v-model="caneObj.thrombocytes" style="width: 90%" placeholder="请输入栓细胞" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="气孔器" style="">
                                    <el-input v-model="caneObj.stomata" style="width: 90%" placeholder="请输入株高" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="叶绿体" style="">
                                    <el-input v-model="caneObj.chloroplast" style="width: 90%" placeholder="请输入叶绿体" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="线粒体" style="">
                                    <el-input v-model="caneObj.mitochondria" style="width: 90%" placeholder="请输入线粒体" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="抗逆性化学物质" style="">
                                    <el-input v-model="caneObj.stressResistantChemicals" style="width: 90%" placeholder="请输入抗逆性化学物质" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="抗逆性酶" style="">
                                    <el-input v-model="caneObj.stressResistanceEnzyme" style="width: 90%" placeholder="请输入抗逆性酶" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="相关基因" style="">
                                    <el-input v-model="caneObj.relatedGenes"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入相关基因" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="调控方案" style="">
                                    <el-input v-model="caneObj.controlPlan"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入品种特性" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="参考文献" style="">
                                    <el-input v-model="caneObj.caneReferences"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入参考文献" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="抗旱属性" name="抗旱属性">
                    <el-form label-width="100px" size="small">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="品种抗旱级别" style="">
                                    <el-input v-model="caneObj.resistanceLevelHan" style="width: 90%" placeholder="请输入品种抗旱级别" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="毛状体" style="">
                                    <el-input v-model="caneObj.trichomeHan" style="width: 90%" placeholder="请输入毛状体" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="芽型" style="">
                                    <el-input v-model="caneObj.budTypeHan" style="width: 90%" placeholder="请输入芽型" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="茎" style="">
                                    <el-input v-model="caneObj.stemHan" style="width: 90%" placeholder="请输入茎" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="叶鞘" style="">
                                    <el-input v-model="caneObj.leafSheathHan" style="width: 90%" placeholder="请输入茎" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="表皮细胞" style="">
                                    <el-input v-model="caneObj.epidermalCellsHan" style="width: 90%" placeholder="请输入表皮细胞" />
                                </el-form-item>
                            </el-col>

                            <el-col :span="8">
                                <el-form-item label="楚质层、角质层" style="">
                                    <el-input v-model="caneObj.cuticleStratumCorneumHan" style="width: 90%" placeholder="请输入楚质层、角质层" />
                                </el-form-item>
                            </el-col>

                            <el-col :span="8">
                                <el-form-item label="硅细胞" style="">
                                    <el-input v-model="caneObj.siliconCellHan" style="width: 90%" placeholder="请输入硅细胞" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="栓细胞" style="">
                                    <el-input v-model="caneObj.thrombocytesHan" style="width: 90%" placeholder="请输入栓细胞" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="气孔器" style="">
                                    <el-input v-model="caneObj.stomataHan" style="width: 90%" placeholder="请输入株高" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="叶绿体" style="">
                                    <el-input v-model="caneObj.chloroplastHan" style="width: 90%" placeholder="请输入叶绿体" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="线粒体" style="">
                                    <el-input v-model="caneObj.mitochondriaHan" style="width: 90%" placeholder="请输入线粒体" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="抗逆性化学物质" style="">
                                    <el-input v-model="caneObj.stressResistantChemicalsHan" style="width: 90%" placeholder="请输入抗逆性化学物质" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="抗逆性酶" style="">
                                    <el-input v-model="caneObj.stressResistanceEnzymeHan" style="width: 90%" placeholder="请输入抗逆性酶" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="相关基因" style="">
                                    <el-input v-model="caneObj.relatedGenesHan"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入相关基因" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="调控方案" style="">
                                    <el-input v-model="caneObj.controlPlanHan"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入品种特性" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="参考文献" style="">
                                    <el-input v-model="caneObj.caneReferencesHan"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入参考文献" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="抗黑穗病" name="抗黑穗病">
                    <el-form label-width="100px" size="small">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="品种抗旱级别" style="">
                                    <el-input v-model="caneObj.resistanceLevelHei" style="width: 90%" placeholder="请输入品种抗旱级别" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="毛状体" style="">
                                    <el-input v-model="caneObj.trichomeHei" style="width: 90%" placeholder="请输入毛状体" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="芽型" style="">
                                    <el-input v-model="caneObj.budTypeHei" style="width: 90%" placeholder="请输入芽型" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="茎" style="">
                                    <el-input v-model="caneObj.stemHei" style="width: 90%" placeholder="请输入茎" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="叶鞘" style="">
                                    <el-input v-model="caneObj.leafSheathHei" style="width: 90%" placeholder="请输入茎" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="表皮细胞" style="">
                                    <el-input v-model="caneObj.epidermalCellsHei" style="width: 90%" placeholder="请输入表皮细胞" />
                                </el-form-item>
                            </el-col>

                            <el-col :span="8">
                                <el-form-item label="楚质层、角质层" style="">
                                    <el-input v-model="caneObj.cuticleStratumCorneumHei" style="width: 90%" placeholder="请输入楚质层、角质层" />
                                </el-form-item>
                            </el-col>

                            <el-col :span="8">
                                <el-form-item label="硅细胞" style="">
                                    <el-input v-model="caneObj.siliconCellHei" style="width: 90%" placeholder="请输入硅细胞" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="栓细胞" style="">
                                    <el-input v-model="caneObj.thrombocytesHei" style="width: 90%" placeholder="请输入栓细胞" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="气孔器" style="">
                                    <el-input v-model="caneObj.stomataHei" style="width: 90%" placeholder="请输入株高" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="叶绿体" style="">
                                    <el-input v-model="caneObj.chloroplastHei" style="width: 90%" placeholder="请输入叶绿体" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="线粒体" style="">
                                    <el-input v-model="caneObj.mitochondriaHei" style="width: 90%" placeholder="请输入线粒体" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="抗逆性化学物质" style="">
                                    <el-input v-model="caneObj.stressResistantChemicalsHei" style="width: 90%" placeholder="请输入抗逆性化学物质" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="抗逆性酶" style="">
                                    <el-input v-model="caneObj.stressResistanceEnzymeHei" style="width: 90%" placeholder="请输入抗逆性酶" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="相关基因" style="">
                                    <el-input v-model="caneObj.relatedGenesHei"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入相关基因" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="调控方案" style="">
                                    <el-input v-model="caneObj.controlPlanHei"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入品种特性" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="参考文献" style="">
                                    <el-input v-model="caneObj.caneReferencesHei"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入参考文献" />
                                </el-form-item>
                            </el-col>
                        </el-row>

                    </el-form>
                </el-tab-pane>
            </el-tabs>


            <div>
                <el-button type="info" plain @click="dialogVisible = false"> <i class="el-icon-close"></i> 取消</el-button>
                <!-- <el-button type="primary" plain @click="checkCopy"> <i class="el-icon-document-copy"></i> 速填</el-button> -->
                <el-button v-if="dialogtitle === '添加'" type="success" @click="confirmAdd()"> <i class="el-icon-plus"></i> 添加</el-button>
                <el-button v-if="dialogtitle === '修改'" type="primary" @click="confirmUpdate()"> <i class="el-icon-edit"></i> 修改</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import caneSensitivity from '@/api/caneSensitivity'

export default {
    data() {
        return {
            searchObj: {
                keyword: ''
            },
            activeName: '抗寒属性',
            caneObj: {},
            dialogVisible: false,
            datalist: [],
            dialogtitle: '',
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        // 列表
        fetchData(page = 1) {
            this.page = page
            caneSensitivity.getPageList(this.page, this.limit, this.searchObj).then(response => {
                if(response.code === 200) {
                    this.datalist = response.data.data.records
                    this.total = response.data.data.total
                }
            })
        },
        add() {
            this.dialogtitle = '添加'
            this.dialogVisible = true
            this.caneObj = {}
        },
        confirmAdd() {
            caneSensitivity.addCane(this.caneObj).then(res => {
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
            caneSensitivity.updateCane(this.caneObj).then(res => {
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
        edit(id) {
            this.dialogtitle = '修改'
            this.dialogVisible = true
            this.caneObj = {}
            caneSensitivity.getCaneById(id).then(res => {
                if (res.code === 200) {
                    this.caneObj = res.data.data
                }
            })
        },
        removeDataById(id) {
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                caneSensitivity.delCane(id).then(res => {
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