function countDown() {
  fetch('http://localhost:8081/all')
    .then((data) => data.json())
    .then(function (data) {
      let departingDate = data.departingDate;

      let d = new Date();
      let dateForDountDown = new Date(departingDate);
      console.log(dateForDountDown);
      //   let countDownCounter = setInterval(function () {
      let duration = dateForDountDown - d;

      let days = Math.floor(duration / (1000 * 60 * 60 * 24));
      document.getElementById('countdown').innerHTML = `${days} days`;
      if (days === 1) {
        document.getElementById('countdown').innerHTML = `${days} day`;
      } else if (duration < 0) {
        // clearInterval(countDownCounter);
        document.getElementById('countdown').innerHTML = 'EXPIRED';
      }

      // }, 1000);
    });
}

export { countDown };
