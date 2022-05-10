import {
    InputContainer,
    SelectInput,
    ErrorMsg,
    SelectOption,
} from './ProductOptionsInput.style';

type OptionsProps = {
    register: Function;
    defaultVal: string;
    errors: any;
    options: { taille: string[]; couleur: string[] };
    fieldName: string;
    page: string;
};

const ProductOptionsInput = ({
    register,
    defaultVal,
    errors,
    options,
    fieldName,
    page,
}: OptionsProps) => {
    return (
        <InputContainer>
            <SelectInput
                {...register(`${fieldName}`, {
                    required: 'Ce champs est obligatoire',
                    validate: (value: string) => value !== '',
                })}
                className={`${
                    errors && Object.keys(errors).includes(fieldName) && 'error'
                }`}
                page={page}
                defaultValue={defaultVal}
            >
                <SelectOption value="">
                    -- {fieldName.toUpperCase()} --
                </SelectOption>
                {fieldName === 'taille'
                    ? options.taille.map((val: string) => (
                          <SelectOption key={val} value={val}>
                              {val.trim().toUpperCase()}
                          </SelectOption>
                      ))
                    : options.couleur?.map((val: string) => (
                          <SelectOption key={val} value={val}>
                              {val.trim().toUpperCase()}
                          </SelectOption>
                      ))}
            </SelectInput>
            {fieldName === 'taille'
                ? errors &&
                  errors.taille && (
                      <ErrorMsg className="error-msg">
                          {page === 'cart'
                              ? '*Champs obligatoire'
                              : errors.taille?.message}
                      </ErrorMsg>
                  )
                : errors &&
                  errors.couleur && (
                      <ErrorMsg className="error-msg">
                          {page === 'cart'
                              ? '*Champs obligatoire'
                              : errors.couleur?.message}
                      </ErrorMsg>
                  )}
        </InputContainer>
    );
};

export default ProductOptionsInput;
