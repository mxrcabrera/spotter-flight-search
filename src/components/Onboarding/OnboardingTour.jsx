import { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Close, ArrowForward, ArrowBack } from '@mui/icons-material';
import { useOnboarding } from '../../context/OnboardingContext';

const TOUR_STEPS = [
  {
    target: '[data-tour="search-form"]',
    title: 'Search for Flights',
    content: 'Enter your origin, destination and travel dates to search for flights.',
    preferredPosition: 'bottom'
  },
  {
    target: '[data-tour="price-calendar"]',
    title: 'Price Calendar',
    content: 'Click any date to see prices. Green = cheap, Red = expensive.',
    preferredPosition: 'bottom'
  },
  {
    target: '[data-tour="filters"]',
    title: 'Filter Results',
    content: 'Filter results by price, stops, and airlines. Updates instantly!',
    preferredPosition: 'right'
  },
  {
    target: '[data-tour="flight-card"]',
    title: 'Flight Details',
    content: 'Click any flight to see more details about the journey.',
    preferredPosition: 'right'
  }
];

const TOOLTIP_WIDTH = 300;
const TOOLTIP_HEIGHT = 170;
const ARROW_SIZE = 12;
const PADDING = 16;

const HIGHLIGHT_STYLES = {
  boxShadow: '0 0 0 4px #1a73e8, 0 0 30px rgba(26, 115, 232, 0.6)',
  borderRadius: '12px',
  position: 'relative',
  zIndex: '10001',
  transition: 'box-shadow 0.3s ease'
};

const getOptimalPosition = (rect, preferredPosition, isMobile) => {
  const tooltipWidth = isMobile ? 280 : TOOLTIP_WIDTH;
  const tooltipHeight = TOOLTIP_HEIGHT;

  const spaceAbove = rect.top;
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceLeft = rect.left;
  const spaceRight = window.innerWidth - rect.right;

  const canFitRight = spaceRight >= tooltipWidth + PADDING + ARROW_SIZE;
  const canFitLeft = spaceLeft >= tooltipWidth + PADDING + ARROW_SIZE;
  const canFitBelow = spaceBelow >= tooltipHeight + PADDING + ARROW_SIZE;
  const canFitAbove = spaceAbove >= tooltipHeight + PADDING + ARROW_SIZE;

  const positionPriority = {
    right: ['right', 'left', 'bottom', 'top'],
    left: ['left', 'right', 'bottom', 'top'],
    bottom: ['bottom', 'top', 'right', 'left'],
    top: ['top', 'bottom', 'right', 'left']
  };

  const canFit = {
    right: canFitRight,
    left: canFitLeft,
    bottom: canFitBelow,
    top: canFitAbove
  };

  const priorities = positionPriority[preferredPosition] || positionPriority.bottom;

  for (const pos of priorities) {
    if (canFit[pos]) {
      return pos;
    }
  }

  return 'bottom';
};

const calculateTooltipCoords = (rect, position, isMobile) => {
  const tooltipWidth = isMobile ? 280 : TOOLTIP_WIDTH;
  const tooltipHeight = TOOLTIP_HEIGHT;
  let top, left;

  switch (position) {
    case 'right':
      top = rect.top + rect.height / 2 - tooltipHeight / 2;
      left = rect.right + PADDING + ARROW_SIZE;
      break;
    case 'left':
      top = rect.top + rect.height / 2 - tooltipHeight / 2;
      left = rect.left - tooltipWidth - PADDING - ARROW_SIZE;
      break;
    case 'top':
      top = rect.top - tooltipHeight - PADDING - ARROW_SIZE;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
      break;
    case 'bottom':
    default:
      top = rect.bottom + PADDING + ARROW_SIZE;
      left = rect.left + rect.width / 2 - tooltipWidth / 2;
      break;
  }

  left = Math.max(PADDING, Math.min(left, window.innerWidth - tooltipWidth - PADDING));
  top = Math.max(PADDING, Math.min(top, window.innerHeight - tooltipHeight - PADDING));

  return { top, left };
};

