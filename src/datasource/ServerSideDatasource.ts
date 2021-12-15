/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-useless-constructor */
// src/datasource/ServerSideDatasource.ts

import type { 
  IServerSideGetRowsRequest, 
  IServerSideDatasource,
  IServerSideGetRowsParams,
} from '@ag-grid-community/core';

// http://54.222.217.254/javascript-grid-server-side-model/


export class ServerSideDatasource implements IServerSideDatasource {
// export class ServerSideDatasource {
  // gridOptions;

  constructor(
    // private server: FakeServer,
    // private api,
  ) {
    // this.api = api;
  }

  // constructor(gridOptions) {
  //   // this.gridOptions = gridOptions;
  //   // this.client = new ApolloClient({ uri: 'http://localhost:4000/graphql/' });
  // }
  
  // IServerSideGetRowsRequest
  getRows(params: IServerSideGetRowsParams) {
    // const columns = this.gridOptions.columnDefs;

    // query GraphQL endpoint
    // this.client.query(query(params.request, columns))
    //   .then(response => {
    //     const rows = response.data.rows;
    //     // determine last row to size scrollbar and last block size correctly
    //     let lastRow = -1;
    //     if (rows.length <= this.gridOptions.cacheBlockSize) {
    //       lastRow = params.request.startRow + rows.length;
    //     }
    //     // pass results to grid
    //     params.successCallback(rows, lastRow);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //     params.failCallback()
    //   });
  }
}