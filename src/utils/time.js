export const getNow = (epoch) => {
    return Math.floor(new Date().getTime() / 1000) - epoch;
}

export const toTimeStamp = (epoch, timestamp) => {
  return Math.floor(new Date(timestamp).getTime() / 1000) - epoch;
}
