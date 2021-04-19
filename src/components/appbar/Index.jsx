import React from 'react';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    iconButton: {
        '& svg': {
            fill: '#fff'
        }
    }
}));

export default function TopBar() {
    const classes = useStyles();
    const history = useHistory();
    const title = useSelector(state => state.AppBarText);

    return (
        <AppBar position='static'>
            <Toolbar>
                <Box flex='0.5' />
                <Box flex='1' textAlign='center'>
                    <Typography>
                        {title}
                    </Typography>
                </Box>
                <Box flex='0.5' display='flex' alignItems='center' justifyContent='flex-end'>
                    <IconButton
                        className={classes.iconButton}
                        onClick={() => history.push('/')}
                    >
                        <HomeIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
}