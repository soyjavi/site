import dotenv from 'dotenv';

dotenv.config();
const { CACHE } = process.env;

class Cache {
  constructor() {
    this.store = {};
    this.interval = {};

    setInterval(() => {
      Object.keys(this.interval).map((key) => {
        this.interval[key] -= 1;
        if (this.interval[key] < 0) {
          delete this.interval[key];
          delete this.store[key];
        }

        return this;
      });
    }, 1000);
  }

  get(key) {
    if (!CACHE) return undefined;

    if (this.store[key]) console.log(` [CACHE:${key}] ${JSON.stringify(this.store[key]).length * 2} bytes.`);
    return this.interval[key] ? this.store[key] : undefined;
  }

  set(key, value, seconds = 120) {
    if (!CACHE) return value;

    this.store[key] = value;
    this.interval[key] = seconds;

    return value;
  }

  get status() {
    return {
      keys: this.interval,
      bytes: JSON.stringify(this.store).length * 2,
    };
  }
}

export default new Cache();
