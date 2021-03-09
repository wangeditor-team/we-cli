#! /usr/bin/env node
import { Command } from 'commander'
import create from './command/create'
import * as pkg from '../package.json'

const program = new Command()

program
    .version(pkg.version)

program
    .command('create <name>')
    .description('创建一个项目')
    .action((name: string) => {
        create(name)
    })

program.parse(process.argv)