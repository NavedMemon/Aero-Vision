// "use client";
// import React, { useEffect, useState } from "react";

// const WeatherWidget = () => {
//   const [weather, setWeather] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         try {
//           const res = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=dbd69c8355836cc068adad13ff64216c&units=metric`
//           );
//           const data = await res.json();

//           if (data.cod === 200) {
//             setWeather({
//               city: data.name,
//               temp: data.main.temp,
//               condition: data.weather[0].main,
//               wind: data.wind.speed,
//               icon: data.weather[0].icon,
//             });
//           } else {
//             setError("Failed to fetch weather.");
//           }
//         } catch (err) {
//           setError("Weather fetch error.");
//         }
//       },
//       () => {
//         setError("Please allow location access.");
//       }
//     );
//   }, []);

//   if (error) return <p className="weather-error">{error}</p>;
//   if (!weather) return <p className="weather-loading">Loading weather...</p>;

//   return (
//     <div className="passenger-weather-box">
//       <h3>🌤 Weather in {weather.city}</h3>
//       <img
//         src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
//         alt={weather.condition}
//         style={{ width: "80px", marginBottom: "10px" }}
//       />
//       <p>🌡 Temperature: {weather.temp}°C</p>
//       <p>🌥 Condition: {weather.condition}</p>
//       <p>💨 Wind: {weather.wind} km/h</p>
//     </div>
//   );
// };

// export default WeatherWidget;

// "use client";
// import React, { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const WEATHER_KEY = "dbd69c8355836cc068adad13ff64216c";

// export default function WeatherWidget() {
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [coords, setCoords] = useState(null);

//   useEffect(() => {
//     if (!navigator.geolocation) return;

//     navigator.geolocation.getCurrentPosition(async ({ coords }) => {
//       const { latitude, longitude } = coords;
//       setCoords([latitude, longitude]);

//       const res = await fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`
//       );
//       const now = await res.json();
//       setWeather({
//         city: now.name,
//         temp: now.main.temp,
//         condition: now.weather[0].main,
//         wind: now.wind.speed,
//         icon: now.weather[0].icon,
//       });

//       const fres = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`
//       );
//       const fdata = await fres.json();
//       setForecast(fdata.list.filter((_e, i) => i % 8 === 0).slice(0, 5));
//     });
//   }, []);

//   if (!weather) return <div className="weather-loading">Fetching weather…</div>;

//   return (
//     <div className="passenger-weather-box animated">
//       <h3>🌥 Weather in {weather.city}</h3>
//       <img
//         src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
//         alt={weather.condition}
//         className="weather-icon"
//       />
//       <p>
//         🌡 {weather.temp}°C | {weather.condition}
//       </p>
//       <p>💨 Wind: {weather.wind} km/h</p>
//       <div className="forecast-grid">
//         {forecast.map((d, idx) => (
//           <div key={idx} className="forecast-day">
//             <p>
//               {new Date(d.dt * 1000).toLocaleDateString("en-US", {
//                 weekday: "short",
//               })}
//             </p>
//             <img
//               src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`}
//               alt={d.weather[0].main}
//             />
//             <p>{Math.round(d.main.temp)}°C</p>
//           </div>
//         ))}
//       </div>
//       {coords && (
//         <MapContainer center={coords} zoom={8} className="weather-map">
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={coords} />
//         </MapContainer>
//       )}
//     </div>
//   );
// }

// "use client";
// import React, { useEffect, useState } from "react";
// import dynamic from "next/dynamic";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Dynamically import Leaflet components (client-side only)
// const MapContainer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.MapContainer),
//   { ssr: false }
// );
// const TileLayer = dynamic(
//   () => import("react-leaflet").then((mod) => mod.TileLayer),
//   { ssr: false }
// );
// const Marker = dynamic(
//   () => import("react-leaflet").then((mod) => mod.Marker),
//   { ssr: false }
// );

// // Fix for missing Leaflet marker icons
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const WEATHER_KEY = "dbd69c8355836cc068adad13ff64216c";

// export default function WeatherWidget() {
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState([]);
//   const [coords, setCoords] = useState(null);

//   useEffect(() => {
//     if (!navigator.geolocation) return;

//     navigator.geolocation.getCurrentPosition(async ({ coords }) => {
//       const { latitude, longitude } = coords;
//       setCoords([latitude, longitude]);

//       try {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`
//         );
//         const now = await res.json();
//         setWeather({
//           city: now.name,
//           temp: now.main.temp,
//           condition: now.weather[0].main,
//           wind: now.wind.speed,
//           icon: now.weather[0].icon,
//         });

//         const fres = await fetch(
//           `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`
//         );
//         const fdata = await fres.json();
//         setForecast(fdata.list.filter((_e, i) => i % 8 === 0).slice(0, 5));
//       } catch (err) {
//         console.error("Weather fetch error:", err);
//       }
//     });
//   }, []);

//   if (!weather) return <div className="weather-loading">Fetching weather…</div>;

//   return (
//     <div className="passenger-weather-box animated">
//       <h3>🌥 Weather in {weather.city}</h3>
//       <img
//         src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
//         alt={weather.condition}
//         className="weather-icon"
//       />
//       <p>
//         🌡 {weather.temp}°C | {weather.condition}
//       </p>
//       <p>💨 Wind: {weather.wind} km/h</p>

//       <div className="forecast-grid">
//         {forecast.map((d, idx) => (
//           <div key={idx} className="forecast-day">
//             <p>
//               {new Date(d.dt * 1000).toLocaleDateString("en-US", {
//                 weekday: "short",
//               })}
//             </p>
//             <img
//               src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`}
//               alt={d.weather[0].main}
//             />
//             <p>{Math.round(d.main.temp)}°C</p>
//           </div>
//         ))}
//       </div>

//       {coords && typeof window !== "undefined" && (
//         <MapContainer center={coords} zoom={8} className="weather-map">
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker position={coords} />
//         </MapContainer>
//       )}
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const WEATHER_KEY = "dbd69c8355836cc068adad13ff64216c";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;
      setCoords([latitude, longitude]);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`
      );
      const now = await res.json();
      setWeather({
        city: now.name,
        temp: now.main.temp,
        condition: now.weather[0].main,
        wind: now.wind.speed,
        icon: now.weather[0].icon,
      });

      const fres = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}&units=metric`
      );
      const fdata = await fres.json();
      setForecast(fdata.list.filter((_e, i) => i % 8 === 0).slice(0, 5));
    });
  }, []);

  if (!weather) return <div className="weather-loading">Loading weather…</div>;

  return (
    <div className="passenger-weather-box animated">
      <h3>🌥 Weather in {weather.city}</h3>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.condition}
        className="weather-icon"
      />
      <p>
        🌡 {weather.temp}°C | {weather.condition}
      </p>
      <p>💨 Wind: {weather.wind} km/h</p>

      <div className="forecast-grid">
        {forecast.map((d, idx) => (
          <div key={idx} className="forecast-day">
            <p>
              {new Date(d.dt * 1000).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${d.weather[0].icon}.png`}
              alt={d.weather[0].main}
            />
            <p>{Math.round(d.main.temp)}°C</p>
          </div>
        ))}
      </div>

      {coords && (
        <MapContainer center={coords} zoom={6} className="weather-map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={coords} />
        </MapContainer>
      )}
    </div>
  );
}
