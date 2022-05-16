import { css, SimpleInterpolation } from 'styled-components';

export const mobile = (props: SimpleInterpolation) => {
    return css`
        @media only screen and (max-width: 495px) {
            ${props}
        }
    `;
};

export const tablet = (props: SimpleInterpolation) => {
    return css`
        @media only screen and (max-width: 950px) {
            ${props}
        }
    `;
};

export const WidthBetween495px800px = (props: SimpleInterpolation) => {
    return css`
        @media only screen and (min-width: 495px) and (max-width: 800px) {
            ${props}
        }
    `;
};

export const MinWidth950px = (props: SimpleInterpolation) => {
    return css`
        @media only screen and (min-width: 950px) {
            ${props}
        }
    `;
};

export const MaxWidth600px = (props: SimpleInterpolation) => {
    return css`
        @media only screen and (max-width: 600px) {
            ${props}
        }
    `;
};

export const MaxWidth1150px = (props: SimpleInterpolation) => {
    return css`
        @media only screen and (max-width: 1150px) {
            ${props}
        }
    `;
};

export const MaxWidth1460px = (props: SimpleInterpolation) => {
    return css`
        @media only screen and (max-width: 1460px) {
            ${props}
        }
    `;
};

export const MinWidth1400px = (props: SimpleInterpolation) => {
    return css`
        @media only screen and (min-width: 1400px) {
            ${props}
        }
    `;
};
