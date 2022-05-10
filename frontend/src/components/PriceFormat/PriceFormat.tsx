type PriceType = {
    price: number;
};

const PriceFormat = ({ price }: PriceType) => {
    const formatedPrice = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
    }).format(price);

    return <>{formatedPrice}</>;
};

export default PriceFormat;
