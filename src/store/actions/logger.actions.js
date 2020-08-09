export const NEW_LOG = 'NEW_LOG';
export const GET_LOGS = 'GET_LOGS';
export const UPDATE_LOG = 'UPDATE_LOG';

export const newLog = (log, logType) => ({
  type: NEW_LOG,
  log,
  logType,
});

export const updateLog = (log, index) => ({
  type: UPDATE_LOG,
  log,
  index
});

export const getLogs = () => ({
  type: GET_LOGS,
})
