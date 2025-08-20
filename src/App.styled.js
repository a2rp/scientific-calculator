import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Styled = {
    Wrapper: styled.div``,
    Header: styled.header`
        border-bottom: 1px solid #333;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `,
    HeaderMain: styled.div`
        width: 100%;
        max-width: 1440px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 50px;
        @media (width < 900px) {
            padding: 0 15px;
        }
    `,
    NavLink: styled(NavLink)`
        color: #fff;
        text-decoration: none;
        font-size: 18px;
        font-weight: 500;
        &.active {
            color: orangered;
        }
    `,
    Main: styled.main`
        min-height: 100vh;
        padding: 100px 50px;
        @media (width<900px) {
            padding: 80px 15px;
        }
    `,
    Footer: styled.footer`
        border-top: 1px solid #333;
        background-color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
    `,
    FooterMain: styled.div`
        width: 100%;
        max-width: 1440px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px 50px;
        @media (width < 900px) {
            padding: 15px 15px;
        }
    `,
    FooterCol: styled.div`
        font-size: 12px;

        a {
            text-decoration: none;
            padding: 5px 0;
            border-bottom: 1px solid #fff;
            color: #fff;
        }
    `,
};
