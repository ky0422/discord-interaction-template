import colors from 'colors';
colors.enable();

interface ILoggerBase<T> {
    name: string;

    log(t: string, o: boolean, ...args: Array<T>): any;
    info(...args: Array<T>): any;
    warn(...args: Array<T>): any;
    error(...args: Array<T>): any;
    debug(...args: Array<T>): any;
}

export class Logger<T> implements ILoggerBase<T> {
    public name: string = 'Logger';

    constructor(loggerName: string) {
        this.name = loggerName;
    }

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

export default new Logger<string>('MAIN');
