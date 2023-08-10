const fse = require('fs-extra')
const path = require('path');

const readFilesInDirectory = (dir) => {
    const data = []
    // 读取目录下的所有文件和子目录
    const json = {}
    const files = fse.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = `${dir}/${file}`;
        const stats = fse.statSync(filePath);
        
        if (stats.isFile()) {
        // 处理文件
            const pathNameList = filePath.split('/')
            const name = pathNameList[pathNameList.length - 1]
            data.push(name.replace('.json', ''))
        } 
        // else if (stats.isDirectory()) {
        //   // 递归读取子目录中的文件
        //  console.log('Directory:', filePath);
        //   readFilesInDirectory(filePath);
        // }
    });
    data.forEach((e) => {
        const statsData = fse.readJsonSync(directoryPath + '/' + e + '.json')
        // console.log('statsData', statsData)
        json[e] = statsData
    })
    // console.log('json', json)
    return json
}

const outputJson = (tempPath, directoryPath) => {
    fse.outputJson(tempPath, readFilesInDirectory(directoryPath)).then(r => {
      console.log('r', r)
    }).catch()
}

// 指定需要读取的文件夹路径
// 以龙华山咀头店为例
const directoryPath = path.resolve(__dirname, '../data/f105f21d-2d80-4695-a9e2-490a5e3b069f');
const temporaryPath = path.resolve(__dirname, '../new-data/f105f21d-2d80-4695-a9e2-490a5e3b069f.json');
outputJson(temporaryPath, directoryPath)