import { useMemo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.css";
export default function Table() {
  const data = useSelector((state: any) => state.tableReducer);
  const correctData = useMemo(() => {
    return data.map((Obj) => {
      const obj = { ...Obj };
      obj["IDType"] = obj["ID Type"];
      delete obj["ID Type"];
      for (const key in obj) if (obj[key] === null) obj[key] = "";
      return obj;
    });
  }, [data]);
  const tableHeadings = useMemo(() => {
    const arr = [];
    const obj = correctData[0];
    if (obj) {
      for (const key in obj) {
        if (key === "IDValue") arr.push("ID");
        else arr.push(key);
      }
    }
    return arr;
  }, [correctData]);
const tableRef = useRef<any>(null);
  useEffect(() => {
    const table = $(tableRef.current);
    table.DataTable({
      // DataTables options
    });
  }, []);
  return (
    <>
      {data.length > 0 ? (
        <table
        ref={tableRef}
          id="dataTable"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <thead>
            <tr>
              {tableHeadings.map((heading) => (
                <th key={heading}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {correctData.map((tData) => (
              <tr key={`${tData.Name}${tData.Age}${tData.Sex}`}>
                <td>{tData?.Name}</td>
                <td>{tData?.Age}</td>
                <td>
                  {tData?.Mobile ? "+91" : ""}
                  {tData?.Mobile}
                </td>
                <td>{tData?.IDValue}</td>
                <td>{tData?.Sex}</td>
                <td>{tData?.Address}</td>
                <td>{tData?.State}</td>
                <td>{tData?.City}</td>
                <td>{tData?.Pincode}</td>
                <td>{tData?.Country}</td>
                <td>{tData?.IDType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </>
  );
}
