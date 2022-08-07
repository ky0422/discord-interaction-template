import colors from 'colors';
colors.enable();

export class Logger<T> {
    constructor(public name: string = 'MAIN') {}

    public log(t: string, o: boolean, ...args: Array<T>) {
        console.log(
            `[${this.name.gray}] [${t}]${o ? ' ' : ''} [${
                new Date().toLocaleTimeString().white
            }]: ${args.join(' ')}`
        );
    }

    public info(...args: Array<T>) {
        this.log('INFO'.green, true, ...args);
    }

    public warn(...args: Array<T>) {
        this.log('WARN'.magenta, true, ...args);
    }

    public error(...args: Array<T>) {
        this.log('ERROR'.red, false, ...args);
    }

    public debug(...args: Array<T>) {
        this.log('DEBUG'.cyan, false, ...args);
    }
}
