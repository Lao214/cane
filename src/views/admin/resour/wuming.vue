<template>
    <div>
        <div class="search-box">
            <el-form label-width="70px" size="small">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="品种名">
                            <el-input v-model="searchObj.varietyName" style="width: 95%" placeholder="品种名" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="success" icon="el-icon-plus" size="mini" @click="add()">添加</el-button>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <el-dialog :title="dialogtitle" :visible.sync="dialogVisible" :close-on-click-modal="false" width="97%">
            <el-form label-width="180px" size="small">
                <el-row v-for="(row, rowIndex) in formRows" :key="rowIndex" :gutter="20">
                    <el-col :span="8" v-for="item in row" :key="item.prop">
                        <el-form-item :label="item.label">
                        <el-input v-model="caneObj[item.prop]" :placeholder="'请输入' + item.label" style="width: 90%" />
                        </el-form-item>
                    </el-col>
                </el-row>


                <div>
                    <el-button type="info" plain @click="dialogVisible = false"> <i class="el-icon-close"></i>
                        取消</el-button>
                    <el-button v-if="dialogtitle === '添加'" type="success" @click="confirmAdd()"> <i
                            class="el-icon-plus"></i> 添加</el-button>
                    <el-button v-if="dialogtitle === '修改'" type="primary" @click="confirmUpdate()"> <i
                            class="el-icon-edit"></i> 修改</el-button>
                </div>

            </el-form>
        </el-dialog>


        <div class="table-box">
            <el-table :data="datalist" style="width: 100%">
                <el-table-column prop="baseName" label="基地名称" width="180"></el-table-column>
                <el-table-column prop="varietyName" label="品种名">
                    <template slot-scope="scope">
                        <span style="background: #39bda7;color: white;padding: 7px;">{{ scope.row.varietyName }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="measurementDate" label="测定日期">
                    <template slot-scope="scope">
                        <span style="background: #e9483f;color: white;padding: 7px;">{{ scope.row.measurementDate
                            }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="samplePlot" label="样地" width="180"></el-table-column>
                <el-table-column prop="sampleFang" label="样方" width="180"></el-table-column>

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

    </div>
</template>

<script>
import wumingApi from '@/api/wumingApi'

export default {
    data() {
        return {
            searchObj: {
                varietyName: ''
            },
            caneObj: {
                baseName: '', varietyName: '', measurementDate: '', samplePlot: '', sampleFang: '',
                waterContentXian10cm: '', waterContentGan10cm: '', waterContentFen10cm: '', waterContentFenAverage10cm: '',
                waterContentGanji10cm: '', waterContentGanjiAverage10cm: '', waterContentXian20cm: '', waterContentGan20cm: '',
                waterContentFen20cm: '', waterContentFenAverage20cm: '', waterContentGanji20cm: '', waterContent10cm: '',
                waterContent20cm: '', gFeso410cm: '', mlFeso410cm: '', gkgFeso410cm: '',
                gFeso420cm: '', mlFeso420cm: '', gkgFeso420cm: '', gK10cm: '', mglK10cm: '',
                mgkgK10cm: '', gK20cm: '', mglK20cm: '', mgkgK20cm: '', gN210cm: '',
                mlv1N210cm: '', mlv2N210cm: '', mlv0N210cm: '', gkgN210cm: '', gN220cm: '',
                mlv1N220cm: '', mlv2N220cm: '', mlv0N220cm: '', gkgN220cm: '', gP10cm: '',
                airP10cm: '', yangP10cm: '', ugmlP10cm: '', mgkgP10cm: '', gP20cm: '',
                airP20cm: '', yangP20cm: '', ugmlP20cm: '', mgkgP20cm: '', averagePlantHeight: '',
                averageStemDiameter: '', totalStemWeight: '', numberEffectiveStems: '', stemFreshWeight: '', stemFreshWeightAve: '',
                gPlant: '', gPlantAve: '', gPlantShao: '', gPlantShaoAve: '', gPlantGanZhong: '',
                gPlantGanZhongAve: '', jingWaterContent: '', jingWaterContentAve: '', yeWaterContent: '', yeWaterContentAve: '',
                bx: '', yxc: '', yxk: '', ymj: '', ymjAve: '', qys: '', qysAve: ''
            },
            formItems: [
                { prop: 'baseName', label: '基地名称' },
                { prop: 'varietyName', label: '品种名' },
                { prop: 'measurementDate', label: '测定日期' },
                { prop: 'samplePlot', label: '样地' },
                { prop: 'sampleFang', label: '样方' },
                { prop: 'waterContentXian10cm', label: '土壤含水量% 鲜重 0-10cm' },
                { prop: 'waterContentGan10cm', label: '土壤含水量% 干重 0-10cm' },
                { prop: 'waterContentFen10cm', label: '土壤含水量分析基% 0-10cm' },
                { prop: 'waterContentFenAverage10cm', label: '土壤平均含水量分析基% 0-10cm' },
                { prop: 'waterContentGanji10cm', label: '土壤含水量干基% 0-10cm' },
                { prop: 'waterContentGanjiAverage10cm', label: '土壤平均含水量干基% 0-10cm' },
                { prop: 'waterContentXian20cm', label: '土壤含水量% 鲜重 10-20cm' },
                { prop: 'waterContentGan20cm', label: '土壤含水量% 干重 10-20cm' },
                { prop: 'waterContentFen20cm', label: '土壤含水量分析基% 10-20cm' },
                { prop: 'waterContentFenAverage20cm', label: '土壤平均含水量分析基% 10-20cm' },
                { prop: 'waterContentGanji20cm', label: '土壤含水量干基% 10-20cm' },
                { prop: 'waterContent10cm', label: '土壤含水量 0-10cm' },
                { prop: 'waterContent20cm', label: '土壤含水量 10-20cm' },
                { prop: 'gFeso410cm', label: 'FeSO4取样重量 0-10cm' },
                { prop: 'mlFeso410cm', label: 'FeSO4滴定体积 0-10cm' },
                { prop: 'gkgFeso410cm', label: 'FeSO4有机质含量 g/kg 0-10cm' },
                { prop: 'gFeso420cm', label: 'FeSO4取样重量 10-20cm' },
                { prop: 'mlFeso420cm', label: 'FeSO4滴定体积 10-20cm' },
                { prop: 'gkgFeso420cm', label: 'FeSO4有机质含量 g/kg 10-20cm' },
                { prop: 'gK10cm', label: '钾取样重量 g 0-10cm' },
                { prop: 'mglK10cm', label: '钾浓度 mg/l 0-10cm' },
                { prop: 'mgkgK10cm', label: '钾含量 mg/kg 0-10cm' },
                { prop: 'gK20cm', label: '钾取样重量 g 10-20cm' },
                { prop: 'mglK20cm', label: '钾浓度 mg/l 10-20cm' },
                { prop: 'mgkgK20cm', label: '钾含量 mg/kg 10-20cm' },
                { prop: 'gN210cm', label: '全氮取样重量 g 0-10cm' },
                { prop: 'mlv1N210cm', label: '全氮滴定体积V1 ml 0-10cm' },
                { prop: 'mlv2N210cm', label: '全氮滴定体积V2 ml 0-10cm' },
                { prop: 'mlv0N210cm', label: '全氮滴定体积V0 ml 0-10cm' },
                { prop: 'gkgN210cm', label: '全氮含量 g/kg 0-10cm' },
                { prop: 'gN220cm', label: '全氮取样重量 g 10-20cm' },
                { prop: 'mlv1N220cm', label: '全氮滴定体积V1 ml 10-20cm' },
                { prop: 'mlv2N220cm', label: '全氮滴定体积V2 ml 10-20cm' },
                { prop: 'mlv0N220cm', label: '全氮滴定体积V0 ml 10-20cm' },
                { prop: 'gkgN220cm', label: '全氮含量 g/kg 10-20cm' },
                { prop: 'gP10cm', label: '磷取样重量 g 0-10cm' },
                { prop: 'airP10cm', label: '磷空白吸光度 0-10cm' },
                { prop: 'yangP10cm', label: '磷样品吸光度 0-10cm' },
                { prop: 'ugmlP10cm', label: '磷浓度 μg/ml 0-10cm' },
                { prop: 'mgkgP10cm', label: '磷含量 mg/kg 0-10cm' },
                { prop: 'gP20cm', label: '磷取样重量 g 10-20cm' },
                { prop: 'airP20cm', label: '磷空白吸光度 10-20cm' },
                { prop: 'yangP20cm', label: '磷样品吸光度 10-20cm' },
                { prop: 'ugmlP20cm', label: '磷浓度 μg/ml 10-20cm' },
                { prop: 'mgkgP20cm', label: '磷含量 mg/kg 10-20cm' },
                { prop: 'averagePlantHeight', label: '平均株高（m）' },
                { prop: 'averageStemDiameter', label: '平均茎径（mm）' },
                { prop: 'totalStemWeight', label: '总茎重（KG）' },
                { prop: 'numberEffectiveStems', label: '有效茎数' },
                { prop: 'stemFreshWeight', label: '茎鲜重（g/plant）' },
                { prop: 'stemFreshWeightAve', label: '平均茎鲜重（g/plant）' },
                { prop: 'gPlant', label: '绿叶片鲜重(g/plant)' },
                { prop: 'gPlantAve', label: '平均绿叶片鲜重(g/plant)' },
                { prop: 'gPlantShao', label: '绿叶鞘鲜重(g/plant)' },
                { prop: 'gPlantShaoAve', label: '平均绿叶鞘鲜重(g/plant)' },
                { prop: 'gPlantGanZhong', label: '茎干重(g/plant)' },
                { prop: 'gPlantGanZhongAve', label: '平均茎干重(g/plant)' },
                { prop: 'jingWaterContent', label: '茎含水量(%)' },
                { prop: 'jingWaterContentAve', label: '平均茎含水量(%)' },
                { prop: 'yeWaterContent', label: '绿叶片含水量(%)' },
                { prop: 'yeWaterContentAve', label: '绿叶叶鞘含水量(%)' },
                { prop: 'bx', label: '平均田间钻汁锤度(゜Bx)' },
                { prop: 'yxc', label: '叶序长（cm）' },
                { prop: 'yxk', label: '叶序宽（cm）' },
                { prop: 'ymj', label: '叶面积(cm2/leaf)' },
                { prop: 'ymjAve', label: '平均叶面积(cm2/leaf)' },
                { prop: 'qys', label: '青叶数' },
                { prop: 'qysAve', label: '平均青叶数' }
            ],
            dialogVisible: false,
            datalist: [],
            dialogtitle: '',
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
        }
    },
    computed: {
        formRows() {
        const rows = [];
        for (let i = 0; i < this.formItems.length; i += 3) {
            rows.push(this.formItems.slice(i, i + 3));
        }
        return rows;
        }
    },
    mounted() {
        this.fetchData()
    },
    methods: {
        add() {
            this.dialogtitle = '添加'
            this.dialogVisible = true
            this.caneObj = {}
        },
        confirmAdd() {
            wumingApi.addData(this.caneObj).then(res => {
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
            wumingApi.updateData(this.caneObj).then(res => {
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
            wumingApi.getPageData(this.page, this.limit, this.searchObj).then(response => {
                if (response.code === 200) {
                    this.datalist = response.data.data.records
                    this.total = response.data.data.total
                }
            })
        },
        edit(id) {
            this.dialogtitle = '修改'
            this.dialogVisible = true
            this.caneObj = {}
            wumingApi.getDataById(id).then(res => {
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
                wumingApi.delData(id).then(res => {
                    if (res.code === 200) {
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