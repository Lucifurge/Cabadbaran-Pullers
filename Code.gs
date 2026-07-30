
function doPost(e){
const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Registrations");
const d=JSON.parse(e.postData.contents);
sheet.appendRow([
new Date(),
d.fullname,
d.age,
d.gender,
d.weight,
d.contact,
d.facebook
]);
return ContentService.createTextOutput(JSON.stringify({success:true}))
.setMimeType(ContentService.MimeType.JSON);
}
