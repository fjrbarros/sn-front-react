import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import DefaultPage from './DefaultPage';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Card } from '../components/Index';
import { useDispatch } from 'react-redux';
import { textDashboard } from '../redux/appbar/Actions';

const useStyles = makeStyles(theme => ({
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr)',
        gridGap: '15px',
        '@media(max-width:900px)': {
            gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr) minmax(200px, 1fr)',
        },
        '@media(max-width:650px)': {
            gridTemplateColumns: 'minmax(200px, 1fr) minmax(200px, 1fr)',
        },
        '@media(max-width:435px)': {
            gridTemplateColumns: 'minmax(200px, 1fr)',
        }
    }
}));

export default function Deahboard() {
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => { dispatch(textDashboard()) }, []);

    return (
        <DefaultPage>
            <Box padding='10px'>
                <Box className={classes.contentGrid}>
                    <Card title='Serviço' openPage='/servico' />
                    <Card title='Pedido' openPage='/pedido' />
                </Box>
            </Box>
        </DefaultPage>
    );
}