let arr = [];
let prevTime = 0;
export const op = f => {

    let now = new Date().getTime();
    if (prevTime == 0) {
        arr.push(fun(f.join(',')))
    } else {
        if (now - prevTime < 100) {
            let str = f.join(',')
            arr.push(fun(str));
        } else {
            console.log(arr);
            return Promise.all(arr).then((x) => {
                for (let i = 0; i < x.length; i++) {
                    setTimeout(() => {
                        console.log("done " + x[i])
                    }, 100 * i + 100)
                }
            })
        }
    }
    prevTime = new Date().getTime();
}

export const fun = (args) => {
    console.log(`call f with ${args}`)
    return Promise.resolve(args)
}