import React from "react";
import { Calculator } from "./components/Calculator.jsx";
import { Styled } from "./styled.js";

export default function App() {
    return (
        <Styled.Wrapper>
            <Styled.Main>
                <Styled.Heading>Scientific Calculator (v0)</Styled.Heading>
                <Styled.SubHeading>
                    Designed and developed by <a href="https://www.ashishranjan.net" target="_blank">https://www.ashishranjan.net</a>
                </Styled.SubHeading>
                <Calculator />
            </Styled.Main>
        </Styled.Wrapper>
    );
}
