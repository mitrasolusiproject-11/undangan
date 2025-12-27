function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const rows = sheet.getDataRange().getValues();
  
  // Assuming Row 1 is headers: [Name, Category, Address, AddedAt]
  const headers = rows[0]; 
  const data = rows.slice(1).map((row, index) => {
    return {
      rowNumber: index + 2, // 1-based, +1 for header
      name: row[0],
      category: row[1],
      address: row[2],
      addedAt: row[3]
    };
  });
  
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    const data = JSON.parse(e.postData.contents);
    
    // Handle DELETE action
    if (data.action === 'delete' && data.rowNumber) {
      sheet.deleteRow(data.rowNumber);
      return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Handle EDIT action
    if (data.action === 'edit' && data.rowNumber) {
      const row = data.rowNumber;
      sheet.getRange(row, 1).setValue(data.name);
      sheet.getRange(row, 2).setValue(data.category);
      sheet.getRange(row, 3).setValue(data.address);
      // Keep the original addedAt, don't update it
      return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Handle ADD action (default)
    // Ensure we have headers if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Name", "Category", "Address", "AddedAt"]);
    }
    
    sheet.appendRow([data.name, data.category, data.address, data.addedAt]);
    
    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
