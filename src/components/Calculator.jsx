import React, { useEffect, useMemo, useState } from "react";
import { Styled } from "../styled.js";
import { tryCompute, canEvaluate } from "../engine/mathEngine.js";

const OPERATORS = ["+", "−", "×", "÷", "^"];

function isOperator(ch) { return OPERATORS.includes(ch); }
function isDigit(ch) { return /[0-9]/.test(ch); }

export function Calculator() {
    const [expr, setExpr] = useState("");
    const [preview, setPreview] = useState("0");
    const [angleMode, setAngleMode] = useState("DEG"); // DEG | RAD

    const lastChar = expr.at(-1) ?? "";

    const append = (ch) => {
        // Implicit multiply before "("
        if (ch === "(") {
            if (isDigit(lastChar) || lastChar === ")" || lastChar === "." || /[πe]$/.test(lastChar)) {
                setExpr((s) => s + "×(");
                return;
            }
        }

        // Operators
        if (isOperator(ch)) {
            if (expr === "" && ch !== "−") return; // only unary minus can lead
            if (isOperator(lastChar) && lastChar !== ")" && ch !== "−") return;
            if (lastChar === "(" && ch !== "−") return;
        }

        // Dot rules
        if (ch === ".") {
            const lastToken = expr.split(/[^0-9.]/).pop() || "";
            if (lastToken.includes(".")) return;
            if (lastChar === ")") return;
            if (lastChar === "" || isOperator(lastChar) || lastChar === "(") {
                setExpr((s) => s + "0.");
                return;
            }
        }

        // Close paren
        if (ch === ")") {
            const opens = (expr.match(/\(/g) || []).length;
            const closes = (expr.match(/\)/g) || []).length;
            if (opens <= closes) return;
            if (isOperator(lastChar) || lastChar === "(") return;
        }

        // Postfix ops should only be allowed after a value
        if (ch === "!" || ch === "%") {
            if (!expr || ["(", "−", "+", "×", "÷", "^", "."].includes(lastChar)) return;
        }

        setExpr((s) => s + ch);
    };

    // Helper: insert function like sin( or sqrt(
    const appendFn = (name) => {
        if (isDigit(lastChar) || lastChar === ")" || /[πe]$/.test(lastChar)) {
            setExpr((s) => s + "×" + name + "(");
        } else {
            setExpr((s) => s + name + "(");
        }
    };
    const appendConst = (symbol) => {
        if (isDigit(lastChar) || lastChar === ")" || /[πe]$/.test(lastChar)) {
            setExpr((s) => s + "×" + symbol);
        } else {
            setExpr((s) => s + symbol);
        }
    };

    const onClear = () => { setExpr(""); setPreview("0"); };
    const onDelete = () => { setExpr((s) => s.slice(0, -1)); };
    const onToggleMode = () => setAngleMode((m) => (m === "DEG" ? "RAD" : "DEG"));

    const onEqual = () => {
        const out = tryCompute(expr, { angleMode });
        if (out.ok) {
            setExpr(out.formatted);
            setPreview(out.formatted);
        } else {
            setPreview("Error");
        }
    };

    useEffect(() => {
        if (!expr) { setPreview("0"); return; }
        const out = tryCompute(expr, { angleMode });
        setPreview(out.ok ? out.formatted : " ");
    }, [expr, angleMode]);

    const equalDisabled = !canEvaluate(expr);

    const appendExp = () => {
        const lastToken = (expr.split(/[+\-×÷^()]/).pop() || "");
        if (/[eE]/.test(lastToken)) return; // already has exponent
        if (/^\s*$/.test(lastToken)) {
            setExpr((s) => s + "1e");
        } else {
            setExpr((s) => s + "e");
        }
    };


    // Scientific rows
    const sciRow1 = useMemo(() => ([
        { label: angleMode, variant: "acc", onClick: onToggleMode },
        { label: "sin", onClick: () => appendFn("sin") },
        { label: "cos", onClick: () => appendFn("cos") },
        { label: "tan", onClick: () => appendFn("tan") },
        { label: "√", onClick: () => appendFn("sqrt") },
    ]), [angleMode, appendFn, onToggleMode]);

    const sciRow2 = useMemo(() => ([
        { label: "asin", onClick: () => appendFn("asin") },
        { label: "acos", onClick: () => appendFn("acos") },
        { label: "atan", onClick: () => appendFn("atan") },
        { label: "ln", onClick: () => appendFn("ln") },
        { label: "log", onClick: () => appendFn("log") },
    ]), [appendFn]);

    const sciRow3 = useMemo(() => ([
        { label: "π", onClick: () => appendConst("π") },
        { label: "e", onClick: () => appendConst("e") },   // Euler constant
        { label: "x!", onClick: () => append("!") },
        { label: "%", onClick: () => append("%") },
        { label: "abs", onClick: () => appendFn("abs") },
        { label: "EXP", variant: "acc", onClick: appendExp }, // ← NEW
    ]), [append, appendConst, appendFn, appendExp]);


    // Basic keys
    const keys = useMemo(() => ([
        { label: "AC", variant: "danger", onClick: onClear },
        { label: "DEL", variant: "danger", onClick: onDelete },
        { label: "(", variant: "acc", onClick: () => append("(") },
        { label: ")", variant: "acc", onClick: () => append(")") },

        { label: "7", onClick: () => append("7") },
        { label: "8", onClick: () => append("8") },
        { label: "9", onClick: () => append("9") },
        { label: "÷", variant: "op", onClick: () => append("÷") },

        { label: "4", onClick: () => append("4") },
        { label: "5", onClick: () => append("5") },
        { label: "6", onClick: () => append("6") },
        { label: "×", variant: "op", onClick: () => append("×") },

        { label: "1", onClick: () => append("1") },
        { label: "2", onClick: () => append("2") },
        { label: "3", onClick: () => append("3") },
        { label: "−", variant: "op", onClick: () => append("−") },

        { label: "0", onClick: () => append("0") },
        { label: ".", onClick: () => append(".") },
        { label: "^", variant: "op", onClick: () => append("^") },
        { label: "+", variant: "op", onClick: () => append("+") },
    ]), [append, onClear, onDelete, onEqual]);

    // --- Keyboard support ---
    useEffect(() => {
        const onKey = (e) => {
            const k = e.key;

            // Digits
            if (/^\d$/.test(k)) { e.preventDefault(); append(k); return; }

            // Operators
            if (k === "+") { e.preventDefault(); append("+"); return; }
            if (k === "-") { e.preventDefault(); append("−"); return; }
            if (k === "*" || k === "x" || k === "X") { e.preventDefault(); append("×"); return; }
            if (k === "/") { e.preventDefault(); append("÷"); return; }
            if (k === "^") { e.preventDefault(); append("^"); return; }

            // Dots & parens
            if (k === ".") { e.preventDefault(); append("."); return; }
            if (k === "(" || k === ")") { e.preventDefault(); append(k); return; }

            // Postfix
            if (k === "!") { e.preventDefault(); append("!"); return; }
            if (k === "%") { e.preventDefault(); append("%"); return; }

            // Constants / exponent (contextual 'e')
            if (k.toLowerCase() === "p") { e.preventDefault(); appendConst("π"); return; }
            if (k.toLowerCase() === "e") {
                e.preventDefault();
                // if previous token is a number/)/π/e -> treat as exponent
                if (/[0-9.)πe]$/.test(expr)) setExpr((s) => s + "e");
                else appendConst("e");
                return;
            }

            // Actions
            if (k === "Enter" || k === "=") { e.preventDefault(); onEqual(); return; }
            if (k === "Backspace") { e.preventDefault(); onDelete(); return; }
            if (k === "Escape") { e.preventDefault(); onClear(); return; }
            if (k.toLowerCase() === "r") { e.preventDefault(); onToggleMode(); return; } // R to toggle DEG/RAD
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [expr, append, appendConst, onEqual, onDelete, onClear, onToggleMode]);

    // load once
    useEffect(() => {
        const m = localStorage.getItem("angleMode");
        if (m === "DEG" || m === "RAD") setAngleMode(m);
    }, []);
    // save whenever changes
    useEffect(() => {
        localStorage.setItem("angleMode", angleMode);
    }, [angleMode]);


    return (
        <Styled.CalcShell>
            <Styled.Display aria-live="polite" role="status">
                <Styled.Expr>{expr || " "}</Styled.Expr>
                <Styled.Result>{preview}</Styled.Result>
            </Styled.Display>

            {/* Scientific rows */}
            <Styled.KeysGrid $cols={5}>
                {sciRow1.map((k, i) => (
                    <Styled.Key key={"s1-" + i} onClick={k.onClick} $variant={k.variant}>
                        {k.label}
                    </Styled.Key>
                ))}
            </Styled.KeysGrid>
            <Styled.KeysGrid $cols={5}>
                {sciRow2.map((k, i) => (
                    <Styled.Key key={"s2-" + i} onClick={k.onClick} $variant={k.variant}>
                        {k.label}
                    </Styled.Key>
                ))}
            </Styled.KeysGrid>
            <Styled.KeysGrid $cols={5}>
                {sciRow3.map((k, i) => (
                    <Styled.Key key={"s3-" + i} onClick={k.onClick} $variant={k.variant}>
                        {k.label}
                    </Styled.Key>
                ))}
            </Styled.KeysGrid>{/* Basic keypad */}
            <Styled.Keys>
                {keys.map((k, i) => (
                    <Styled.Key key={i} onClick={k.onClick} $variant={k.variant}>
                        {k.label}
                    </Styled.Key>
                ))}
                <Styled.KeyWide
                    onClick={onEqual}
                    disabled={equalDisabled}
                    $variant="op"
                    aria-disabled={equalDisabled}
                >
                    =
                </Styled.KeyWide>
            </Styled.Keys>
        </Styled.CalcShell>
    );
}
