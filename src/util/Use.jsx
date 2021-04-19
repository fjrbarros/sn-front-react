import Swal from 'sweetalert2';
import toast from 'toasted-notes';
import 'toasted-notes/src/styles.css';

const Use = {
    confirm: (title, msg, cbYes, cbNo) => Swal.fire({
        title: title || 'Confirmação',
        text: msg || '',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
    }).then(result => {
        if (result.isConfirmed) {
            if (typeof cbYes === 'function') {
                cbYes();
            }
        }

        if (result.dismiss) {
            if (typeof cbNo === 'function') {
                cbNo();
            }
        }
    }),

    alert: (title, msg) => Swal.fire({
        title: title || 'Atenção',
        text: msg || '',
        icon: 'info',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
    }),

    error: (title, msg) => Swal.fire({
        title: title || 'Erro',
        text: msg || '',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
    }),

    notify: (msg, duration) => toast.notify(msg || '', { duration: duration || 2000 })
};

export default Use;