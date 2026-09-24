const PRETTY_MAP = { "÷": "/", "×": "*", "−": "-" };

const OPS = {
    "+": { prec: 2, assoc: "L", arity: 2, fn: (a, b) => a + b },
    "-": { prec: 2, assoc: "L", arity: 2, fn: (a, b) => a - b },
    "*": { prec: 3, assoc: "L", arity: 2, fn: (a, b) => a * b },
    "/": {
        prec: 3,
        assoc: "L",
        arity: 2,
        fn: (a, b) => {
            if (b === 0) throw new Error("Division by zero");
            return a / b;
        },
    },
    NEG: { prec: 4, assoc: "R", arity: 1, fn: (a) => -a },
    "^": { prec: 5, assoc: "R", arity: 2, fn: (a, b) => Math.pow(a, b) },
    FACT: { prec: 6, assoc: "L", arity: 1, fn: fact },
    PCT: { prec: 6, assoc: "L", arity: 1, fn: (a) => a / 100 },
};

const FUNS = {
    sin: (x, o) => Math.sin(angInRad(x, o)),
    cos: (x, o) => Math.cos(angInRad(x, o)),
    tan: (x, o) => Math.tan(angInRad(x, o)),
    asin: (x, o) => angOut(xClamp(Math.asin(clamp(x, -1, 1))), o),
    acos: (x, o) => angOut(xClamp(Math.acos(clamp(x, -1, 1))), o),
    atan: (x, o) => angOut(xClamp(Math.atan(x)), o),

    ln: (x) => {
        if (x <= 0) throw new Error("Domain error");
        return Math.log(x);
    },
    log: (x) => {
        if (x <= 0) throw new Error("Domain error");
        return Math.log10 ? Math.log10(x) : Math.log(x) / Math.LN10;
    },
    sqrt: (x) => {
        if (x < 0) throw new Error("Domain error");
        return Math.sqrt(x);
    },

    abs: (x) => Math.abs(x),
    floor: (x) => Math.floor(x),
    ceil: (x) => Math.ceil(x),
};

const CONSTS = {
    π: Math.PI,
    pi: Math.PI,
    PI: Math.PI,
    e: Math.E,
};

function clamp(v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
}
function xClamp(v) {
    return Number.isFinite(v)
        ? v
        : (() => {
              throw new Error("Domain error");
          })();
}

// Angle helpers
function angInRad(x, opts) {
    return (opts?.angleMode || "DEG") === "DEG" ? (x * Math.PI) / 180 : x;
}
function angOut(rad, opts) {
    return (opts?.angleMode || "DEG") === "DEG" ? (rad * 180) / Math.PI : rad;
}

// Factorial for non-negative integers up to 170 (after that -> Infinity)
function fact(a) {
    if (!Number.isFinite(a) || a < 0 || Math.floor(a) !== a)
        throw new Error("Invalid factorial");
    if (a > 170) throw new Error("Overflow");
    let r = 1;
    for (let i = 2; i <= a; i++) r *= i;
    return r;
}

function isDigit(ch) {
    return ch >= "0" && ch <= "9";
}
function isOp(ch) {
    return "+-*/^".includes(ch);
}
function isAlpha(ch) {
    return /[A-Za-z]/.test(ch);
}

// Round to a sensible precision, then format nicely
function formatResult(n) {
    if (!Number.isFinite(n)) throw new Error("Not a finite number");
    const abs = Math.abs(n);
    if (abs !== 0 && (abs < 1e-6 || abs >= 1e12)) {
        let s = n.toExponential(10);
        s = s.replace(/(\.\d*?[1-9])0+e/, "$1e").replace(/\.0+e/, "e"); // 1.0000000000e+12 -> 1e+12
        return s;
    }
    let s = n.toFixed(12);
    return s.replace(/\.?0+$/, "");
}

