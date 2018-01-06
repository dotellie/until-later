import untilLater from "./index.mjs";

const assert = (a) => {
    if (!a) throw new Error("Tests failed!");
}

(function settingProperties() {
    let t = untilLater();
    t.foo = "bar";
    t.baz = "foo";

    t = t.later({});

    assert(!(t instanceof Proxy));
    assert(t.foo === "bar");
    assert(t.baz === "foo");
})();

(function callingFunctions() {
    let t = untilLater();
    t.foo("bar");
    t.hello("hi");

    let c1, c2;
    t = t.later({
        foo(a) {
            c1 = a === "bar";
        },
        hello(a) {
            c2 = a === "hi";
        }
    });

    assert(c1 && c2);
})();

console.log("Tests ran without problem");
