import React, { memo, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import classnames from 'classnames';

import { useEventListener } from 'hooks/useEventListener';

/**!
 * TODO : FUTURE IMPLEMENTATIONS
 * Allow users to change more than just translateX and translateY properties (ie. opacity? scale?)
 */

const initialState = {
  stage: { element: null, height: 0, offset: {}, width: 0 },
  scroll: { start: 0, end: 0 },
};

const useStyles = makeStyles(({ spacing }) => ({
  pbsStage: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
  pbsStageAct: {
    minHeight: '100%',
    overflow: 'hidden',
  },
}));

export default React.forwardRef(
  ({ children, className, enablePerformances, performances }, ref) => {
    const classes = useStyles();
    const [stageReady, setStageReady] = useState(false);
    const [performers, setPerformers] = useState([]);
    // const [scrollPosition, setScrollPosition] = useState(0);
    const [state, setState] = useState(initialState);
    const performerRefs = useRef([]);
    const stageRef = useRef();
    const stageActRef = useRef();

    const handleScrollActivity = () => {
      // setScrollPosition(stageRef.current.scrollTop);
      performers.forEach(setPerformerCSSPosition);
    };

    /**
     *
     * @param {*} performer
     */
    const setPerformerCSSPosition = performer => {
      const [property, value] = getPerformerPosition(performer, stageRef.current.scrollTop);
      let transformCSSString = combineWithOriginalCSSTransform(
        property,
        value,
        performer.originalTransform
      );

      if (property && value) {
        performer.element.style.transform = transformCSSString;
      }
    };

    /**
     *
     * @param {*} property
     * @param {*} value
     * @param {*} originalTransform
     * @returns
     */
    const combineWithOriginalCSSTransform = (property, value, originalTransform) => {
      let propertyAlreadyIncluded = false;
      let cssString = '';

      if (originalTransform) {
        Object.keys(originalTransform).forEach(propertyName => {
          if (propertyName === property) {
            // combine lib's property value with user's original transform value for same property
            propertyAlreadyIncluded = true;
          } else {
            const propertyValue = originalTransform[propertyName].join(', ');

            cssString += `${propertyName}(${propertyValue}) `;
          }
        });
      }

      if (!propertyAlreadyIncluded) {
        cssString += `${property}(${value})`;
      }

      return cssString;
    };

    const performerAtTargetPosition = (direction, movement) => {
      return (
        (['left', 'top'].includes(direction) && movement >= 0) ||
        (['right', 'bottom'].includes(direction) && movement <= 0)
      );
    };

    /**
     *
     * @param {*} anchorPosition // TODO default top for vertical, left for horizontal scroll
     * @param {*} originalPosition
     * @returns
     */
    const getAnchorCoordinates = (anchorPosition = 'top', { top, left, width, height }) => {
      const mapping = {
        top: { top, left: left + width / 2 },
        left: { top: top + height / 2, left },
        right: { top: top + height / 2, left: left + width },
        bottom: { top: top + height, left: left + width / 2 },
        center: { top: top + height / 2, left: left + width / 2 },
        topLeft: { top, left },
        topRight: { top, left: left + width },
        bottomLeft: { top: top + height, left },
        bottomRight: { top: top + height, left: left + width },
      };

      return mapping[anchorPosition];
    };

    /**
     * Assumes values between 0 - 1 are percentages
     * Converts values above 1 into percentage decimals (eg, 37 equals 0.37)
     * @param {*} targetValue
     * @param {*} stageRect
     */
    const getTargetStagePosition = (targetValue = 0.5, { width, height }) => {
      if (isNaN(+targetValue)) {
        // throw error -- not a valid target value
        return;
      }

      let percentage = +targetValue > 1 ? +targetValue / 100 : +targetValue;

      return { left: width * percentage, top: height * percentage };
    };

    /**
     * Extracts CSS transform properties from element
     * @param {string} cssTransformProperty
     * @returns
     */
    const extractCSSTransformProperties = cssTransformProperty => {
      if (!cssTransformProperty) return null;

      const separateTransformPropertyRegex = new RegExp(/(\w+\(.*?\))/g);
      const splitAtParenthesesAndCommas = new RegExp(/[(|,|)]/);
      const transformProperties = cssTransformProperty.match(separateTransformPropertyRegex);

      return transformProperties.reduce((acc, transformProperty) => {
        // TODO: Check if the array has values, maybe even check if values are valid?
        const splitProperty = transformProperty.split(splitAtParenthesesAndCommas);
        const property = splitProperty[0];
        const values = splitProperty.slice(1, splitProperty.length - 1).map(p => p.trim());

        acc[property] = values;

        return acc;
      }, {});
    };

    /**
     *
     * @param {*} performer
     * @param {number} index
     */
    const setupPerformer = (performer, index) => {
      const childElements = React.Children.toArray(children);
      const performance =
        (performances && performances[index]) ||
        (childElements && childElements[index]?.props?.performance);

      if (performance && enablePerformances) {
        performer.performance = performance;

        if (!Object.prototype.hasOwnProperty.call(performer, 'originalPosition')) {
          performer.originalPosition = performer.element.getBoundingClientRect();
        }

        if (!Object.prototype.hasOwnProperty.call(performer, 'originalTransform')) {
          const transformPropertyData = extractCSSTransformProperties(
            performer.element.style.transform
          );

          performer.originalTransform = transformPropertyData;
        }

        if (!Object.prototype.hasOwnProperty.call(performer, 'anchorPoint')) {
          performer.anchorPoint = getAnchorCoordinates(
            performance.anchorPosition,
            performer.originalPosition
          );
        }

        // TODO: let users determine where it is. right now it's centered vertically or horizontally, default: center of container element
        performer.targetStagePosition = getTargetStagePosition(
          performance.targetPosition,
          state.stage.offset
        );

        setPerformerCSSPosition(performer);
      }

      return performer;
    };

    /**
     *
     * @param {*} performer The current element of interest's ref object.
     * @param {*} currentScrollPosition The stage's scrollTop (or scrollLeft) position. Imagine this as the time elapsed during a play; except, you can rewind time by scrolling back the other way.
     * @returns
     */
    const getPerformerPosition = (performer, currentScrollPosition) => {
      if (performer && performer.performance) {
        // TODO: handle horizontal scrolling using state.stage.offset.left
        const containerOffset = state.stage.offset.top;
        const { anchorPoint, performance, originalTransform, targetStagePosition } = performer;

        // TODO: handle horizontal scrolling by using property 'left' in place of top
        const movement =
          (anchorPoint.top - currentScrollPosition - targetStagePosition.top - containerOffset) *
          performance.movementMultiplier;

        // TODO: handle translate property for dynamic movements
        const translateProperty = ['left', 'right'].includes(performance.direction)
          ? 'translateX'
          : 'translateY';

        const translateMovement = ['left', 'top'].includes(performance.direction)
          ? -movement
          : movement;

        if (
          performerAtTargetPosition(performance.direction, translateMovement) &&
          !performance.passThrough
        ) {
          return [translateProperty, '0px']; // should account for user translate css
        } else {
          return [translateProperty, `${translateMovement}px`];
        }
      }

      return [null, null];
    };

    const renderChildren = () => {
      if (!children[1]) return children;

      return React.Children.map(children, (child, i) => {
        // TODO: Do the child elements update properly if they change?
        // TODO: The performance prop is being passed to the root HTML element :(
        return child
          ? React.cloneElement(child, {
              ref: element => (performerRefs.current[i] = { element }),
            })
          : null;
      });
    };

    useEffect(() => {
      if (stageRef.current && stageActRef.current) {
        setState({
          stage: {
            element: stageRef.current,
            height: stageRef.current.clientHeight,
            offset: stageRef.current.getBoundingClientRect(),
            computed: window.getComputedStyle(stageRef.current),
            width: stageRef.current.clientWidth,
          },
          scroll: {
            start: 0,
            end: stageActRef.current.clientHeight - stageRef.current.clientHeight,
          },
        });

        setStageReady(true);
      }
    }, [stageRef, stageActRef]);

    useEffect(() => {
      if (stageReady) {
        const performers = performerRefs.current.map(setupPerformer);

        setPerformers(performers);
      }
    }, [performerRefs.current, stageReady]);

    useEventListener('scroll', handleScrollActivity, stageRef.current);

    return (
      <Box
        className={classnames([classes.pbsStage])}
        ref={node => {
          stageRef.current = node;
          ref.current = node;
        }}
      >
        <Box
          className={classnames([classes.pbsStageAct, className])}
          ref={stageActRef}
          // style={{ paddingTop: 400, height: 1500 }}
        >
          {children && renderChildren()}
        </Box>
      </Box>
    );
  }
);
