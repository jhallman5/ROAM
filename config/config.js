// put in a try catch block
const readConfig = (env) => {
  return require(`./config.${env}.json`)
}


module.exports = { readConfig }
