import React, {useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import { Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StyledBadge from '@mui/material/Badge';
import {useSelector} from 'react-redux';
import NavBar from './NavBar';

const settings = ['Profile', 'Logout', 'Order'];
const pages = ['Home', 'Store', 'About', 'Contact'];

const Header = () => {

  const [isLoggedin, setIsLoggedin] = useState(true)
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const {user} = useSelector(state => state.profile)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  //console.log(user.avatar);
  // console.log(totalItems);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };


    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  

  const token = localStorage.getItem('accessToken')
  //console.log(token);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedin(!!token);
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  

  return (
    <>
    {isMobile ? (
      <>
      <div 
    className={`w-full h-16 flex items-center px-6 justify-between`}>


      <div>
      <Box sx={{ flexGrow: 1, 
        display: { xs: 'flex', md: 'none' },
        position: 'relative', // To allow absolute positioning for Menu
        }}>
            {/* MENU LOGO */}

            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Change background color on hover
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* MENU */}

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiMenuItem-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust background color of menu items
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Change background color on hover
                  },
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem 
                key={page} 
                onClick={handleCloseNavMenu}
                sx={{ width: "40vw", display: "flex", justifyContent: "center", backdropFilter: 'blur(10px)'  }}
                >
                  <Typography 
                  textAlign="center"
                  sx={{ color: '#333', fontWeight: 600, fontSize: '1.2rem', padding: '10px', '&:hover': { color: '#000' }}}
                  >
                    <Link to={`/${page.toLowerCase()}`}>    {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
      </div>

            {/* LOGO */}

      <div>
        <Link to={"/"} className="flex items-center">
                <span
                className='text-2xl font-bold text-white hover:text-gray-300 transition-all duration-300'
                >
                    Property Pulse
                </span>
        </Link>
      </div>


      <div
      className='flex items-center space-x-4'
      >

          {/* LOGIN/AVATR */}

        <div className="">
          {isLoggedin ? (
          <>
          <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar 
                  alt="Remy Sharp" 
                  src={user?.avatar}
                  sx={{ width: 40, height: 40 }} 
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
            <div className='text-white font-semibold text-xl bg-gradient-to-r from-red-600 to-pink-500 hover:from-red-700 hover:to-pink-600 px-4 py-1 rounded-full sm:px-6 sm:py-2 focus:outline-none focus:ring focus:border-blue-300 transition-all duration-300'>
            <span>Login</span>
            </div>
          </Link>
          </>
          )}
        </div>
      </div>
    </div>
      </>) : (
      <>
      <NavBar />
      </>)}
    </>
  )
};

export default Header;