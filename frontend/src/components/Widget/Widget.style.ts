import styled from 'styled-components';
import { tablet } from '../../styles/responsive';
//import { Link } from 'react-router-dom'

export const Container = styled.div`
    min-height: 100vh;
    width: 60rem;
    padding: 3rem;
    background-color: var(--lightgray);
    z-index: -1;
    ${tablet({
        minHeight: 'max-content',
        width: '100vw',
    })}
`;
