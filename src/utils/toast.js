export const createToast = ({ bg, color, icon, iconColor }) =>
  Swal.mixin({
    toast: true,
    position: 'top-end',
    icon: icon,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: bg,
    color: color,
    iconColor: iconColor,
  });