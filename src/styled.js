import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`
        min-height: 100dvh;
        display: grid;
        place-items: center;
        padding: 6vh 12px;
    `,
    Main: styled.div`
        width: 100%;
        max-width: 420px;
    `,
    Heading: styled.h1`
        font-size: 26px;
        letter-spacing: 0.5px;
        margin: 0 0 6px;
    `,
    SubHeading: styled.h2`
        font-size: 13px;
        font-weight: 500;
        color: var(--muted);
        margin: 0 0 16px;

        a {
            color: #fff;
            text-decoration: none;
            padding: 3px;
            border-bottom: 2px solid #fff;
        }
    `,
    CalcShell: styled.div`
        background: var(--panel);
        border-radius: 18px;
        padding: 16px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        position: relative;
    `,
    Display: styled.div`
        background: #0e141e;
        border-radius: 12px;
        padding: 14px 12px;
        min-height: 76px;
        display: grid;
        align-items: end;
        gap: 6px;
        user-select: none;
        pointer-events: none;
    `,
    Expr: styled.div`
        color: var(--muted);
        font-size: 14px;
        word-break: break-all;
        min-height: 18px;
    `,
    Result: styled.div`
        font-family: ui-monospace, SFMono-Regular, Menlo, Consolas,
            "Liberation Mono", monospace;
        font-size: 28px;
        line-height: 1.2;
    `,

    /* ✅ NEW: used by the scientific rows */
    KeysGrid: styled.div`
        margin-top: 12px;
        display: grid;
        grid-template-columns: repeat(${({ $cols }) => $cols || 4}, 1fr);
        gap: 10px;
        position: relative;
        pointer-events: auto;
    `,

    /* basic keypad (4 cols) */
    Keys: styled.div`
        margin-top: 12px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
        position: relative;
        pointer-events: auto;
    `,
    Key: styled.button.attrs({ type: "button" })`
        background: ${({ $variant }) =>
            $variant === "op"
                ? "var(--key-op)"
                : $variant === "acc"
                ? "var(--key-acc)"
                : $variant === "danger"
                ? "var(--key-danger)"
                : "var(--key)"};
        color: var(--ink);
        border: none;
        border-radius: 6px;
        padding: 5px 15px;
        font-size: 13px;
        cursor: pointer;
        transition: transform 0.05s ease, filter 0.1s ease;
        will-change: transform;
        pointer-events: auto;
        &:active {
            transform: translateY(1px);
            filter: brightness(0.95);
        }
        &:focus-visible {
            outline: 2px solid var(--accent);
            outline-offset: 2px;
        }
    `,
    KeyWide: styled.button.attrs({ type: "button" })`
        grid-column: span 2;
        background: ${({ $variant }) =>
            $variant === "op" ? "var(--key-op)" : "var(--key)"};
        color: var(--ink);
        border: none;
        border-radius: 12px;
        padding: 5px 15px;
        font-size: 16px;
        cursor: pointer;
        pointer-events: auto;
    `,
};
