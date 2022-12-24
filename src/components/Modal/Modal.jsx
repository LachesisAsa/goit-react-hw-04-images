import { Overlay, ModalContainer } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ url, onModalClose }) => {
  useEffect(() => {
    window.addEventListener('keydown', onCloseEsc);

    return () => {
      window.removeEventListener('keydown', onCloseEsc);
    };
  });

  const onCloseEsc = e => {
    if (e.code === 'Escape') {
      onModalClose();
    }
  };

  const onCloseBackdrop = e => {
    if (e.currentTarget === e.target) {
      onModalClose();
    }
  };

  return (
    <Overlay onClick={onCloseBackdrop}>
      <ModalContainer>
        <img src={url} alt={url} width="900" height="680" />
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};