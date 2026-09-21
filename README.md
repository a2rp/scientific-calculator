# Scientific Calculator (React + Vite)

![alt text](image.png)

Production-quality scientific calculator built with **React (Vite)** and **styled-components** - featuring a **DEG/RAD** trig, **scientific notation (EXP)**, implicit multiplication, and keyboard support.

###

-   **Live:** https://a2rp.github.io/scientific-calculator/
-   **Repo:** https://github.com/a2rp/scientific-calculator

## ✨ Features

-   **Safe expression engine**
    -   Precedence & associativity: `^` > unary `−` > `× ÷` > `+ −`
    -   **Unary minus**, **parentheses**, and **implicit ×**: `2(3+4)`, `π(2+3)`, `3sin(30)`
-   **Scientific functions**
    -   `sin cos tan`, `asin acos atan` (with **DEG/RAD** toggle)
    -   `ln log sqrt`, `abs floor ceil`
    -   Postfix: `!` (factorial), `%` (percent of 100)
    -   Constants: `π`, `e`
-   **Scientific notation (EXP)**
    -   `3.2e3` → 3200, `5e-2` → 0.05
    -   Display formats large/small numbers nicely (e.g., `1e+12`)
-   **Great UX**
    -   Keyboard shortcuts (numbers, ops, Enter, Backspace…)
    -   DEG/RAD persisted in `localStorage`
    -   Accessible focus & live result region
-   **Clean styling**
    -   **CSS variables + global resets in `index.css`**
    -   **`styled-components`**

---

## 🔑 Keyboard Shortcuts

-   Digits: `0–9`
-   Operators: `+ - * / ^` (`*`/`x` → ×, `/` → ÷)
-   Decimal: `.`
-   Parentheses: `(` `)`
-   Postfix: `%` and `!`
-   Constants: `p` → `π`, `e` → context-aware (exponent after a number, constant otherwise)
-   Actions: `Enter` or `=` → evaluate, `Backspace` → DEL, `Esc` → AC
-   Mode: `R` → toggle **DEG/RAD**

> **Percent behavior:** Postfix percent divides by 100 (e.g., `200×15%` → `30`).  
> **Factorial:** Non-negative integers only; 170! max before overflow.

---

## 🚀 Getting Started

```bash
# clone
git clone https://github.com/a2rp/scientific-calculator
cd scientific-calculator

# install
npm i

# dev
npm run dev

# build
npm run build

# preview production build
npm run preview
```

## Links

- Portfolio: [https://www.ashishranjan.net](https://www.ashishranjan.net)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me A Coffee: [https://buymeacoffee.com/a2rp](https://buymeacoffee.com/a2rp)
- Patreon: [https://patreon.com/a2rp](https://patreon.com/a2rp)
<!-- Project links -->

## Links

- Live: [https://a2rp.github.io/scientific-calculator/](https://a2rp.github.io/scientific-calculator/)
- Repository: [https://github.com/a2rp/scientific-calculator](https://github.com/a2rp/scientific-calculator)
- Portfolio: [https://www.ashishranjan.net/](https://www.ashishranjan.net/)
- GitHub: [https://github.com/a2rp](https://github.com/a2rp)
- CodePen: [https://codepen.io/ash1198](https://codepen.io/ash1198)
- LinkedIn: [https://www.linkedin.com/in/aashishranjan](https://www.linkedin.com/in/aashishranjan)
- Facebook: [https://www.facebook.com/theash.ashish/](https://www.facebook.com/theash.ashish/)
- YouTube: [https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1](https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1)
- Email: [ash.ranjan09@gmail.com](mailto:ash.ranjan09@gmail.com)

## Support

- Support: [https://a2rp-donation-page.netlify.app/](https://a2rp-donation-page.netlify.app/)
- Buy Me a Coffee: [https://buymeacoffee.com/a2rp](https://buymeacoffee.com/a2rp)
- Patreon: [https://www.patreon.com/a2rp](https://www.patreon.com/a2rp)
