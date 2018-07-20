export default (err, ctx) => {
  if (err.code && err.code === 404) return console.error('404 | Not Found:', ctx.referer);
  console.error('500 | Voe runtime catch error');
}