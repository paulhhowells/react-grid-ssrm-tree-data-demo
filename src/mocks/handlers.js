// src/mocks/handlers.js
import { rest } from 'msw';

const makeGroups = [
  {make: 'Toyota', group: true},
  {make: 'Ford', group: true},
  {make: 'Porsche', group: true},
];
const toyota = [
  {make: 'Toyota', model: 'Celica', price: 35000},
  {make: 'Toyota', model: 'Avensis', price: 42000},
];
const porsche = [
  {make: 'Porsche', model: 'Boxter', price: 72000},
  {make: 'Porsche', model: '911', price: 89000},
];
const ford = [
  {make: 'Ford', model: 'Mondeo', price: 32000},
  {make: 'Ford', model: 'F150 Lightning', price: 39000},
];
const makeTable = {
  toyota,
  porsche,
  ford,
};

export const handlers = [
  rest.get('/api', (req, res, ctx) => {
    const makes = req.url.searchParams.getAll('makes')

    console.log('#MSW makes', makes);

    const results = (!makes || makes.length < 1)
      ? makeGroups // If makes are not specified, return the groups.
      : makes
        .reduce((previous, make) => ([
            ...previous,
            ...makeTable[make.toLowerCase()]
        ]), [])
        .filter(item => Boolean(item));

    return res(
      ctx.status(200),
      ctx.json({
        results,
      }),
    );
  }),
  // rest.post('/login', (req, res, ctx) => {
  //   // Persist user's authentication in the session
  //   sessionStorage.setItem('is-authenticated', 'true');

  //   return res(
  //     // Respond with a 200 status code
  //     ctx.status(200),
  //   )
  // }),
  // rest.get('/user', (req, res, ctx) => {
  //   // Check if the user is authenticated in this session
  //   const isAuthenticated = sessionStorage.getItem('is-authenticated');

  //   if (!isAuthenticated) {
  //     // If not authenticated, respond with a 403 error
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         errorMessage: 'Not authorized',
  //       }),
  //     )
  //   }

  //   // If authenticated, return a mocked user details
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       username: 'admin',
  //     }),
  //   );
  // }),
];
