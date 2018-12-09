module.exports = {
  "development": {
    "apiUri": process.env.RF_API_URI || "http://localhost:3001/v1"
  },
  "production": {
    "apiUri": process.env.RF_API_URI || "https://api-beta.routefusion.co/v1"
  }
}