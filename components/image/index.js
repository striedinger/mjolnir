import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

const placeholderImage = (height = 150, width = 300, color = "#ddd") => {
  const string = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect fill="${color}" width="${width}" height="${height}"/>
    </svg>
  `;
  const cleaned = string
    .replace(/[\t\n\r]/gim, '') // Strip newlines and tabs
    .replace(/\s\s+/g, ' ') // Condense multiple spaces
    .replace(/'/gim, '\\i'); // Normalize quotes

  const encoded = encodeURIComponent(cleaned)
    .replace(/\(/g, '%28') // Encode brackets
    .replace(/\)/g, '%29');
  return `data:image/svg+xml;charset=UTF-8,${encoded}`; 
};

const Image = props => {
  const { height, src, width } = props;
  const placeholder = placeholderImage(height, width);
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState();

  const onLoad = event => {
    event.target.classList.add('loaded');
  };

  const onError = event => {
    event.target.classList.add('error');
    event.target.style.content = `url(${placeholder})`;
  };

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc !== src) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          })
        },
        {
          threshold: 0.01,
          rootMargin: '25%'
        }
      );
      observer.observe(imageRef);
    }

    return () => {
      didCancel = true;
      if (observer && observer.unobserve) observer.unobserve(imageRef);
    }
  }, [src, imageSrc, imageRef]);

  return <img className={styles.image} ref={setImageRef} src={imageSrc} onLoad={onLoad} onError={onError} />;
};

export default Image;
