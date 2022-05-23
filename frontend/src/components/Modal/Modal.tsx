import {
    Overlay,
    Wrapper,
    ModalContainer,
    ModalContent,
    Text,
    SubText,
    BtnContainer,
    ConfirmBtn,
    CloseBtn,
} from './Modal.style';

interface ModalProps {
    modalText: string;
    ModalDangerInfo?: string;
    validTextBtn: string;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setConfirmAction: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({
    modalText,
    ModalDangerInfo,
    validTextBtn,
    setShowModal,
    setConfirmAction,
}: ModalProps) => {
    const handleConfirm = () => {
        setConfirmAction(true);
        setShowModal(false);
    };
    return (
        <Overlay>
            <Wrapper>
                <ModalContainer>
                    <ModalContent>
                        <Text>{modalText}</Text>
                        {ModalDangerInfo && (
                            <SubText>{ModalDangerInfo}</SubText>
                        )}
                        <BtnContainer>
                            <ConfirmBtn onClick={handleConfirm}>
                                {validTextBtn}
                            </ConfirmBtn>
                            <CloseBtn onClick={() => setShowModal(false)}>
                                Annuler
                            </CloseBtn>
                        </BtnContainer>
                    </ModalContent>
                </ModalContainer>
            </Wrapper>
        </Overlay>
    );
};

export default Modal;
