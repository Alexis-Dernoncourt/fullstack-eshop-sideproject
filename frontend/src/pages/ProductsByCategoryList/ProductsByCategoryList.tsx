import Card from '../../components/Card/Card';
import Widget from '../../components/Widget/Widget';
import { Container, ProductsContainer } from '../ProductList/ProductList.style';
import { useGetAllPublishedByCategoryQuery } from '../../redux/apiSlice';
import { Product } from '../../typescript/types';
import { useSearchParams } from 'react-router-dom';

const ProductByCategoryList = () => {
    let [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    console.log(category);

    const { data, isLoading, isError } = useGetAllPublishedByCategoryQuery(
        category!
    );
    console.log(data);

    if (isLoading) {
        return <p style={{ width: '100%', textAlign: 'center' }}>Loading...</p>;
    }
    if (isError) {
        return <p style={{ width: '100%', textAlign: 'center' }}>Erreur...</p>;
    }

    return (
        <Container>
            <Widget />
            <ProductsContainer>
                {data?.products &&
                    data.products.map((data: Product) => (
                        <Card
                            key={data._id}
                            id={data._id}
                            img={data.img}
                            title={data.title}
                            textContent={data.textContent}
                            productInfo={data.productInfo}
                            price={data.price}
                            categories={data.categories}
                            options={data.options}
                            page="list"
                        />
                    ))}
            </ProductsContainer>
        </Container>
    );
};

export default ProductByCategoryList;
