import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'yryjtdr2oj',
  apiKey: process.env.API_KEY || '',
});