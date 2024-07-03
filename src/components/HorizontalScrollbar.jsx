import React, { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Box, Typography } from '@mui/material';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import '../HorizontalScrollbar.css'; // Import your CSS file for styling

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <div className="arrow left-arrow" onClick={() => scrollPrev()}>
      <img src={LeftArrowIcon} alt="left-arrow" />
    </div>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <div className="arrow right-arrow" onClick={() => scrollNext()}>
      <img src={RightArrowIcon} alt="right-arrow" />
    </div>
  );
};


const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => {
  const handleWheel = (apiObj, event) => {
    if (event.deltaY === 0) return;

    // Scroll by a fixed amount instead of preventing default
    const isScrollingDown = event.deltaY > 0;
    if (isScrollingDown) {
      apiObj.scrollNext();
    } else {
      apiObj.scrollPrev();
    }
  };

  return (
    <div className="horizontal-scrollbar">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} onWheel={handleWheel}>
        {data.map((item) => (
          <Box
            key={item.id || item}
            itemID={item.id || item} // Changed to itemID
            title={item.id || item}
            m="0 40px"
          >
            {bodyParts ? <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} /> : <ExerciseCard exercise={item} />}
          </Box>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default HorizontalScrollbar;