const getArrowStyles = (position, theme) => {
  const arrowColor = theme.palette.primary.main;
  const baseStyles = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid'
  };

  switch (position) {
    case 'right':
      return {
        ...baseStyles,
        left: -ARROW_SIZE,
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: `${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px 0`,
        borderColor: `transparent ${arrowColor} transparent transparent`
      };
    case 'left':
      return {
        ...baseStyles,
        right: -ARROW_SIZE,
        top: '50%',
        transform: 'translateY(-50%)',
        borderWidth: `${ARROW_SIZE}px 0 ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor: `transparent transparent transparent ${arrowColor}`
      };
    case 'top':
      return {
        ...baseStyles,
        bottom: -ARROW_SIZE,
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: `${ARROW_SIZE}px ${ARROW_SIZE}px 0 ${ARROW_SIZE}px`,
        borderColor: `${arrowColor} transparent transparent transparent`
      };
    case 'bottom':
    default:
      return {
        ...baseStyles,
        top: -ARROW_SIZE,
        left: '50%',
        transform: 'translateX(-50%)',
        borderWidth: `0 ${ARROW_SIZE}px ${ARROW_SIZE}px ${ARROW_SIZE}px`,
        borderColor: `transparent transparent ${arrowColor} transparent`
      };
  }
};

const cleanupAllHighlights = () => {
  const tourElements = document.querySelectorAll('[data-tour]');
  tourElements.forEach(el => {
    el.style.boxShadow = '';
    el.style.borderRadius = '';
    el.style.position = '';
    el.style.zIndex = '';
    el.style.transition = '';
  });
};

const OnboardingTour = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isActive, currentStep, nextStep, prevStep, endTour } = useOnboarding();
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [arrowPosition, setArrowPosition] = useState('bottom');

  const updatePosition = useCallback(() => {
    if (!isActive || currentStep >= TOUR_STEPS.length) return;

    cleanupAllHighlights();

    const step = TOUR_STEPS[currentStep];
    const element = document.querySelector(step.target);

    if (element) {
      Object.assign(element.style, HIGHLIGHT_STYLES);

      const rect = element.getBoundingClientRect();
      const optimalPosition = getOptimalPosition(rect, step.preferredPosition, isMobile);
      const coords = calculateTooltipCoords(rect, optimalPosition, isMobile);

      setArrowPosition(optimalPosition);
      setTooltipPosition(coords);

      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isActive, currentStep, isMobile]);

  useEffect(() => {
    if (!isActive) {
      cleanupAllHighlights();
      return;
    }

    const timeoutId = setTimeout(updatePosition, 100);
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isActive, currentStep, updatePosition]);

  useEffect(() => {
    return () => {
      cleanupAllHighlights();
    };
  }, []);

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      nextStep();
    } else {
      cleanupAllHighlights();
      endTour();
    }
  };

  const handleSkip = () => {
    cleanupAllHighlights();
    endTour();
  };

  if (!isActive || currentStep >= TOUR_STEPS.length) {
    return null;
  }

  const step = TOUR_STEPS[currentStep];
  const isLastStep = currentStep === TOUR_STEPS.length - 1;
  const tooltipWidth = isMobile ? 280 : TOOLTIP_WIDTH;

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none'
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Onboarding tour"
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0, 0, 0, 0.7)',
          pointerEvents: 'auto',
          transition: 'background-color 0.3s ease'
        }}
        onClick={handleSkip}
      />

      <Box
        sx={{
          position: 'absolute',
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          width: tooltipWidth,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          pointerEvents: 'auto',
          overflow: 'visible',
          zIndex: 10002,
          transition: 'top 0.3s ease, left 0.3s ease'
        }}
      >
        <Box sx={getArrowStyles(arrowPosition, theme)} />

        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1.5,
          bgcolor: 'primary.main',
          borderRadius: '12px 12px 0 0'
        }}>
          <Typography sx={{ color: 'white', fontWeight: 600, fontSize: 15 }}>
            {step.title}
          </Typography>
          <IconButton
            size="small"
            onClick={handleSkip}
            sx={{
              color: 'white',
              p: 0.5,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
            aria-label="Close tour"
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontSize: 14, color: 'text.secondary', mb: 2, lineHeight: 1.5 }}>
            {step.content}
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {TOUR_STEPS.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: index === currentStep ? 'primary.main' : 'action.disabled',
                    transition: 'background-color 0.2s ease'
                  }}
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {currentStep > 0 && (
                <Button
                  size="small"
                  onClick={prevStep}
                  startIcon={<ArrowBack fontSize="small" />}
                  sx={{ textTransform: 'none', fontSize: 13 }}
                >
                  Back
                </Button>
              )}
              <Button
                size="small"
                variant="contained"
                onClick={handleNext}
                endIcon={!isLastStep && <ArrowForward fontSize="small" />}
                sx={{ textTransform: 'none', fontSize: 13, fontWeight: 600 }}
              >
                {isLastStep ? 'Got it!' : 'Next'}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OnboardingTour;
