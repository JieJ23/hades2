import React, { useState, useEffect, useRef, useMemo } from "react";
import Globe from "react-globe.gl";

import data from "../Data/countries_177.json";
import points from "../Data/countries_value.json";

import { BarChart, Bar, XAxis, LabelList, ResponsiveContainer, Cell } from "recharts";

import Loading from "../Hook/Loading";
import EasedCounter from "../Comp/Counter";

// Fetch Data

function useGlobeData() {
  const [postG, setPostG] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const cached = localStorage.getItem("gData");
        const cacheTimestamp = localStorage.getItem("gData_timestampS");
        const oneDayInMs = 30 * 60 * 1000; // 30 minutes in milliseconds

        if (cached && cacheTimestamp) {
          const age = Date.now() - parseInt(cacheTimestamp);
          if (age < oneDayInMs) {
            setPostG(JSON.parse(cached));
            setLoader(false);
            return; // Use cached data
          }
        }
        const response = await fetch(
          `https://script.google.com/macros/s/AKfycbxdA2b-SeBDqvuL3zIkfDGckMiDhe8fcwO6otI6MG6xCd_F-hFqGZ9DtBreBh-ZyVzm/exec`,
        );
        const posts = await response.json();
        setPostG(posts);
        // Save with timestamp
        localStorage.setItem("gData", JSON.stringify(posts));
        localStorage.setItem("gData_timestampS", Date.now().toString());

        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    }

    load();
  }, []);

  return { postG, loader };
}

/**
 * PlayerHexGlobe
 * ----------------
 * A 3D globe where EVERY country renders as a hex-polygon region:
 *  - countries with an assigned player are colored per-player
 *  - all other countries render in a neutral gray, still hoverable
 *  - hover shows Player Name / Country / Score for player countries
 *  - a player avatar image (/Avatar/{name}.webp) fl
 *
 *
 * npm install react-globe.gl three
 */

// --- 1. Your data source -----------------------------------------------
// Key by numeric ISO 3166-1 code (ISO_N3 in the GeoJSON) — more reliably
// populated in this dataset than ISO_A3, which is "-99" (placeholder) for
// several countries including France.

// Neutral fill for countries with no player assigned
const EMPTY_COUNTRY_COLOR = "#4a4a4a";

function returnValue(iso) {
  return points[iso];
}

// --- ISO lookup helper -----------------------------------------------------
// Numeric ISO 3166-1 code (ISO_N3) is cleanly populated for every country in
// this dataset, including ones where ISO_A3/ISO_A3_EH are broken ("-99")
// placeholders — e.g. France. UN_A3 is a duplicate numeric field kept as a
// belt-and-suspenders fallback.
function getISO(feature) {
  const p = feature.properties;
  const code = p.ISO_N3;
  return code && code !== "-99" ? code : p.UN_A3;
}

// --- Centroid helper -----------------------------------------------------
// Natural Earth country GeoJSON doesn't ship a ready-made centroid property,
// so we approximate one from the geometry: pick the largest ring (handles
// MultiPolygon countries like the US/Russia/Japan, so we land on the main
// landmass rather than averaging in tiny islands) and average its points.
// Good enough for marker placement; not survey-grade centroid math.
function getCentroid(feature) {
  const { type, coordinates } = feature.geometry;
  const rings = type === "Polygon" ? [coordinates[0]] : coordinates.map((poly) => poly[0]);
  const mainRing = rings.reduce((a, b) => (a.length > b.length ? a : b));

  let lngSum = 0;
  let latSum = 0;
  mainRing.forEach(([lng, lat]) => {
    lngSum += lng;
    latSum += lat;
  });

  return { lat: latSum / mainRing.length, lng: lngSum / mainRing.length };
}

