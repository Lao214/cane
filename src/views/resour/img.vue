<template>
    <div style="padding: 1rem;">
        <div class="table-box">
            <el-table :data="datalist" style="width: 100%">
                <el-table-column prop="imgName" label="图片名称" width="180"></el-table-column>
                <el-table-column prop="imgDesc" label="图片描述" width="180"></el-table-column>
                <el-table-column prop="inagePath" label="图片">
                    <template slot-scope="scope">
                        <div style="border: .04rem solid grey;width: 8rem;">
                            <img :src="scope.row.imgPath" style="width: 100%;" alt="">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
            </el-table>

            <!-- 分页组件 -->
            <el-pagination :current-page="page" :total="total" :page-size="limit"
                style="padding: 30px 0; text-align: center;" layout="total, prev, pager, next, jumper"
                @current-change="fetchData" />
        </div>
    </div>
</template>

<script>
import imgApi from '@/api/imgApi';
import minIOApi from '@/api/minIOApi'

export default {
    data() {
        return {
            dialogVisible: false,
            uploadForm: {
                image: null,
                description: '',
                name: ''
            },
            total: 0, // 数据库中的总记录数
            page: 1, // 默认页码
            limit: 10, // 每页记录数
            searchObj: {
                keyword: '',
                categoryId: ''
            }, // 查询表单对象
            fileList: [],
            datalist: null,
        }
    },
    created() { 
        this.fetchData()
    },
    methods: {
        handleFileChange(file, fileList) {
            this.uploadForm.image = file.raw;
            this.fileList = fileList.slice(-1); // 只保留最后一个文件
        },
        beforeUpload(file) {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                this.$message.error('只能上传图片文件');
            }
            return isImage;
        },
        handleExceed() {
            this.$message.warning('只能上传一张图片');
        },
        submitUpload() {
            if (!this.uploadForm.image) {
                this.$message.warning('请先选择图片');
                return;
            }
            // 上传逻辑
            console.log('图片文件:', this.uploadForm.image);
            console.log('图片名称:', this.uploadForm.name);
            console.log('描述:', this.uploadForm.description);

            let formData = new FormData()
            formData.append('file', this.uploadForm.image, `${this.uploadForm.name}`)
            formData.append('imgName', `${this.uploadForm.name}`)
            formData.append('desc', `${this.uploadForm.description}`)
        
            minIOApi.uploadImg(formData).then(response => {
                // this.caneObj.imagePath = response.data
                this.$message({
                    type: 'success',
                    message: '上传成功'
                })
            }).finally(() => {
                this.dialogVisible = false;
                this.uploadForm = { image: null, description: '' };
                this.fileList = [];
            })
        },
        removeDataById(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 使用 split 方法分割字符串并获取最后一部分
                const fileName = row.imgName.split('/').pop()
                minIOApi.delImg(row.id,fileName).then(response => {
                    if(response.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })       
            })
        },
        fetchData(page = 1) {
            this.page = page;
            imgApi.getImgList(this.page, this.limit, this.searchObj).then(response => {
                if(response.code === 200) {
                    this.datalist = response.data.data.records
                    this.total = response.data.data.total
                }
            })
        }
    }
}
</script>

<style scoped>
.search-box {
    background: white;
    width: calc(100% - 40px);
    min-height: 60px;
    margin-bottom: 20px;
    padding: 20px;
}

.upload-demo {
    width: 100%;
}
</style>