
let configFile = './dev';

if (process.env.NODE_ENV === 'production') {
  configFile = './prod';
}

export default require(`${configFile}`).config;
