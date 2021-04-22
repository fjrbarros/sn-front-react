import React, { useEffect, useState } from 'react';
import DefaultPage from './DefaultPage';
import api from '../api/Index.jsx';
import Use from '../util/Use';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { useDispatch } from 'react-redux';
import { textServico } from '../redux/appbar/Actions';
import { Table, Modal } from '../components/Index';
import { validaFormServico } from '../util/ValidaForm';

const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },

    input: {
        marginBottom: '15px'
    },

    codigo: {
        width: '30%'
    }
}));

function getDefaultValues() {
    return {
        idServico: '',
        nomeServico: '',
        valorHora: ''
    };
}

export default function Servico() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [dadosTable, setDadosTable] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [values, setValues] = useState(getDefaultValues);
    const [errors, setErrors] = useState(getDefaultValues);

    useEffect(() => { dispatch(textServico()) }, []);

    function handleChange(event) {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    function pesquisar() {
        api.get('servico/recuperarServicos')
            .then(resp => setDadosTable(resp.data))
            .catch(error => Use.error('Erro', error.message || 'Erro ao buscar registros!'));
    }

    function excluirRegistro(data) {
        Use.confirm('Confirmação', 'Deseja remover o registro?', () => removeRegistro(data));
    }

    function removeRegistro(data) {
        if (!data.idServico) {
            Use.alert('Atenção', 'Código do serviço não informado!');
            return;
        }

        api.delete(`servico/removerServico/${data.idServico}`)
            .then(msg => {
                Use.notify(msg.data || 'Registro removido com sucesso!');
                removeRegistroTableData(data.idServico);
            })
            .catch(error => Use.error('Erro', error.message || 'Erro ao remover registro!'));
    }

    function handleSubmit() {
        const objErrors = {};
        validaFormServico(values, (campo, msg) => objErrors[campo] = msg);
        setErrors(objErrors);

        if (!isEmptObj(objErrors)) return

        if (values.idServico) {
            atualizaServico();
            return
        }

        salvaServico();

    }

    function salvaServico() {
        api.post('servico/cadastrarServico', values)
            .then(resp => {
                Use.notify('Dados salvos com sucesso!');
                insereNovoRegistro(resp.data);
                closeModal();
            })
            .catch(error => Use.error('Atenção', error.msg || 'Erro ao salvar serviço!'));
    }

    function atualizaServico() {
        api.put('servico/atualizarServico', values)
            .then(resp => {
                Use.notify('Dados salvos com sucesso!');
                atualizaRegistro(resp.data);
                closeModal();
            })
            .catch(error => Use.error('Atenção', error.msg || 'Erro ao salvar serviço!'));
    }

    function insereNovoRegistro(data) {
        const copyData = [...dadosTable];

        copyData.unshift(data);

        setDadosTable(copyData);
    }

    function removeRegistroTableData(id) {
        if (!id) return;

        let copyData = [...dadosTable];

        copyData = copyData.filter(item => item.idServico !== id);

        setDadosTable(copyData);
    }

    function handleEditar(data) {
        if (isEmptObj(data)) return;

        setValues({
            idServico: data.idServico,
            nomeServico: data.nomeServico,
            valorHora: data.valorHora
        });

        setOpenModal(true);
    }

    function atualizaRegistro(data) {
        if (isEmptObj(data)) return;

        let copyData = [...dadosTable];

        const indexReg = copyData.findIndex(obj => obj.idServico === data.idServico);

        if (indexReg < 0) return;

        for (let item in data) {
            if (!data.hasOwnProperty(item)) return;
            copyData[indexReg][item] = data[item];
        }

        setDadosTable(copyData);
    }

    function isEmptObj(obj) {
        return Object.keys(obj).length === 0
    }

    function closeModal() {
        setOpenModal(false);
        setValues(getDefaultValues);
        setErrors(getDefaultValues);
    }

    return (
        <DefaultPage>
            <Table
                title='Serviço'
                onClickPesquisar={pesquisar}
                onClickNovo={() => setOpenModal(true)}
                onClickEditar={handleEditar}
                onClickExcluir={excluirRegistro}
                data={dadosTable}
                possuiActions={true}
                columns={[{
                    title: 'Código',
                    field: 'idServico',
                    cellStyle: { width: '25%' }
                }, {
                    title: 'Nome',
                    field: 'nomeServico',
                    cellStyle: { width: '50%' }
                }, {
                    title: 'Valor hora',
                    field: 'valorHora',
                    cellStyle: { width: '25%' }
                }]}
            />
            <Modal
                title='Serviço'
                open={openModal}
                onSubmit={handleSubmit}
                onClose={closeModal}
            >
                <form onSubmit={handleSubmit} className={classes.form} noValidate autoComplete='off'>
                    <TextField
                        label='Código'
                        className={`${classes.input} ${classes.codigo}`}
                        value={values.idServico}
                        disabled
                    />
                    <TextField
                        label='Nome'
                        name='nomeServico'
                        className={classes.input}
                        value={values.nomeServico}
                        onChange={handleChange}
                        error={!!errors.nomeServico}
                        helperText={errors.nomeServico}
                    />
                    <TextField
                        label='Valor/hora'
                        name='valorHora'
                        className={classes.input}
                        value={values.valorHora}
                        onChange={handleChange}
                        error={!!errors.valorHora}
                        helperText={errors.valorHora}
                    />
                </form>
            </Modal>
        </DefaultPage>
    );
}