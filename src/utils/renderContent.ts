import beautify from 'js-beautify'
import fs from 'fs'
import execa from 'execa'
import path from 'path'

/**
 * 
 * @param data 
 * @param source 
 * @param dest 
 */
async function renderContent(source: string, targetDir: string): Promise<void> {
    // 将模板复制到cwd中
    execa.commandSync(`cp -rf ${source} ${targetDir}`)
    const file = `${targetDir}/package.json`
    const readContent = fs.readFileSync(file, 'utf-8')
    const data = JSON.parse(readContent)
    data.name = path.basename(source)
    fs.writeFileSync(file, beautify(JSON.stringify(data)))
}

export { renderContent }