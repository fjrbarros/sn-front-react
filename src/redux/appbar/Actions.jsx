export const types = {
    TEXT_DASHBOARD: 'TEXT_DASHBOARD',
    TEXT_SERVICO: 'TEXT_SERVICO',
    TEXT_PEDIDO: 'TEXT_PEDIDO'
};

export function textDashboard() {
    return { type: types.TEXT_DASHBOARD };
}

export function textServico() {
    return { type: types.TEXT_SERVICO };
}

export function textPedido() {
    return { type: types.TEXT_PEDIDO };
}