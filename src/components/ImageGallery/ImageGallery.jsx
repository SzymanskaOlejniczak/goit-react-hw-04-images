import PropTypes from 'prop-types'
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem'
import styles from './ImageGallery.module.css'

export const ImageGallery=({ cards, onOpen })=> {
    return (
        <ul className={styles.image_gallery}>
             {cards.map(card => {
                return (
                    <ImageGalleryItem 
                        key={card.id} 
                        webformatURL={card.webformatURL} 
                        largeImageURL={card.largeImageURL} 
                        onOpen={onOpen} 
                    />
                )
             })
            }
        </ul>
    );
};

ImageGallery.propTypes = {
    onOpen: PropTypes.func.isRequired,
    cards: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired
    }))
}