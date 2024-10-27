"use client";

import React, { useState } from "react";
import DrugDisplay from "./DrugDisplay";

type DrugListProps = {
  data: object[];
};

export default function DrugList({ data }: DrugListProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1); // State for selected index

  const handleClick = (index: number, drugName: string) => {
    setSelectedIndex(index);
    console.log(`You clicked on ${drugName}`);
  };

  return (
    <div className="col-span-1">
      <h1>Fetched Data</h1>
      <ul>
        {data.length > 0 ? (
          data.map((item, index) => {
            // Type assertion to specify the expected structure
            const drugItem = item as {
              "Drug name": { S: string };
              "Brand or Generic Drug": { S: string };
              "Coverage rules or limits on use": { S: string };
              Tier: { N: string };
            };

            const drugName = drugItem["Drug name"]?.S;
            const brandOrGeneric = drugItem["Brand or Generic Drug"]?.S;
            const coverageRules =
              drugItem["Coverage rules or limits on use"]?.S;
            const tier = drugItem["Tier"]?.N;

            if (!drugName) {
              console.warn(
                `Drug name not found for item at index ${index}:`,
                item
              );
              return null;
            }

            return (
              <div
                key={index}
                onClick={() => handleClick(index, drugName)}
                className="my-10"
                style={{
                  cursor: "pointer",
                  border: "1px solid #ccc",
                  outline:
                    selectedIndex === index ? "3px solid yellow" : "none",
                  transition: "outline 0.3s ease",
                }}
              >
                <DrugDisplay
                  brand={brandOrGeneric}
                  rules={coverageRules}
                  name={drugName}
                  tier={tier}
                />
              </div>
            );
          })
        ) : (
          <li>No data available</li>
        )}
      </ul>
    </div>
  );
}
