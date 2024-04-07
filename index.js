$(function() {
    loadCareer();
    $("#careerload").on("click",".btn-danger",handleDelete)
    $("#careerload").on("click",".btn-warning",handleUpdate)
    $("#addbtn").click(addCareer)
    $("#updateSave").click(function(){
      var id = $("#updateId").val();
      var title = $("#updateTitle").val();
      var des = $("#updateDescription").val();
      var salary = $("#updateSalary").val();

      $.ajax({
        url: "http://localhost:3000/careers/" + id, 
        contentType: "application/json",
        data: JSON.stringify({title: title, description: des, salary: salary}),
        method: "PUT",
        success: function(){
          loadCareer();
          $("#updatemodel").modal("hide");
        } 
      })

    })
  });

function handleUpdate(){
  var btn = $(this);
  var parentDiv = btn.closest(".careerload");
  var id = parentDiv.attr("data-id");
  $.get("http://localhost:3000/careers/" + id,function(response){
    $("#updateId").val(response.id);
    $("#updateTitle").val(response.title);
    $("#updateDescription").val(response.description);
    $("#updateSalary").val(response.salary);
    $("#updatemodel").modal("show");
  })

  }
function addCareer(){
  var title = $("#title").val();
  var des = $("#description").val();
  var salary = $("#salary").val();
  $.ajax({
    url: "http://localhost:3000/careers",
    method: "POST",
    //Make sure the data you send should be in json else error occured
    contentType: "application/json",
    data: JSON.stringify({title: title, description: des, salary: salary}),
    success: function(){
      loadCareer();
    }
  });
}  

function handleDelete(){
  var btn = $(this);
  var parentDiv = btn.closest(".careerload");
  let id = parentDiv.attr("data-id");
  console.log(id);
  var url = 'http://localhost:3000/careers/${id}';
  console.log("GET URL:", url);
  $.ajax({
    url: "http://localhost:3000/careers/" + String(id),
    contentType: "application/json",
    method: "DELETE",
    success: function(){
      loadCareer();
    }
  })
}  

  function loadCareer() {
    $.ajax({
      url: "http://localhost:3000/careers",
      method: "GET",
      success: function(response) {
        console.log(response);
        var careerload = $("#careerload");
        $("#careerload").empty();
        for(var i=0; i<response.length; i++){
          var career = response[i];
          careerload.append(`<div class="careerload" data-id="${career.id}" ><h3>${career.title}</h3><p><button class="btn btn-danger btn-sm float-right">Delete</button><button class="btn btn-warning btn-sm float-right">Edit</button>${career.description} Salary range for ${career.title} is ${career.salary}</p>`);
        }
      }
    });
  }
  