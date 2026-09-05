import React, { useMemo, useState } from "react";
import PageBlock from "../Block/PageBlock";

import { useData } from "../Hook/DataFetch";
import { usePfp } from "../Hook/PfpFetch";
import { bundleData } from "../Data/DataBundle";
import Loading from "../Hook/Loading"

/**
 * HadesCalendar
 * -------------
 * Shows every month in a fixed range (default: Sep 25, 2025 -> Sep 25, 2026)
 * at once, in a flex-wrap grid of mini months. Accepts an `events` array to
 * plot on the calendar.
 *
 * Event shape:
 * {
 *   date: "2025-12-24",       // required, ISO yyyy-mm-dd
 *   title: "Company retreat", // required
 *   color: "amber",           // optional: "amber" | "rose" | "sky" | "emerald" | "violet"
 * }
 */

const RANGE_START = new Date(2025, 8, 25); // Sep 25, 2025 (month is 0-indexed)
const RANGE_END = new Date(2026, 8, 25); // Sep 25, 2026

const DOT_COLORS = {
  amber: "bg-amber-400",
  rose: "bg-rose-400",
  sky: "bg-sky-400",
  emerald: "bg-emerald-400",
  violet: "bg-violet-400",
};

const CHIP_COLORS = {
  amber: "bg-amber-500/15 text-amber-300 ring-amber-400/30",
  rose: "bg-rose-500/15 text-rose-300 ring-rose-400/30",
  sky: "bg-sky-500/15 text-sky-300 ring-sky-400/30",
  emerald: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30",
  violet: "bg-violet-500/15 text-violet-300 ring-violet-400/30",
};

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function toKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(
    2,
    "0",
  )}`;
}

function isSameDay(a, b) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isWithinRange(date) {
  return date >= RANGE_START && date <= RANGE_END;
}

function buildMonthOnlyCells(year, month) {
  // Returns leading blanks (to align day 1 under the right weekday) followed by
  // only that month's own dates -- no bleed-over days from adjacent months.
  const firstOfMonth = new Date(year, month, 1);
  const leadingBlanks = firstOfMonth.getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells = Array.from({ length: leadingBlanks }, () => null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  return cells;
}

function buildMonthList(start, end) {
  // List of {year, month} tuples from start's month to end's month, inclusive
  const months = [];
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const last = new Date(end.getFullYear(), end.getMonth(), 1);
  while (cursor <= last) {
    months.push({ year: cursor.getFullYear(), month: cursor.getMonth() });
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return months;
}

function MiniMonth({ year, month, eventsByDay, today, selectedDate, onSelectDay }) {
  const cells = useMemo(() => buildMonthOnlyCells(year, month), [year, month]);

  return (
    <div className="w-full sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)] xl:w-[calc(25%-0.5625rem)] bg-[#0e0c12]/10 backdrop-blur-sm rounded-xl ring-1 ring-white/10 overflow-hidden flex flex-col shrink-0">
      <div className="px-3 pt-3 pb-2 border-b border-white/10">
        <h3 className="text-sm text-white">
          {MONTH_NAMES[month]} <span className="text-white/40">{year}</span>
        </h3>
      </div>

      <div className="grid grid-cols-7 px-2 pt-2 font-[Ubuntu]">
        {WEEKDAYS.map((d) => (
          <div key={d} className="text-center text-[9px] tracking-wide text-white/40 pb-1">
            {d[0]}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5 px-2 pb-3 font-[Ubuntu]">
        {cells.map((day, idx) => {
          if (!day) {
            // Blank slot -- keeps day 1 aligned under its weekday without
            // showing dates that belong to the adjacent month.
            return <div key={`blank-${idx}`} className="h-8" />;
          }

          const inRange = isWithinRange(day);
          const key = toKey(day);
          const dayEvents = eventsByDay[key] || [];
          const isToday = isSameDay(day, today);
          const isSelected = selectedDate && isSameDay(day, selectedDate);

          return (
            <button
              key={key}
              type="button"
              disabled={!inRange}
              onClick={() => {
                const element = document.getElementById("info");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
                onSelectDay(day)
              }}
              // title={dayEvents.map((e) => e.title).join(", ")}
              className={`relative flex flex-col items-center justify-start h-8 rounded transition-colors ${!inRange ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10"
                } ${isSelected ? "ring-2 ring-green-300" : ""}`}
            >
              <span
                className={`text-[11px] w-5 h-5 flex items-center justify-center rounded-full ${isToday ? "bg-green-300 text-black  " : "text-gray-300"
                  }`}
              >
                {day.getDate()}
              </span>
              <div className="flex gap-0.5">
                {dayEvents.slice(0, 1).map((ev, i) => (
                  <div className="flex gap-0.5 items-center text-[10px] font-[UbuntuMono]">
                    {dayEvents.length}
                    <span key={i} className={`w-1.5 h-1.5 rounded-full ${"bg-blue-400" || "bg-white/40"}`} />
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HadesCalendar() {
  const { posts, loader } = useData();
  const { pfp, pfploader } = usePfp();
  const [player, setPlayer] = useState("")

  const months = useMemo(() => buildMonthList(RANGE_START, RANGE_END), []);
  const [selectedDate, setSelectedDate] = useState(null);

  // Data
  const only67 =
    useMemo(
      () =>
        [...bundleData, ...posts].
          filter((obj) => obj.fea == 67 && obj.des.includes("#usum"))
      , [player, posts])

  const filteredData = only67.filter((obj) => {
    if (player !== "") return obj.nam === player;
    return obj;
  })

  const PfpObjects = Object.fromEntries(pfp.map((item) => [item.Pfp, item.ImgLink]));

  const events = [];
  for (let i = 0; i < filteredData.length; i++) {
    const run = filteredData[i];
    const color = run.loc == "Underworld" ? `emerald` : run.loc == "Surface" ? `amber` : `violet`;
    events.push({ date: run.dat, obj: run, color: color });
  }

  const eventsByDay = useMemo(() => {
    const map = {};
    for (const ev of events) {
      if (!ev || !ev.date) continue;
      const [y, m, d] = ev.date.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      if (!isWithinRange(dateObj)) continue;
      const key = toKey(dateObj);
      if (!map[key]) map[key] = [];
      map[key].push(ev);
    }
    return map;
  }, [events]);

  const today = new Date();
  const selectedKey = selectedDate ? toKey(selectedDate) : null;
  const selectedEvents = selectedKey ? eventsByDay[selectedKey] || [] : [];

  // Player Search

  const allPlayers = [...new Set(only67.map((obj) => obj.nam))].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );

  return (
    <PageBlock>
      {loader || pfploader ? (
        <Loading />
      ) : (
        <div className="mx-auto bg-white/5 backdrop-blur-md rounded shadow-sm ring-1 ring-white/10 overflow-hidden font-[Ubuntu] select-none">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-2xl text-white font-[Sr]">
              Hades 2: 1 Year <span className="text-white/40">Overview</span>
            </h2>
            <select
              className="w-25 select select-sm bg-[#0e0c12] rounded border focus:outline-none focus:border-transparent"
              value={player}
              onChange={(e) => {
                setPlayer(e.target.value);
              }}
            >
              <option value={""}>All Player</option>
              {allPlayers.map((ite) => (
                <option value={ite}>{ite}</option>
              ))}
            </select>
            {/* <p className="text-sm tracking-wide text-white/60 font-[Sr] mb-3">
              Sep 25, 2025 &nbsp;–&nbsp; Sep 25, 2026
            </p> */}
          </div>

          <div className="flex flex-col md:flex-row md:items-stretch">
            {/* Selected day detail -- shown first on mobile, right sidebar from md up */}
            <div className="order-1 md:order-2 border-b border-white/10 bg-white/5 p-4 px-2 font-[Ubuntu] min-h-[100px] md:border-b-0 md:border-l md:w-64 md:shrink-0 md:py-6" id="info">
              {selectedDate ? (
                <>
                  <p className="text-xs text-white/50 mb-2">
                    {selectedDate.toLocaleDateString(undefined, {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  {selectedEvents.length > 0 ? (
                    <ul className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2">
                      {selectedEvents.map((ev, idx) => (
                        <li key={idx} className="flex items-center w-full h-full">
                          <div
                            className={`text-[12px] px-2 py-1 rounded ring-1 w-full relative overflow-hidden ${CHIP_COLORS[ev.color] || "bg-white/10 text-white/80 ring-white/20"
                              }`}
                          >
                            <img
                              src={`/GUI_Card/c${ev.obj.asp}.png`}
                              alt="Aspects"
                              className="absolute right-0 bottom-0 h-full w-auto"
                            />
                            <img
                              src={`/GUI_Card/c${ev.obj.asp}.png`}
                              alt="Aspects"
                              className="absolute right-0 bottom-0 h-full w-auto"
                            />
                            <div className="flex items-center gap-1">
                              <div className={`relative w-9 h-9 shrink-0`}>
                                {PfpObjects[ev.obj.nam] ? (
                                  <img
                                    src={`${PfpObjects[ev.obj.nam]}`}
                                    alt="Avatar"
                                    loading="lazy"
                                    className="w-9 h-9 rounded-full p-1 egg"
                                    draggable={false}
                                  />
                                ) : (
                                  <div className="w-9 h-9 rounded-full bg-[#28282b] text-white flex items-center justify-center truncate -translate-x-[2px]">
                                    {ev.obj.nam.slice(0, 2).toUpperCase()}
                                  </div>
                                )}
                              </div>
                              <div className="font-[Ale] text-[15px]">{ev.obj.nam}</div>
                            </div>
                            <div>{`Max Fear - ${ev.obj.asp}`}</div>
                            <div>{`${ev.obj.loc !== "Underworld" || ev.obj.loc !== "Surface" ? `Drean Dive` : ev.obj.loc} - ${ev.obj.tim}`}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-white/40"></p>
                  )}
                </>
              ) : (
                <p className="text-sm text-white/40">Select a day to see its events.</p>
              )}
            </div>

            {/* All months, flex-wrap grid */}
            <div className="order-2 md:order-1 md:flex-1 md:min-w-0 flex flex-wrap gap-3 p-4 max-h-[1000px] overflow-scroll md:max-h-full">
              {months.map((m) => (
                <MiniMonth
                  key={`${m.year}-${m.month}`}
                  year={m.year}
                  month={m.month}
                  eventsByDay={eventsByDay}
                  today={today}
                  selectedDate={selectedDate}
                  onSelectDay={setSelectedDate}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </PageBlock>
  );
}
