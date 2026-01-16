import { useState, useMemo, useCallback } from 'react';
import { Box, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { PRICE_LOW_THRESHOLD, PRICE_MID_THRESHOLD } from '../../utils/constants';

const CALENDAR_DAYS = 30;
const BASE_PRICE = 350;
const PRICE_VARIATION = 200;
const WEEKEND_MULTIPLIER = 1.3;
const DAYS_IN_WEEK = 7;

const generateCalendarData = (startDate) => {
  const data = [];
  const start = new Date(startDate);

  for (let i = 0; i < CALENDAR_DAYS; i++) {
    const date = new Date(start);
    date.setDate(start.getDate() + i);

    const dayOfWeek = date.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    const randomFactor = Math.sin(i * 0.5) * 0.3 + Math.cos(i * 0.3) * 0.2;
    let price = Math.round(BASE_PRICE + (randomFactor * PRICE_VARIATION));

    if (isWeekend) {
      price = Math.round(price * WEEKEND_MULTIPLIER);
    }

    data.push({
      date: date.toISOString().split('T')[0],
      dayOfMonth: date.getDate(),
      dayOfWeek,
      price,
      isWeekend
    });
  }

  return data;
};

const getPriceCategory = (price, minPrice, maxPrice) => {
  if (maxPrice === minPrice) return 'low';

  const ratio = (price - minPrice) / (maxPrice - minPrice);

  if (ratio < PRICE_LOW_THRESHOLD) return 'low';
  if (ratio < PRICE_MID_THRESHOLD) return 'mid';
  return 'high';
};

const PriceCalendar = ({ onDateSelect, selectedDate }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [startOffset, setStartOffset] = useState(0);

  const baseDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14 + startOffset);
    return date;
  }, [startOffset]);

  const calendarData = useMemo(() => generateCalendarData(baseDate), [baseDate]);

  const priceStats = useMemo(() => {
    const prices = calendarData.map(d => d.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [calendarData]);

  const monthLabel = useMemo(() => {
    const firstDate = new Date(calendarData[0].date);
    return firstDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [calendarData]);

  const handlePrevious = useCallback(() => {
    setStartOffset(prev => prev - DAYS_IN_WEEK);
  }, []);

  const handleNext = useCallback(() => {
    setStartOffset(prev => prev + DAYS_IN_WEEK);
  }, []);

  const handleDateClick = useCallback((dateStr) => {
    if (onDateSelect) {
      onDateSelect(dateStr);
    }
  }, [onDateSelect]);

  const handleKeyDown = useCallback((e, dateStr) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDateClick(dateStr);
    }
  }, [handleDateClick]);

  const getPriceColor = useCallback((category) => {
    const isDark = theme.palette.mode === 'dark';
    switch (category) {
      case 'low':
        return isDark ? theme.palette.success.light : theme.palette.success.main;
      case 'mid':
        return isDark ? theme.palette.warning.light : theme.palette.warning.main;
      case 'high':
        return isDark ? theme.palette.error.light : theme.palette.error.main;
      default:
        return theme.palette.text.primary;
    }
  }, [theme.palette]);

  const getPriceBgColor = useCallback((category) => {
    switch (category) {
      case 'low':
        return theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.08)' : 'rgba(76, 175, 80, 0.1)';
      case 'mid':
        return theme.palette.mode === 'dark' ? 'rgba(255, 152, 0, 0.08)' : 'rgba(255, 152, 0, 0.1)';
      case 'high':
        return theme.palette.mode === 'dark' ? 'rgba(244, 67, 54, 0.08)' : 'rgba(244, 67, 54, 0.1)';
      default:
        return 'transparent';
    }
  }, [theme.palette.mode]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const calendarWeeks = useMemo(() => {
    const weeks = [];
    let currentWeek = new Array(DAYS_IN_WEEK).fill(null);

    calendarData.forEach((day, index) => {
      const weekIndex = day.dayOfWeek;
      currentWeek[weekIndex] = day;

      if (weekIndex === 6 || index === calendarData.length - 1) {
        weeks.push([...currentWeek]);
        currentWeek = new Array(DAYS_IN_WEEK).fill(null);
      }
    });

    return weeks;
  }, [calendarData]);

  if (isMobile) {
    return (
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          overflow: 'hidden',
          mx: 2,
          mt: 2
        }}
        role="region"
        aria-label="Price calendar"
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <IconButton
            onClick={handlePrevious}
            size="small"
            aria-label="Previous week"
            sx={{
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2
              }
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
            {monthLabel}
          </Typography>
          <IconButton
            onClick={handleNext}
            size="small"
            aria-label="Next week"
            sx={{
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2
              }
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 1,
            p: 1.5,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none'
          }}
          role="listbox"
          aria-label="Select departure date"
        >
          {calendarData.slice(0, 14).map((day) => {
            const category = getPriceCategory(day.price, priceStats.min, priceStats.max);
            const isSelected = selectedDate === day.date;

            return (
              <Box
                key={day.date}
                onClick={() => handleDateClick(day.date)}
                onKeyDown={(e) => handleKeyDown(e, day.date)}
                tabIndex={0}
                role="option"
                aria-selected={isSelected}
                aria-label={`${weekDays[day.dayOfWeek]}, ${day.dayOfMonth}, $${day.price}`}
                sx={{
                  minWidth: 56,
                  p: 1,
                  borderRadius: 2,
                  textAlign: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  bgcolor: isSelected ? 'primary.main' : getPriceBgColor(category),
                  border: isSelected ? 'none' : '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: isSelected ? 'primary.dark' : 'action.hover'
                  },
                  '&:focus-visible': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: 2
                  }
                }}
              >
                <Typography sx={{
                  fontSize: 10,
                  color: isSelected ? 'white' : 'text.secondary',
                  mb: 0.25
                }}>
                  {weekDays[day.dayOfWeek]}
                </Typography>
                <Typography sx={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: isSelected ? 'white' : 'text.primary'
                }}>
                  {day.dayOfMonth}
                </Typography>
                <Typography sx={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: isSelected ? 'white' : getPriceColor(category),
                  mt: 0.25
                }}>
                  ${day.price}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          py: 1,
          borderTop: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />
            <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>Low</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'warning.main' }} />
            <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>Avg</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />
            <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>High</Typography>
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      data-tour="price-calendar"
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        overflow: 'hidden',
        mb: 3
      }}
      role="region"
      aria-label="Price calendar"
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        py: 2,
        borderBottom: 1,
        borderColor: 'divider'
      }}>
        <Box>
          <Typography component="h2" sx={{ fontSize: 18, fontWeight: 600 }}>
            Price Calendar
          </Typography>
          <Typography sx={{ fontSize: 13, color: 'text.secondary' }}>
            Lowest prices for your route
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={handlePrevious}
            aria-label="Previous week"
            sx={{
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2
              }
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Typography sx={{ fontSize: 14, fontWeight: 500, minWidth: 140, textAlign: 'center' }}>
            {monthLabel}
          </Typography>
          <IconButton
            onClick={handleNext}
            aria-label="Next week"
            sx={{
              '&:focus-visible': {
                outline: '2px solid',
                outlineColor: 'primary.main',
                outlineOffset: 2
              }
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'success.main' }} />
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Low</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'warning.main' }} />
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>Average</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: 'error.main' }} />
            <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>High</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: 2 }} role="grid" aria-label="Calendar days with prices">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: 1,
            mb: 1
          }}
          role="row"
        >
          {weekDays.map((day) => (
            <Typography
              key={day}
              sx={{
                textAlign: 'center',
                fontSize: 12,
                fontWeight: 600,
                color: 'text.secondary',
                py: 1
              }}
              role="columnheader"
            >
              {day}
            </Typography>
          ))}
        </Box>

        <Box>
          {calendarWeeks.map((week, weekIndex) => (
            <Box
              key={weekIndex}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                gap: 1,
                mb: 1
              }}
              role="row"
            >
              {week.map((day, dayIndex) => {
                if (!day) {
                  return <Box key={`empty-${dayIndex}`} sx={{ height: 72 }} role="gridcell" />;
                }

                const category = getPriceCategory(day.price, priceStats.min, priceStats.max);
                const isSelected = selectedDate === day.date;

                return (
                  <Box
                    key={day.date}
                    onClick={() => handleDateClick(day.date)}
                    onKeyDown={(e) => handleKeyDown(e, day.date)}
                    tabIndex={0}
                    role="gridcell"
                    aria-selected={isSelected}
                    aria-label={`${day.dayOfMonth}, $${day.price}`}
                    sx={{
                      p: 1.5,
                      borderRadius: 2,
                      textAlign: 'center',
                      cursor: 'pointer',
                      bgcolor: isSelected ? 'primary.main' : getPriceBgColor(category),
                      border: isSelected ? 'none' : '1px solid',
                      borderColor: 'divider',
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: isSelected ? 'primary.dark' : 'action.hover',
                        transform: 'scale(1.02)'
                      },
                      '&:focus-visible': {
                        outline: '2px solid',
                        outlineColor: 'primary.main',
                        outlineOffset: 2
                      }
                    }}
                  >
                    <Typography sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: isSelected ? 'white' : 'text.primary',
                      mb: 0.5
                    }}>
                      {day.dayOfMonth}
                    </Typography>
                    <Typography sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: isSelected ? 'white' : getPriceColor(category)
                    }}>
                      ${day.price}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PriceCalendar;
