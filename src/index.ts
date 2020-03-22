import 'dotenv/config';
import server from './server';

const PORT = process.env.PORT || 8888;

server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
