import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

export function ImageGallery({ cards, onClick }) {
  return (
    <ul className={styles.image_gallery}>
      {cards.map(({ webformatURL, largeImageURL, id }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          onOpen={onClick}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
