import { css } from 'styled-components';

export const mobile = (props: string | number) => {
    return css`
        @media only screen and (max-width: 495px) {
            ${props}
        }
    `;
};

export const tablet = (props: string | number) => {
    return css`
        @media only screen and (max-width: 950px) {
            ${props}
        }
    `;
};

export const Width1150px = (props: string | number) => {
    return css`
        @media only screen and (max-width: 1150px) {
            ${props}
        }
    `;
};

export const Width1460px = (props: string | number) => {
    return css`
        @media only screen and (max-width: 1460px) {
            ${props}
        }
    `;
};
