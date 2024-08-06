import Swal from 'sweetalert2';
export function showSuccessAlert(message: string) {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    });
}
export function showErrorAlert(message: string) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    });
}
export function showInfoAlert(message: string) {
    Swal.fire({
        icon: 'info',
        title: 'Info',
        text: message,
    });
}
export function showWarningAlert(message: string) {
    Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: message,
    });
}
export function showConfirmAlert(message: string, confirmCallback: () => void) {
    Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: message,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            confirmCallback();
        }
    });
}
export function showConfirmAlertWithCancel(message: string, confirmCallback: () => void, cancelCallback: () => void) {
    Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: message,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            confirmCallback();
        } else {
            cancelCallback();
        }
    });
}
export function showToastTopRight(message: string) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
    });
}
export function showSuccessAlertWithReLoad(message: string) {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    }).then(() => {
        window.location.reload();
    });
}
