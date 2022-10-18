export const isObjectEmpty = (obj: Object) => {
  for (let _ in obj) {
    return false;
  }
  return true;
};
