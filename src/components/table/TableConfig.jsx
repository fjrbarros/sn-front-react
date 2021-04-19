import React, { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

export const localization = {
    body: {
        emptyDataSourceMessage: 'Sem dados para exibir',
        deleteText: 'Tem de que deseja exlcuir esta linha?',
        addTooltip: 'Adicionar',
        deleteTooltip: 'Deletar',
        editTooltip: 'Editar',
        filterRow: {
            filterPlaceHolder: 'Filtrar',
            filterTooltip: 'Filtrar',
        },
        editRow: {
            deleteText: 'Tem certeza de que deseja excluir?',
            cancelTooltip: 'Cancelar',
            saveTooltip: 'Salvar',
        },
    },
    grouping: {
        placeholder: 'Arraste o título da coluna para agrupar as linhas',
        groupedBy: 'Agrupar por: ',
    },
    header: {
        actions: 'Ações',
    },
    pagination: {
        labelDisplayedRows: '{count} de {from}-{to}',
        labelRowsSelect: 'linhas',
        labelRowsPerPage: 'Linhas por página: ',
        firstAriaLabel: 'Primeira página',
        firstTooltip: 'Primeira página',
        previousAriaLabel: 'Página anterior',
        previousTooltip: 'Página anterior',
        nextAriaLabel: 'Próxima página',
        nextTooltip: 'Próxima página',
        lastAriaLabel: 'Última página',
        lastTooltip: 'Última página',
    },
    toolbar: {
        addRemoveColumns: 'Adicionar ou remover colunas',
        nRowsSelected: '{0} linhas(s) selecionadas',
        showColumnsTitle: 'Mostrar colunas',
        showColumnsAriaLabel: 'Mostrar colunas',
        exportTitle: 'Exportar',
        exportAriaLabel: 'Exportar',
        exportName: 'Exportar',
        exportCSVName: 'Exportar para CSV',
        exportPDFName: 'Exportar para PDF',
        searchTooltip: 'Pesquisar',
        searchPlaceholder: 'Pesquisar',
    },
}

export const tableIcons = {
    Save: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};