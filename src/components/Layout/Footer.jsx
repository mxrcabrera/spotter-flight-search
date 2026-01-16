import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
    return (
      <Box component="footer" sx={{
        py: 2,
        px: 2,
        bgcolor: 'background.default',
        borderTop: 1,
        borderColor: 'divider',
        mt: 'auto'
      }}>
        <Typography sx={{
          color: 'text.secondary',
          fontSize: 11,
          textAlign: 'center',
          mb: 1
        }}>
          Built for Spotter technical challenge
        </Typography>
        <Typography sx={{
          color: 'text.secondary',
          fontSize: 10,
          textAlign: 'center'
        }}>
          USD - English (US)
        </Typography>
      </Box>
    );
  }

  return (
    <Box component="footer" sx={{
      py: 3,
      bgcolor: 'background.default',
      borderTop: 1,
      borderColor: 'divider',
      mt: 'auto'
    }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 0,
            mb: 3
          }}
        >
          {[
            { label: 'Language: English (US)', radius: '20px 0 0 20px', borderRight: 'none' },
            { label: 'Location: United States', radius: 0, borderRight: 'none' },
            { label: 'Currency: USD', radius: '0 20px 20px 0', borderRight: undefined }
          ].map(({ label, radius, borderRight }) => (
            <Box key={label} sx={{
              px: 3,
              py: 1.5,
              border: 1,
              borderColor: 'divider',
              borderRadius: radius,
              borderRight,
              bgcolor: 'background.paper'
            }}>
              <Typography sx={{ color: 'text.primary', fontSize: 14 }}>
                {label}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography sx={{
          color: 'text.secondary',
          fontSize: 12,
          textAlign: 'center',
          mb: 1
        }}>
          Built for Spotter technical challenge
        </Typography>

        <Typography sx={{
          color: 'text.secondary',
          fontSize: 11,
          textAlign: 'center'
        }}>
          Displayed currencies may differ from the currencies used to purchase flights.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
