const serviceKey =
"HncE4RCAL+TUTsv+1iD0HitkdYMR96i/2bowjyprYv80WZ//JMD0MYIhZUiFyOH0XGk7xGYbAn1owZRNOLSzsg==";
let cachedSubwayData = [];    
let dataLoaded = false;       
let lastFilteredData = [];     

async function fetchAllData() {
const totalPages = 167;
document.getElementById("subwayInfo").innerText = "🔴 데이터 불러오는 중입니다...";
document.getElementById("loadButton").style.display = "none";

for (let page = 1; page <= totalPages; page++) {
const url = `https://api.odcloud.kr/api/15071311/v1/uddi:7bd50077-dea4-48c5-a50f-c1f073afcf1e?serviceKey=${encodeURIComponent(serviceKey)}&page=${page}`;
try {
  const res = await fetch(url);
  const json = await res.json();
  cachedSubwayData = cachedSubwayData.concat(json.data);
  console.log(`${page} 페이지 로드 완료`);
} catch (err) {
  console.error(`${page} 페이지 로드 실패`, err);
}
}

dataLoaded = true;
document.getElementById("subwayInfo").innerText = "🟢 데이터 다 불러옴!";
document.getElementById("loadButton").style.display = "inline-block";
}

function loadData() {
if (!dataLoaded) {
document.getElementById("subwayInfo").innerText = "🏃‍♂️‍➡️ 데이터 로딩 중입니다. 잠시만 기다려주세요.";
return;
}

const select1 = document.getElementById("day").value;
const select2 = document.getElementById("where").value;

const filtered = cachedSubwayData.filter(
(item) =>
  String(item.호선).trim() === select2.trim() &&
  String(item.요일구분).trim() === select1.trim()
);
lastFilteredData = filtered;  
if (filtered.length === 0) {
document.getElementById("subwayInfo").innerText = "해당 데이터가 없습니다.";
return;
}
const timeKeys = [
"5시30분", "6시00분", "6시30분", "7시00분", "7시30분",
"8시00분", "8시30분", "9시00분", "9시30분", "10시00분",
"10시30분", "11시00분", "11시30분", "12시00분", "12시30분",
"13시00분", "13시30분", "14시00분", "14시30분", "15시00분",
"15시30분", "16시00분", "16시30분", "17시00분", "17시30분",
"18시00분", "18시30분", "19시00분", "19시30분", "20시00분",
"20시30분", "21시00분", "21시30분", "22시00분", "22시30분",
"23시00분", "23시30분", "00시00분", "00시30분"
];

let html = "";
filtered.forEach((item) => {
html += `
<h3>${item.출발역}역 (${item.호선}호선, ${item.요일구분}, ${item.상하구분})</h3>
<div id="displaySubway">
`;

timeKeys.forEach(time => {
if (item.hasOwnProperty(time)) {
const value = parseFloat(item[time]);
const percent = isNaN(value) ? 0 : value;
const maxPercent = 150;
const barHeight = Math.min(percent, maxPercent) * 2.5; // 150%까지 표현 가능
const barColor =
  percent >= 130 ? "#b71c1c" :
  percent >= 110 ? "#d32f2f" :
  percent >= 90 ? "#f57c00" :
  percent >= 70 ? "#ffca28" :
  "#4caf50";

const label = isNaN(value) ? "N/A" : `${percent}%`;

html += `
  <div id="displayBox">
    <div id="displayLabel">${label}</div>
    <div id="displayGraph" title="${label}" style="
      height: ${barHeight}px;
      background-color: ${barColor};
      ">
    </div>
    <div id="displayTime">${time}</div>
  </div>
`;
}
});

html += "</div><hr>";
});

document.getElementById("subwayInfo").innerHTML = html;
}
function searchSubway() {
  const searchValue = document.getElementById("searchName").value.trim();
 
  if (!searchValue) {
    alert("역 이름을 입력하세요.");
    return;
  }

  let baseData = [];

  if (lastFilteredData && lastFilteredData.length > 0) {
    baseData = lastFilteredData;
  } else if (dataLoaded && cachedSubwayData.length > 0) {
    baseData = cachedSubwayData;
  } else {
    document.getElementById("subwayInfo").innerText = "🏃‍♂️‍➡️ 데이터 로딩 중입니다. 잠시만 기다려주세요.";
    return;
  }

  const searchResult = baseData.filter(item =>
    String(item.출발역).toLowerCase().includes(searchValue)
  );

  if (searchResult.length === 0) {
    document.getElementById("subwayInfo").innerText = "해당 출발역을 찾을 수 없습니다.";
    return;
  }

  let html = "";
  const timeKeys = [
    "5시30분", "6시00분", "6시30분", "7시00분", "7시30분",
    "8시00분", "8시30분", "9시00분", "9시30분", "10시00분",
    "10시30분", "11시00분", "11시30분", "12시00분", "12시30분",
    "13시00분", "13시30분", "14시00분", "14시30분", "15시00분",
    "15시30분", "16시00분", "16시30분", "17시00분", "17시30분",
    "18시00분", "18시30분", "19시00분", "19시30분", "20시00분",
    "20시30분", "21시00분", "21시30분", "22시00분", "22시30분",
    "23시00분", "23시30분", "00시00분", "00시30분"
  ];

  searchResult.forEach(item => {
    html += `
      <h3>${item.출발역}역 (${item.호선}호선, ${item.요일구분}, ${item.상하구분})</h3>
<div id="displaySubway">`;

    timeKeys.forEach(time => {
      if (item.hasOwnProperty(time)) {
        const value = parseFloat(item[time]);
        const percent = isNaN(value) ? 0 : value;
        const maxPercent = 150;
        const barHeight = Math.min(percent, maxPercent) * 2.5;
        const barColor =
          percent >= 130 ? "#b71c1c" :
          percent >= 110 ? "#d32f2f" :
          percent >= 90 ? "#f57c00" :
          percent >= 70 ? "#ffca28" :
          "#4caf50";

        const label = isNaN(value) ? "N/A" : `${percent}%`;

        html += `
          <div id="displayBox">
    <div id="displayLabel">${label}</div>
    <div id="displayGraph" title="${label}" style="
      height: ${barHeight}px;
      background-color: ${barColor};
      ">
    </div>
    <div id="displayTime">${time}</div>
  </div>
        `;
      }
    });

    html += "</div><hr>";
  });

  document.getElementById("subwayInfo").innerHTML = html;
}
window.onload = function () {
fetchAllData();
};