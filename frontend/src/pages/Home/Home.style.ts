import styled, { keyframes } from 'styled-components';

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
    margin: 4rem 0;
    padding: 4rem 0;
    background-color: rgba(0, 0, 0, 0.05);
`;

export const CTATitle = styled.h2`
    font-size: 3rem;
    margin: 3rem 0 0.5rem;
    text-transform: uppercase;
    color: var(--blue);
    transform: rotate(-1deg);
`;

export const CTAText = styled.h2`
    font-size: 2rem;
    margin: 0 0 2rem;
    color: #626262;
`;

export const ArrowContainer = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    height: min-content;
    width: min-content;
    animation: ${CTAArrowAnimation} 0.7s ease-in-out infinite alternate both;
`;
