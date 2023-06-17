<template>
  <div>
    <mi-upload
      :action="useOss?ossUploadUrl:minioUploadUrl"
      :data="useOss?dataObj:null"
      list-type="picture"
      :multiple="false" :show-file-list="showFileList"
      :file-list="fileList"
      :before-upload="beforeUpload"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :on-preview="handlePreview"
    >
      <mi-button
        size="small"
        type="primary"
      >
        点击上传
      </mi-button>
    </mi-upload>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  props: {
    data: {
      type: [String,],
      default: ''
    }
  },

  data(){
    const rtn = reactive({
      dataObj: {
        policy: '',
        signature: '',
        key: '',
        ossaccessKeyId: '',
        dir: '',
        host: '',
        // callback:'',
      },
      dialogVisible: false,
      useOss:true, //使用oss->true;使用MinIO->false
      ossUploadUrl:'http://macro-oss.oss-cn-shenzhen.aliyuncs.com',
      minioUploadUrl:'http://localhost:8080/minio/upload',
    })
    return rtn
  },

  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    handleRemove(file, fileList) {
      this.emitInput('');
    },
    handlePreview(file) {
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      let _self = this;
      if(!this.useOss){
        //不使用oss不需要获取策略
        return true;
      }
      return new Promise((resolve, reject) => {
        policy().then(response => {
          _self.dataObj.policy = response.data.policy;
          _self.dataObj.signature = response.data.signature;
          _self.dataObj.ossaccessKeyId = response.data.accessKeyId;
          _self.dataObj.key = response.data.dir + '/${filename}';
          _self.dataObj.dir = response.data.dir;
          _self.dataObj.host = response.data.host;
          // _self.dataObj.callback = response.data.callback;
          resolve(true)
        }).catch(err => {
          console.log(err)
          reject(false)
        })
      })
    },
    handleUploadSuccess(res, file) {
      this.showFileList = true;
      this.fileList.pop();
      let url = this.dataObj.host + '/' + this.dataObj.dir + '/' + file.name;
      if(!this.useOss){
        //不使用oss直接获取图片路径
        url = res.data.url;
      }
      this.fileList.push({name: file.name, url: url});
      this.emitInput(this.fileList[0].url);
    }
  },

  computed: {
    imageUrl() {
      return this.data;
    },
    imageName() {
      if (this.data != null && this.data !== '') {
        return this.data.substr(this.data.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
    fileList() {
      return [{
        name: this.imageName,
        url: this.imageUrl
      }]
    },
    showFileList: {
      get: function () {
        return this.data !== null && this.data !== ''&& this.data!==undefined;
      },
      set: function (newValue) {
      }
    }
  }
}
</script>
