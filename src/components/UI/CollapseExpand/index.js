import { useState, useRef, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';

export const CollapseExpand = ({ isOpen, children, defaultElem, ...props }) => {
  const contentRef = useRef(null);
  const [autoHeight, setAutoHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  const { height, opacity } = useSpring({
    from: { height: isOpen ? 0 : contentHeight, opacity: isOpen ? 0 : 1 },
    to: { height: isOpen ? contentHeight : 0, opacity: isOpen ? 1 : 0 },
    config: { ...config.default, precision: 0.1 },
    onRest: () => {
      if (isOpen) {
        setAutoHeight(true);
      }
    },
  });

  useEffect(() => {
    if (autoHeight && isOpen && !defaultElem) {
      contentRef.current.style.height = 'auto';
    }
  }, [autoHeight]);

  useEffect(() => {
    if (isOpen) {
      setAutoHeight(false);
    }
    setContentHeight(isOpen ? contentRef?.current?.scrollHeight : 0);
  }, [isOpen]);

  return defaultElem ? (
    children
  ) : (
    <animated.div style={{ height, opacity, overflow: 'hidden' }} ref={contentRef} {...props}>
      {children}
    </animated.div>
  );
};
