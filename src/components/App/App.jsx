import { useState } from 'react';
import Notiflix from 'notiflix';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Searchbar } from '../SearchBar/SearchBar';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { fetchPhotos } from 'API/api';
import styles from './App.module.css';

export const App = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const onSubmit = () => {
    if (search) {
      const firstPage = 1;
      setCards([]);
      setPage(firstPage);
      fetchSearch(firstPage);
    }
  };

  const onInputChange = e => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (search.trim() === '') {
      alert.error('Enter your search query');
      return;
    }
    onSubmit(search);
  };

  const fetchSearch = async numPage => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchPhotos(search, numPage);
      const dataArray = [];
      response.map(({ id, webformatURL, largeImageURL }) =>
        dataArray.push({ id, webformatURL, largeImageURL })
      );
      if (dataArray.length === 0) {
        Notiflix.Notify.failure('not found any picture!');
        return dataArray;
      }

      setCards(prevState => [...prevState, ...response]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onLoadMore = () => {
    setPage(page + 1);
    fetchSearch(page + 1);
  };

  const toggleModal = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const onClose = () => {
    setShowModal(false);
    setLargeImageURL('');
  };
  return (
    <div className={styles.app}>
      {error && <p>Something went wrong: {error.message}</p>}
      <Searchbar
        handleSubmit={handleSubmit}
        onInputChange={onInputChange}
        search={search}
      />
      <ImageGallery cards={cards} onClick={toggleModal} />
      {loading && <Loader />}
      {cards.length > 0 && !loading ? <Button onClick={onLoadMore} /> : ''}
      {showModal && <Modal onClose={onClose} card={largeImageURL} />}
    </div>
  );
};
