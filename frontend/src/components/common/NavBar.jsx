import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StyledBadge from '@mui/material/Badge';
import {useSelector} from 'react-redux';
import Avatar from '@mui/material/Avatar';

const NavBar = () => {

    const [isLoggedin, setIsLoggedin] = useState(false)
    const {user} = useSelector(state => state.profile)
    const [anchorElUser, setAnchorElUser] = useState(null);
    const settings = ['Profile', 'Logout', 'Order'];

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        setIsLoggedin(!!token);
      }, []);

    const NavLinks = [
        {
            title: "Marketplace",
            path: "/marketplace"
        },
        {
            title: "About",
            path: "/about"
        },
        {
            title: "Contact",
            path: "/contact"
        }
    ]

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };


  return (
    <div>
        <nav
        className='z-[10] flex h-16 w-full items-center justify-center py-10 text-white translate-y-0 transition-all'
        >
            <div
            className='flex w-11/12 max-w-maxContent items-center justify-between'
            >
                <Link to={"/"}
                className='flex items-center justify-center'
                >
                    <span
                    className='text-3xl font-bold tracking-widest text-black'
                    >Property Pulse</span>
                </Link>

                <ul
                className='hidden sm:flex gap-x-6 text-xl font-bold text-black tracking-widest'
                >
                    {
                        NavLinks.map((link, index) => (
                            <li key={index}>
                                <a 
                                href={link.path} 
                                className='text-xl font-bold hover:text-amber-300'>{link.title}</a>
                            </li>
                        ))
                    }
                </ul>

                <div
                className='flex items-center space-x-4'
                >

                <div className="flex items-center space-x-4">
                {isLoggedin ? (
                <>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar 
                        alt="Remy Sharp" 
                        src={user?.avatar || 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}
                        sx={{ width: 47, height: 47 }} 
                        />
                    </IconButton>
                    </Tooltip>
                    <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} 
                        onClick={handleCloseUserMenu}>
                        <Typography 
                        textAlign="center">
                            <Link to={`/${setting.toLowerCase()}`}>
                                {setting}
                            </Link>
                            </Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                </>
                ) : (
                <>
                <Link to='/login'>
                <div className='text-white font-semibold text-xl bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 px-6 py-1 rounded-full focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300'>
                <span>Login</span>
                </div>
                </Link>
                </>
                )}
                </div>
                </div>
            </div>
        </nav>   
    </div>
  )
}

export default NavBar
