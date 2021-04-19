import React, { useEffect, useState } from 'react';
import DefaultPage from './DefaultPage';
import api from '../api/Index.jsx';
import Use from '../util/Use';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { textPedido } from '../redux/appbar/Actions';
import { Table, Modal, SelectField } from '../components/Index';
import { validaFormPedido } from '../util/ValidaForm';

import { FormHelperText } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector } from 'react-redux';
import { Box, Tooltip, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },

    input: {
        marginBottom: '10px',
        marginRight: '10px'
    },

    codigo: {
        width: '30%'
    },

    listServicos: {
        margin: 0,
        padding: 0,
        '& li': {
            padding: 0
        }
    },

    labelNovoServico: {
        fontSize: '1.2rem',
        fontStyle: 'italic',
        marginRight: '5px',
        color: '#545454'
    },

    buttonIntegrantes: {
        marginBottom: '-10px',
        padding: '10px',
        '& svg': {
            fontSize: '1.2rem'
        }
    },
}));

function getDefaultValues() {
    return {
        idPedidoServico: '',
        nomeUsuario: '',
        percentualImposto: '',
        pedidoServicoItens: []
    };
}

export default function Pedido() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [dadosTable, setDadosTable] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [values, setValues] = useState(getDefaultValues);
    const [errors, setErrors] = useState(getDefaultValues);
    const [listaServicos, setListaServicos] = useState([]);

    useEffect(() => { dispatch(textPedido()) }, []);

    useEffect(() => {
        api.get('servico/recuperarServicos')
            .then(resp => setListaServicos(resp.data))
            .catch(error => Use.error('Erro', error.message || 'Erro ao buscar registros!'));
    }, []);

    function adicionarPedido() {
        const copyPedidoServicoItens = [...values.pedidoServicoItens];

        copyPedidoServicoItens.push({
            idServico: '',
            qtdHora: '',
            valorHora: '',
            total: ''
        });

        setValues({ ...values, pedidoServicoItens: copyPedidoServicoItens });
    }

    function removerServico(servico, index) {
        let copyPedidoServicoItens = [...values.pedidoServicoItens];

        copyPedidoServicoItens = copyPedidoServicoItens.filter(item => item !== servico);

        setValues({ ...values, pedidoServicoItens: copyPedidoServicoItens });
    }

    function handleChange(event, index, item) {
        const name = event.target.name;
        const value = event.target.value;
        const copyPedidoServicoItens = [...values.pedidoServicoItens];

        if (name === 'nomeUsuario' || name === 'percentualImposto') {
            setValues({ ...values, [name]: value });
            return;
        }

        if (name === 'idServico') {
            const valorHora = listaServicos[index]['valorHora'];
            copyPedidoServicoItens[index]['valorHora'] = valorHora;
        }

        if (name === 'qtdHora') {
            copyPedidoServicoItens[index]['total'] = value * item.valorHora;
        }

        copyPedidoServicoItens[index][name] = value;

        setValues({ ...values, pedidoServicoItens: copyPedidoServicoItens });
    }

    function handleSubmit() {
        const objErrors = {};
        const data = { nomeUsuario: values.nomeUsuario, percentualImposto: values.percentualImposto };
        validaFormPedido(data, (campo, msg) => objErrors[campo] = msg);
        setErrors(objErrors);

        if (Object.keys(objErrors).length !== 0) return

        salvaPedido();
    }

    function salvaPedido() {
        const data = {
            nomeUsuario: values.nomeUsuario,
            percentualImposto: values.percentualImposto,
            pedidoServicoItens: values.pedidoServicoItens
        };

        api.post('pedidoServico/salvarPedidoServico', data)
            .then(resp => {
                Use.notify('Dados salvos com sucesso!');
                // insereNovoRegistro(resp.data);
                closeModal();
            })
            .catch(error => Use.error('Atenção', error.msg || 'Erro ao salvar serviço!'));
    }

    function closeModal() {
        setOpenModal(false);
        setValues(getDefaultValues);
    }

    return (
        <DefaultPage>
            <Table
                title='Pedido'
                onClickPesquisar={() => null}
                onClickNovo={() => setOpenModal(true)}
                onClickEditar={() => null}
                onClickExcluir={() => null}
                data={[]}
                columns={[{
                    title: 'Código',
                    field: 'idPedidoServico',
                    cellStyle: { width: '25%' }
                }, {
                    title: 'Serviço',
                    field: 'nomeServico',
                    cellStyle: { width: '25%' }
                }, {
                    title: 'Usuário',
                    field: 'nomeUsuario',
                    cellStyle: { width: '25%' }
                }, {
                    title: 'Valor pedido',
                    field: 'valorPedido',
                    cellStyle: { width: '25%' }
                }]}
            />
            <Modal
                title='Pedido'
                open={openModal}
                onSubmit={handleSubmit}
                onClose={() => closeModal()}
            >
                <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete='off'>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <TextField
                            label='Código'
                            className={`${classes.input} ${classes.codigo}`}
                            value={values.idPedidoServico}
                            disabled
                        />
                        <Box display='flex' justifyContent='flex-end' alignItems='center'>
                            <Typography className={classes.labelNovoServico}>
                                Novo serviço
                            </Typography>
                            <IconButton onClick={adicionarPedido} ><AddCircleIcon /></IconButton>
                        </Box>
                    </Box>
                    <List className={classes.listServicos}>
                        {
                            values.pedidoServicoItens.map((item, index) => {
                                return (
                                    <ListItem key={`key-${index}`}>
                                        <Box
                                            display='flex'
                                            justifyContent='space-between'
                                            alignItems='center'
                                            width='100%'
                                            padding='5px 0'
                                        >
                                            <SelectField
                                                className={classes.input}
                                                data={listaServicos}
                                                label='Serviço'
                                                name='idServico'
                                                value={item.idServico}
                                                onChange={e => handleChange(e, index, item)}
                                            />
                                            <TextField
                                                disabled
                                                label='Valor/hora'
                                                name='valorHora'
                                                type='number'
                                                className={classes.input}
                                                value={item.valorHora}
                                            />
                                            <TextField
                                                label='Qtde. hora'
                                                name='qtdHora'
                                                type='number'
                                                className={classes.input}
                                                value={item.qtdHora}
                                                onChange={e => handleChange(e, index, item)}
                                            />
                                            <TextField
                                                disabled
                                                label='Total R$'
                                                name='total'
                                                type='number'
                                                className={classes.input}
                                                value={item.total}
                                            />
                                            <Tooltip title='Remover' placement='left'>
                                                <IconButton
                                                    className={classes.buttonIntegrantes}
                                                    onClick={() => removerServico(item, index)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <TextField
                            label='Usuário'
                            name='nomeUsuario'
                            value={values.nomeUsuario}
                            onChange={handleChange}
                        />
                        <TextField
                            type='number'
                            label='Imposto %'
                            name='percentualImposto'
                            value={values.percentualImposto}
                            onChange={handleChange}
                        />
                    </Box>
                    {/* <TextField
                        label='Nome'
                        name='nomeServico'
                        className={classes.input}
                        value={values.nomeServico}
                        onChange={handleChange}
                        error={!!errors.nomeServico}
                        helperText={errors.nomeServico}
                    /> */}
                </form>
            </Modal>
        </DefaultPage>
    );
}