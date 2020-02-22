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

const useStyles = makeStyles({
  root: {
    width: '100%'
  }
});

export default function ColorMatcherContainer() {
  const classes = useStyles();
  const [searchField, setSearchField] = React.useState('');
  const [colorsData, setColorsData] = React.useState(xkcdData);
  const [rows, setRows] = React.useState([]);

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleSearch = () => {
    // for each xkcd color, get a ED score with search field
    xkcdData.colors.map((color) => {
      color.distance = calculateEuclideanDistanceBetweenRGB(searchField, color.hex);

      return {
        color
      };
    });

    setColorsData(xkcdData);

    createData();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchField !== null && searchField !== '') {
      console.log(searchField);

      handleSearch();
    }
  };

  function createData() {
    colorsData.colors.sort(({ distance: a }, { distance: b }) => a - b);

    setRows(
      colorsData.colors.slice(0, 51).map((color) => {
        return {
          color: color.hex,
          name: color.color,
          rgb: ColorConverter.hex.rgb(color.hex).toString(),
          hex: color.hex,
          cymk: ColorConverter.hex.cmyk(color.hex).toString(),
          distance: color.distance
        };
      })
    );
  }

  function calculateEuclideanDistanceBetweenRGB(searchHex, xkcdHex) {
    const searchRGB = ColorConverter.hex.rgb(xkcdHex);
    const xkcdRGB = ColorConverter.hex.rgb(searchHex);

    return (
      Math.pow(searchRGB[0] - xkcdRGB[0], 2) +
      Math.pow(searchRGB[1] - xkcdRGB[1], 2) +
      Math.pow(searchRGB[2] - xkcdRGB[2], 2)
    );
  }

  return (
    <Paper className={classes.root}>
      <br />
      <TextField
        value={searchField}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        label="Enter HEX color to search"
        id="filled-start-adornment"
        InputProps={{
          startAdornment: <InputAdornment position="start">#</InputAdornment>
        }}
        inputProps={{ maxLength: 6 }}
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
            {rows.map((row) => {
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
    </Paper>
  );
}
