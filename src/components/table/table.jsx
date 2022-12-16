import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import { createTheme, MenuItem, ThemeProvider, useTheme } from '@mui/material';

export const Table = () => {

  const [columnOrder, setColumnOrder] = React.useState(['firstName', 'address', 'lastName', 'city', 'state']);

  const columns = useMemo(
    () => [
      //column definitions...
      {
        accessorKey: 'firstName',
        header: 'First Name',

        renderColumnActionsMenuItems: ({ closeMenu, column, table }) => {
          return [
            <MenuItem
              onClick={() => {
                // do something
                closeMenu();
              }}
            >
              Custom Menu Item 1
            </MenuItem>,
            <MenuItem
              onClick={() => {
                // do something
                closeMenu();
              }}
            >
              Custom Menu Item 2
            </MenuItem>,
          ];
        },

        renderColumnFilterModeMenuItems: ({ column, onSelectFilterMode }) => [
          <MenuItem
            key="startsWith"
            onClick={() => onSelectFilterMode('startsWith')}
          >
            Start With
          </MenuItem>,
          <MenuItem
            key="endsWith"
            onClick={() => onSelectFilterMode('yourCustomFilterFn')}
          >
            Your Custom Filter Fn
          </MenuItem>,
        ],
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'address',
        header: 'Address',
      },
      {
        accessorKey: 'city',
        header: 'City',
      },
      {
        accessorKey: 'state',
        header: 'State',
      },
      //end
    ],
    [],
  );

  const data = useMemo(
    () => [
      //data definitions...
      {
        firstName: 'Dylan',
        lastName: 'Murray',
        address: '261 Erdman Ford',
        city: 'East Daphne',
        state: 'Kentucky',
      },
      {
        firstName: 'Raquel',
        lastName: 'Kohler',
        address: '769 Dominic Grove',
        city: 'Columbus',
        state: 'Ohio',
      },
      {
        firstName: 'Ervin',
        lastName: 'Reinger',
        address: '566 Brakus Inlet',
        city: 'South Linda',
        state: 'West Virginia',
      },
      {
        firstName: 'Brittany',
        lastName: 'McCullough',
        address: '722 Emie Stream',
        city: 'Lincoln',
        state: 'Nebraska',
      },
      {
        firstName: 'Branson',
        lastName: 'Frami',
        address: '32188 Larkin Turnpike',
        city: 'Charleston',
        state: 'South Carolina',
      },
      //end
    ],
    [],
  );

  const globalTheme = useTheme();

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: globalTheme.palette.mode, //let's use the same dark/light mode as the global theme
          primary: globalTheme.palette.secondary, //swap in the secondary color as the primary for the table
          info: {
            main: 'rgb(255,122,0)', //add in a custom color for the toolbar alert background stuff
          },
          background: {
            default:
              globalTheme.palette.mode === 'light'
                ? 'rgb(254,255,244)' //random light yellow color for the background in light mode
                : '#000', //pure black table in dark mode for fun
          },
        },
        typography: {
          button: {
            textTransform: 'none', //customize typography styles for all buttons in table by default
            fontSize: '1.2rem',
          },
        },
        // components: {
        //   MuiTooltip: {
        //     styleOverrides: {
        //       tooltip: {
        //         fontSize: '1.1rem', //override to make tooltip font size larger
        //       },
        //     },
        //   },
        //   MuiSwitch: {
        //     styleOverrides: {
        //       thumb: {
        //         color: 'pink', //change the color of the switch thumb in the columns show/hide menu to pink
        //       },
        //     },
        //   },
        //   MuiMenu: {
        //     styleOverrides: {
        //       paper: {
        //         backgroundColor: 'rgb(255,255,255,0.9)', //make the menu background semi-transparent
        //       },
        //       list: {
        //         padding: '0px', //remove the padding from the menu list
        //       },
        //       root: {
        //         '& .MuiMenuItem-root': {
        //           padding: '0px', //remove the padding from the menu items
        //         }
        //       }
        //     },
        //   }
        // },
      }),
    [globalTheme],
  );

  return (
    <ThemeProvider theme={tableTheme}>
    <MaterialReactTable
      columns={columns}
      columnOrder={columnOrder}
      data={data}
      enableColumnActions
      enableColumnFilters
      // renderColumnFilterModeMenuItems
      manualFiltering
      enablePinning
      filterVariant
      filterSelectOptions={[
        { value: 'contains', label: 'Contains' },
        { value: 'equals', label: 'Equals' },
        { value: 'notEquals', label: 'Not Equals' },
        { value: 'startsWith', label: 'Starts With' },
        { value: 'endsWith', label: 'Ends With' },
      ]}
      enableColumnOrdering
      // onColumnOrderChange={(columnOrder) => {
      //   console.log(`L:136 `, columnOrder);
      //   setColumnOrder(columnOrder);
      // }}
      // enableColumnDragging
      // onDraggingColumnChange = {(draggingColumn, b, c, data) => {
      //   console.log('draggingColumn', draggingColumn, b, c, data);
      // }}
      enablePagination={false}
      enableColumnResizing
      enableSorting
      enableBottomToolbar
      enableTopToolbar
      muiTableBodyRowProps={{ hover: false }}
    />
    </ThemeProvider>
  );
};

export default Table;
