<template>
    <div>
        <div class="search-box">
            <el-form label-width="70px" size="small">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="品种名">
                            <el-input v-model="searchObj.keyword" style="width: 95%" placeholder="品种名" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="success" icon="el-icon-plus" size="mini" @click="add()">添加</el-button>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="fetchData()">搜索</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>

        <el-dialog :title="dialogtitle" :visible.sync="dialogVisible" :close-on-click-modal="false" width="87%">
            <el-form label-width="180px" size="small">
                <el-row v-for="(row, rowIndex) in formRows" :key="rowIndex" :gutter="20">
                    <el-col :span="8" v-for="item in row" :key="item.prop">
                        <el-form-item :label="item.label">
                        <el-input
                            v-model="caneObj[item.prop]"
                            :placeholder="'请输入' + item.label"
                            style="width: 90%"
                        />
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
                        <span style="background: #e9483f;color: white;padding: 7px;">{{ scope.row.measurementDate }}</span>
                    </template>
                </el-table-column>

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
import bfApi from '@/api/bfApi'

export default {
    data() {
        return {
            searchObj: {
                keyword: ''
            },
            caneObj: {
                baseName: '', // 基地名称
                varietyName: '', // 品种名
                measurementDate: '', // 测定日期
                yangPlant: '', // 样地
                yangFang: '', // 样方
                zhuGaoNum: '', // 株数编号
                zhuGao: '', // 株高
                zhuGaoAve10: '', // 平均株高（10株）
                stemDiameter: '', // 茎径
                stemDiameterAve10: '', // 平均茎径（10株）
                chui: '', // 锤度
                lai: '', // LAI
                laiAve: '', // LAI平均
                mta: '', // MTA
                mtaAve: '', // MTA平均
                ylshl: '', // 叶绿素含量
                ylshlAve: '', // 平均叶绿素含量
                xianzhong3: '', // 鲜重（三株）
                xianzhongAve: '', // 平均鲜重
                ganzhong3: '', // 干重（三株）
                ganzhongAve: '', // 平均干重
                miaoshu: '', // 苗数
                miaoshuAve: '' // 平均苗数（第2、3、4行）
            },
            formItems: [
                { prop: 'baseName', label: '基地名称' },
                { prop: 'varietyName', label: '品种名' },
                { prop: 'measurementDate', label: '测定日期' },
                { prop: 'yangPlant', label: '样地' },
                { prop: 'yangFang', label: '样方' },
                { prop: 'zhuGaoNum', label: '株数编号' },
                { prop: 'zhuGao', label: '株高' },
                { prop: 'zhuGaoAve10', label: '平均株高（10株）' },
                { prop: 'stemDiameter', label: '茎径' },
                { prop: 'stemDiameterAve10', label: '平均茎径（10株）' },
                { prop: 'chui', label: '锤度' },
                { prop: 'lai', label: 'LAI' },
                { prop: 'laiAve', label: 'LAI平均' },
                { prop: 'mta', label: 'MTA' },
                { prop: 'mtaAve', label: 'MTA平均' },
                { prop: 'ylshl', label: '叶绿素含量' },
                { prop: 'ylshlAve', label: '平均叶绿素含量' },
                { prop: 'xianzhong3', label: '鲜重（三株）' },
                { prop: 'xianzhongAve', label: '平均鲜重' },
                { prop: 'ganzhong3', label: '干重（三株）' },
                { prop: 'ganzhongAve', label: '平均干重' },
                { prop: 'miaoshu', label: '苗数' },
                { prop: 'miaoshuAve', label: '平均苗数（第2、3、4行）' }
            ],
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
    computed: {
        formRows() {
            const rows = [];
            for (let i = 0; i < this.formItems.length; i += 3) {
                rows.push(this.formItems.slice(i, i + 3));
            }
            return rows;
        }
    },
    methods: {
        add() {
            this.dialogtitle = '添加'
            this.dialogVisible = true
            this.caneObj = {}
        },
        confirmAdd() {
            bfApi.addData(this.caneObj).then(res => {
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
            bfApi.updateData(this.caneObj).then(res => {
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
            bfApi.getPageData(this.page, this.limit, this.searchObj).then(response => {
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
            bfApi.getDataById(id).then(res => {
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
                bfApi.delData(id).then(res => {
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