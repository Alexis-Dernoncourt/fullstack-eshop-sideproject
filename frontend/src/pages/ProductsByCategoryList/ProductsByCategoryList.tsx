import Card from '../../components/Card/Card';
import Widget from '../../components/Widget/Widget';
import { Container, ProductsContainer } from '../ProductList/ProductList.style';
import { useGetAllPublishedByCategoryQuery } from '../../redux/products/productsApiSlice';
import { Product } from '../../typescript/types';
import { Link, useSearchParams } from 'react-router-dom';

const ProductByCategoryList = () => {
    let [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    const { data, isLoading, isError } = useGetAllPublishedByCategoryQuery(
        category!
    );

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
                {data.products && data.productsTotal > 0 ? (
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
                    ))
                ) : (
                    <div
                        style={{
                            width: '100%',
                            fontSize: 'var(--fz-md)',
                            padding: '0 1.5rem',
                        }}
                    >
                        <p
                            style={{
                                width: '100%',
                                textAlign: 'center',
                                padding: '1.5rem 0',
                                marginBottom: '4rem',
                                color: 'darkred',
                            }}
                        >
                            Il n'y a pas d'articles avec cette catégorie...
                        </p>
                        <Link to="/products" className="link">
                            Retour à la liste des articles
                        </Link>
                    </div>
                )}
            </ProductsContainer>
        </Container>
    );
};

export default ProductByCategoryList;
