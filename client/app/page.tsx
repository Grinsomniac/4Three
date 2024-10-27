"use client";

import React, { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]); // State to hold fetched data

  const fetchData = async () => {
    console.log("Fetching data..."); // Log to confirm function call
    try {
      const response = await fetch("http://localhost:5000/get_data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle non-2xx responses
      }

      const json_data = await response.json();
      console.log("Fetched data:", json_data); // Log fetched data
      setData(json_data.items || json_data); // Adjust according to the expected structure
    } catch (error) {
      console.error("Fetch error:", error); // Log error for debugging
    }
  };

  useEffect(() => {
    console.log("Component mounted, fetching data...");
    fetchData(); // Call the fetch function
  }, []);

  return (
    <div>
      <h1>Fetched Data</h1>
      <ul>
        {data.length > 0 ? (
          data.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li> // Display each item; adjust as necessary
          ))
        ) : (
          <li>No data available</li> // Show a message if no data is fetched
        )}
      </ul>
      <button
        onClick={() => {
          console.log("Button clicked, fetching data...");
          fetchData(); // Call fetchData again when button is clicked
        }}
      >
        Fetch Data
      </button>
    </div>
  );
}
