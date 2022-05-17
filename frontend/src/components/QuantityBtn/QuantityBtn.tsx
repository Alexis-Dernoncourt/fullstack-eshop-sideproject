import { QuantityContainer, QtyInput, QtyButton } from './QuantityBtn.style';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { ChangeEventHandler, useEffect } from 'react';

type QtyProps = {
    quantity: number;
    defaultVal: number;
    setQuantity: Function;
    register: Function;
    setValue: Function;
    page: string;
};

const QuantityBtn = ({
    quantity,
    defaultVal,
    setQuantity,
    register,
    setValue,
    page,
}: QtyProps) => {
    useEffect(() => {
        if (defaultVal && defaultVal > 1) {
            setQuantity(defaultVal);
        }
    }, []);

    const handleQuantity: ChangeEventHandler<HTMLInputElement> = (e) => {
        setQuantity(quantity < 1 ? 1 : parseInt(e.target.value));
    };

    const handleChangeQuantity = (valueOfChange: string) => {
        let initialValueOfQuantity = quantity;
        if (valueOfChange === '-') {
            setQuantity(quantity > 1 ? --initialValueOfQuantity : 1);
            setValue('quantity', initialValueOfQuantity);
        }
        if (valueOfChange === '+') {
            setQuantity(++initialValueOfQuantity);
            setValue('quantity', initialValueOfQuantity);
        }
    };

    return (
        <QuantityContainer page={page}>
            <QtyButton
                type="button"
                onClick={() => handleChangeQuantity('-')}
                className={`${quantity === 1 ? 'disabled' : null}`}
            >
                <FaMinus />
            </QtyButton>
            <QtyInput
                type="number"
                placeholder="Quantité"
                min={1}
                value={quantity}
                {...register('quantity', {
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                        handleQuantity(e);
                    },
                    valueAsNumber: true,
                    required: true,
                    pattern: /[0-9]+$/i,
                })}
            />
            <QtyButton type="button" onClick={() => handleChangeQuantity('+')}>
                <FaPlus />
            </QtyButton>
        </QuantityContainer>
    );
};

export default QuantityBtn;
