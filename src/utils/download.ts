import download from 'download-git-repo'

export default (repo: string, folderPath: string): Promise<Error> => {
    return new Promise((resolve) => {
        download(repo, folderPath, (err) => {
            resolve(err)
        })
    })
}