function normalizeChars(expr) {
    return expr
        .replace(/\s+/g, "")
        .replace(/[÷×−]/g, (m) => PRETTY_MAP[m] || m)
        .replace(/√/g, "sqrt");
}

/**
 * Token structure:
 *  - {type:"num", value:Number}
 *  - {type:"op", value:"+|-|*|/|^|NEG|FACT|PCT"}
 *  - {type:"(", value:"("} / {type:")", value:")"}
 *  - {type:"fn", name:"sin|cos|..."}  // unary functions
 */
function tokenize(expr) {
    const s = normalizeChars(expr);
    const tokens = [];
    let i = 0;
    let lastType = null; // "num" | "op" | "(" | ")" | "fn" | "const"

    const pushOp = (op) => tokens.push({ type: "op", value: op });
    const pushNum = (numStr) =>
        tokens.push({ type: "num", value: parseFloat(numStr) });

    while (i < s.length) {
        const ch = s[i];

        // Parenthesis (with implicit multiply before "(")
        if (ch === "(") {
            if (
                lastType === "num" ||
                lastType === ")" ||
                lastType === "const"
            ) {
                pushOp("*");
            }
            tokens.push({ type: "(", value: "(" });
            lastType = "(";
            i++;
            continue;
        }
        if (ch === ")") {
            tokens.push({ type: ")", value: ")" });
            lastType = ")";
            i++;
            continue;
        }

        // Numbers (simple decimal; you can extend to 1e-3 later)
        // Numbers (decimal + optional scientific exponent)
        // Numbers (decimal + optional scientific exponent)
        if (isDigit(ch) || ch === ".") {
            let j = i,
                dot = 0;
            while (j < s.length && (isDigit(s[j]) || s[j] === ".")) {
                if (s[j] === "." && ++dot > 1) break;
                j++;
            }
            // scientific notation: e/E[+/-]?digits  (must have digits)
            if (j < s.length && (s[j] === "e" || s[j] === "E")) {
                let k = j + 1;
                if (s[k] === "+" || s[k] === "-") k++;
                const startExp = k;
                while (k < s.length && isDigit(s[k])) k++;
                if (k === startExp) {
                    // user typed 3.2e or 3.2e- (incomplete) -> not evaluable yet
                    throw new Error("Incomplete exponent");
                }
                j = k; // valid exponent part
            }
            pushNum(s.slice(i, j));
            lastType = "num";
            i = j;
            continue;
        }

        // Constants (π, pi, PI, e)
        if (ch === "π" || ch === "e" || isAlpha(ch)) {
            // Read identifier
            if (ch === "π") {
                if (
                    lastType === "num" ||
                    lastType === ")" ||
                    lastType === "const"
                )
                    pushOp("*");
                tokens.push({ type: "num", value: CONSTS["π"] });
                lastType = "const";
                i++;
                continue;
            }

            let j = i;
            while (j < s.length && isAlpha(s[j])) j++;
            const word = s.slice(i, j);

            if (Object.prototype.hasOwnProperty.call(CONSTS, word)) {
                if (
                    lastType === "num" ||
                    lastType === ")" ||
                    lastType === "const"
                )
                    pushOp("*");
                tokens.push({ type: "num", value: CONSTS[word] });
                lastType = "const";
                i = j;
                continue;
            }
            if (Object.prototype.hasOwnProperty.call(FUNS, word)) {
                // implicit multiply before a function call
                if (
                    lastType === "num" ||
                    lastType === ")" ||
                    lastType === "const"
                )
                    pushOp("*");
                tokens.push({ type: "fn", name: word });
                lastType = "fn";
                i = j;
                continue;
            }

            throw new Error(`Unknown identifier: ${word}`);
        }

        // Postfix operators
        if (ch === "!") {
            if (lastType !== "num" && lastType !== ")" && lastType !== "const")
                throw new Error("Bad '!'");
            pushOp("FACT");
            lastType = "op";
            i++;
            continue;
        }
        if (ch === "%") {
            if (lastType !== "num" && lastType !== ")" && lastType !== "const")
                throw new Error("Bad '%'");
            pushOp("PCT");
            lastType = "op";
            i++;
            continue;
        }

        // Operators (with unary minus detection)
        if (isOp(ch)) {
            const isUnaryMinus =
                ch === "-" &&
                (lastType === null ||
                    lastType === "op" ||
                    lastType === "(" ||
                    lastType === "fn");
            if (isUnaryMinus) pushOp("NEG");
            else pushOp(ch);
            lastType = "op";
            i++;
            continue;
        }

        throw new Error(`Unexpected character: ${ch}`);
    }

    return tokens;
}

