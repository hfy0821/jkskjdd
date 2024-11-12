import {
  upload
} from "../api/a"
import getQuery from './getrbacToken'
// 文件上传
const fileUpload = async ({
  success,
  files
}) => {
  let sendData = new FormData();
  for (let i = 0; i < files.length; i++) {
    // sendData.append("file", files[i]);
    sendData.append("file", files[i], files[i].name);
  }
  sendData.append("rbacToken", localStorage.getItem("rbacToken") || getQuery('rbacToken'));
  let imgid = null;
  await upload(sendData).then((res) => {
    if (res.success == 1) {
      imgid = res.data
    }
  });
  success({
    imgid
  })
}
// 数组转化
const getString = (arrys = [], splicstr) => {
  let end = '';
  arrys.map((itm, idx) => {
    if (idx == arrys.length - 1) {
      end += itm
    } else {
      end += itm + ","
    }
  })
  // let num = end.length - splicstr.length;
  // end = end.substring(0, num)
  return end;
}
// 图片url拼接
const relimgUrl = (imgids, spliceFlag = false) => {
  let array = [];
  let NewArray = [];
  if (spliceFlag) {
    try {
      array = imgids.split(',')
    } catch (error) {
      return []
    }
  } else {
    array = [...imgids];
  }
  // const prefix = `${process.env.baseUrl}rbac/file/download/`;

  array.map((item, idx) => {
    NewArray.push(`${process.env.baseUrl}rbac/file/download/${item}`)
    // return item = `${process.env.baseUrl}rbac/file/download/${item}`
  })
  return NewArray
}
// 时间处理 毫秒转化
const timeDeal = (millisecond) => {
  const date = new Date(millisecond)
  const year = date.getFullYear();
  let mount = date.getMonth() + 1;
  if (mount < 10) {
    mount = '0' + mount
  }
  let day = date.getDate();
  if (day < 10) {
    day = '0' + day
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = '0' + hour
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = '0' + minute
  }
  // const seconds = date.getSeconds();
  return year + "-" + mount + "-" + day + " " + hour + ":" + minute + ":00"
}
// 倒计时
const Countdown = (tiemStrign) => {
  const endTime = new Date(tiemStrign.replace(/-/g, '/'))
  const today = new Date();
  const lefttime = (endTime.getTime() - today.getTime());

  let lefday = Math.floor(lefttime / (1000 * 60 * 60 * 24)) //计算天数
  let lefhour = Math.floor(lefttime / (1000 * 60 * 60) % 24) //计算小时数
  let lefminute = Math.floor(lefttime / (1000 * 60) % 60) //计算分钟数
  let lefsecond = Math.floor(lefttime / 1000 % 60); //计算秒数

  if (lefttime <= 0) {
    return false
  }
  // NaN
  return `${lefday}天${lefhour}时${lefminute}分${lefsecond}秒`;
}
export default {
  fileUpload,
  getString,
  relimgUrl,
  timeDeal,
  Countdown
}