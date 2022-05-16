import styled, { keyframes } from 'styled-components';
import { mobile, tablet } from '../../styles/responsive';

const CTAArrowAnimation = keyframes`
  from {
    transform: translateY(-1rem);
  }
  to {
    transform: translateY(0);
  }
`;

export const CallToActionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 4rem 0;
    padding: 4rem 0;
    background-color: rgba(0, 0, 0, 0.05);
    ${mobile({ margin: '2rem 0' })};
`;

export const CTATitle = styled.h2`
    font-size: 3rem;
    margin: 3rem 0 0.5rem;
    text-transform: uppercase;
    padding: 0 1rem;
    color: var(--blue);
    transform: rotate(-1deg);
    ${mobile({ fontSize: '2rem' })};
`;

export const CTAText = styled.p`
    font-size: 2rem;
    margin: 0 0 2rem;
    font-weight: 700;
    color: #626262;
    ${tablet({ fontSize: '1.8rem' })};
    ${mobile({ fontSize: '1.4rem' })};
`;

export const ArrowContainer = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    height: min-content;
    width: min-content;
    animation: ${CTAArrowAnimation} 0.7s ease-in-out infinite alternate both;
`;
