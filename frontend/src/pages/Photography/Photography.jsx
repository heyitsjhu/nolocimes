import React, { useCallback, useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PhotoGallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';

import { GalleryImage } from 'components';
import { STORE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { AppContext } from 'stores';
import { fetchContentImages } from 'stores/actions/contentActions';
import PageLayout from '../PageLayout/PageLayout';

const useStyles = makeStyles(({ palette, spacing }) => ({
  photographyLayout: {
    padding: 0,
  },
  galleryContainer: {},
  modalGateway: {},
}));

export default () => {
  const { t } = useCopy();
  const classes = useStyles();
  const [appState, dispatch] = useContext(AppContext);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const images = appState[STORE_KEYS.CONTENT][STORE_KEYS.IMAGES];

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  useEffect(() => {
    fetchContentImages(appState[STORE_KEYS.CONTENT]).then(dispatch);
  }, [dispatch]);

  useEffect(() => {
    const photos = formatImagesData(images);
    setPhotos(photos);
  }, [images]);

  const formatImagesData = images => {
    if (images && images.length > 0) {
      return images.map(({ fields }) => {
        const { width, height } = fields.file.details.image;
        const divisor = Math.min(width, height);

        return {
          alt: fields.description,
          caption: fields.description,
          src: fields.file.url,
          width: (width / divisor) * 2,
          height: (height / divisor) * 2,
        };
      });
    } else {
      return [];
    }
  };

  const imageRenderer = useCallback(
    ({ key, direction, photo, margin, top, left, index, onClick }) => (
      <GalleryImage
        key={key}
        direction={direction}
        photo={photo}
        margin={'2px'}
        top={top}
        left={left}
        index={index}
        onPhotoSelect={onClick}
      />
    ),
    []
  );

  return (
    <PageLayout pageName="photography" className={classes.photographyLayout}>
      <PhotoGallery
        className={classes.galleryContainer}
        photos={photos}
        renderImage={imageRenderer}
        onClick={openLightbox}
      />
      <ModalGateway className={classes.modalGateway}>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                source: x.src,
                // srcset: x.srcSet,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </PageLayout>
  );
};
