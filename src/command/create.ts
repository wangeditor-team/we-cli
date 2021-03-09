import getQuestion from '../question'
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


    const question = getQuestion()

    const { type, tool } = await inquirer.prompt(question)
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