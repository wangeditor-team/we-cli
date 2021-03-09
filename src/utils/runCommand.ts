import execa from 'execa'

export default function runCommand(command: string, args: string[], cwd: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const child = execa(command, args, {
            cwd,
            stdio: ['inherit', 'inherit', 'pipe']
        })

        child.stderr.on('data', buffer => {
            process.stderr.write(buffer)
        })

        child.on('close', code => {
            if (code !== 0) {
                reject(
                    new Error(`command failed: ${command} ${args.join(' ')}`)
                )
            }
            resolve()
        })
    })

}