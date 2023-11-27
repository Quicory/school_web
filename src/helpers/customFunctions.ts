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
