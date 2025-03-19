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
                <el-table-column prop="r" label="甘蔗分类">
                    <template slot-scope="scope">
                        <span style="background: #39bda7;color: white;padding: 7px;">{{ scope.row.categoryName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="caneAlias" label="甘蔗别名">
                    <template slot-scope="scope">
                        <span style="background: #e9d554;color: white;padding: 7px;">{{ scope.row.caneAlias }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="inagePath" label="图片">
                    <template slot-scope="scope">
                        <ImageUpload :initialImageUrl="scope.row.imagePath"  
                        @file-selected="handleFileSelected(scope.row, $event)"
                        @image-removed="handleImageRemoved(scope.row.id)"/>
                    </template>
                </el-table-column> -->
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
                        <el-form-item label="品种抗寒/旱/黑穗病级别" style="">
                            <el-input v-model="caneObj.resistanceLevel" style="width: 90%" placeholder="请输入品种抗寒/旱/黑穗病级别" />
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
                            <el-input v-model="caneObj.references"  type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" maxlength="1000"  show-word-limit style="width: 97%" placeholder="请输入参考文献" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <div>
                    <el-button type="info" plain @click="dialogVisible = false"> <i class="el-icon-close"></i> 取消</el-button>
                    <!-- <el-button type="primary" plain @click="checkCopy"> <i class="el-icon-document-copy"></i> 速填</el-button> -->
                    <el-button v-if="dialogtitle === '添加'" type="success" @click="confirmAdd()"> <i class="el-icon-plus"></i> 添加</el-button>
                    <el-button v-if="dialogtitle === '修改'" type="primary" @click="confirmUpdate()"> <i class="el-icon-edit"></i> 修改</el-button>
                </div>

            </el-form>
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
    }
}
</script>

<style scoped>

</style>