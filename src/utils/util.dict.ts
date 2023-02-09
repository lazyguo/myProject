export const dict = (name: string) => {
    let arr: {
        optCode: string,
        optName: string
    }[] = []
    if (name == '等级') {
        arr = [
            {
                optCode: 'oridinary',
                optName: '普通用户'
            },
            {
                optCode: 'admin',
                optName: '管理员'
            },
            {
                optCode: 'super',
                optName: '超管'
            },
        ]
    }
    return arr
}
export const dictTrans = (name: string, curData: any) => {
    let dictArr = dict(name)
    let data:string = ''
    for (let i = 0; i < dictArr.length; i++) {
        if(dictArr[i].optCode == curData) {
            data = dictArr[i].optName
        }
    }
    return data
}