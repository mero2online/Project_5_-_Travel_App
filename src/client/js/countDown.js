function countDown(departingDate) {
  
  let DD = departingDate;
  let d = new Date();
  let dateForCountDown = new Date(DD);
  console.log(dateForCountDown);

  let duration = dateForCountDown - d;
  let days = Math.floor(duration / (1000 * 60 * 60 * 24));

  postDataD('http://localhost:8081/countDownD', {
    days: days,
  });
  return days;
}

/* Function to POST data */
const postDataD = async (url = '', data = {}) => {
  console.log('postDataD', data);
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await res.json();
    return newData;
  } catch (error) {
    console.log('error', error);
    // appropriately handle the error
  }
};

export { countDown };
