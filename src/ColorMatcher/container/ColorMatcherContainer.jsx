import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import xkcdData from '../../data/xkcd.json';
import ColorConverter from 'color-convert';

const columns = [
  { id: 'color', label: 'Color', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'hex',
    label: 'HEX',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'rgb',
    label: 'RGB',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'cymk',
    label: 'CYMK',
    minWidth: 170,
    align: 'left'
  },
  {
    id: 'distance',
    label: 'Distance',
    minWidth: 100,
    align: 'left'
  }
];

function createData() {
  const tableRows = xkcdData.colors.map((color) => {
    return {
      color: color.hex,
      name: color.color,
      rgb: ColorConverter.hex.rgb(color.hex).toString(),
      hex: color.hex,
      cymk: ColorConverter.hex.cmyk(color.hex).toString(),
      distance: color.distance
    };
  });

  return tableRows;
}

const rows = createData();

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  container: {
    maxHeight: '80vh'
  }
});

export default function ColorMatcherContainer() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(1000);
  const [searchField, setSearchField] = React.useState('');
  const [colorsData, setColorsData] = React.useState(xkcdData);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleSearch = () => {
    console.log(searchField);
    // find top 50 colors here

    // for each xkcd color, get a ED score with search field
    xkcdData.colors.map((color) => {
      color.distance = calculateEuclideanDistance(searchField, color.hex);
      return {
        color
      };
    });

    console.log(xkcdData.colors.sort(({ distance: a }, { distance: b }) => a - b));

    setColorsData(xkcdData.colors.sort(({ distance: a }, { distance: b }) => a - b));
    // const distance = calculateEuclideanDistance(searchField, xkcdData.colors[0].hex);

    // console.log(distance);

    // map through each xkcd colors, add a ED score

    // give top 50 ED score xkcd colors
    // pass those to table to display
  };

  function calculateEuclideanDistance(searchHex, xkcdHex) {
    const searchRGB = ColorConverter.hex.rgb(searchHex);
    const xkcdRGB = ColorConverter.hex.rgb(xkcdHex);

    console.log(searchRGB);
    console.log(xkcdRGB);

    return Math.sqrt(
      (searchRGB[0] - xkcdRGB[0]) ^
        (2 + (searchRGB[0] - xkcdRGB[0])) ^
        (2 + (searchRGB[0] - xkcdRGB[0])) ^
        2
    );
  }

  return (
    <Paper className={classes.root}>
      <br />
      <TextField
        value={searchField}
        onChange={handleChange}
        label="Enter HEX color to search"
        id="filled-start-adornment"
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>
        }}
        variant="outlined"
      />
      <Button onClick={handleSearch} variant="contained" color="primary">
        Search
      </Button>
      <br />
      <br />

      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.hex}>
                    {columns.map((column) => {
                      const value = row[column.id];

                      return (
                        <TableCell key={column.id}>
                          {column.id === 'color' ? (
                            <div style={{ background: value }}>&nbsp;</div>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
