import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Searchbar } from "../SearchBar/SearchBar";
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { Modal } from '../Modal/Modal'
import {fetchPhotos} from 'components/api';
import styles from './App.module.css'

export const App =()=> {

const [cards, setCards]=useState([]);
const [search, setSearch]=useState("");
const [error, setError]=useState("");
const [loading, setLoading]=useState(false);
const [page, setPage]=useState(1);
const [showModal, setShowModal]=useState(false);
const [modalImage, setModalImage]=useState(null);

   
  useEffect(()=> {
    if (search !== '') {
      setTimeout(fetchPosts(), 600) 
    }
  })
 const fetchPosts = async() => {
    
    try {
      const data = await fetchPhotos(search, page);
      const dataArray = [];
      data.map(({ id, webformatURL, largeImageURL }) => dataArray.push({ id, webformatURL, largeImageURL })
      )
      if (dataArray.length === 0) {
        Notiflix.Notify.failure('not found any picture!');
        return dataArray;
      };
    console.log(data)
      const newCards = await fetchPhotos(search, page);
      setCards({
        cards: [...cards, ...newCards]
            }
          
        )
        console.log(newCards)
      }
      catch (error) {
        setError(error 
        )
      }
      finally {setLoading( false  
        )
      }

  }
  useEffect(() => {
    if (error) {
      console.log(error)
    }
  },[error])

  const onSubmit = (e) => {
    e.preventDefault()
    const searchValue = e.target.elements.searchInput.value
    if (searchValue !== "" && searchValue !== search) {
      setCards([])
      setSearch(searchValue)
      setPage(1)
      setError('')
      setLoading(true)
     
    } else if (searchValue === "") {
      Notiflix.Notify.info('input is empty!');
    }  
  }

 const onLoadMore = () => {
    setPage(page + 1)
    setLoading(true)
  }
  
  
  const toggleModal = (card) => {
    setShowModal(!showModal);
    setModalImage(card)
  }
  
  

    return (
      <div className={styles.app}>
        <Searchbar onSubmit={onSubmit}  />
        <ImageGallery cards={cards} onOpen={toggleModal} />
        {loading && <Loader/>}
        {cards.length > 1 && cards &&<Button onLoadMore={onLoadMore} />}
        {showModal && modalImage && (<Modal onClose={toggleModal} modalImage={modalImage} />)}
      </div>
    );
}
  

