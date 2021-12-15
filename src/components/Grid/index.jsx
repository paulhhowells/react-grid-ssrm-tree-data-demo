import React from 'react';
import { ModuleRegistry } from '@ag-grid-community/core';     // @ag-grid-community/core will always be implicitly available
import { AgGridReact } from '@ag-grid-community/react';
// import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { RowGroupingModule } from "@ag-grid-enterprise/row-grouping";
import { ServerSideRowModelModule } from "@ag-grid-enterprise/server-side-row-model";

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-alpine.css';


ModuleRegistry.registerModules([
    // ClientSideRowModelModule,
    RowGroupingModule,
    ServerSideRowModelModule,
]);

const columnDefs = [
  { field: "make" },
  { field: "model" },
  { field: "price" }
];
const defaultColDef = {
  flex: 1,
  resizable: true,
  sortable: true,
};

function Grid() {
  const [gridApi, setGridApi] = React.useState(null);
  const onGridReady = (params) => {
    setGridApi(params.api);

    // register datasource with the grid
    params.api.setServerSideDatasource(datasource);
  };

  const datasource = {
    getRows (params) {
      const { request } = params;
      const { groupKeys, startRow, endRow } = request;

      console.log(JSON.stringify(request, null, 1));

      // TODO convert params into correct fetch pagination & query etc.
      console.log('getRows groupKeys:', groupKeys);
      // endRow startRow

      const root = 'http://localhost:3000';
      const path = '/api';
      const url = new URL(root + path);

      if (groupKeys && groupKeys.length) {
        const params = { 
          makes: groupKeys.map(groupKey => groupKey.toLowerCase()),
          ...(startRow && { startRow }),
          ...(endRow && { endRow }),
        };
        url.search = new URLSearchParams(params); // .toString();
      }

      console.log(url);

      fetch(url, {
          method: 'get',
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
        .then(httpResponse => httpResponse.json())
        .then(response => {
          const { results: rows } = response;

          // TODO calculate lastRow correctly.
          // const lastRow = rows.length - 1;

          console.log('success rows', rows);

          params.success({
            rowData: rows,

            // The last row, if known, to help Infinite Scroll (i.e Partial Store) and Pagination.
            rowCount: rows.length - 1,
          });

          // refreshCache(); // not needed
        })
        .catch(error => {
          console.error(error);

          params.fail();
        });
    }
  };

  // Identify parent rows.
  const isServerSideGroup = datum => {
    return Boolean(datum.model === undefined);
  };

  // Specify which group key to use
  // to identify parent.

  // how is this used?
  // this gets or defines groupKey?
  // this expects an object or array for datum?
  const getServerSideGroupKey = datum => {
    console.log('getServerSideGroupKey', datum);

    // only return if a parent group node with make ?
    if (datum.make) {
      return String(datum.make);
    }
  };

  const autoGroupColumnDef= {
    field: 'make',
    // cellRendererParams: {
    //   innerRenderer: function (params) {
    //     // display employeeName rather than group key (employeeId)
    //     return params.data.employeeName;
    //   },
    // },
  };

  return (
    <div className="ag-theme-alpine grid" style={{height: 200, width: 600}}>
      <AgGridReact 
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        // rowData={rowData}

        onGridReady={onGridReady}
        rowModelType="serverSide"
        //
        // serverSideStoreType= "partial" // endRow & startRow
        treeData
        autoGroupColumnDef={autoGroupColumnDef}
        isServerSideGroup={isServerSideGroup}
        getServerSideGroupKey={getServerSideGroupKey}
        //
        rowSelection="multiple"
      />
    </div>
  );

  function refreshCache (route = [], purge = true) {
    gridApi?.refreshServerSideStore({ route, purge });
  }
}

export default Grid;

  /* React.useEffect(() => {
    const fetchData = async () => {
      const url = new URL('http://localhost:3000/api');
      const params = { foo: 'bar' };
      url.search = new URLSearchParams(params); // .toString();

      const response = await fetch(url);
      const data = await response.json();
      const { results } = data;

      setRowData(results);
    };

    fetchData();
  }, []);*/


// class Polygon {
//   constructor() {
//     this.name = 'Polygon';
//   }
// }

// class Animal {
//   speak() {
//     return this;
//   }
//   static eat() {
//     return this;
//   }
// }

// const obj = new Animal();

// console.log('obj.speak()', obj.speak()); // the Animal object

// // wow!
// const speak = obj.speak;
// console.log('speak()', speak()); // undefined

// Animal.eat() // class Animal
// const eat = Animal.eat;
// console.log('eat()', eat()); // undefined

