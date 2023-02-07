import { useCallback, useEffect, useRef, useState } from 'react';

let listenerCallbacks = new WeakMap();

const handleIntersections = (entries) => {
  entries.forEach((entry) => {
    if (!listenerCallbacks.has(entry.target)) {
      return;
    }

    let callback = listenerCallbacks.get(entry.target);

    if (!entry.isIntersecting) {
      return;
    }

    observer.unobserve(entry.target);
    listenerCallbacks.delete(entry.target);
    callback();
  });
};

let observer = new IntersectionObserver(handleIntersections, {
  root: null, // viweport
  rootMargin: "0px",
  threshold: "0.0"
});

const useIntersection = (ref, callback) => {
  useEffect(() => {
    const element = ref.current;
    listenerCallbacks.set(element, callback);
    observer.observe(element);

    return () => {
      listenerCallbacks.delete(element);
      observer.unobserve(element);
    };
  }, [ref, callback]);
};

const Image = ({ src, rowNumber }) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef();

  const callback = useCallback(() => {
    setIsInView(true);
  }, [setIsInView]);

  useIntersection(ref, callback);

  const gapToLoad = 100; // 100px

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        top: `${-gapToLoad * (rowNumber-1)}px`,
        paddingTop: `${gapToLoad}px`,
        height: "200px"
      }}
    >
    
    {isInView && <img src={src} alt="" />}

    </div>
  );
};

export default Image;