export default () => ({
  port: parseInt(process.env.VITE_BACKEND_PORT, 10) || 3001,
  database: {
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
