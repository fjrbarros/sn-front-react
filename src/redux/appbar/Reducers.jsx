import { types } from './Actions';

export default function AppBarText(state = '', action) {
    switch (action.type) {
        case types.TEXT_DASHBOARD:
            return 'Dashboard';
        case types.TEXT_SERVICO:
            return 'Serviço';
        case types.TEXT_PEDIDO:
            return 'Pedido';
        default:
            return state;
    }
}