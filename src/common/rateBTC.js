import fetch from 'node-fetch';

import cache from './cache';

const DEFAULT_VALUE = 0.095;
const CACHE_KEY = 'rate:BTC';

export default async (amount) => {
  let json = cache.get(CACHE_KEY);

  if (!json) {
    const response = await fetch(`https://tickermaster.glitch.me/convert/EUR/${amount}/BTC`);
    if (!response) return DEFAULT_VALUE;
    json = await response.json();

    cache.set(CACHE_KEY, json);
  }
  const { value = DEFAULT_VALUE } = json;

  return value.toFixed(4);
};
