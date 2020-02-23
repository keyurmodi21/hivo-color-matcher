import React from 'react';

import xkcdData from '../../data/xkcd.json';
import ColorConverter from 'color-convert';

import ColorMatcher from '../presentation/ColorMatcher';

const columns = [
  { id: 'color', label: 'Color' },
  { id: 'name', label: 'Name' },
  { id: 'hex', label: 'HEX', format: (value) => value.toUpperCase() },
  { id: 'rgb', label: 'RGB' },
  { id: 'cymk', label: 'CYMK' }
];

export default function ColorMatcherContainer() {
  const [searchField, setSearchField] = React.useState('');
  const [colorsData, setColorsData] = React.useState(xkcdData);
  const [rows, setRows] = React.useState([]);
  const [hexError, setHexError] = React.useState(false);
  const [errorHelperText, setErrorHelperText] = React.useState('');

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleSearch = () => {
    // regex for hex code ( 6 digit and can contain A-F, ignoring case)
    const hexRegEx = new RegExp(/^[0-9A-F]{6}$/i);

    // check if the entered value is correct CSS color or not
    if (hexRegEx.test(searchField)) {
      // for each xkcd color, get a ED score with search field
      xkcdData.colors.map((color) => {
        color.distance = calculateEuclideanDistanceBetweenRGB(
          searchField,
          color.hex
        );

        return {
          color
        };
      });

      setColorsData(xkcdData);
      createTableData();
      setHexError(false);
      setErrorHelperText('');
    } else {
      setHexError(true);

      setErrorHelperText(
        'Invalid Hex code, please enter valid input: A 6 character hex alphanumeric value'
      );
    }
  };

  const handleKeyDown = (event) => {
    // only allow when search field is not empty, search field is not blank and contains exact 6 characters
    if (event.key === 'Enter' && searchField !== null && searchField !== '') {
      handleSearch();
    }
  };

  function createTableData() {
    colorsData.colors.sort(({ distance: a }, { distance: b }) => a - b);

    setRows(
      colorsData.colors.slice(0, 50).map((color) => {
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
    <ColorMatcher
      searchField={searchField}
      columns={columns}
      rows={rows}
      handleSearch={handleSearch}
      handleChange={handleChange}
      handleKeyDown={handleKeyDown}
      hexError={hexError}
      errorHelperText={errorHelperText}
    />
  );
}
