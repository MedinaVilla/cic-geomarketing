import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import StoreIcon from '@mui/icons-material/Store';

const DrawerComponent = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <React.Fragment>
        <Drawer 
        PaperProps={{
            sx: {
                paddingLeft: '5%',
                paddingRight: '8%',
                backgroundColor: '#222831',
                color: 'white'
            }
        }}
        open={openDrawer}
        onClose={()=>setOpenDrawer(false)}
        >
            <List>
                <ListItem>
                    <StoreIcon/>
                    <Typography 
                        sx={{fontSize: '1.2rem', marginLeft: '5%'}}>
                        Geomarketing
                    </Typography>
                </ListItem>
                
                <ListItemButton 
                to='/' component={Link}
                onClick={() => setOpenDrawer(false)}>
                    <ListItemIcon>
                        <ListItemText sx={{color: '#F7F7F7'}} > Inicio </ListItemText>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton 
                to='/estudio' component={Link}
                onClick={() => setOpenDrawer(false)}>
                    <ListItemIcon>
                        <ListItemText sx={{color: '#F7F7F7'}}> Estudio </ListItemText>
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton 
                to='/estadistica' component={Link}
                onClick={() => setOpenDrawer(false)}>
                    <ListItemIcon>
                        <ListItemText sx={{color: '#F7F7F7'}}> Estadistica </ListItemText>
                    </ListItemIcon>
                </ListItemButton>
            </List>
        </Drawer>
        <IconButton 
        sx={{ color: 'white', marginLeft: 'auto'}}
        onClick={() => setOpenDrawer(!openDrawer)}>
            <MenuIcon sx={{color: '#F7F7F7'}}/>
        </IconButton>
    </React.Fragment>
  )
}

export default DrawerComponent