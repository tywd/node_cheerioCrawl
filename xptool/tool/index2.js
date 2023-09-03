const fse = require('fs-extra')
const path = require('path');
const readDirectory = (dir) => {
    const data = []
    // 读取目录下的所有文件和子目录
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
        const newData = statsData.map(e => (
            {
                pay_rule: e.pay_rule,  // 支付规则
                table_order: e.table_order, // 订单object
                money: e.money, // 消费金额
                address: e.address, // 设备名称
                address_name: e.address_name // 设备名称
            }
        ))
        json[e] = newData
    })

    return json
}
let outputIndex = 0
const outputJson = (tempPath, directoryPath) => {
    fse.outputJson(tempPath, readFilesInDirectory(directoryPath)).then(r => {
      console.log('导出json文件', directoryPath.split('/')[1], ++outputIndex)
    }).catch()
}

const outputDirectoryJson = (data) => {
    const outputData = data.map((e) => e.split('sz/')[1])
    const tempPath = path.resolve(__dirname, '../new-data/tool.json')
    fse.outputJson(tempPath, {data: outputData}).then(r => {
        console.log('导出json目录')
    }).catch()
}

const readDirectoryFile = (directoryData) => {
    directoryData.forEach((file, index) => {
        const arr = file.split('/')
        const filePath = arr[arr.length-1]
        const newDataPath = path.resolve(__dirname, '../new-data/' + filePath + '.json')
        outputJson(newDataPath, file)
    })
}

// 指定需要读取的文件夹路径
// 以龙华山咀头店为例
const directoryPath = path.resolve(__dirname, '../sz');
const directoryData = readDirectory(directoryPath)
// console.log('directoryData: ', directoryData);
outputDirectoryJson(directoryData)
readDirectoryFile(directoryData)

// readFilesInDirectory(path.resolve(__dirname, '../sz/5c6b413e-6569-492f-a3ee-4ac56436a4c1_深圳上川店/'))