//The URIs of the REST endpoint
RAAURI = "https://prod-67.westeurope.logic.azure.com/workflows/32f2776a4f27417ea801d8628338cd0a/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=LDsy3Xe2N5zgGOc0v_LrXAuc8I3OgZjqdh4PbvFolZg";
CIAURI = "https://prod-36.westeurope.logic.azure.com/workflows/e94fa4d655e9463392bd4f466cb18a45/triggers/manual/paths/invoke/rest/v1/assets?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7MQ56HIgGFZzu7mHavhGUoW4qEIiD6Ujm7MPbKYJ8wU";

DIAURI0 = "https://prod-206.westeurope.logic.azure.com/workflows/142abfda84e54b3e9904a5ebb8c8e41c/triggers/manual/paths/invoke/rest/v1/assets/";
DIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=5mwouBonCg2qlpX-bBNFgfgN_emKHYq9eF9xmAJV8-o";

UAIURI0 = "https://prod-108.westeurope.logic.azure.com/workflows/98f3a9e4646d495b8af0169db5c70077/triggers/manual/paths/invoke/rest/v1/assets/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=M70R1uzWVBxx02QQI1iCFpXUJPcIpLjpA8a5W6EMLy4";
UAIURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=M70R1uzWVBxx02QQI1iCFpXUJPcIpLjpA8a5W6EMLy4";


//Handlers for button clicks
$(document).ready(function () {


  $("#retAssets").click(function () {

    //Run the get asset list function
    getAssetList();

  });

  //Handler for the new asset submission button
  $("#subNewForm").click(function () {

    //Execute the submit new asset function
    submitNewAsset();

  });
});

//A function to submit a new asset to the REST endpoint
function submitNewAsset() {

  //Construct JSON Object for new item
  var subObj = {
    AssetLabel: $('#AssetLabel').val(),
    Cost: $('#Cost').val(),
    AssetType: $('#AssetType').val(),
    NameOfOwner: $('#NameOfOwner').val(),
    AddressLine1: $('#AddressLine1').val(),
    AddressLine2: $('#AddressLine2').val(),
    Note: $('#Note').val()
  }


  //Convert to a JSON String
  subObj = JSON.stringify(subObj);


  //Post the JSON string to the endpoint, note the need to set the content type header
  $.post({
    url: CIAURI,
    data: subObj,
    contentType: 'application/json; charset=utf-8'
  }).done(function (response) {
    getAssetList();
  });
}

var assetIdToUpdate = AssetID;  // Replace with the actual ID of the asset to update
var updatedData = {
  // Replace with the fields you want to update and their new values
  AssetLabel: $('#AssetLabel').val(),
  Cost: $('#Cost').val(),
  AssetType: $('#AssetType').val(),
  NameOfOwner: $('#NameOfOwner').val(),
  AddressLine1: $('#AddressLine1').val(),
  AddressLine2: $('#AddressLine2').val(),
  Note: $('#Note').val()
};

updateAsset(assetIdToUpdate, JSON.stringify(updatedData));

//A function to get a list of all the assets and write them to the Div with the AssetList Div
function getAssetList() {

  //Replace the current HTML in that div with a loading message
  $('#AssetList').html('<div class="spinner-border" role="status"><span class="sr-only"> &nbsp;</span>');

  //Get the JSON from the RAA API
  $.getJSON(RAAURI, function (data) {

    //Create an array to hold all the retrieved assets
    var items = [];

    //Iterate through the returned records and build HTML, incorporating the key values of the record in the data

    $.each(data, function (key, val) {
      items.push("Asset Label: " + val["AssetLabel"] + "<br/>" + "Cost: " + val["Cost"] + "<br/>");
      items.push("Asset Type: " + val["AssetType"] + "<br/>");
      items.push("NameOfOwner: " + val["NameOfOwner"] + "<br/>");
      items.push("Address Line 1: " + val["AddressLine1"] + "<br/>");
      items.push("Address Line 2: " + val["AddressLine2"] + "<br/>");
      items.push("Note: " + val["Note"] + "<br/>");
      items.push('<button type="button" id="subNewForm" class="btn btn-danger" onclick="deleteAsset(' + val["AssetID"]
        + ')">Delete</button> <br/><br/>');
        items.push('<button type="button" id="subUpdateForm" class="btn btn-danger" onclick="updateAsset(' + val["AssetID"]
        + ')">Delete</button> <br/><br/>');
    });

    //Clear the assetlist div
    $('#AssetList').empty();

    //Append the contents of the items array to the AssetList Div
    $("<ul/>", {
      "class": "my-new-list",
      html: items.join("")
    }).appendTo("#AssetList");
  });
}


//A function to delete an asset with a specific ID.
//The id paramater is provided to the function as defined in the relevant onclick handler
function deleteAsset(id) {
  $.ajax({
    type: "DELETE",
    //Note the need to concatenate the
    url: DIAURI0 + id + DIAURI1,
  }).done(function (msg) {
    //On success, update the assetlist.
    getAssetList();
  });
}

function updateAsset(id, updatedData) {
  $.ajax({
    type: "PUT",
    url: UIAURI0 + id + UIAURI1,
    data: updatedData,  // Data to be sent in the request body for the update
  }).done(function (msg) {
    // On success, update the asset list
    getAssetList();
  });
}
