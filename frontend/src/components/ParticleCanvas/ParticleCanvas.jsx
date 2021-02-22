/** Particle Canvas - Credit: Nokey (https://codepen.io/jkiss/pen/OVEeqK) */
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import { PARTICLE_CANVAS_MOBILE_DEFAULTS, STORE_KEYS } from 'const';
import { useEventListener } from 'hooks/useEventListener';
import { AppContext } from 'stores/providers/appProvider';
import { updateAppState } from 'stores/actions/appActions';
import { getElClass, getElId } from 'utils';

import { getDisOf, getRandomSpeed, randomArrayItem, randomNumFrom, randomSidePos } from './utils';

const useStyles = makeStyles(theme => ({
  canvas: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: theme.zIndex.particleCanvas,
  },
}));

export default () => {
  const classes = useStyles();
  const [appState, dispatch] = useContext(AppContext);
  const [isReady, setIsReady] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [canvasLeft, setCanvasLeft] = useState(0);
  const [canvasTop, setCanvasTop] = useState(0);
  const [ctx, setCtx] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(600);
  const [canvasHeight, setCanvasHeight] = useState(400);
  const { isOnMobile } = appState[STORE_KEYS.SITE_SETTINGS];

  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const particleState = useRef(appState[STORE_KEYS.PARTICLE_CANVAS]);
  const trackedParticles = useRef([]);

  const cursorParticle = particleState.cursorParticle;

  const initCanvas = useCallback(() => {
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    setCanvasWidth(parseInt(canvas.getAttribute('width')));
    setCanvasHeight(parseInt(canvas.getAttribute('height')));
  }, [canvas]);

  const initParticles = numSize => {
    const particles = [];
    for (let i = 1; i <= numSize; i++) {
      const position = randomArrayItem(['top', 'right', 'bottom', 'left']);
      particles.push({
        pos: position,
        x: randomSidePos(canvasWidth),
        y: randomSidePos(canvasHeight),
        r: particleState.current.particleRadius,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      });
    }

    trackedParticles.current = particles;
  };

  const setParticleSpeed = () => {
    Array.prototype.forEach.call(trackedParticles.current, (p, i) => {
      if (!Object.prototype.hasOwnProperty.call(p, 'type')) {
        p.vx = getRandomSpeed(p.pos)[0] / particleState.current.slowMultiplier;
        p.vy = getRandomSpeed(p.pos)[1] / particleState.current.slowMultiplier;
      }
    });
  };

  const getRandomParticle = () => {
    const position = randomArrayItem(['top', 'right', 'bottom', 'left']);
    const particleMapping = {
      top: {
        pos: position,
        x: randomSidePos(canvasWidth),
        y: -particleState.current.particleRadius,
        r: particleState.current.particleRadius,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      },
      right: {
        pos: position,
        x: canvasWidth + particleState.current.particleRadius,
        y: randomSidePos(canvasHeight),
        r: particleState.current.particleRadius,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      },
      bottom: {
        pos: position,
        x: randomSidePos(canvasWidth),
        y: canvasHeight + particleState.current.particleRadius,
        r: particleState.current.particleRadius,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      },
      left: {
        pos: position,
        x: -particleState.current.particleRadius,
        y: randomSidePos(canvasHeight),
        r: particleState.current.particleRadius,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      },
    };

    return particleMapping[position];
  };

  const renderParticles = () => {
    const { r, g, b } = particleState.current.particleColor;
    Array.prototype.forEach.call(trackedParticles.current, function (p, i) {
      if (!Object.prototype.hasOwnProperty.call(p, 'type')) {
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleState.current.particleRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
      }
    });
  };

  const renderLines = () => {
    const { r, g, b } = particleState.current.linkColor;
    let fraction, alpha;
    for (let i = 0; i < trackedParticles.current.length; i++) {
      for (let j = i + 1; j < trackedParticles.current.length; j++) {
        fraction =
          getDisOf(trackedParticles.current[i], trackedParticles.current[j]) /
          particleState.current.linkDistanceLimit;

        if (fraction < 1) {
          alpha = (1 - fraction).toString();
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth = particleState.current.linkWidth;
          ctx.beginPath();
          ctx.moveTo(trackedParticles.current[i].x, trackedParticles.current[i].y);
          ctx.lineTo(trackedParticles.current[j].x, trackedParticles.current[j].y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  };

  const updateParticles = () => {
    const newParticles = [];
    Array.prototype.forEach.call(trackedParticles.current, p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x > -50 && p.x < canvasWidth + 50 && p.y > -50 && p.y < canvasHeight + 50) {
        newParticles.push(p);
      }

      p.phase += particleState.current.particlePulseFrequency;
      p.alpha = Math.abs(Math.cos(p.phase));
    });

    trackedParticles.current = newParticles.slice(0);
  };

  const addParticleify = () => {
    const noOfParticles = trackedParticles.current.length;
    const { particleCount, particleThreshold } = particleState.current;

    if (noOfParticles < particleCount && noOfParticles < particleThreshold) {
      trackedParticles.current.push(getRandomParticle());
    }
  };

  const renderParticleCanvas = () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      setParticleSpeed();
      renderParticles();
      renderLines();
      updateParticles();
      addParticleify();

      requestRef.current = window.requestAnimationFrame(renderParticleCanvas);
    }
  };

  const handleMouseEnter = () => {
    trackedParticles.current.push(particleState.current.cursorParticle);
  };

  const handleMouseLeave = () => {
    let newParticles = [];
    Array.prototype.forEach.call(trackedParticles.current, p => {
      if (!Object.prototype.hasOwnProperty.call(p, 'type')) {
        newParticles.push(p);
      }
    });
    trackedParticles.current = newParticles.slice(0);
  };

  const handleMouseMove = e => {
    const event = e || window.event;
    particleState.current.cursorParticle.x = event.pageX;
    particleState.current.cursorParticle.y = event.pageY;
  };

  useEventListener('resize', initCanvas);
  useEventListener('mouseenter', handleMouseEnter, canvas);
  useEventListener('mouseleave', handleMouseLeave, canvas);
  useEventListener('mousemove', handleMouseMove, canvas);

  useEffect(() => {
    if (isOnMobile) {
      dispatch(
        updateAppState(
          STORE_KEYS.PARTICLE_CANVAS,
          undefined,
          undefined,
          PARTICLE_CANVAS_MOBILE_DEFAULTS
        )
      );
    }
    setIsReady(true);
  }, [dispatch, isOnMobile]);

  useEffect(() => {
    if (!isReady) return;
    setCanvas(canvasRef.current);
  }, [isReady, canvasRef]);

  useEffect(() => {
    if (!isReady) return;

    if (!ctx && canvas) {
      setCanvasLeft(canvas.offsetLeft + canvas.clientLeft);
      setCanvasTop(canvas.offsetTop + canvas.clientTop);
      setCtx(canvas.getContext('2d'));
      initCanvas();
    }
  }, [isReady, ctx, canvas, initCanvas]);

  useEffect(() => {
    if (!isReady) return;

    initParticles(particleState.current.particleCount);
    setParticleSpeed();

    requestRef.current = window.requestAnimationFrame(renderParticleCanvas);

    return () => window.cancelAnimationFrame(requestRef.current);
  }, [isReady, canvasWidth, canvasHeight]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isReady) return;

    if (appState[STORE_KEYS.PARTICLE_CANVAS] !== particleState.current) {
      particleState.current = appState[STORE_KEYS.PARTICLE_CANVAS];
    }
  }, [isReady, appState[STORE_KEYS.PARTICLE_CANVAS]]);

  return (
    <canvas
      id={getElId('site', 'particle-canvas')}
      className={classnames(getElClass('page', 'particleCanvas'), classes.canvas)}
      data-credit="Nokey"
      data-credit-url="https://codepen.io/jkiss/pen/OVEeqK"
      ref={canvasRef}
    />
  );
};
