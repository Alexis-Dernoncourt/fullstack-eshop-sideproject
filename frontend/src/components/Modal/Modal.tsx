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
    setAbortAction: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({
    modalText,
    ModalDangerInfo,
    validTextBtn,
    setShowModal,
    setConfirmAction,
    setAbortAction,
}: ModalProps) => {
    const handleConfirm = () => {
        setConfirmAction(true);
        setShowModal(false);
    };
    const handleCancel = () => {
        setAbortAction && setAbortAction(false);
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
                            <CloseBtn onClick={handleCancel}>Annuler</CloseBtn>
                        </BtnContainer>
                    </ModalContent>
                </ModalContainer>
            </Wrapper>
        </Overlay>
    );
};

export default Modal;
