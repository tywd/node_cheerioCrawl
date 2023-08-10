const fse = require('fs-extra')
const path = require('path');
const readDirectory = (dir) => {
    const data = []
    // 读取目录下的所有文件和子目录
    const json = {}
    const files = fse.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = `${dir}/${file}`;
        const stats = fse.statSync(filePath);
        
        if (stats.isDirectory()) {
            data.push(filePath)
        }
    });

    return data
}

const readFilesInDirectory = (dir) => {
    const data = []
    // 读取目录下的所有文件和子目录
    const json = {}
    const files = fse.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = `${dir}/${file}`;
        const stats = fse.statSync(filePath);
        
        if (stats.isFile()) {
            const pathNameList = filePath.split('/')
            const name = pathNameList[pathNameList.length - 1]
            data.push(name.replace('.json', ''))
        }
    });

    data.forEach((e) => {
        const statsData = fse.readJsonSync(dir + '/' + e + '.json')
        json[e] = statsData
    })

    return json
}

const outputJson = (tempPath, directoryPath) => {
    fse.outputJson(tempPath, readFilesInDirectory(directoryPath)).then(r => {
      console.log('r', r)
    }).catch()
}

const readDirectoryFile = (directoryData) => {
    directoryData.forEach((file, index) => {
        // console.log('file: ', file);
        const arr = file.split('/')
        const filePath = arr[arr.length-1]
        const newDataPath = path.resolve(__dirname, '../new-data/'+filePath+'.json')
        // if (index !== 0) return
        outputJson(newDataPath, file)
    })
}

// 指定需要读取的文件夹路径
// 以龙华山咀头店为例
const directoryPath = path.resolve(__dirname, '../data');
const directoryData = readDirectory(directoryPath)
console.log('directoryData: ', directoryData);
readDirectoryFile(directoryData)