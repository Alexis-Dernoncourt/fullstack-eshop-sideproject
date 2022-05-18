import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: var(--fz-md);
    min-height: 50vh;
`;

export const Text = styled.p`
    text-align: center;
`;

export const TextInfo = styled.p`
    color: var(--red);
    text-align: center;
`;

export const TextInfoBlue = styled.p`
    color: var(--blue);
    margin-bottom: 1.5rem;
`;

export const LinksContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
`;

export const LinkItem = styled(Link)`
    margin: 2rem;
    font-weight: 700;
`;
