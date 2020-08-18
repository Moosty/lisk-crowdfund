export const getNow = (epoch) => {
    return Math.floor(new Date().getTime() / 1000) - epoch;
}

export const toTimeStamp = (epoch, timestamp) => {
  return Math.floor(new Date(timestamp).getTime() / 1000) - epoch;
}

export const fromTimeStamp = (epoch, timestamp) => {
  return new Date((timestamp + epoch) * 1000);
}
