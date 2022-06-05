type R_Optional<T> = {
    [K in keyof T]-?: T[K];
};

export { R_Optional };
