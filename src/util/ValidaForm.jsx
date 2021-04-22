export function validaFormServico(values, errorFn) {
    let msg;

    if (values.hasOwnProperty('nomeServico')) {

        msg = validaNomeServico(values.nomeServico)

        if (!!msg) errorFn('nomeServico', msg);

    }

    if (values.hasOwnProperty('valorHora')) {
        msg = validaValorHora(values.valorHora)

        if (!!msg) errorFn('valorHora', msg);

    }
}

export function validaFormPedido(values, errorFn) {
    let msg;

    if (values.hasOwnProperty('usuario')) {

        msg = validaUsuario(values.usuario)

        if (!!msg) errorFn('usuario', msg);

    }

    if (values.hasOwnProperty('percentualImposto')) {

        msg = validaPercentualImposto(values.percentualImposto)

        if (!!msg) errorFn('percentualImposto', msg);

    }
}

function validaNomeServico(value) {
    return !value.toString().trim() ? 'Nome serviço obrigatório!' : '';
}

function validaValorHora(value) {
    return !value.toString().trim() ? 'Valor hora obrigatório!' : '';
}

function validaUsuario(value) {
    return !value.toString().trim() ? 'Nome usuário obrigatório!' : '';
}

function validaPercentualImposto(value) {
    return !value.toString().trim() ? 'Percentual de imposto obrigatório!' : '';
}