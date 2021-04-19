import React from 'react';
import Box from '@material-ui/core/Box';
import AssignmentIcon from '@material-ui/icons/Assignment';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    card: {
        borderRadius: '5px',
        padding: '15px 3px 15px 10px',
        backgroundColor: '#fff',
        boxShadow: '2px 2px 2px 0 rgba(0, 0, 0, 0.12)',
        transition: 'box-shadow 0.2s ease-in-out',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: '#545454',
        '&:hover': {
            boxShadow: '0px 5px 15px 0px rgba(0, 0, 0, 0.2)'
        }
    },

    icon: {
        fill: '#3f51b5'
    }
}));

export default function Card(props) {
    const classes = useStyles();
    const history = useHistory();
    const { title, openPage } = props;

    return (
        <Box className={classes.card}>
            <AssignmentIcon className={classes.icon} />
            <Typography display='block'>
                {title}
            </Typography>
            <IconButton onClick={() => history.push(openPage || '/')} >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
}