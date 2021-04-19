import React from 'react';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        backgroundColor: '#030217',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    content: {
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
        '& p': {
            color: '#cfcfcf'
        },
        '& p:nth-child(1)': {
            fontSize: '100px'
        },
        '& button': {
            marginTop: '10px',
            backgroundColor: 'transparent',
            boxShadow: 'none',
            color: '#fff',
            transition: 'all 0.25s',
            border: '1px solid transparent',
            '& svg': {
                fill: '#fff'
            }
        },
        '& button:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: '1px solid #ffffff'
        }
    }
}));

export default function NotFound() {
    const classes = useStyles();
    const history = useHistory();

    return (
        <Box className={classes.root}>
            <Box className={classes.content}>
                <Typography>404</Typography>
                <Typography>Ooops, Algo deu errado!</Typography>
                <Button
                    text='Página inicial'
                    width='50%'
                    startIcon={<HomeIcon />}
                    onClick={() => history.push('/')}
                >
                    Página inicial
                </Button >
            </Box>
        </Box>
    );
}