import React, { useEffect, useState } from 'react';
import DefaultPage from './DefaultPage';
import api from '../api/Index.jsx';
import Use from '../util/Use';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useDispatch } from 'react-redux';
import { textPedido } from '../redux/appbar/Actions';
import { Table, Modal, SelectField } from '../components/Index';
import { validaFormPedido } from '../util/ValidaForm';
import { Box, Tooltip, Typography } from '@material-ui/core';

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
        usuario: '',
        percentualImposto: '',
        pedidoServicos: []
    };
}

export default function Pedido() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [dadosTable, setDadosTable] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [values, setValues] = useState(getDefaultValues);
    const [errors, setErrors] = useState({ usuario: '', percentualImposto: '' });
    const [listaServicos, setListaServicos] = useState([]);

    useEffect(() => { dispatch(textPedido()) }, []);

    useEffect(() => {
        api.get('servico/recuperarServicos')
            .then(resp => setListaServicos(resp.data))
            .catch(error => Use.error('Erro', error.message || 'Erro ao buscar registros!'));
    }, []);

    function adicionarPedido() {
        const copypedidoServicos = [...values.pedidoServicos];

        copypedidoServicos.push({
            qtdHora: '',
            total: '',
            servico: { idServico: '', valorHora: '' }
        });

        setValues({ ...values, pedidoServicos: copypedidoServicos });
    }

    function removerServico(servico, index) {
        let copypedidoServicos = [...values.pedidoServicos];

        copypedidoServicos = copypedidoServicos.filter(item => item !== servico);

        setValues({ ...values, pedidoServicos: copypedidoServicos });
    }

    function handleChange(event, index, item) {
        const name = event.target.name;
        const value = event.target.value;
        const copypedidoServicos = [...values.pedidoServicos];

        if (name === 'usuario' || name === 'percentualImposto') {
            setValues({ ...values, [name]: value });
            return;
        }

        if (name === 'idServico') {
            resetValuesList(copypedidoServicos, index);
            const valorHora = listaServicos.find(item => item.idServico === value).valorHora;
            copypedidoServicos[index].servico.valorHora = valorHora;
            copypedidoServicos[index].servico.idServico = value;
        }

        if (name === 'qtdHora') {
            copypedidoServicos[index].qtdHora = value;
            copypedidoServicos[index]['total'] = value * item.servico.valorHora;
        }

        setValues({ ...values, pedidoServicos: copypedidoServicos });
    }

    function resetValuesList(copypedidoServicos, index) {
        copypedidoServicos[index].qtdHora = '';
        copypedidoServicos[index].total = '';
        copypedidoServicos[index].servico.idServico = '';
        copypedidoServicos[index].servico.valorHora = '';
    }

    function handleSubmit() {
        const objErrors = {};
        const data = { usuario: values.usuario, percentualImposto: values.percentualImposto };
        validaFormPedido(data, (campo, msg) => objErrors[campo] = msg);
        setErrors(objErrors);

        if (Object.keys(objErrors).length !== 0) return

        salvaPedido();
    }

    function salvaPedido() {
        api.post('pedido/salvarPedido', values)
            .then(resp => {
                insereNovoRegistro(resp.data.pedido);
                closeModal();
                Use.alert('Dados salvos com sucesso!', resp.data.resposta);
            })
            .catch(error => {
                const msg = error.response && error.response.data ? error.response.data.message : 'Erro ao salvar pedido!'
                Use.error('Atenção', msg);
            });
    }

    function closeModal() {
        setOpenModal(false);
        setValues(getDefaultValues);
    }

    function insereNovoRegistro(data) {
        const copyData = [...dadosTable];

        copyData.unshift(data);

        setDadosTable(copyData);
    }

    function pesquisar() {
        api.get('pedido/recuperarPedidos')
            .then(resp => setDadosTable(resp.data))
            .catch(error => Use.error('Erro', error.message || 'Erro ao buscar registros!'));
    }

    return (
        <DefaultPage>
            <Table
                title='Pedido'
                onClickPesquisar={pesquisar}
                onClickNovo={() => setOpenModal(true)}
                data={dadosTable}
                columns={[{
                    title: 'Código',
                    field: 'idPedido',
                    cellStyle: { width: '15%' }
                }, {
                    title: 'Usuário',
                    field: 'usuario',
                    cellStyle: { width: '20%' }
                }, {
                    title: 'Total bruto R$',
                    field: 'valorTotalBruto',
                    cellStyle: { width: '25%' }
                }, {
                    title: 'Total líquido R$',
                    field: 'valorTotalLiquido',
                    cellStyle: { width: '25%' }
                }, {
                    title: 'Imposto %',
                    field: 'percentualImposto',
                    cellStyle: { width: '15%' }
                }]}
            />
            <Modal
                title='Pedido'
                open={openModal}
                onSubmit={handleSubmit}
                onClose={() => closeModal()}
            >
                <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete='off'>
                    <Box display='flex' justifyContent='flex-end' alignItems='center'>
                        <Typography className={classes.labelNovoServico}>
                            Novo serviço
                            </Typography>
                        <IconButton onClick={adicionarPedido} ><AddCircleIcon /></IconButton>
                    </Box>
                    <List className={classes.listServicos}>
                        {
                            values.pedidoServicos.map((item, index) => {
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
                                                value={item.servico.idServico}
                                                onChange={e => handleChange(e, index, item)}
                                            />
                                            <TextField
                                                disabled
                                                label='Valor/hora'
                                                name='valorHora'
                                                type='number'
                                                className={classes.input}
                                                value={item.servico.valorHora}
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
                            name='usuario'
                            value={values.usuario}
                            onChange={handleChange}
                            error={!!errors.usuario}
                            helperText={errors.usuario}
                        />
                        <TextField
                            type='number'
                            label='Imposto %'
                            name='percentualImposto'
                            value={values.percentualImposto}
                            onChange={handleChange}
                            error={!!errors.percentualImposto}
                            helperText={errors.percentualImposto}
                        />
                    </Box>
                </form>
            </Modal>
        </DefaultPage>
    );
}