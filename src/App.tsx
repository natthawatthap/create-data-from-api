import React, { useEffect, useState } from "react";

import "./App.css";
import { fetchData } from "./api/getDummyJson";
import { transformUsersToDepartmentSummary } from "./utils/transformUsersToDepartmentSummary";
import { DepartmentData } from "./models/DepartmentData";
import { User } from "./models/User";

function App() {
  const [departmentData, setDepartmentData] = useState<DepartmentData>({});

  useEffect(() => {
    const fetchDataAndGroup = async () => {
      try {
        const users: User[] = await fetchData();

        const groupedData = transformUsersToDepartmentSummary(users);

        setDepartmentData(groupedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAndGroup();
  }, []);

  return (
    <div className="App">
      <h1>Department Data Summary</h1>
      <div>
        {Object.keys(departmentData).map((departmentName) => (
          <div key={departmentName}>
            <h2>{departmentName}</h2>
            <p>Male: {departmentData[departmentName].male}</p>
            <p>Female: {departmentData[departmentName].female}</p>
            <p>Age Range: {departmentData[departmentName].ageRange}</p>
            <p>Age Mode: {departmentData[departmentName].ageMode}</p>

            <h3>Hair Color Summary</h3>
            <ul>
              {Object.keys(departmentData[departmentName].hair).map((color) => (
                <li key={color}>
                  {color}: {departmentData[departmentName].hair[color]}
                </li>
              ))}
            </ul>

            <h3>Address User Summary</h3>
            <ul>
              {Object.keys(departmentData[departmentName].addressUser).map(
                (fullName) => (
                  <li key={fullName}>
                    {fullName}:{" "}
                    {departmentData[departmentName].addressUser[fullName]}
                  </li>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
