function countDown(startDate, endDate) {

  let lengthOfTrip = Math.floor(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  );

  let countDownDays = Math.floor((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24));

  postDataD('http://localhost:8081/countDownD', {
    countDownDays: countDownDays,
    lengthOfTrip: lengthOfTrip,
  });
  return countDownDays;
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
