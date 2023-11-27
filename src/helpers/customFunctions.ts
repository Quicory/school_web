import { date } from 'quasar';

export const isReadOnly = async (modo: string): Promise<boolean> => {
  if (modo === 'NEW') return false;
  if (modo === 'EDIT') return false;

  // const read = modo !== 'NEW' && modo !== 'EDIT'
  return true;
};

export const mappingObject = function (obj1: object, obj2: object): object {
  let copied = Object.assign({}, obj1);

  // if (copied == {}) {
  //   copied = { ...obj2 };
  // } else {
  copied = { ...copied, ...obj2 };
  // }
  return copied;
};

export function validateEmail(email: string): boolean {
  return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

export const getFechaString = (f: string, hazTime = false) => {
  if (!f) return '';

  let returnDate = '';
  if (typeof f === 'string') {
    const time = f.split('T');
    const fecha = time[0];
    let split = fecha.split('-');
    if (split.length !== 3) {
      split = f.split('/');
    }

    let hazFecha = '';
    //if(hazTime && time[1] !== "00:00:00")
    if (hazTime) hazFecha = ' ' + time[1];

    if (split[0].length === 2)
      returnDate = split[0] + '-' + split[1] + '-' + split[2] + hazFecha;
    else returnDate = split[2] + '-' + split[1] + '-' + split[0] + hazFecha;
  } else {
    if (hazTime) returnDate = date.formatDate(f, 'DD-MM-YYYY HH:mm:ss');
    else returnDate = date.formatDate(f, 'DD-MM-YYYY');
  }

  return returnDate;
};

export const getFechaStringSave = (f: string, hazTime = false) => {
  if (!f) return '';

  const time = f.split('T');
  const fecha = time[0];
  let split = fecha.split('-');
  if (split.length !== 3) {
    split = f.split('/');
  }

  let hazFecha = '';
  if (hazTime && time[1] !== '00:00:00') hazFecha = ' ' + time[1];

  console.info('split', split);
  if (split[0].length === 2) {
    return split[2] + '-' + split[1] + '-' + split[0] + hazFecha;
  } else {
    return split[0] + '-' + split[1] + '-' + split[2] + hazFecha;
  }
};
