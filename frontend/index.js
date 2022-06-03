

//#region Update Run Number ID Handler
function UpdateNumberId() {
  var rows = document.getElementsByTagName('tr');
  var lastrow = rows[rows.length - 1];
  $("#Bugid").val((rows.length));
}
//#endregion

//#region After Submit new bug, hide the form.
$("#add-bug").submit(function (e) {
  e.preventDefault();
  var form = $(this);
  var actionUrl = form.attr('action');
  //#endregion

//#region Add bug to table on ui after sending the form with out to do reload
  function add_bug(data) {
    row = '<tr>'
    for (const key in data) {
      if (key != "__v" & key != "_id") {
        if (key == "BugId") {
          var id = data[key];
        }
        row += `<td> ${data[key]} </td>`;
      }
    }
    row += `<td><button type="button" class="btn btn-secondary btn-sm deleted" onClick="delete_task(this.id)" id="${id}"><img src="/frontend/icons/trash.svg"></button><button type="button" class=" iconInRow btn btn-secondary btn-sm update m-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="update_bug(this.id)" id="${id}"><img src="/frontend/icons/pencil-square.svg" class="iconInRow"></button></td>`;
    row += "</tr>";
    return row;
  }
  //#endregion

//#region Append new row to the table after add bug

  $.ajax({
    type: "POST",
    url: actionUrl,
    data: form.serialize(), // serializes the form's elements.
    success: function (data) {
      $('#exampleModal').modal('hide');
      console.log(data)
      $('#main_table').append(add_bug(data.data));
      document.getElementById("add-bug").reset();
    }
  });
});
//#endregion

//#region Load all bugs from DB when the page load
$(document).ready(function () {
  $("#editBugId").attr("disabled", true);
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/bugs",
    success: function (data) {
      console.log(data.data);
      row = '<tr>'
      for (index = 0; index < data.data.length; index++) {
        for (var [key, value] of Object.entries(data.data[index])) {
          row += `<td> ${value} </td>`;
          if (key == "BugId") {
            var id = value;
          }
        }
        row += `<td><button type="button" class="btn btn-secondary btn-sm deleted" onClick="delete_task(this.id)" id="${id}"><img src="/frontend/icons/trash.svg"></button><button type="button" class="btn btn-secondary btn-sm update m-1" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="update_bug(this.id)" id="${id}"><img src="/frontend/icons/pencil-square.svg"></button></td>`;
        row += "</tr>";
        $('#main_table').append(row);
        row = '<tr>'
      }
    }
  });
});
//#endregion

//#region Search field
$(document).ready(function () {
  $("#search-field").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#main_table tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

//#endregion

//#region Edit bug handle
$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/edit-bug",
    success: function (data) {
      console.log(data.data);

    }
  });
});
//#endregion

//#region Filter - present rows in table by status
$(document).ready(function () {
  $("#Status-select").on("change", function () {
    var value = $(this).val().toLowerCase();
    $("#main_table tr").filter(function () {
      if (value == "הכל") {
        location.reload();
      }
      else {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)

      }
    });
  });
});
//#endregion

//#region Delete bug

const delete_task = (id) => {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/delete-bug",
    data: { ID: id },
    success: function (data) {
      console.log("bug deleted");
    }
  }
  )
  location.reload(true);
}
//#endregion

//#region Update task // task gete is bug ---- 
const update_bug = (id) => {
  $("#editBugId").attr("disabled", false);
  $("#endAddBug").attr("disabled", true);
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/edit-bug",
    data: { BugToUpdate: id },
    success: function (data) {
      console.log("the returned data its OK");
      $("#Bugid").val(data.data.BugId);
      $("#Channel").val(data.data.Channel);
      $("#Service").val(data.data.Service);
      $("#description").val(data.data.Description);
      $("#numberInSnow").val(data.data.NumberInSnow);
      $("#Status").val(data.data.Status);
      $("#numberInSystem").val(data.data.NumberInTheSystem);
      $("#versionForProd").val(data.data.VersionForProd);
    }
  }
  )
}

//#endregion

//#region Update data --post--
function update_bug_post() {
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/edit-bug-update",
    data: {
      BugId: $("#Bugid").val(),
      Channel: $("#Channel").val(),
      Service: $("#Service").val(),
      Description: $("#description").val(),
      NumberInSnow: $("#numberInSnow").val(),
      Status: $("#Status").val(),
      NumberInTheSystem: $("#numberInSystem").val(),
      VersionForProd: $("#versionForProd").val(),
    },
    success: function (data) {
      console.log("the data send OK");
    }
  }
  )
  location.reload();
  $("#editBugId").attr("disabled", true);
  $("#endAddBug").attr("disabled", false);
}
//#endregion

//#region Close modal handler

function CloseModalHandle() {
  $("#Channel").val(""),
    $("#Service").val(""),
    $("#description").val(""),
    $("#numberInSnow").val(""),
    $("#Status").val(""),
    $("#numberInSystem").val(""),
    $("#versionForProd").val(""),
    $("#editBugId").attr("disabled", true);
  $("#endAddBug").attr("disabled", false);
}
//#endregion

//#region Export to xlx
$("#exportButton").click(function(){
  $("#bugs-table").table2excel({
    name: "All Bugs",
    exclude:".noEx"
  }); 
});
//#endregion