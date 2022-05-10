import { useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import Img1 from '../../assets/images/slider/01.jpg';
import Img2 from '../../assets/images/slider/02.jpg';
import Img3 from '../../assets/images/slider/03.jpg';
import {
    Container,
    ArrowContainer,
    Wrapper,
    ImgContainer,
    Img,
    SliderText,
} from './Slider.style';

const Slider = () => {
    const [index, setIndex] = useState(0);
    const images = [
        { img: Img1, text: 'Des promos incroyables !' },
        { img: Img2, text: 'SHOP, SHOP, SHOP !' },
        { img: Img3, text: 'Ayez le sourire !' },
    ];

    const handleArrow = (direction: string) => {
        if (direction === 'l') {
            setIndex(index !== 0 ? index - 1 : 2);
        }
        if (direction === 'r') {
            setIndex(index !== 2 ? index + 1 : 0);
        }
    };

    return (
        <Container>
            <ArrowContainer
                style={{ left: 0 }}
                onClick={() => handleArrow('l')}
            >
                <MdArrowBackIosNew style={{ width: '7em', height: '7em' }} />
            </ArrowContainer>
            <Wrapper style={{ transform: `translateX(${-100 * index}vw)` }}>
                {images.map((obj, i) => (
                    <ImgContainer key={i}>
                        <Img src={obj.img} alt="" />
                        <SliderText>{obj.text}</SliderText>
                    </ImgContainer>
                ))}
            </Wrapper>
            <ArrowContainer
                style={{ right: 0 }}
                onClick={() => handleArrow('r')}
            >
                <MdArrowForwardIos style={{ width: '7em', height: '7em' }} />
            </ArrowContainer>
        </Container>
    );
};

export default Slider;
