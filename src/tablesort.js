let sortRow = 0;
let showUnofficialNames = true;
let showSpecialColors = true;
let showModulexColors = true;
let showModulexFoilColors = false;
/*
                 TO ADD NEW COLUMNS 
---------------------------------------------------------

              add new <th> to index.html

   add ${tableRowData.var} to generateTableRow function

add info in data.js if necessary (update ref in this file)
*/

function sortTableByColumn(table, column, asc = true) {
  const dirModifier = asc ? 1 : -1;
  const tBody = table.tBodies[0];
  const rows = Array.from(tBody.querySelectorAll("tr"));

  const sortedRows = rows.sort((a, b) => {
    const aColText = a
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();
    const bColText = b
      .querySelector(`td:nth-child(${column + 1})`)
      .textContent.trim();

    return aColText > bColText ? 1 * dirModifier : -1 * dirModifier;
  });

  if (column == 0 || column == 2) {
    const sortedRows = rows.sort((a, b) => {
      const aColPrice = parseInt(
        a.querySelector(`td:nth-child(${column + 1})`).textContent.trim()
      );
      const bColPrice = parseInt(
        b.querySelector(`td:nth-child(${column + 1})`).textContent.trim()
      );

      return aColPrice > bColPrice ? 1 * dirModifier : -1 * dirModifier;
    });
  }

  while (tBody.firstChild) {
    tBody.removeChild(tBody.firstChild);
  }

  tBody.append(...sortedRows);

  table
    .querySelectorAll("th")
    .forEach((th) => th.classList.remove("th-sort-asc", "th-sort-desc"));
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-asc", asc);
  table
    .querySelector(`th:nth-child(${column + 1})`)
    .classList.toggle("th-sort-desc", !asc);
}
(function () {
  let mainTable = document.getElementById("main_table");

  mainTable.innerHTML = generateHtmlTableString(colors);
})();

function UpdateTable(clicked_id) {
  var clickedButton = document.getElementById(clicked_id);
  var buttonContainer = document.getElementById("btnDiv");
  var btns = buttonContainer.getElementsByClassName("btn");

  clickedButton.classList.toggle("active");
  const clickedIds = [];

  for (var i = 0; i < btns.length; i++) {
    if (btns[i].classList.contains("active")) {
      clickedIds.push(btns[i].id);
    }
  }

  if (clickedIds.includes("unofficialNameButt")) {
    showUnofficialNames = true;
  } else {
    showUnofficialNames = false;
  }

  if (clickedIds.includes("specialColorsButt")) {
    showSpecialColors = true;
  } else {
    showSpecialColors = false;
  }

  if (clickedIds.includes("modulexButt")) {
    showModulexColors = true;
  } else {
    showModulexColors = false;
  }

  if (clickedIds.includes("modulexFoilButt")) {
    showModulexFoilColors = true;
  } else {
    showModulexFoilColors = false;
  }

  let mainTable = document.getElementById("main_table");

  mainTable.innerHTML = generateHtmlTableString(colors);
}

//          object structure:               //
//{
//  id: "49",
//  Lid: "103",
//  swatchId: "2",
//  color: "E8E8E8",
//  BLName: "Very Light Gray",
//  LName: "Light Grey",
//  OName: "Very Light Gray",
//  parts: "21",
//  inSets: "23",
//  type: "",
//  colorTimeline: "1997-2004",
//  flourescence: "",
//  note: "",
//}, <tr><td bgcolor=#fff class="trtxt">1</td><td>White</td><td>White</td><td>#FFFFFF</td><td>@</td></tr>

function generateHtmlTableString(tableData) {
  let htmlString = "";

  tableData.forEach((data) => {
    htmlString += generateTableRow(data);
  });
  return htmlString;
}

function generateTableRow(tableRowData) {
  var cellPattern = "";
  var prod = tableRowData.colorTimeline.split("-")[0];
  var ret = tableRowData.colorTimeline.split("-")[1];
  var nameToggleBL = tableRowData.BLName;
  var nameToggleL = tableRowData.LName;
  var nameToggleO = tableRowData.OName;

  if (tableRowData.type == "special" && !showSpecialColors) {
    return ``;
  }
  if (!showModulexColors) {
    if (tableRowData.type == "modulex" || tableRowData.type == "modulexFoil") {
      return ``;
    }
  }
  if (!showModulexFoilColors && tableRowData.type == "modulexFoil") {
    return ``;
  }

  if (!showUnofficialNames) {
    if (nameToggleBL.includes("*")) {
      nameToggleBL = "";
    }
    if (nameToggleL.includes("*")) {
      nameToggleL = "";
    }
    if (nameToggleO.includes("*")) {
      nameToggleO = "";
    }
  }
  if (tableRowData.type == "glitter") {
    cellPattern = " glitter";
  } else if (tableRowData.type == "satin") {
    cellPattern = " satin";
  } else if (tableRowData.type == "speckle") {
    cellPattern = " speckle";
  } else if (tableRowData.type == "chrome") {
    cellPattern = " chrome";
  } else if (tableRowData.type == "transparent") {
    cellPattern = " trans";
  } else if (tableRowData.type == "pearl") {
    cellPattern = " pearl";
  }
  return `<tr>
        <td bgcolor=#${tableRowData.color} class="trtxt size1${cellPattern}">${
    tableRowData.swatchId
  }</td>
        <td>${nameToggleBL}</td>
        <td class="alignRight id">${tableRowData.Lid}</td>
        <td class="lname">${nameToggleL}</td>
        <td>${nameToggleO}</td>
        <td>${tableRowData.flourescence}</td>
        <td class="hex">#${tableRowData.color.toUpperCase()}</td>
        <td class="year">${prod}</td><td class="year">${ret}</td>
        <td>${tableRowData.note}</td>
    </tr>`;
}

function hideCol() {
  var headers = document.getElementsByTagName("th");
  var col = document.getElementById("txtCol").value;

  if (isNaN(col) || col == "") {
    alert("Invalid Column");
    return;
  }
  col = parseInt(col, 10);
  col = col - 1;
  var tbl = document.getElementById("main_table");
  if (tbl != null) {
    if (col < 0 || col >= tbl.rows.length - 1) {
      alert("Invalid Column");
      return;
    }

    for (var h = 0; h < headers.length; h++) {
      if (h == col) {
        headers[h].style.display = "none";
      } else {
        headers[h].style.display = "";
      }
    }

    for (var i = 0; i < tbl.rows.length; i++) {
      for (var j = 0; j < tbl.rows[i].cells.length; j++) {
        tbl.rows[i].cells[j].style.display = "";
        if (j == col) tbl.rows[i].cells[j].style.display = "none";
      }
    }
  }
}

document.querySelectorAll(".table-sortable th").forEach((headerCell) => {
  headerCell.addEventListener("click", () => {
    const tableElement = headerCell.parentElement.parentElement.parentElement;
    const headerIndex = Array.prototype.indexOf.call(
      headerCell.parentElement.children,
      headerCell
    );
    const currentIsAscending = headerCell.classList.contains("th-sort-asc");
    sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
  });
});

console.log(colors);
//sortTableByColumn(document.querySelector("table"), sortRow, true); //pass false as last parm to flip
