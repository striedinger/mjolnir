import express from 'express';
import contentProvider from  './engine';

const router = express.Router();

router.get('/content/:source', async (req, res) => {
  const { query, params: { source } = {} } = req;
  try {
    const { fetched, ttl } = contentProvider(source, query);
    const data = await fetched;
    res.set('Cache-Control', `max-age=${ttl}`);
    res.json(data);
  } catch (error) {
     // Respond with correct status code if error defined with status param
     const badStatus = error.status || 500;
     res.status(badStatus).send(error.message);
  };
});

export default router;
