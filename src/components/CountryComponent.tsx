import React, { useState, useEffect } from "react";
import "../App.css";

function CountryDropdown(): JSX.Element {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [clockRunning, setClockRunning] = useState<boolean>(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const result = await fetch("http://worldtimeapi.org/api/timezone");
        const data = await result.json();
        setCountries(data);
      } catch (err) {
        console.log("No country found", err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchTime = async () => {
      if (selectedCountry) {
        try {
          const response = await fetch(`http://worldtimeapi.org/api/timezone/${selectedCountry}`);
          const data = await response.json();
          setCurrentTime(data.unixtime * 1000);
        } catch (error) {
          console.error("Error fetching time:", error);
        }
      }
    };
    fetchTime();
  }, [selectedCountry]);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (clockRunning) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [clockRunning]);

  const handleClockPause = () => {
    setClockRunning(false);
  };

  const handleClockStart = () => {
    setClockRunning(true);
  };

  return (
    <div className="countryComp">
      <h3>Country Dropdown</h3>
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="country-selector"
      >
        <option value="">Select a country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>

      <div className="clock">
        <p>{new Date(currentTime).toLocaleTimeString()}</p>
        <button onClick={handleClockPause}>Pause</button>
        <button onClick={handleClockStart}>Start</button>
      </div>
    </div>
  );
}

export { CountryDropdown };
