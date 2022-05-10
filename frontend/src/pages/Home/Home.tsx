import CallToAction from '../../components/CallToAction/CallToAction';
import HomeCards from '../../components/HomeCards/HomeCards';
import Slider from '../../components/Slider/Slider';
import {
    CallToActionContainer,
    CTATitle,
    CTAText,
    ArrowContainer,
} from './Home.style';
import { TitleH2 } from '../../styles/GeneralComponents';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import NewsletterForm from '../../components/NewsletterForm/NewsletterForm';

const Home = () => {
    return (
        <>
            <Slider />
            <TitleH2>Quelques uns de nos articles en vogue :</TitleH2>
            <HomeCards />
            <CallToActionContainer>
                <CTATitle>
                    Pour faire les soldes, des cadeaux, ou se faire plaisir...
                </CTATitle>
                <CTAText>
                    Il y a tout ce qu'il vous faut dans notre boutique !
                </CTAText>
                <ArrowContainer>
                    <MdOutlineKeyboardArrowDown
                        style={{ width: '4rem', height: '4rem' }}
                    />
                </ArrowContainer>
                <CallToAction link="/products" text="Shop Now" />
            </CallToActionContainer>
            <NewsletterForm />
        </>
    );
};

export default Home;
