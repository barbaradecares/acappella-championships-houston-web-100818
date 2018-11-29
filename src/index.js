const groupTable = document.querySelector("#table-body");
const winner = document.querySelector("#winner");
const sortByCollege = document.querySelector("#college-header");
const sortByName = document.querySelector("#name-header");
const sortByMembership = document.querySelector("#membership-header");
const sortByDivision = document.querySelector("#division-header");

let groups;
let selectedGroup;

const getData = () => {
  fetch("http://localhost:3000/a_cappella_groups")
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      groups = result;
      render();
    });
};

sortByCollege.addEventListener("click", function() {
  sortAndRender("college");
});

sortByName.addEventListener("click", function() {
  sortAndRender("name");
});

sortByMembership.addEventListener("click", function() {
  sortAndRender("membership");
});

sortByDivision.addEventListener("click", function() {
  sortAndRender("division");
});

const sortAndRender = criteria => {
  let aAtt;
  let bAtt;

  groups = groups.sort(function(a, b) {
    switch (criteria) {
      case "college":
        aAtt = a.college.name;
        bAtt = b.college.name;
        break;
      case "name":
        aAtt = a.name;
        bAtt = b.name;
        break;
      case "membership":
        aAtt = a.membership;
        bAtt = b.membership;
        break;
      case "division":
        aAtt = a.college.division;
        bAtt = b.college.division;
    }

    var groupA = aAtt;
    var groupB = bAtt;
    return groupA < groupB ? -1 : groupA > groupB ? 1 : 0;
  });
  render();
};

sortByName.addEventListener("click", function() {});

sortByMembership.addEventListener("click", function() {});

sortByDivision.addEventListener("click", function() {});

const render = () => {
  document.querySelector("#table-body").innerHTML = "";
  groups.forEach(function(group) {
    const groupTr = document.createElement("tr");
    const groupCollege = document.createElement("td");
    const groupName = document.createElement("td");
    const groupMembership = document.createElement("td");
    const groupDivision = document.createElement("td");
    const trophyButtonField = document.createElement("td");
    const trophyButton = document.createElement("button");
    const deleteButtonField = document.createElement("td");
    const deleteButton = document.createElement("button");

    trophyButton.addEventListener("click", function(e) {
      e.preventDefault();
      selectedGroup = group;
      displayWinner();
      render();
    });

    if (group != selectedGroup) {
      groupCollege.innerHTML = group.college.name;
      groupTr.append(groupCollege);

      groupName.innerHTML = group.name;
      groupTr.append(groupName);

      groupMembership.innerHTML = group.membership;
      groupTr.append(groupMembership);

      groupDivision.innerHTML = group.college.division;
      groupTr.append(groupDivision);

      trophyButton.innerHTML = `<img src='http://www.aafsfl.org/uploads/5/7/8/0/5780701/s324222675859668953_p18_i1_w1280.jpeg' style="width:100px;height:75px;" data-id='${
        group.id
      }'/>`;
      trophyButtonField.append(trophyButton);
      groupTr.append(trophyButtonField);

      deleteButton.innerHTML = "Delete";
      deleteButtonField.append(deleteButton);
      groupTr.append(deleteButtonField);

      groupTable.append(groupTr);

      deleteButton.addEventListener("click", function() {
        saveAndRender(group);
        console.log(group.name);
      });
    }
  });
};

saveAndRender = group => {
  fetch(`http://localhost:3000/a_cappella_groups/${group.id}`, {
    method: "DELETE"
  });
  getData();
};

displayWinner = () => {
  winner.innerHTML = "Winner: ";
  winner.append(selectedGroup.name);
};

getData();
