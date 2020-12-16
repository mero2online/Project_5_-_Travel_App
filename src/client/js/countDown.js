function countDown(startDate, endDate) {
  // Calculate the length of trip
  let lengthOfTrip = Math.floor(
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
  );

  // Calculate countdown days to trip
  let countDownDays = Math.floor(
    (new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return [countDownDays, lengthOfTrip];
}

export { countDown };
