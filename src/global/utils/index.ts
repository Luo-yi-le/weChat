export function UUID(num = 16): string {
  // eslint-disable-next-line prettier/prettier
  let amm = ['!', '@', '#', '$', '%', '&', '*', '(', ')', '_', 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let tmp = Math.floor(Math.random() * num);
  let s: any = tmp;
  s = s + amm[tmp];
  for (let i = 0; i < Math.floor(num / 2) - 1; i++) {
    tmp = Math.floor(Math.random() * 26);
    s = s + String.fromCharCode(65 + tmp);
  }
  for (let i = 0; i < num - Math.floor(num / 2) - 1; i++) {
    tmp = Math.floor(Math.random() * 26);
    s = s + String.fromCharCode(97 + tmp);
  }
  return s;
}
