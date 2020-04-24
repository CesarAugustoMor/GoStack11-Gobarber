import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => res.json({ mansage: 'hello GoStack' }));

export default routes;
