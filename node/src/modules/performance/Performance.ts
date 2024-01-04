import Express from 'express'
import BodyParser from 'body-parser'

export const Performance = Express.Router();

Performance.use(BodyParser.urlencoded({ extended: false }));
Performance.use(BodyParser.json());

