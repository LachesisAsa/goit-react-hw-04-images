import { Container, Text } from './App.styled';
import { Searchbar } from 'components/Searchbar';
import { useEffect, useState } from 'react';
import * as API from '../../services/api';
import { ImageGallery } from 'components/ImageGallery';
import { Loader } from 'components/Loader';
import { Button } from 'components/Button';
import { Notification } from 'components/Notification';

export const App = () => {
  const [searchWord, setSearchWord] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(0);
  const totalPage = totalHits / 12;

  useEffect(() => {
    if (searchWord === '') {
      return;
    }

    const fetch = async () => {
      try {
        setStatus('pending');
        const galleryList = await API.fetchApiGallery(searchWord, page);
        setGallery(prevState => [...prevState, ...galleryList.newData]);
        setTotalHits(galleryList.totalHits);
        setStatus('resolved');
      } catch (error) {
        setError(true);
        setStatus('rejected');
      }
    };

    fetch();
  }, [searchWord, page]);

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onSubmit = data => {
    setSearchWord(data);
    setPage(1);
    setGallery([]);
  };

  return (
    <>
      <Container>
        <Searchbar onSubmit={onSubmit} />
      </Container>
      {status === 'idle' && <Text>Enter key word on form</Text>}
      {status === 'pending' && gallery.length === 0 && <Loader />}
      {gallery.length > 0 && (
        <Container>
          <ImageGallery gallery={gallery} />
          {status === 'pending' && <Loader />}
          {totalPage > page && <Button onClick={loadMore} />}
        </Container>
      )}

      {status === 'resolved' && gallery.length === 0 && (
        <Notification message={'Nothing found for your request'} />
      )}
      {status === 'rejected' && <Notification message={error.message} />}
    </>
  );
};