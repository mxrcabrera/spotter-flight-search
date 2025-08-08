import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box component="footer" sx={{ 
      py: 3, 
      backgroundColor: '#202124', 
      borderTop: '1px solid #3c4043',
      mt: 'auto' 
    }}>
      <Container maxWidth="lg">
        {/* Main Footer Links */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 0, 
          mb: 3 
        }}>
          <Box sx={{
            px: 3,
            py: 1.5,
            border: '1px solid #3c4043',
            borderRadius: '20px 0 0 20px',
            borderRight: 'none',
            backgroundColor: '#303134'
          }}>
            <Link href="#" sx={{ 
              color: '#8ab4f8',
              fontSize: '14px',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}>
              Language: English (United States)
            </Link>
          </Box>
          <Box sx={{
            px: 3,
            py: 1.5,
            border: '1px solid #3c4043',
            borderRadius: 0,
            borderRight: 'none',
            backgroundColor: '#303134'
          }}>
            <Link href="#" sx={{ 
              color: '#8ab4f8',
              fontSize: '14px',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}>
              Location: United States
            </Link>
          </Box>
          <Box sx={{
            px: 3,
            py: 1.5,
            border: '1px solid #3c4043',
            borderRadius: '0 20px 20px 0',
            backgroundColor: '#303134'
          }}>
            <Link href="#" sx={{ 
              color: '#8ab4f8',
              fontSize: '14px',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}>
              Currency: USD
            </Link>
          </Box>
        </Box>

        {/* Secondary Links */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 3, 
          mb: 2,
          flexWrap: 'wrap'
        }}>
          <Link href="#" sx={{ 
            color: '#8ab4f8',
            fontSize: '12px',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            About
          </Link>
          <Link href="#" sx={{ 
            color: '#8ab4f8',
            fontSize: '12px',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            Privacy
          </Link>
          <Link href="#" sx={{ 
            color: '#8ab4f8',
            fontSize: '12px',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            Terms
          </Link>
          <Link href="#" sx={{ 
            color: '#8ab4f8',
            fontSize: '12px',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            Participate in user studies
          </Link>
          <Link href="#" sx={{ 
            color: '#8ab4f8',
            fontSize: '12px',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            Feedback
          </Link>
          <Link href="#" sx={{ 
            color: '#8ab4f8',
            fontSize: '12px',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            Help Center
          </Link>
        </Box>
        
        {/* Bottom Text */}
        <Typography sx={{ 
          color: '#9aa0a6',
          fontSize: '11px',
          textAlign: 'center',
          lineHeight: 1.4
        }}>
          Displayed currencies may differ from the currencies used to purchase flights. 
          <Link href="#" sx={{ 
            color: '#8ab4f8',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}>
            {' '}Learn more
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;