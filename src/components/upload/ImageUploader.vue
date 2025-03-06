<template>
    <div class="image-upload">
        <!-- 显示图片预览 -->
        <div v-if="imageUrl" class="image-preview">
            <img :src="imageUrl" alt="Preview" />
            <button @click="removeImage" class="remove-button">移除</button>
        </div>

        <!-- 上传按钮 -->
        <div v-else>
            <input type="file" accept="image/*" @change="handleFileChange" ref="fileInput" style="display: none;" />
            <button @click="triggerFileInput" class="upload-button">选择图片</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ImageUpload',
    props: {
        // 支持传入初始图片 URL
        initialImageUrl: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            imageUrl: this.initialImageUrl || null, // 初始化时使用传入的图片 URL
            selectedFile: null,
        };
    },
    watch: {
        // 监听传入的 initialImageUrl，如果变化则更新 imageUrl
        initialImageUrl(newUrl) {
            this.imageUrl = newUrl;
        },
    },
    methods: {
        // 触发文件选择
        triggerFileInput() {
            this.$refs.fileInput.click();
        },
        // 处理文件选择
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
            this.selectedFile = file;
            this.imageUrl = URL.createObjectURL(file);
            this.$emit('file-selected', file); // 传递文件对象
            } else {
                alert('请选择一个有效的图片文件');
            }
        },
        removeImage() {
            this.imageUrl = null;
            this.selectedFile = null;
            this.$emit('image-removed'); // 触发移除事件
        },
    },
};
</script>

<style scoped>
.image-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-preview {
    position: relative;
    margin-top: 10px;
}

.image-preview img {
    max-width: 100%;
    max-height: 200px;
    border-radius: 5px;
}

.remove-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: rgba(255, 0, 0, 0.7);
    color: white;
    border: none;
    padding: .1rem .2rem;
    border-radius: 5px;
    cursor: pointer;
}

.remove-button:hover {
    background-color: rgba(255, 0, 0, 0.9);
}

.upload-button {
    background-color: #42b983;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.upload-button:hover {
    background-color: #3aa876;
}
</style>