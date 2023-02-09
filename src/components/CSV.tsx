/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import CsvDownloader from "react-csv-downloader";

interface CSVProps {
  data: Record<string, any>[] | Promise<Record<string, any>[]>;
  filename: string;
  title: string;
}

export default function CSV(props: CSVProps) {
  const { data, filename, title } = props;
  return (
    <CsvDownloader
      datas={data}
      filename={filename}
      suffix={true}
      wrapColumnChar={'"'}
    >
      <button>{title}</button>
    </CsvDownloader>
  );
}
