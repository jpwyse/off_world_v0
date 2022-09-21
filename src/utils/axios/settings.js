const defaultSettings = {
  DEV_REACT_APP_BASE_URL: 'http://localhost:8000',
  REACT_APP_BASE_URL: 'https://off-world-v0.herokuapp.com/',
};
const settings = {defaultSettings, ...process.env};
export default settings;