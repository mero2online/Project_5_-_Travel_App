function countDown() {
  fetch('http://localhost:8081/all')
    .then((data) => data.json())
    .then(function (data) {
      let departingDate = data.departingDate;

      let d = new Date();
      let dateForCountDown = new Date(departingDate);
      console.log(dateForCountDown);
      //   let countDownCounter = setInterval(function () {
      let duration = dateForCountDown - d;

      let days = Math.floor(duration / (1000 * 60 * 60 * 24));

      document.getElementById('countdown').innerHTML = `${days} days`;
      if (days === 1) {
        document.getElementById('countdown').innerHTML = `${days} day`;
      } else if (duration < 0) {
        // clearInterval(countDownCounter);
        document.getElementById('countdown').innerHTML = 'EXPIRED';
      }
      // }, 1000);
      postDataD('http://localhost:8081/countDownD', {
        days: days,
      });
    });
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
