import { GalleryItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal';
import { useState } from 'react';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <GalleryItem>
        <Image
          src={webformatURL}
          alt={webformatURL}
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </GalleryItem>
      {isModalOpen && (
        <Modal
          url={largeImageURL}
          onModalClose={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};