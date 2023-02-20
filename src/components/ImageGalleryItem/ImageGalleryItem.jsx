import PropTypes from 'prop-types'
import styles from './ImageGalleryItem.module.css'

export function ImageGalleryItem({ card, onOpen }) {
    return (
        <li className={styles.gallery_item}>
        <img className={styles.gallery_item_image} src={card.webformatURL} alt="" onClick={()=>onOpen(card)} />
        </li>
    )
}

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    onOpen: PropTypes.func.isRequired
    }