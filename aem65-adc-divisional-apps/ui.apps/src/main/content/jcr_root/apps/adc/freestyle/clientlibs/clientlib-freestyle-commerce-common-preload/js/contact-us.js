const sanitizeString = (str) =>
  str.replace(
    /[&<>"]/g,
    (tag) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
      }[tag])
  );

function updateRequestMyFreestyleContactUs (data) {
  data.body['yourMessage'] = sanitizeString(data.body['yourMessage'] || '');

  delete data.body['node'];

  return data;
}

