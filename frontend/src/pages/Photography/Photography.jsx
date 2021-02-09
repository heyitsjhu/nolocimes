import React, { useCallback, useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PhotoGallery from 'react-photo-gallery';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

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
  lightbox: {
    '& .ril__inner': { backgroundColor: palette.overlay.darkest },
    '& .ril__toolbar': { backgroundColor: palette.overlay.darkest, height: 40 },
    '& .ril__toolbarSide': { height: 40 },
    '& .ril__toolbarItem': { lineHeight: '40px' },
    '& .ril__toolbarItemChild': { fontSize: '1.125rem', color: palette.grey[100] },
    '& .ril__caption': { backgroundColor: palette.overlay.darkest, height: 40 },
    '& .ril__captionContent': { fontSize: '0.875rem', color: palette.grey[200] },
    '& .ril__builtinButton': { width: 'auto', height: 30, outline: 'none' },
    '& .ril__image': { height: '100%' },
    '& .ril__navButtons': {
      padding: `${spacing(4)}px ${spacing(3)}px`,
      height: 120,
      outline: 'none',
    },
    '& .ril-prev-button': {
      background:
        'rgba(0, 0, 0, 0.4) url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDE5LDMgLTIsLTIgLTE2LDE2IDE2LDE2IDEsLTEgLTE1LC0xNSAxNSwtMTUgeiIgZmlsbD0iI0ZGRiIvPjwvc3ZnPg==") no-repeat center',
    },
    '& .ril-next-button': {
      background:
        'rgba(0, 0, 0, 0.4) url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjM0Ij48cGF0aCBkPSJtIDEsMyAyLC0yIDE2LDE2IC0xNiwxNiAtMSwtMSAxNSwtMTUgLTE1LC0xNSB6IiBmaWxsPSIjRkZGIi8+PC9zdmc+") no-repeat center',
    },
  },
}));

export default () => {
  const { t } = useCopy();
  const classes = useStyles();
  const [appState, dispatch] = useContext(AppContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const images = appState[STORE_KEYS.CONTENT][STORE_KEYS.IMAGES];

  const openLightbox = useCallback((event, { photo, index }) => {
    console.log(index);
    setCurrentImageIndex(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImageIndex(0);
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
          title: fields.title,
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
    <PageLayout pageName="photography" pageLayoutClassName={classes.photographyLayout}>
      <PhotoGallery
        className={classes.galleryContainer}
        photos={photos}
        renderImage={imageRenderer}
        onClick={openLightbox}
      />
      {viewerIsOpen ? (
        <Lightbox
          clickOutsideToClose
          enableZoom={false}
          imageCaption={photos[currentImageIndex].caption || ''}
          imagePadding={1}
          imageTitle={photos[currentImageIndex].title || undefined}
          mainSrc={photos[currentImageIndex].src}
          nextSrc={photos[(currentImageIndex + 1) % photos.length].src}
          prevSrc={photos[(currentImageIndex + photos.length - 1) % photos.length].src}
          reactModalProps={{ className: classes.lightbox }}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() =>
            setCurrentImageIndex((currentImageIndex + photos.length - 1) % photos.length)
          }
          onMoveNextRequest={() => setCurrentImageIndex((currentImageIndex + 1) % photos.length)}
        />
      ) : null}
    </PageLayout>
  );
};
