/*import React from 'react';
import '../App.css';
function Footer() {
    return (
        <div className='footer'>
            <h3 className='footer-class'>東南亞美食搜查 </h3>
            <h4 className='footer-class'>TEL:<a className='footer-text' href="tel:0926535597"> 0926535597</a></h4>
            <h4 className='footer-class'>email:<a className='footer-text' href="mailto: junlin5525@gmail.com"> junlin5525@gmail.com</a></h4>
        </div>
    )
}
export default Footer;

*/

import React from 'react';
import { Container, Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box sx={{backgroundColor:'grey'}} component="footer" bgcolor="primary.main" color="white" py={3}>
      <Container>
        <Typography variant="h7">東南亞美食搜查</Typography>
        <Typography variant="body">    版權沒有，翻印不究 © {new Date().getFullYear()}</Typography>
      </Container>
    </Box>
  );
}

export default Footer;
