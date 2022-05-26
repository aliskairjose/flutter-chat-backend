const mongoose = require('mongoose');

const dbConn = async () => {
  try {
    console.log('init dbConn');

    await mongoose.connect(process.env.DB_CONN);
    
    console.log('db online');
  } catch (error) {
    console.error(error);

    throw new Error('Ha ocurrido un error');
  }
}

module.exports = {
  dbConn
}