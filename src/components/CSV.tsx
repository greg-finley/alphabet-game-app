/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import CsvDownloader from "react-csv-downloader";

interface CSVProps {
  data: Record<string, any>[];
  filename: string;
}

export default function CSV(props: CSVProps) {
  const { data, filename } = props;
  return (
    <CsvDownloader
      datas={data}
      filename={filename}
      suffix={true}
      wrapColumnChar={'"'}
    >
      <button>Download CSV</button>
    </CsvDownloader>
  );
}
