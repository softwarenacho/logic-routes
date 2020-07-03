import React from 'react'
import { CSVReader } from 'react-papaparse'

export default function CSV(props) {
  const { setAddressList } = props;

  const handleOnDrop = (data) => {
    const results = data.slice(1,10).map(d => d.data);
    const addresses = results.map(result => {
      return {
        id: result.ShipmentID,
        address: `${result.StreetName} ${result.StreetNumber}, ${result.Neighborhood}, ${result.ZipCode}`,
      }
    });
    setAddressList(addresses);
  }

  const handleOnError = (err, file, inputElem, reason) => {
    setAddressList([]);
    alert(err);
  }

  const handleOnRemoveFile = (data) => {
    setAddressList([]);
  }

  return (
    <CSVReader
      onDrop={handleOnDrop}
      onError={handleOnError}
      onRemoveFile={handleOnRemoveFile}
      addRemoveButton
      removeButtonColor='#659cef'
      config={{header: true}}
    >
      <span>Drop CSV file here or click to upload.</span>
    </CSVReader>
  )
}
