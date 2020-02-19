export class GenBase {
    protected readonly _option: { [key: string]: any } = {}
    protected readonly _plugin: { (v: any): any }[] = []
    constructor(option: { [key: string]: any }) {
        this._option = { ...option }
        this._plugin = []
    }

    plugin(...ps: { (v: any): any }[]): this {
        this._plugin.push(...ps)
        return this
    }

    protected genData(): any[] {
        return []
    }
    protected filter(val: any): any {
        return this._plugin.reduce((v, r) => v(r), val)
    }
    output(): any[] {
        const data = this.genData()
        return data.map(it => this.filter(it))
    }
}

export class GenNumberLinear extends GenBase {

    constructor(op: {
        min?: number
        max?: number
        step?: number
        reverse?: number
        offset?: number
        f?: { (x: number, c: number): number }
    } = {}) {
        super(op)
    }

    protected genData(): any {
        const {
            max = 10,
            min = 0,
            step = 1,
            offset = 0,
            f = (x: number) => x,
            reverse = false,
        } = this._option

        const c = (max - min) / step >> 0
        const o = offset * step

        const arr = []
        for(let x = 0; x < c; x += step) {
            arr.push(min + f(x + o, c))
        }
        if(reverse) {
            arr.reverse()
        }
        return arr
    }
}

const gen = new GenNumberLinear({
    step: 0.5,
    offset: 1,
    f: (x: number, c: number) => Math.sin((x * 2 / c) * Math.PI * 2)
})
console.log(gen.output())