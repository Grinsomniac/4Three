"use client";

import React, { useState, useEffect } from "react";
import DrugList from "./components/DrugList";
import PatientSummary from "./components/PatientSummary";
import Stats from "./components/Stats";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]); // State to hold fetched data

  const fetchData = async () => {
    console.log("Fetching data..."); // Log to confirm function call
    try {
      const response = await axios.get("http://127.0.0.1:5000/get_data", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // This is equivalent to `credentials: "include"`
      });

      console.log("Fetched data:", response.data); // Log fetched data
      setData(response.data.Items); // Adjust according to expected structure
    } catch (error) {
      console.error("Fetch error:", error); // Log error for debugging
    }
  };

  useEffect(() => {
    console.log("Component mounted, fetching data...");
    fetchData(); // Call the fetch function
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <PatientSummary />
      <DrugList data={data} />
      <Stats />
    </div>
  );
}
