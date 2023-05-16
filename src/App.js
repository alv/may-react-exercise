import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const TB_TOKEN = 'p.eyJ1IjogIjdmOTIwMmMzLWM1ZjctNDU4Ni1hZDUxLTdmYzUzNTRlMTk5YSIsICJpZCI6ICJmZTRkNWFiZS05ZWIyLTRjMjYtYWZiZi0yYTdlMWJlNDQzOWEifQ.P67MfoqTixyasaMGH5RIjCrGc0bUKvBoKMwYjfqQN8c';

const doTypes = [
  { label: 'All destinations', value: 'ALL' },
  { label: 'Jamaica Hills (Queens)', value: '0' },
  { label: 'TriBeCa (Manhattan)', value: '1' },
];

const TipsReport = () => {
  const [data, setData] = useState([]);
  const [doType, setDoType] = useState('ALL');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const doQuery = doType !== 'ALL' ? `AND dolocationid ${doType === '0' ? '= 141' : '= 231'}` : '';

        const distanceFilter = "trip_distance >= 0.9 AND trip_distance <= 1.1";

        const response = await axios.get('https://api.tinybird.co/v0/pipes/yellow_tripdata_2017_pipe.json', {
          params: {
            token: TB_TOKEN,
            q: `SELECT passenger_count, AVG(tip_amount / passenger_count) AS avg_tip_per_person, COUNT(*) AS trip_count FROM _ WHERE passenger_count > 0 AND passenger_count < 6 ${doQuery} AND ${distanceFilter} GROUP BY passenger_count ORDER BY passenger_count ASC`,
          },
        });

        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [doType]);

  const formatTipAmount = (amount) => {
    return Number(amount).toFixed(3);
  };

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <header>
        <h1>Average tip per passenger by number of passengers (USD)</h1>
        <p>Visualize the average tip amount per person in taxi rides with an equal or very similar distance.</p>
        <p>You can also filter by destination and see whether tips are higher and by how much if the destination is more or less expensive.</p>
      </header>
      <main>
        <ul>
          {doTypes.map((option,index) => (
            <li key={option.value}>
              <input
                id={`option-${option.value}`}
                type="radio"
                tabIndex={index + 1}
                name="doType"
                value={option.value}
                checked={doType === option.value}
                onChange={() => setDoType(option.value)}
              />
              <label htmlFor={`option-${option.value}`}>{option.label}</label>
            </li>
          ))}
        </ul>

        <table>
          <thead>
            <tr>
              <th>Passengers</th>
              <th>Avg. tip per passenger</th>
              <th>Trip count</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ passenger_count, avg_tip_per_person, trip_count }) => (
              <tr key={passenger_count}>
              <td>
                {Array.from({ length: passenger_count }, (_, index) => (
                  <svg aria-label="Person" key={index} viewBox="-69 0 117 256" xmlns="http://www.w3.org/2000/svg"><path d="m-10.9 4.9c11.3 0 20.5 9.2 20.5 20.5s-9.2 20.5-20.5 20.5-20.5-9.2-20.5-20.5 9.2-20.5 20.5-20.5zm25.8 46.3h-51.2c-14.2 0-25.6 11.4-25.6 25.6v62.6c0 4.9 3.9 9 9 9s9-3.9 9-9v-57.5c0-1.4 1.2-2.6 2.6-2.6s2.6 1.2 2.6 2.6v155.2c0 7.7 5.7 14 12.8 14s12.8-6.3 12.8-14v-88.5c0-1.4 1.2-2.6 2.6-2.6s2.6 1.2 2.6 2.6v88.5c0 7.7 5.7 14 12.8 14s12.8-6.3 12.8-14v-155.2c0-1.4 1.2-2.6 2.6-2.6s2.6 1.2 2.6 2.6v57.6c0 4.9 3.9 9 9 9s9-3.9 9-9v-62.7c-.4-14.2-12.1-25.6-26-25.6z"/></svg>
                ))}</td>
              <td>{formatTipAmount(avg_tip_per_person)}</td>
              <td>{trip_count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
    </section>
  );
};

export default TipsReport;
