import colors from 'colors'
colors.enable()

export default class Logger<T> {
    constructor(public name: string = 'MAIN') {}

    public log(type: string, o: boolean, ...args: Array<T>) {
        const time = new Date().toLocaleTimeString()
        console.log(`[${this.name.gray}] [${type}]${o ? ' ' : ''} [${time.white}]: ${args.join(' ')}`)
    }

    public info(...args: Array<T>) {
        this.log('INFO'.green, true, ...args)
    }

    public warn(...args: Array<T>) {
        this.log('WARN'.magenta, true, ...args)
    }

    public error(...args: Array<T>) {
        this.log('ERROR'.red, false, ...args)
    }

    public debug(...args: Array<T>) {
        this.log('DEBUG'.cyan, false, ...args)
    }
}
