import { useEffect, useState } from "react";
import { BiFile } from "react-icons/bi";
import { Link } from "react-router-dom";
import { SourceFiles } from "./type";

interface BangumiFilesProps {
  folder: string;
}
export default function BangumiFiles(props: BangumiFilesProps) {
  const { folder } = props;
  const [files, setFiles] = useState<SourceFiles[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(folder + "/files.json");
      const meta = await response.json();
      setFiles(meta);
    };
    fetchData();
  }, [folder]);
  return (
    <div>
      {files.map((file) => (
        <a href={file.location} className="panel-block">
          <span className="panel-icon">
            <BiFile />
          </span>
          {file.name}
        </a>
      ))}
    </div>
  );
}
