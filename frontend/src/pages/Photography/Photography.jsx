import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PhotoGallery from 'react-photo-gallery';
import LightBox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { GalleryImage, Helmet } from 'components';
import { SEO, SITE_KEYS } from 'const';
import { useCopy } from 'hooks/useCopy';
import { useEventListener } from 'hooks/useEventListener';
import { useContentfulService } from 'services/contentfulService';

import PageLayout from '../PageLayout/PageLayout';

const useStyles = isLandscape =>
  makeStyles(({ palette, spacing }) => ({
    photographyLayout: {
      padding: '0px !important',
    },
    galleryContainer: {},
    lightbox: {
      '& .ril__inner': { backgroundColor: palette.overlay.darkest },
      '& .ril__toolbar': { backgroundColor: palette.overlay.darkest, height: 40 },
      '& .ril__toolbarSide': { height: 40 },
      '& .ril__toolbarItem': { lineHeight: '40px' },
      '& .ril__toolbarItemChild': { fontSize: '1.125rem', color: palette.grey[100] },
      '& .ril__caption': { backgroundColor: palette.overlay.darkest, minHeight: 40 },
      '& .ril__captionContent': { fontSize: '0.875rem', color: palette.grey[200] },
      '& .ril__builtinButton': { width: 'auto', height: 30, outline: 'none' },
      '& .ril__image': { [isLandscape ? 'height' : 'width']: '90%' },
      '& .ril-image-current': { transform: 'none !important' },
      '& .ril-image-next': { transform: 'translate3d(200vw, 0px, 0px) !important' },
      '& .ril-image-prev': { transform: 'translate3d(-200vw, 0px, 0px) !important' },
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
  const content = useSelector(state => state.content);
  const { getAssets } = useContentfulService();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [isLandscape, setIsLandscape] = useState(false);
  const classes = useStyles(isLandscape)();
  const { images } = content;
  const nextImageIndex = (currentImageIndex + 1) % photos.length;
  const prevImageIndex = (currentImageIndex + photos.length - 1) % photos.length;
  const currentImage = photos[currentImageIndex];
  const nextImage = photos[nextImageIndex];
  const previousImage = photos[prevImageIndex];

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImageIndex(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImageIndex(0);
    setViewerIsOpen(false);
  };

  const updateWindowOrientation = () => {
    if (window.innerWidth >= window.innerHeight && !isLandscape) {
      setIsLandscape(true);
    } else if (window.innerWidth < window.innerHeight && isLandscape) {
      setIsLandscape(false);
    }
  };

  useEventListener('resize', updateWindowOrientation);

  useEffect(() => {
    getAssets();
    setIsLandscape(window.innerWidth >= window.innerHeight);
  }, []);

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
    <PageLayout pageName={SITE_KEYS.PHOTOGRAPHY} pageLayoutClassName={classes.photographyLayout}>
      <Helmet {...SEO.PHOTOGRAPHY(t)} />
      <PhotoGallery
        className={classes.galleryContainer}
        photos={photos}
        renderImage={imageRenderer}
        onClick={openLightbox}
      />
      {viewerIsOpen ? (
        <LightBox
          clickOutsideToClose
          enableZoom={false}
          imageCaption={currentImage.caption || ''}
          imageTitle={currentImage.title || undefined}
          mainSrc={currentImage.src}
          nextSrc={nextImage.src}
          prevSrc={previousImage.src}
          reactModalProps={{ className: classes.lightbox }}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() => setCurrentImageIndex(prevImageIndex)}
          onMoveNextRequest={() => setCurrentImageIndex(nextImageIndex)}
        />
      ) : null}
    </PageLayout>
  );
};
