// 读取文件的实现

var fs = require('fs'); // node的核心模块
var path = require('path') //路径模块

// uuid npm 第三方

// fs.readFile('texttd.txt', function (err, data) {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log(data.toString());
// })

function getDirFiles(startPath) {
  let result = [];

  function finder(parentPath) {
    // console.log(path,'--------');
    // 1. 用files来存放从src路径下拿到的文件信息数组
    let files = fs.readdirSync(parentPath);
    // 2. 判断一下数组是否为空，如果是 就结束
    if (!files.length) return;
    // console.log(files);
    // 3. 循环遍历数组中的每一项，对文件名进行操作，索引信息用不上
    files.forEach(function (val, index) {
      // console.log(val, index);
      // 4. 给数组中的每个文件名加上对应的根路径
      let fPath = path.join(parentPath, val)
      // console.log(fPath);
      // 5. 分析拿到的是文件还是文件夹，如果是文件夹就递归调用finder()，直到拿到的都是文件才结束，拿到的文件路径都被push()进result数组
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) {
        finder(fPath);
      }
      if (stats.isFile()) {
        result.push(fPath);
      }
    })
  }
  // 调用finder函数
  finder(
    path.join(process.cwd(), startPath)
  )

  return result;
}

console.log(getDirFiles('src'));