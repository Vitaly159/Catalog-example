import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { ReactTabulator } from "react-tabulator";
import "react-tabulator/lib/styles.css";
import "tabulator-tables/dist/css/tabulator.min.css";

const RecordsTable = () => {
  const players: any[] = useAppSelector((state) => state.minesweeper.players);

  const columns: any = [
    {
      title: "Топ 10 результатов",
      columns: [
        { formatter: "rownum", hozAlign: "center", width: 40 },
        { title: "Время (сек)", field: "time" },
        { title: "Уровень", field: "level", hozAlign: "center" },
      ],
    },
  ];

  const dataTable = players.sort((a, b) => a.time - b.time).slice(0, 10)

  return (
    <>
      <Link to="/"> К игре</Link>
      <ReactTabulator
        data={dataTable}
        columns={columns}
        layout={"fitData"}
      />
    </>
  );
};

export default RecordsTable;
