export default () => ({
  mode: process.env.MODE,
  port: parseInt(process.env.PORT, 10) || 8000,
});
