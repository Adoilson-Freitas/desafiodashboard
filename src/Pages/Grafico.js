import { useEffect, useState } from "react";
import { Chart } from "../components/Chart";
import dateFormat from "dateformat";

export default function Grafico() {
  useEffect(() => {
    const fetchStatistics = async () => {
      const res = await fetch(
        "https://dev-redes-ora.geodatin.com/api/observation/timeSeries/rha/14515000/rain/year"
      );
      const data = await res.json();

      const labels = data.x;

      setChartData({
        labels: labels.map((label) => dateFormat(label, "yyyy")),
        datasets: [
          {
            label: "Estatísticas",
            data: data.y,
            backgroundColor: ["#FA7B00c2"],
            borderColor: ["#FA7B00"],
            borderWidth: 1,
          },
        ],
      });
    };
    fetchStatistics();
  }, []);
  const [chartData, setChartData] = useState({});

  return (
    <div className="grafico">
      <Chart chartData={chartData} />
    </div>
  );
}
