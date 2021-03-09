import inquirer from "inquirer"

const ask = (): inquirer.QuestionCollection => {
    return [
        {
            type: 'list',
            name: 'type',
            message: '开发的类型',
            choices: ["menu", "plugin"]
        },
        {
            type: 'list',
            name: 'tool',
            message: '选择包管理器',
            choices: ["npm", "yarn"]
        }
    ]
}

export default ask
