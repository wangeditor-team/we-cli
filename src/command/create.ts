import inquirer from 'inquirer'
import runCommand from '../utils/runCommand'
import { renderContent } from '../utils/renderContent'
import download from '../utils/download'
import ora from 'ora'
import chalk from 'chalk'
import fs from 'fs'
import path from 'path'

async function create(name: string): Promise<void> {
    const cwd = process.cwd()
    const templateRootPath = path.resolve(__dirname, '../../template')
    const targetDir = cwd + `/${name}`
    if (fs.existsSync(targetDir)) {
        const { ok } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'ok',
                message: `${name}目录已存在，是否重新生成`
            }
        ])

        if (ok) {
            fs.rmdirSync(targetDir, {
                recursive: true
            })
        }

    }



    const { type } = await inquirer.prompt({
        type: 'list',
        name: 'type',
        message: '开发的类型',
        choices: ["menu", "plugin"]
    })

    if (type === 'plugin') {
        console.log('敬请期待～')
    }

    const { tool } = await inquirer.prompt({
        type: 'list',
        name: 'tool',
        message: '选择包管理器',
        choices: ["npm", "yarn"]
    })

    const repos = {
        menu: 'wangeditor-team/menu-template'
    }
    const spinner = ora('下载模板中...').start()
    const templatePath = `${templateRootPath}/${type}`
    if (!fs.existsSync(templatePath)) {
        const repo = repos[type]
        await download(repo, templatePath)
    }

    spinner.text = "项目生成中..."
    await renderContent(templatePath, targetDir)
    spinner.stop()

    // auto install

    await runCommand(tool, ['install'], targetDir)

    console.log()
    console.log(chalk.cyan(`${chalk.gray('$')} cd ${name}`))
    console.log(chalk.cyan(`${chalk.gray('$')} ${tool} serve`))
}

export default create