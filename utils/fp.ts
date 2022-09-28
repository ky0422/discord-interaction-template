export const also = <T>(action: (x: T) => void) =>
    (x: T) => {
        action(x)
        return x
    }
