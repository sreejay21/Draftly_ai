let lastCallTime = 0;
const MIN_INTERVAL = 1000; 

const rateLimit = async () => {
  const now = Date.now();

  if (now - lastCallTime < MIN_INTERVAL) {
    const waitTime = MIN_INTERVAL - (now - lastCallTime);

    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  lastCallTime = Date.now();
};

module.exports = { rateLimit };