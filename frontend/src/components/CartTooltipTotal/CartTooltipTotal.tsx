import { selectAllCartItems } from '../../redux/cartSlice';
import { useAppSelector } from '../../redux/hooks';

interface CartItemsI {
    couleur: string;
    image: string;
    productName: string;
    productId: string;
    quantity: number;
    taille: string;
    uid: string;
    unitPrice: number;
}

const CartTooltipTotal = () => {
    const itemsInCart = useAppSelector(selectAllCartItems);

    const TotalItemsInCart: number = itemsInCart
        .map((item: CartItemsI) => {
            return item.quantity;
        })
        .reduce((prev: number, next: number) => prev + next, 0);

    return <>{TotalItemsInCart}</>;
};

export default CartTooltipTotal;
