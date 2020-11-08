const fs = require('fs')
const path = require('path')

// process.cwd项目的根目录的物理路径
// 我们对fs进行操作，要给他传进去一个物理路径，相对路径是不行的
// console.log(fs.readdirSync(path.join(
//   process.cwd(),
//   'src'
// )))

function getDirFiles(startPath) {
  let result = [];
  function finder(parentPath) {
    let files = fs.readdirSync(parentPath);
    // console.log(files,"---");
    if(!files.length) return;
    files.forEach(function (val, index) {
      let fPath = path.join(parentPath, val);
      // console.log(fPath);
      let stats = fs.statSync(fPath);
      if (stats.isDirectory()) {
        finder(fPath);
      }
      if (stats.isFile()) {
        result.push(fPath);
      }
    })
  }
  finder(path.join(process.cwd(),startPath))
  return result
}

console.log(getDirFiles('src'));