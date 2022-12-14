import React from 'react';
import Header from '../Components/Header';
import { makeStyles } from '@material-ui/core';


const usesStyles = makeStyles((theme) => {
    return{
        root: {
            display: 'flex',
            flexDirection: 'column'
        },
        page: {
            width: '100%',
            height: '100%',
            paddingTop: theme.spacing(5)
        }
    };
})

const Layout = ({ children }) => {
    const classes = usesStyles()

    return(
        <div className={classes.root}>
            <Header />
            <div className={classes.page}>
                {children}
            </div>
        </div>
    );
}

export default Layout;