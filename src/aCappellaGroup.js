const qs = document.querySelector.bind(document);
const ce = document.createElement.bind(document);
const tableBody = qs("#table-body");
const winner = qs("#winner");

const API = "http://localhost:3000/a_cappella_groups";

let groups;
let selectedWinner;

// This is a function that fetches our data -(render) function
const fetchData = function() {
  fetch(API)
    .then(function(response) {
      return response.json();
    })
    .then(function(results) {
      groups = results;
      renderGroups();
    });
};

const renderGroups = function() {
  tableBody.innerHTML = "";
  groups.forEach(function(group) {
    console.log(group);
    const groupRow = ce("tr");
    const groupCollege = ce("td");

    groupCollege.innerText = group.college.name;
    groupRow.append(groupCollege);

    const groupName = ce("td");
    groupName.innerHTML = group.name;
    groupRow.append(groupName);

    const groupMembership = ce("td");
    groupMembership.innerHTML = group.membership;
    groupRow.append(groupMembership);

    const groupDivision = ce("td");
    groupDivision.innerHTML = group.college.division;
    groupRow.append(groupDivision);

    const trophyButton = ce("td");
    trophyButton.innerHTML = `<button><img src='./assets/trophy.png'/></button>`;
    groupRow.append(trophyButton);

    const deleteButton = ce("td");
    deleteButton.innerHTML = `<button> delete</button>`;
    groupRow.append(deleteButton);

    tableBody.append(groupRow);

    trophyButton.addEventListener("click", function(event) {
      groupRow.remove();
      winner.innerHTML = group.name;
    });
  });
};

fetchData();
