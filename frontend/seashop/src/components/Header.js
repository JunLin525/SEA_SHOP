import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Authcontext from '../context/AuthContext';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

function Header() {
    let { user, logoutUser } = useContext(Authcontext)
    const navigate = useNavigate();
    const [userData, setUserData] = useState([])
    const [anchorElNav, setAnchorElNav] = useState(null);
    const BASE_URL = "https://junlin5525.dev/api"

    // ... [略去fetchUserName和useEffect的部分]

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const pages = [
        { name: '首頁在這', action: () => navigate('/') },
        { name: '關於本站', action: () => navigate('/About') },
        { name: '美食聚落', action: () => navigate('/Food') },
        { name: '特色店家', action: () => navigate('/Shop') },
    ];

    return (
        <AppBar position="static" sx={{backgroundColor:'gray'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ color: 'white', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography variant="h6" noWrap sx={{ color:'white', mr: 2, display: { xs: 'none', md: 'flex' } }}>
                        東南亞美食搜查
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={page.action}>
                                    {page.name}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={page.action}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {user ? (
                        <>
                            <Button onClick={logoutUser} sx={{ my: 2, color: 'white', display: 'block' }}>
                                登出再見
                            </Button>
                            <Typography sx={{ ml: 1 }}>Hello {userData.username}</Typography>
                        </>
                    ) : (
                        <Button onClick={() => navigate('/login')} sx={{ my: 2, color: 'white', display: 'block' }}>
                            登入頁面
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header;
