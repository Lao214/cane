<template>
    <div>
        <div class="search-box">
            <el-form label-width="70px" size="small">
                <el-row>
                    <!-- 上传图片按钮 -->
                    <el-button type="primary" @click="dialogVisible = true">上传图片</el-button>
                </el-row>
            </el-form>
        </div>

        <!-- 弹窗对话框 -->
        <el-dialog title="上传图片" :visible.sync="dialogVisible" width="70%">
            <el-form :model="uploadForm" label-width="80px">
                <el-form-item label="图片">
                    <el-upload class="upload-demo" drag action="#" :auto-upload="false" :file-list="fileList"
                        :on-change="handleFileChange" :before-upload="beforeUpload" :limit="1"
                        :on-exceed="handleExceed">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>

                <el-form-item label="名称">
                    <el-input type="text" v-model="uploadForm.name" placeholder="给图片起一个名字"></el-input>
                </el-form-item>

                <el-form-item label="描述">
                    <el-input type="textarea" v-model="uploadForm.description" placeholder="请输入图片描述"></el-input>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitUpload">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
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
            fileList: []
        }
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