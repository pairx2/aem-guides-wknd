function updateRequestMyFreestyleCallback(data) {
  const padTo2Digits = (number) => number.toString().padStart(2, '0');
  const formatDate = (date) =>
    `${[date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-')} ${[
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join(':')}`;

  let body = data.body;

  body['time'] = (body['time'] || []).find((option) => option.consentValue)?.consentName;
  body['consent'] = true;
  body['createdAt'] = formatDate(new Date());

  delete body['node'];

  return data;
}
