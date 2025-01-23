import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { BsCartCheckFill } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { GetService } from './GeneralService';
import { setRemoveToken } from '../redux/credentialReducer';


const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const CustomDrawer = ({ open, setOpen }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.credentialReducer.userToken);
    const user = useSelector((state: RootState) => state?.credentialReducer?.login);

    const [drawerData, setDrawerData] = useState([
        { text: 'Login', url: '/login', image: <PersonIcon sx={{ color: 'black' }} /> },
        { text: 'Cart', url: '/Cart', image: <ShoppingCartIcon sx={{ color: 'black' }} /> }
    ]);

    useEffect(() => {
        if (token) {
            setDrawerData([
                { text: 'Logout', url: '/', image: <LogoutIcon sx={{ color: 'black' }} /> },
                { text: 'Orders', url: '/order', image: <BsCartCheckFill size={23} color='black' /> }
            ]);
        } else {
            setDrawerData([
                { text: 'Login', url: '/login', image: <PersonIcon sx={{ color: 'black' }} /> },
                { text: 'Cart', url: '/Cart', image: <ShoppingCartIcon sx={{ color: 'black' }} /> }
            ]);
        }
    }, [token])

    const handleNavigation = (url: string) => {
        if (url === '/') {
            GetService('/user/logout', token)
                .then((response) => {
                    console.log(response);
                    navigate(url);
                    setOpen(false);
                    dispatch(setRemoveToken());
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            navigate(url);
            setOpen(false);
        }
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    console.log(open);

    return (
        <Drawer
            anchor="right"
            open={open}
            sx={{
                '& .MuiDrawer-paper': {
                    width: '50%',
                },
            }}
        >
            <DrawerHeader>
                <div className=' w-full flex justify-between items-center' >
                    <div className='text-2xl font-titleFont font-semibold'>{user?.name}</div>
                    <div>
                        <IconButton
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                            onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                </div>
            </DrawerHeader>
            <Divider />
            <List>
                {drawerData && drawerData.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={() => handleNavigation(item?.url)}
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#e0e0e0',
                                },
                            }}
                        >
                            <ListItemIcon>
                                {item?.image}
                            </ListItemIcon>
                            <ListItemText primary={item?.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default CustomDrawer;
