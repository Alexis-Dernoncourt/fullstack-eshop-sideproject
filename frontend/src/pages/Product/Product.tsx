import { useLocation } from 'react-router-dom';
import AddToCartZone from '../../components/AddToCartZone/AddToCartZone';
import { PriceItem } from '../../components/Card/Card.style';
import {
    Container,
    ImgContainer,
    ProductImg,
    ProductInfosContainer,
    ProductCategories,
    ProductLink,
    ProductTextContent,
    PriceContainer,
} from './Product.style';
import { TitleH2 } from '../../styles/GeneralComponents';
import PriceFormat from '../../components/PriceFormat/PriceFormat';

type LocationStateType = {
    state: any;
};

const Product = () => {
    const location: LocationStateType = useLocation();
    const data = location.state;
    const categoriesArray: string[] = data.categories.split(',');

    return (
        <Container>
            <ImgContainer>
                <ProductImg src={data.img} />
            </ImgContainer>
            <ProductInfosContainer>
                <TitleH2>{data.title}</TitleH2>
                <ProductCategories>
                    Catégories :{' '}
                    {categoriesArray.map((element: string, i: number) => (
                        <ProductLink
                            key={element + i}
                            to={`/products/filter?category=${element}`}
                            className="link"
                        >
                            {element.toUpperCase()}
                        </ProductLink>
                    ))}
                </ProductCategories>
                <ProductTextContent>{data.textContent}</ProductTextContent>
                <PriceContainer>
                    <PriceItem>
                        <PriceFormat price={data.price} />
                        <small style={{ marginLeft: '1rem' }}>l'unité</small>
                    </PriceItem>
                </PriceContainer>
                <AddToCartZone
                    id={data.id}
                    uid={data.uid}
                    img={data.img}
                    name={data.title}
                    price={data.price}
                    options={data.options}
                />
            </ProductInfosContainer>
        </Container>
    );
};

export default Product;
