// 读取该目录下面的1文件 里面是一个对象
const fs = require('fs');
const path = require('path');


// 将ImgData转换成对象
fs.readFile('1', (err, data) => {
  if (err) {
      console.error('读取文件出错:', err);
      return;
  }

  // 将文件内容转换为Uint8Array
  const imgData = new Uint8Array(data);
  console.log('imgData:', imgData);
  const dataArray = Object.values(imgData);
  const uint8Array = new Uint8Array(dataArray);
  console.log('uint8Array:', uint8Array);
  fs.writeFileSync('output.jpg', uint8Array);
  // 现在您可以使用 imgData 对象进行操作
  console.log('成功读取文件，数据长度:', imgData.length);
});