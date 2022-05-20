import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Logo } from '../../styles/GeneralComponents';

export const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 20rem;
    background-color: var(--black);
    color: var(--white);
    margin-top: auto;
`;

export const FootLogo = styled(Logo)`
    color: var(--white);
    transition: var(--transition);
    &:hover {
        color: var(--gray);
    }
`;

export const SocialIconsContainer = styled.div`
    display: flex;
    align-self: flex-end;
    margin: 5rem 5rem;
`;

export const Icon = styled(Link)`
    display: flex;
    margin: 0.5rem 2rem;
    color: var(--white);
    &:hover {
        color: inherit;
        transform: scale(1.1);
    }
`;
