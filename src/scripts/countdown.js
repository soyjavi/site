const ticker = (targetTime) => {
  const distance = targetTime - new Date().getTime();

  if (distance > 0) {
    const countdown = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };

    Object.keys(countdown).forEach((key) => {
      document.querySelector(`#countdown-${key}`).innerHTML = countdown[key] > 9
        ? countdown[key]
        : `0${countdown[key]}`;
    });
  } else {
    document.querySelector('.countdown').style.display = 'none';
  }
};

export default (target) => {
  console.log({ target });

  if (!target) return;

  const targetTime = new Date(target).getTime();

  ticker(targetTime);
  setInterval(() => ticker(targetTime), 1000);
};