export default function PlayerGlobe() {
  const globeEl = useRef();
  const [countries, setCountries] = useState([]);
  const [hoverD, setHoverD] = useState(null);
  const [selectedISO, setSelectedISO] = useState("");
  const [statsOpen, setStatsOpen] = useState(false);

  const { postG, loader } = useGlobeData();

  // Index players by ISO code for O(1) lookup during render
  const playersByISO = postG?.reduce((acc, p) => {
    acc[p.countryISO] = p;
    return acc;
  }, {});

  const flyToCountry = (iso) => {
    const feature = countries.find((f) => getISO(f) === iso);
    if (!feature || !globeEl.current) return;

    const { lat, lng } = getCentroid(feature);
    globeEl.current.controls().autoRotate = false;
    globeEl.current.pointOfView({ lat, lng, altitude: 1.2 }, 1000);
  };

  // --- 2. Load world GeoJSON (bundle this locally in production) -------
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson",
    )
      .then((res) => res.json())
      .then((geo) => setCountries(geo.features));
  }, []);

  // Slow auto-rotate for presentation; remove if undesired
  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.6;
    }
  }, [selectedISO, postG]);

  // Render hexes for EVERY country — color/label branch on whether a
  // player is assigned, so hover works globally, not just on countries
  // that happen to have a player.
  const hexData = countries;

  // Countries that actually have a player — used for the avatar layer and
  // the "jump to country" dropdown, which should stay player-specific.
  const playerHexData = useMemo(() => countries.filter((f) => playersByISO[getISO(f)]), [countries]);

  const countryNameByISO = useMemo(
    () =>
      countries.reduce((acc, f) => {
        acc[getISO(f)] = f.properties.ADMIN;
        return acc;
      }, {}),
    [countries],
  );

  // Precompute { lat, lng, player, admin } per player's country — avoids
  // recalculating the centroid on every render/hover.
  const avatarData = useMemo(
    () =>
      playerHexData.map((f) => {
        const { lat, lng } = getCentroid(f);
        return {
          lat,
          lng,
          player: playersByISO[getISO(f)],
          admin: f.properties.ADMIN,
        };
      }),
    [playerHexData],
  );
  // Player Calculations
  const playerSummary = Object.entries(
    postG.reduce((acc, item) => {
      if (!acc[item.name]) {
        acc[item.name] = [];
      }
      acc[item.name].push(item);
      return acc;
    }, {}),
  ).sort(
    (a, b) =>
      b[1].reduce((acc, item) => acc + points[item.countryISO], 0) -
      a[1].reduce((acc, item) => acc + points[item.countryISO], 0),
  );

  const teamSummary = Object.entries(
    postG.reduce((acc, item) => {
      if (!acc[item.team]) {
        acc[item.team] = [];
      }
      acc[item.team].push(item);
      return acc;
    }, {}),
  ).sort(
    (a, b) =>
      b[1].reduce((acc, item) => acc + points[item.countryISO], 0) -
      a[1].reduce((acc, item) => acc + points[item.countryISO], 0),
  );
  //

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          backgroundImage: "url('/test.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {loader ? (
          <Loading />
        ) : (
          <>
            <Globe
              ref={globeEl}
              globeImageUrl="/nightworld.webp"
              // backgroundImageUrl="/test.png"
              backgroundColor="rgba(1, 3, 18, 0)"
              // --- Hexed Polygons layer: every country, colored per-player or gray ---
              hexPolygonsData={hexData}
              hexPolygonResolution={4} // hex grid density per country
              hexPolygonMargin={0.1} // gap between hexes (0-1)
              hexPolygonUseDots={false} // solid hex caps, not dots
              hexPolygonColor={(d) => playersByISO[getISO(d)]?.color ?? EMPTY_COUNTRY_COLOR}
              hexPolygonLabel={(d) => {
                const p = playersByISO[getISO(d)];
                return (
                  <div className="bg-[#0e0c12] p-4 font-[Ale] text-[14px] border-1 rounded border-white/20 min-w-40 relative">
                    {p && (
                      <img
                        src={`/GUI_Card/c${p.aspect}.png`}
                        alt="Aspect"
                        className="absolute right-0 top-0 h-full w-auto opacity-50 -z-10"
                      />
                    )}
                    <div>{p ? p.name : "Unclaimed"}</div>
                    <div>Zone: {d.properties.ADMIN}</div>
                    <div>Zone Code: {getISO(d)}</div>
                    {points[getISO(d)] > 140 ? (
                      <div className="flex flex-col gap-1">
                        <div className="text-[red]">Major Value</div>
                        <div className="flex gap-1 w-full">
                          <div className="w-4 h-1 bg-[red]" />
                          <div className="w-4 h-1 bg-[red]" />
                          <div className="w-4 h-1 bg-[red]" />
                        </div>
                      </div>
                    ) : points[getISO(d)] > 120 ? (
                      <div className="flex flex-col gap-1">
                        <div className="text-[orange]">Moderate Value</div>
                        <div className="flex gap-1 w-full">
                          <div className="w-4 h-1 bg-[orange]" />
                          <div className="w-4 h-1 bg-[orange]" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <div className="text-[lightblue]">Minor Value</div>
                        <div className="w-4 h-1 bg-[lightblue]" />
                      </div>
                    )}
                  </div>
                );
              }}
              onHexPolygonHover={setHoverD}
              hexPolygonsTransitionDuration={300}
              // --- Player avatar layer (only for countries with a player) ---
              htmlElementsData={avatarData}
              htmlLat={(d) => d.lat}
              htmlLng={(d) => d.lng}
              htmlAltitude={0.02}
              htmlElement={(d) => {
                const wrapper = document.createElement("div");
                wrapper.style.pointerEvents = "none"; // let hex hover/click pass through
                wrapper.style.display = "flex";
                wrapper.style.flexDirection = "column";
                wrapper.style.alignItems = "center";
                wrapper.style.transform = "translate(-50%, -100%)"; // anchor bottom-center

                const img = document.createElement("img");
                img.src = `/Avatar/${d.player.name}.webp`;
                img.style.width = "32px";
                img.style.height = "32px";
                img.style.borderRadius = "50%";
                img.style.objectFit = "cover";
                img.style.border = `2px solid ${d.player.color}`;
                img.style.boxShadow = "0 0 10px rgba(0,0,0,1)";

                wrapper.appendChild(img);
                return wrapper;
              }}
            />
            <select
              value={selectedISO}
              onChange={(e) => {
                setSelectedISO(e.target.value);
                flyToCountry(e.target.value);
              }}
              className="absolute top-4 right-2 max-w-50 border border-white/20 text-[12px] font-[Ubuntu] p-2 rounded bg-[#0e0c12] focus:outline-none"
            >
              <option value="">Claim Search...</option>
              {[...postG]
                .sort((a, b) => countryNameByISO[a.countryISO]?.localeCompare(countryNameByISO[b.countryISO]))
                .map((p) => (
                  <option key={p.countryISO} value={p.countryISO}>
                    {countryNameByISO[p.countryISO]} | {p.countryISO}
                  </option>
                ))}
            </select>
            {hoverD && (
              <div className="bg-[#0e0c12] border border-white/20 absolute top-4 left-2 text-[14px] rounded px-4 py-2 font-[Ale] pointer-none">
                <div>{playersByISO[getISO(hoverD)]?.name ?? "Unclaimed"}</div>
                <div>Zone: {hoverD.properties.ADMIN}</div>
                <div>Zone Code: {getISO(hoverD)}</div>
                {points[getISO(hoverD)] > 140 ? (
                  <div className="flex flex-col gap-1">
                    <div className="text-[red]">Major Value</div>
                    <div className="flex gap-1 w-full">
                      <div className="w-4 h-1 bg-[red]" />
                      <div className="w-4 h-1 bg-[red]" />
                      <div className="w-4 h-1 bg-[red]" />
                    </div>
                  </div>
                ) : points[getISO(hoverD)] > 120 ? (
                  <div className="flex flex-col gap-1">
                    <div className="text-[orange]">Moderate Value</div>
                    <div className="flex gap-1 w-full">
                      <div className="w-4 h-1 bg-[orange]" />
                      <div className="w-4 h-1 bg-[orange]" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="text-[lightblue]">Minor Value</div>
                    <div className="w-4 h-1 bg-[lightblue]" />
                  </div>
                )}
              </div>
            )}
            {/* Drawer */}
            <div className="drawer">
              <input
                id="my-drawer-1"
                type="checkbox"
                className="drawer-toggle"
                checked={statsOpen}
                onChange={(e) => setStatsOpen(e.target.checked)}
              />
              <div className="drawer-content z-40 absolute bottom-8 right-4">
                {/* Page content here */}
                <label
                  htmlFor="my-drawer-1"
                  className="drawer-button text-[12px] font-[Ubuntu] rounded bg-[#0e0c12] border border-white/20 p-3 focus:outline-none"
                >
                  Stats
                </label>
              </div>
              <div className="drawer-side z-30">
                <label htmlFor="my-drawer-1" aria-label="close sidebar" className="drawer-overlay"></label>
                {/* Content */}
                <div className="bg-black/90 w-full min-h-screen flex flex-col items-center font-[Ubuntu] text-[14px]">
                  <div className="my-4 p-2 w-full max-w-250 mx-auto">
                    <div className="flex gap-1 my-2">
                      <div className="flex gap-1 items-center flex-wrap border border-white/20 rounded px-2 py-1">
                        <div className="w-3 h-3 bg-[red]" />
                        <div>High Fear</div>
                      </div>
                      <div className="flex gap-1 items-center flex-wrap border border-white/20 rounded px-2 py-1">
                        <div className="w-3 h-3 bg-[yellow]" />
                        <div>Speedrun</div>
                      </div>
                      <div className="flex gap-1 items-center flex-wrap border border-white/20 rounded px-2 py-1">
                        <div className="w-3 h-3 bg-[green]" />
                        <div>Fresh File</div>
                      </div>
                      <div className="flex gap-1 items-center flex-wrap border border-white/20 rounded px-2 py-1">
                        <div className="w-3 h-3 bg-[purple]" />
                        <div>Dream Dive</div>
                      </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-1">
                      {teamSummary.map((arr, index) => (
                        <div className={`flex flex-col gap-1 border border-white/20 rounded p-2 w-full`}>
                          <div className="font-[Sr] text-[16px] text-center">Team {arr[0]}</div>
                          <div className="flex justify-center items-center gap-1 text-[14px]">
                            <EasedCounter
                              key={statsOpen} // remounts (and re-animates) every time drawer opens
                              value={arr[1].reduce((a, b) => a + points[b.countryISO], 0)}
                              duration={2000}
                              className="text-[40px] font-[Sr] text-white"
                            />
                            <div className="font-[UbuntuMono]">Points</div>
                          </div>
                          {(() => {
                            const chartData = arr[1].map((ite) => ({
                              name: countryNameByISO[ite.countryISO],
                              points: points[ite.countryISO],
                              color: ite.color,
                            }));

                            return (
                              <div className="border border-white/20 w-full h-25">
                                <ResponsiveContainer width="100%" height="100%">
                                  <BarChart data={chartData}>
                                    <Bar dataKey="points" radius={[5, 5, 0, 0]}>
                                      {chartData.map((entry, i) => (
                                        <Cell key={`cell-${i}`} fill={entry.color} />
                                      ))}
                                      {/* <LabelList dataKey="points" position="center" fill="#00ffaa" /> */}
                                    </Bar>
                                  </BarChart>
                                </ResponsiveContainer>
                              </div>
                            );
                          })()}
                          <div className="flex flex-wrap gap-2 my-1">
                            {arr[1].map((ite) => (
                              <div
                                className="px-2 py-1 rounded border border-white/20 bg-[#0e0c12] border-b-4 font-[Ale] text-center"
                                style={{ borderBottomColor: ite.color }}
                              >
                                <div>{countryNameByISO[ite.countryISO]}</div>
                                <div className="font-[UbuntuMono] text-green-400">+{points[ite.countryISO]}</div>
                              </div>
                            ))}
                          </div>
                          <div>Total Zones: {arr[1].length}</div>
                        </div>
                      ))}
                    </div>
                    <div className="my-4 flex flex-col gap-2">
                      {playerSummary.map((arr) => (
                        <div className={`flex flex-col gap-1 border border-white/20 rounded p-2`}>
                          <div className="font-[Ale] text-[16px]">{arr[0]}</div>
                          <div className="flex flex-wrap gap-2 my-1">
                            {arr[1].map((ite) => (
                              <div
                                className="px-2 py-1 rounded border border-white/20 bg-[#0e0c12] border-b-4 font-[Ale] text-center"
                                style={{ borderBottomColor: ite.color }}
                              >
                                <div>{countryNameByISO[ite.countryISO]}</div>
                                <div className="font-[UbuntuMono] text-green-400">+{points[ite.countryISO]}</div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between text-[12px]">
                            <div>Total Points: {arr[1].reduce((a, b) => a + points[b.countryISO], 0)}</div>
                            <div>Team: {arr[1][0].team}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
