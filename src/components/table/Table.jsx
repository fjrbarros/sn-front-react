import React from 'react';
import { localization, tableIcons } from './TableConfig';
import { Box, createMuiTheme, MuiThemeProvider, makeStyles, Button } from '@material-ui/core';
import { MTableToolbar } from 'material-table';
import MaterialTable from 'material-table';
import SearchIcon from '@material-ui/icons/Search';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#ff9100',
        },
    },

});

const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        padding: '0px 10px'
    },

    button: {
        marginRight: '10px',
        textTransform: 'none'
    }
}));

export default function Table(props) {
    const classes = useStyles();
    const {
        columns,
        data,
        title,
        onClickPesquisar,
        onClickNovo,
        maxHeight,
        minHeight,
        onClickEditar,
        onClickExcluir,
        possuiActions
    } = props;

    return (
        <MuiThemeProvider theme={theme}>
            <MaterialTable
                title={title}
                icons={tableIcons}
                localization={localization}
                columns={columns}
                data={data}
                options={{
                    actionsColumnIndex: -1,
                    maxBodyHeight: maxHeight || 'calc(100vh - 182px)',
                    minBodyHeight: minHeight || 'calc(100vh - 182px)',
                    showTitle: false,
                    exportButton: true,
                    rowStyle: (rowData, index) => ({ backgroundColor: index % 2 === 0 ? '#fff' : '#f3f3f3' })
                }}
                components={{
                    Toolbar: props => (
                        <Box className={classes.toolbar}>
                            <Box>
                                {
                                    onClickPesquisar &&
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        className={classes.button}
                                        startIcon={<SearchIcon />}
                                        onClick={onClickPesquisar}
                                    >
                                        Pesquisar
                                    </Button>
                                }
                                {
                                    onClickNovo &&
                                    <Button
                                        color='primary'
                                        variant='contained'
                                        className={classes.button}
                                        startIcon={<AddIcon />}
                                        onClick={onClickNovo}
                                    >
                                        Novo
                                    </Button>

                                }
                            </Box>
                            <Box style={{ flex: 1 }}></Box>
                            <Box> <MTableToolbar {...props} /> </Box>
                        </Box>
                    ),
                }}
                actions={possuiActions ? [{
                    icon: () => <EditIcon style={{ color: '#6d6c6c' }} />,
                    onClick: (event, rowData) => onClickEditar(rowData),
                    hidden: typeof onClickEditar !== 'function'
                }, {
                    icon: () => <DeleteForeverIcon style={{ color: '#6d6c6c' }} />,
                    onClick: (event, rowData) => onClickExcluir(rowData),
                    hidden: typeof onClickExcluir !== 'function'
                }] : null}
            />
        </MuiThemeProvider>
    );
}