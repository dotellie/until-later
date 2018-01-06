export default function untilLater() {
    return new Proxy({
        _functionCalls: []
    }, {
        get: (target, key) => {
            if (key === "later") {
                return (realObject) => {
                    Object.entries(target).forEach(([key, value]) => {
                        if (key.startsWith("_")) return;
                        realObject[key] = value;
                    });

                    target._functionCalls.forEach(({ key, args }) => {
                        realObject[key](...args);
                    });

                    return realObject;
                };
            } else {
                return (...args) => {
                    target._functionCalls.push({ key, args });
                };
            }
        },

        set: (target, key, value) => {
            target[key] = value;
            return true;
        }
    });
}

const g = (() => {
    if (typeof global !== "undefined") {
        return global;
    } else {
        return window;
    }
})();
g.untilLater = untilLater;
