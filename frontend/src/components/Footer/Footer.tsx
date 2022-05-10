import { LogoLink } from '../../styles/GeneralComponents';
import {
    FooterContainer,
    FootLogo,
    SocialIconsContainer,
    Icon,
} from './Footer.style';
import { GrFacebook, GrInstagram, GrPinterest } from 'react-icons/gr';

const Footer = () => {
    return (
        <FooterContainer>
            <SocialIconsContainer>
                <Icon to="#">
                    <GrFacebook style={{ width: '3em', height: '3em' }} />
                </Icon>
                <Icon to="#">
                    <GrInstagram style={{ width: '3em', height: '3em' }} />
                </Icon>
                <Icon to="#">
                    <GrPinterest style={{ width: '3em', height: '3em' }} />
                </Icon>
            </SocialIconsContainer>
            <LogoLink to="/">
                <FootLogo>Shopping App</FootLogo>
            </LogoLink>
        </FooterContainer>
    );
};

export default Footer;
