import { createElement, useEffect, useState } from "react";
import { FiArrowUp, FiBookOpen, FiCoffee, FiGithub, FiGlobe, FiHeart, FiMail, FiSun } from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa6";
import { SiCodepen } from "react-icons/si";
import { Calculator } from "./components/Calculator.jsx";
import { Styled } from "./styled.js";

const publicAsset = (name) => `${import.meta.env.BASE_URL}${name}`;

const socialLinks = [
    { label: "Portfolio", href: "https://www.ashishranjan.net/", Icon: FiGlobe },
    { label: "GitHub", href: "https://github.com/a2rp", Icon: FiGithub },
    { label: "CodePen", href: "https://codepen.io/ash1198", Icon: SiCodepen },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aashishranjan", Icon: FaLinkedinIn },
    { label: "Facebook", href: "https://www.facebook.com/theash.ashish/", Icon: FaFacebookF },
    { label: "YouTube", href: "https://www.youtube.com/@ashishranjan-ashz?sub_confirmation=1", Icon: FaYoutube },
    { label: "Email", href: "mailto:ash.ranjan09@gmail.com", Icon: FiMail },
];

const supportLinks = [
    { label: "Support", href: "https://a2rp-donation-page.netlify.app/", Icon: FiHeart },
    { label: "Buy Me a Coffee", href: "https://buymeacoffee.com/a2rp", Icon: FiCoffee },
    { label: "Patreon", href: "https://patreon.com/a2rp", Icon: FiBookOpen },
];

function IconLinks({ links }) {
    return (
        <Styled.IconLinks>
            {links.map(({ label, href, Icon: IconComponent }) => (
                <Styled.IconLink key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} title={label}>
                    {createElement(IconComponent, { "aria-hidden": true })}
                </Styled.IconLink>
            ))}
        </Styled.IconLinks>
    );
}

export default function App() {
    const [showTopButton, setShowTopButton] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTopButton(window.scrollY > 320);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <Styled.Wrapper>
            <Styled.Header>
                <Styled.HeaderMain>
                    <Styled.Brand href="#calculator" aria-label="Scientific Calculator home">
                        <img src={publicAsset("logo.png")} alt="" />
                        <span><small>A2RP LAB</small>Scientific Calculator</span>
                    </Styled.Brand>
                    <Styled.HeaderBadge><FiSun aria-hidden="true" /> DEG / RAD</Styled.HeaderBadge>
                </Styled.HeaderMain>
            </Styled.Header>

            <Styled.Main id="calculator">
                <Styled.Intro>
                    <Styled.Kicker>PRECISION TOOLKIT</Styled.Kicker>
                    <Styled.Heading>Scientific Calculator</Styled.Heading>
                    <Styled.SubHeading>A focused calculator for everyday arithmetic, scientific functions, trigonometry, constants, and keyboard-first input.</Styled.SubHeading>
                    <Styled.MetaRow><span>React + Vite</span><span>Keyboard ready</span><span>Local angle mode</span></Styled.MetaRow>
                </Styled.Intro>
                <Calculator />
            </Styled.Main>

            <Styled.Footer>
                <Styled.FooterMain>
                    <Styled.FooterTop>
                        <Styled.FooterTitle>Built for clear calculations.</Styled.FooterTitle>
                        <Styled.FooterText>Copyright © {new Date().getFullYear()} <a href="https://www.ashishranjan.net/" target="_blank" rel="noopener noreferrer">Ashish Ranjan</a></Styled.FooterText>
                    </Styled.FooterTop>
                    <Styled.FooterGroups>
                        <Styled.FooterGroup><span>Connect</span><IconLinks links={socialLinks} /></Styled.FooterGroup>
                        <Styled.FooterGroup><span>Support</span><IconLinks links={supportLinks} /></Styled.FooterGroup>
                    </Styled.FooterGroups>
                </Styled.FooterMain>
            </Styled.Footer>

            {showTopButton && <Styled.GoTop type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top" title="Scroll to top"><FiArrowUp aria-hidden="true" /></Styled.GoTop>}
        </Styled.Wrapper>
    );
}
