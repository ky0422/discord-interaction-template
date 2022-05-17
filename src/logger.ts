import colors from 'colors';
colors.enable();

type T = string;

interface LoggerBase {
    name: string;

    log(t: T, ...args: Array<T>): any;
    info(...args: Array<T>): any;
    warn(...args: Array<T>): any;
    error(...args: Array<T>): any;
    debug(...args: Array<T>): any;
    _print(content: string): any;
}

export default class implements LoggerBase {
    public name: string = 'Logger';

    constructor(loggerName: string) {
        this.name = loggerName;
    }

    public log(t: T, o: '' | ' ', ...args: Array<T>) {
        console.log(
            `[${this.name.gray}] [${t}]${o} [${
                new Date().toLocaleTimeString().white
            }]: ${args.join(' ')}`
        );
    }

    public info(...args: Array<T>) {
        this.log('INFO'.green, ' ', ...args);
    }

    public warn(...args: Array<T>) {
        this.log('WARN'.magenta, ' ', ...args);
    }

    public error(...args: Array<T>) {
        this.log('ERROR'.red, '', ...args);
    }

    public debug(...args: Array<T>) {
        this.log('DEBUG'.cyan, '', ...args);
    }

    public _print(content: string) {
        process.stdout.write(content);
    }
}
