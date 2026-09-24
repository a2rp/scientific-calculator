import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div`min-height: 100dvh; color: var(--ink);`,
    Header: styled.header`position: fixed; inset: 0 0 auto; z-index: 20; border-bottom: 1px solid var(--border); background: rgba(8, 12, 19, 0.9); backdrop-filter: blur(16px);`,
    HeaderMain: styled.div`width: min(1120px, calc(100% - 32px)); min-height: 72px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 20px;`,
    Brand: styled.a`
        display: inline-flex; align-items: center; gap: 12px; color: var(--ink); text-decoration: none;
        img { width: 38px; height: 38px; object-fit: contain; border: 1px solid var(--border-strong); border-radius: 10px; background: #111927; padding: 5px; }
        span { display: grid; gap: 2px; font-size: 14px; font-weight: 750; }
        small { color: var(--accent); font-size: 9px; letter-spacing: 0.18em; }
        &:hover span { text-shadow: 0 0 18px rgba(126, 183, 255, 0.55); }
        &:focus-visible { outline: 2px solid var(--accent); outline-offset: 5px; border-radius: 6px; }
    `,
    HeaderBadge: styled.div`display: inline-flex; align-items: center; gap: 8px; padding: 9px 12px; color: var(--muted); border: 1px solid var(--border); border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; svg { color: var(--accent); } @media (max-width: 560px) { padding: 8px; font-size: 0; svg { font-size: 16px; } }`,
    Main: styled.main`width: min(1120px, calc(100% - 32px)); margin: 0 auto; padding: 122px 0 72px;`,
    Intro: styled.section`max-width: 620px; margin-bottom: 24px;`,
    Kicker: styled.p`margin: 0 0 10px; color: var(--accent); font-size: 11px; font-weight: 800; letter-spacing: 0.18em;`,
    Heading: styled.h1`margin: 0; color: #f7fbff; font-size: clamp(34px, 7vw, 60px); line-height: 0.98; letter-spacing: -0.055em;`,
    SubHeading: styled.p`max-width: 560px; margin: 18px 0 16px; color: var(--muted); font-size: 15px; line-height: 1.7;`,
    MetaRow: styled.div`display: flex; flex-wrap: wrap; gap: 8px; span { padding: 7px 10px; color: #b7d5ff; border: 1px solid var(--border); border-radius: 8px; font-size: 11px; }`,
    CalcShell: styled.section`width: min(100%, 560px); margin: 0 auto; padding: 18px; background: linear-gradient(145deg, rgba(22, 32, 48, 0.96), rgba(12, 18, 28, 0.98)); border: 1px solid var(--border-strong); border-radius: 20px; box-shadow: 0 28px 70px rgba(0, 0, 0, 0.34);`,
    Display: styled.div`min-height: 112px; display: grid; align-items: end; gap: 8px; padding: 16px; background: #080e17; border: 1px solid var(--border); border-radius: 14px; user-select: none; pointer-events: none;`,
    Expr: styled.div`min-height: 20px; color: var(--muted); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: 14px; word-break: break-all;`,
    Result: styled.div`color: #f5f9ff; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; font-size: clamp(26px, 7vw, 38px); font-weight: 700; line-height: 1.1; word-break: break-all;`,
    KeysGrid: styled.div`display: grid; grid-template-columns: repeat(${({ $cols }) => $cols || 4}, minmax(0, 1fr)); gap: 9px; margin-top: 10px; @media (max-width: 460px) { gap: 6px; }`,
    Keys: styled.div`display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 9px; margin-top: 10px; @media (max-width: 460px) { gap: 6px; }`,
    Key: styled.button.attrs({ type: "button" })`
        min-height: 42px; padding: 8px 5px; color: var(--ink); background: ${({ $variant }) => $variant === "op" ? "var(--key-op)" : $variant === "acc" ? "var(--key-acc)" : $variant === "danger" ? "var(--key-danger)" : "var(--key)"}; border: 1px solid transparent; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 700; transition: border-color 160ms ease, box-shadow 160ms ease, text-shadow 160ms ease, background 160ms ease;
        &:hover:not(:disabled) { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(94, 161, 255, 0.12); text-shadow: 0 0 12px rgba(218, 237, 255, 0.72); }
        &:active:not(:disabled) { background: #31496e; } &:disabled { cursor: not-allowed; opacity: 0.42; } &:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    `,
    KeyWide: styled.button.attrs({ type: "button" })`
        grid-column: span 2; min-height: 42px; color: var(--ink); background: var(--key-op); border: 1px solid transparent; border-radius: 10px; cursor: pointer; font-size: 16px; font-weight: 800; transition: border-color 160ms ease, box-shadow 160ms ease, text-shadow 160ms ease;
        &:hover:not(:disabled) { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(94, 161, 255, 0.12); text-shadow: 0 0 12px rgba(218, 237, 255, 0.72); } &:disabled { cursor: not-allowed; opacity: 0.42; } &:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
    `,
    Footer: styled.footer`border-top: 1px solid var(--border); background: rgba(6, 10, 16, 0.82);`,
    FooterMain: styled.div`width: min(1120px, calc(100% - 32px)); margin: 0 auto; padding: 24px 0 30px;`,
    FooterTop: styled.div`display: flex; justify-content: space-between; align-items: center; gap: 16px; padding-bottom: 18px; border-bottom: 1px solid var(--border); @media (max-width: 680px) { align-items: flex-start; flex-direction: column; }`,
    FooterTitle: styled.strong`font-size: 14px;`,
    FooterText: styled.p`margin: 0; color: var(--muted); font-size: 12px; a { color: var(--ink); font-weight: 700; text-decoration: none; transition: color 160ms ease, text-shadow 160ms ease; &:hover { color: var(--accent); text-shadow: 0 0 12px rgba(126, 183, 255, 0.55); } }`,
    FooterGroups: styled.div`display: flex; justify-content: space-between; gap: 24px; padding-top: 18px; @media (max-width: 680px) { flex-direction: column; gap: 16px; }`,
    FooterGroup: styled.div`display: flex; align-items: center; gap: 12px; > span { color: var(--muted); font-size: 11px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; } @media (max-width: 440px) { align-items: flex-start; flex-direction: column; }`,
    IconLinks: styled.div`display: flex; flex-wrap: wrap; gap: 7px;`,
    IconLink: styled.a`width: 32px; height: 32px; display: grid; place-items: center; color: var(--muted); border: 1px solid var(--border); border-radius: 9px; text-decoration: none; font-size: 12px; font-weight: 800; transition: color 160ms ease, border-color 160ms ease, box-shadow 160ms ease, text-shadow 160ms ease; &:hover { color: var(--accent); border-color: var(--accent); box-shadow: 0 0 16px rgba(94, 161, 255, 0.18); text-shadow: 0 0 10px rgba(126, 183, 255, 0.7); } &:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }`,
    GoTop: styled.button.attrs({ type: "button" })`position: fixed; right: 20px; bottom: 20px; z-index: 18; width: 42px; height: 42px; display: grid; place-items: center; color: var(--ink); background: var(--key-op); border: 1px solid var(--border-strong); border-radius: 50%; cursor: pointer; box-shadow: 0 10px 24px rgba(0, 0, 0, 0.28); transition: border-color 160ms ease, box-shadow 160ms ease, text-shadow 160ms ease; &:hover { border-color: var(--accent); box-shadow: 0 0 22px rgba(94, 161, 255, 0.32); text-shadow: 0 0 10px rgba(218, 237, 255, 0.72); } &:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }`,
};