function toRPN(tokens) {
    const output = [];
    const stack = [];
    for (const t of tokens) {
        if (t.type === "num") {
            output.push(t);
        } else if (t.type === "fn") {
            stack.push(t);
        } else if (t.type === "op") {
            const o1 = OPS[t.value];
            if (!o1) throw new Error(`Unknown operator: ${t.value}`);
            while (stack.length) {
                const top = stack[stack.length - 1];
                if (top.type !== "op") break;
                const o2 = OPS[top.value];
                const popIt =
                    (o1.assoc === "L" && o1.prec <= o2.prec) ||
                    (o1.assoc === "R" && o1.prec < o2.prec);
                if (popIt) output.push(stack.pop());
                else break;
            }
            stack.push(t);
        } else if (t.type === "(") {
            stack.push(t);
        } else if (t.type === ")") {
            let found = false;
            while (stack.length) {
                const top = stack.pop();
                if (top.type === "(") {
                    found = true;
                    break;
                }
                output.push(top);
            }
            if (!found) throw new Error("Mismatched parentheses");
            // If top of stack is a function, pop it too
            if (stack.length && stack[stack.length - 1].type === "fn") {
                output.push(stack.pop());
            }
        }
    }
    while (stack.length) {
        const top = stack.pop();
        if (top.type === "(" || top.type === ")")
            throw new Error("Mismatched parentheses");
        output.push(top);
    }
    return output;
}

function evalRPN(rpn, opts) {
    const st = [];
    for (const t of rpn) {
        if (t.type === "num") {
            st.push(t.value);
        } else if (t.type === "op") {
            const meta = OPS[t.value];
            if (meta.arity === 1) {
                const a = st.pop();
                if (a === undefined) throw new Error("Bad expression");
                st.push(meta.fn(a));
            } else if (meta.arity === 2) {
                const b = st.pop(),
                    a = st.pop();
                if (a === undefined || b === undefined)
                    throw new Error("Bad expression");
                st.push(meta.fn(a, b));
            }
        } else if (t.type === "fn") {
            const a = st.pop();
            if (a === undefined) throw new Error("Bad expression");
            const f = FUNS[t.name];
            st.push(f(a, opts));
        } else {
            throw new Error("Invalid RPN token");
        }
    }
    if (st.length !== 1) throw new Error("Bad expression");
    return Number.parseFloat(st[0].toPrecision(14));
}

export function compute(expression, opts = { angleMode: "DEG" }) {
    const tokens = tokenize(expression);
    const rpn = toRPN(tokens);
    const value = evalRPN(rpn, opts);
    return { ok: true, value, formatted: formatResult(value) };
}

export function tryCompute(expression, opts = { angleMode: "DEG" }) {
    try {
        return compute(expression, opts);
    } catch (err) {
        return { ok: false, error: err?.message || "Error" };
    }
}

export function canEvaluate(expr) {
    if (!expr) return false;
    const s = normalizeChars(expr);
    const last = s.at(-1);
    if ("+-*/^(".includes(last)) return false;
    const opens = (s.match(/\(/g) || []).length;
    const closes = (s.match(/\)/g) || []).length;
    if (opens !== closes) return false;
    if (/[0-9.](e|E)([+-])?$/.test(s)) return false;
    return true;
}
