import { CTA } from './CallToAction.style';

const CallToAction = ({ link, text }: { link: string; text: string }) => {
    return <CTA to={`${link}`}>{text}</CTA>;
};

export default CallToAction;
