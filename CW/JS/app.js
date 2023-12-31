// Handlers for button clicks
$(document).ready(function () {

//The URIs of the REST endpoint
IUPS = "https://prod-188.westeurope.logic.azure.com:443/workflows/c8b662e19c6242c8add0eada365017f6/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=yznUEP5h-TtHGNFqboMPsfxn-t7lgU7cX2WumO15-Bs";
RAI = "https://prod-169.westeurope.logic.azure.com:443/workflows/77fbe5cd191a4712bb8b42434df4d769/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=bqFfbgLhhYzNYKom5IOxBEJVzAjMOSjmZJrnxrtkXC0";

BLOB_ACCOUNT = "https://cwb00805502blobaccount.blob.core.windows.net";

//Handlers for button clicks
$(document).ready(function () {


  $("#retImages").click(function () {

    //Run the get asset list function
    getImages();

  });

  //Handler for the new asset submission button
  $("#subNewForm").click(function () {

    //Execute the submit new asset function
    submitNewAsset();

  });
});

//A function to submit a new asset to the REST endpoint
function submitNewAsset() {

  //Create a form data object
  submitData = new FormData();
  //Get form variables and append them to the form data object
  submitData.append('FileName', $('#FileName').val());
  submitData.append('userID', $('#userID').val());
  submitData.append('userName', $('#userName').val());
  submitData.append('File', $("#UpFile")[0].files[0]);

  //Post the form data to the endpoint, note the need to set the content type header
  $.ajax({
    url: IUPS,
    data: submitData,
    cache: false,
    enctype: 'multipart/form-data',
    contentType: false,
    processData: false,
    type: 'POST',
    success: function (data) {

    }
  });

}

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getImages() {

  //Replace the current HTML in that div with a loading message
 $('#ImageList').html('<div class="spinner-border" role="status"><span class="sr-only">&nbsp;</span>');
  $.getJSON(RAI, function( data ) {
  //Create an array to hold all the retrieved assets
  var items = [];

  //Iterate through the returned records and build HTML, incorporating the key values of the record in the data
  $.each( data, function( key, val ) {
  items.push( "<hr />");
  items.push("<img src='"+BLOB_ACCOUNT + val["filePath"] +"' width='400'/> <br/>")
  items.push( "File : " + val["fileName"] + "<br />");
  items.push( "Uploaded by: " + val["userName"] +"<br/>" + " user id: "+val["userID"]+"<br/>");
  items.push( "<hr />");
  items.push('<button type="button" id="subNewForm" class="btn btn-danger" onclick="#deleteImage(' + val["AssetID"]
        + ')">Delete</button> <br/><br/>');
  });


  //Clear the assetlist div
  $('#ImageList').empty();


  //Append the contents of the items array to the ImageList Div
  $( "<ul/>", {
  "class": "my-new-list",
  html: items.join( "" )
  }).appendTo( "#ImageList" );
  });
}


// Handler for the update image button
$("#updateImage").click(function () {
  // Replace with the actual image ID you want to update
  var imageIdToUpdate = 123;

  // Replace with the fields you want to update and their new values
  var updatedImageData = {
    FileName: 'UpdatedFileName',
    userID: 'UpdatedUserID',
    userName: 'UpdatedUserName',

  };

  updateImage(imageIdToUpdate, updatedImageData);
});

// Handler for the delete image button
$("#deleteImage").click(function () {
  // Replace with the actual image ID you want to delete
  var imageIdToDelete = 456;

  deleteImage(imageIdToDelete);
});
});

// Function to update an image with a specific ID
function updateImage(id, updatedImageData) {
// Create a form data object
var updateData = new FormData();

// Append updated data to the form data object
updateData.append('FileName', updatedImageData.FileName);
updateData.append('userID', updatedImageData.userID);
updateData.append('userName', updatedImageData.userName);

// AJAX request for updating image
$.ajax({
  type: "PUT",  // or "PATCH" depending on your API
  url: IUPS + '/' + id,  // Assuming your API supports updating with the image ID in the URL
  data: updateData,
  cache: false,
  enctype: 'multipart/form-data',
  contentType: false,
  processData: false,
  success: function (data) {
    // On success, update the image list
    getImages();
  }
});
}

// Function to delete an image with a specific ID
function deleteImage(id) {
$.ajax({
  type: "DELETE",
  url: IUPS + '/' + id,  // Assuming your API supports deleting with the image ID in the URL
}).done(function (msg) {
  // On success, update the image list
  getImages();
});
}
