import { create, router as _router, defaults, bodyParser } from 'json-server';
import cors from 'cors';
import { join } from 'path';

const server = create();
const router = _router(join(__dirname, 'server.json'));
const middlewares = defaults();

server.use(cors());
server.use(bodyParser);
server.use(middlewares);
server.use(router);

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
