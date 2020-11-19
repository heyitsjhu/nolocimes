/** Particle Canvas - Credit: Nokey (https://codepen.io/jkiss/pen/OVEeqK) */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

import { useEventListener } from 'hooks/useEventListener';
import { AppContext } from 'stores/providers/appProvider';
import { getElClass, getElId } from 'utils';

import getAnimation from './anime';
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

export default props => {
  const classes = useStyles();
  const [appState, dispatch] = useContext(AppContext);
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [canvasLeft, setCanvasLeft] = useState(0);
  const [canvasTop, setCanvasTop] = useState(0);
  const [ctx, setCtx] = useState(null);
  const [canvasWidth, setCanvasWidth] = useState(600);
  const [canvasHeight, setCanvasHeight] = useState(400);

  const [slowMultiplier, setSlowMultiplier] = useState(30);
  let particles = [];

  const particleRadius = props.radius || 2;
  const particlePulseFreq = props.pulseFrequency || 0.02;
  const particleColor = props.color || { r: 204, g: 152, b: 81 };
  const particleCount = props.count || 40;
  const particleThreshold = props.countThreshold || 40;
  const linkLineColor = props.linkColor || { r: 204, g: 152, b: 81 };
  const linkLineWidth = props.linkWidth || 0.8;
  const linkLineDistantLimit = props.linkDistanceLimit || 260;
  // const slowMultiplier = props.slowMultiplier || 1;
  const cursorParticle = { x: 0, y: 0, vx: 0, vy: 0, r: 0, type: 'mouse' };

  const initCanvas = () => {
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    setCanvasWidth(parseInt(canvas.getAttribute('width')));
    setCanvasHeight(parseInt(canvas.getAttribute('height')));
  };

  const initParticles = numSize => {
    for (let i = 1; i <= numSize; i++) {
      particles.push({
        x: randomSidePos(canvasWidth),
        y: randomSidePos(canvasHeight),
        vx: getRandomSpeed('top')[0] / slowMultiplier,
        vy: getRandomSpeed('top')[1] / slowMultiplier,
        r: particleRadius,
        alpha: 1,
        phase: randomNumFrom(0, 10),
      });
    }
  };

  const getRandomParticle = () => {
    const pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
    switch (pos) {
      case 'top':
        return {
          x: randomSidePos(canvasWidth),
          y: -particleRadius,
          vx: getRandomSpeed(pos)[0] / slowMultiplier,
          vy: getRandomSpeed(pos)[1] / slowMultiplier,
          r: particleRadius,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        };
      case 'right':
        return {
          x: canvasWidth + particleRadius,
          y: randomSidePos(canvasHeight),
          vx: getRandomSpeed(pos)[0] / slowMultiplier,
          vy: getRandomSpeed(pos)[1] / slowMultiplier,
          r: particleRadius,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        };
      case 'bottom':
        return {
          x: randomSidePos(canvasWidth),
          y: canvasHeight + particleRadius,
          vx: getRandomSpeed(pos)[0] / slowMultiplier,
          vy: getRandomSpeed(pos)[1] / slowMultiplier,
          r: particleRadius,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        };
      case 'left':
        return {
          x: -particleRadius,
          y: randomSidePos(canvasHeight),
          vx: getRandomSpeed(pos)[0] / slowMultiplier,
          vy: getRandomSpeed(pos)[1] / slowMultiplier,
          r: particleRadius,
          alpha: 1,
          phase: randomNumFrom(0, 10),
        };
      default:
        return;
    }
  };

  const renderParticles = () => {
    const { r, g, b } = particleColor;
    Array.prototype.forEach.call(particles, function (p, i) {
      if (!p.hasOwnProperty('type')) {
        ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
      }
    });
  };

  const renderLines = () => {
    const { r, g, b } = linkLineColor;
    let fraction, alpha;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        fraction = getDisOf(particles[i], particles[j]) / linkLineDistantLimit;
        if (fraction < 1) {
          alpha = (1 - fraction).toString();
          ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.lineWidth = linkLineWidth;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  };

  const updateParticles = () => {
    const newParticles = [];
    Array.prototype.forEach.call(particles, p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x > -50 && p.x < canvasWidth + 50 && p.y > -50 && p.y < canvasHeight + 50) {
        newParticles.push(p);
      }

      p.phase += particlePulseFreq;
      p.alpha = Math.abs(Math.cos(p.phase));
    });

    particles = newParticles.slice(0);
  };

  const addParticleify = () => {
    if (particles.length < particleThreshold) {
      particles.push(getRandomParticle());
    }
  };

  const renderParticleCanvas = () => {
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      renderParticles();
      renderLines();
      updateParticles();
      addParticleify();
      const reqId = window.requestAnimationFrame(renderParticleCanvas);

      return () => window.cancelAnimationFrame(reqId);
    }
  };

  const handleMouseEnter = () => {
    particles.push(cursorParticle);
  };

  const handleMouseLeave = () => {
    let newParticles = [];
    Array.prototype.forEach.call(particles, p => {
      if (!p.hasOwnProperty('type')) {
        newParticles.push(p);
      }
    });
    particles = newParticles.slice(0);
  };

  const handleMouseMove = e => {
    const event = e || window.event;
    cursorParticle.x = event.pageX;
    cursorParticle.y = event.pageY;
  };

  useEventListener('resize', initCanvas);
  useEventListener('mouseenter', handleMouseEnter, canvas);
  useEventListener('mouseleave', handleMouseLeave, canvas);
  useEventListener('mousemove', handleMouseMove, canvas);

  useEffect(() => {
    if (props.slowMultiplier && slowMultiplier !== props.slowMultiplier) {
      setSlowMultiplier(props.slowMultiplier);
    }
  }, [props.slowMultiplier, slowMultiplier]);

  useEffect(() => {
    setCanvas(canvasRef.current);
  }, [canvasRef]);

  useEffect(() => {
    if (!ctx && canvas) {
      setCanvasLeft(canvas.offsetLeft + canvas.clientLeft);
      setCanvasTop(canvas.offsetTop + canvas.clientTop);
      setCtx(canvas.getContext('2d'));
      initCanvas();
    }
  }, [ctx, canvas]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    initParticles(particleCount);
    window.requestAnimationFrame(renderParticleCanvas);
  }, [canvasWidth, canvasHeight]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (appState.splashLogo.finished) {
      const animation = getAnimation();
      animation.play();
    }
  }, [appState.splashLogo.finished]);

  // useEffect(() => {
  //   updateParticleSpeed();
  // }, [slowMultiplier]);

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
