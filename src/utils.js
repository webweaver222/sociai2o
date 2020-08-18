const compose = (...funcs) => (comp) => {
    return funcs.reduceRight(
        (wrapped, func) => func(wrapped), comp)
}

export {
    compose
}


