<template>
  <div style="width:100%;">
    <!-- <van-uploader v-model="fileList"
                  multiple /> -->
    <div class="fileUploadBox">
      <div class="imgBox">
        <div class="PictureBox"
             v-for="(item,idx) in !disable ? fileList:filelist"
             :key="idx">
          <img :src="item"
               @click="Preview(item)"
               class="imgSize" />
          <i style="font-size:40px;color:red"
             @click="removeImg(idx)"
             v-if="!disable"
             class="delofImg iconfont icon-pinleishanchu"></i>
        </div>
        <!-- <i style="font-size:110px"
           v-if="!disable"
           @click="popShow = true;"
           class="iconfont icon-tupian"></i> -->
        <div class="PictureBox">
          <img v-if="!disable"
               @click="addImg(1)"
               class="imgSize"
               src="../assets/image/wwg_camera@2x.png" />
        </div>
        <div v-if="disable && filelist.length == 0"
             style="padding-top:15px">
          暂无
        </div>
      </div>
      <input type="file"
             id="file1"
             accept="image/*"
             @change="selectPhoto('file1')"
             class="fileInput" />
      <input type="file"
             class="fileInput"
             id="file2"
             accept="image/*"
             capture="camera"
             name="photo"
             @change="selectPhoto('file2')" />
    </div>
    <van-popup v-model="popShow"
               round
               position="bottom"
               style="height:22vh;">
      <div style="display:flex;padding:35px 20vw; justify-content: space-between;">
        <div v-for="(item,idx) in popStyle"
             :key="idx"
             @click="addImg(idx)">
          <i style="font-size:60px"
             class="iconfont"
             :class="item.icon"></i>
          <div style="text-align: center;font-size:20px;font-weight:bold">
            {{item.name}}
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 
    <input type="file"
           id="photo"
           capture="user"
           accept="image/*"
           name="photo"
           @change="selectPhoto()" /> -->
  </div>
</template>

<script>
import { ImagePreview, Dialog, Notify } from 'vant';
export default {
  data () {
    return {
      popShow: false,
      popStyle: [
        {
          name: '拍照',
          icon: 'icon-shouji'
        },
        {
          name: '相册',
          icon: 'icon-wenjianjia'
        }
      ],
      fileList: [

      ],
      fileArray: [

      ],//装的就是file源文件，用于文件的上传
      fileID: [

      ],//装的是上传后，返回的id
    }
  },
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    filelist: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fileIdlist: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    filelist (e) {
      this.fileList = [...e];
      this.$forceUpdate()
    },
    fileIdlist (e) {
      this.fileID = [...e];
      this.$forceUpdate()
    }
  },
  // mounted () {
  //   this.fileList = this.filelist;
  // },
  methods: {
    selectPhoto (idName) {
      let _this = this;
      let FileArrays = document.getElementById(idName).files;
      // 限制上传数量
      if (this.fileList.length > 6 || (FileArrays.length + this.fileList.length) > 6) {
        Notify({ type: 'danger', message: '超出数量,最多上传6张' });
        return
      }

      this.$fileup({
        files: FileArrays,
        success: (res) => {
          if (res.imgid == null) {
            Notify({ type: 'danger', message: '请重新选择图片' });
          }
          if (res.imgid.length == 1) {
            this.fileID.push(res.imgid);
          } else {
            this.fileID = [...this.fileID, ...res.imgid]
          }
        }
      })
      for (let index = 0; index < FileArrays.length; index++) {
        let file = document.getElementById(idName).files[index];
        let content = null;
        let readfile = new FileReader();

        if (file != undefined) {

          content = readfile.readAsDataURL(file, "UTF-8");

          readfile.onload = function (event) {
            content = event.target.result;
            _this.fileList.push(content);
            _this.fileArray.push(file);
          };

          readfile.onerror = function (event) {
            console.log("err");
          };
        } else {
          console.log("未拍照");
        }
      }
    },

    //转为文件
    base64ToFile (urlData, fileName) {
      let arr = urlData.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bytes = atob(arr[1]);
      let n = bytes.length;
      let ia = new Uint8Array(n);
      while (n--) {
        ia[n] = bytes.charCodeAt(n);
      }
      return new File([ia], fileName, { type: mime });
    },

    addImg (idx) {
      let el;
      if (idx == 0) {
        el = document.getElementById("file2");
      } else {
        el = document.getElementById("file1");
      }
      el.click();
    },

    removeImg (idx) {
      const _that = this;
      Dialog.confirm({
        title: '确认删除',
        width: '250px',
      })
        .then((res) => {
          // 确认调用
          _that.fileList.splice(idx, 1);
          _that.fileArray.splice(idx, 1);
          _that.fileID.splice(idx, 1);
        })
        .catch(() => {
          // on cancel
        });
    },

    sendInfo () {
      this.$emit('getimgUrl', this.fileList)
    },

    sendInfo2 () {
      this.$emit('getimgfile', this.fileArray)
    },

    sendInfo3 () {
      this.$emit('getimgId', this.fileID)
    },
    // 预览图片
    Preview (url) {
      ImagePreview([url]);
    }
  },
}
</script>

<style lang="less" scoped>
.fileUploadBox {
  position: relative;
  .fileInput {
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: -12;
    opacity: 0;
  }
  .imgBox {
    display: flex;
    align-content: center;
    overflow: scroll;
    width: 100%;
    padding: 9px;
    .PictureBox {
      display: flex;
      align-items: center;
      position: relative;
      .imgSize {
        margin-right: 10px;
        @size: 25vw;
        width: @size;
        height: @size;
      }
      .delofImg {
        position: absolute;
        right: 0px;
        top: 0px;
      }
    }
  }
}
</style>