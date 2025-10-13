import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/components/Home";
import Header from "./shared/Header/Header";
function App() {
  const [city, setCity] = useState<string>("Moscow");

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
  };

  return (
    <div className="App">
      <Header onCityChange={handleCityChange} />
      <Routes>
        <Route path="/" element={<Home city={city} />} />
      </Routes>
    </div>
  );
}

export default App;
