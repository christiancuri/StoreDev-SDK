import dotenv from 'dotenv'

class Env {
  static init() {
    return new Promise((resolve, reject) => {
      try {
        dotenv.config()
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }

  static get PORT() {
    return process.env.PORT || 5000
  }

  static get SECRET() {
    return process.env.SECRET || 'secret'
  }

  static get HTTP_LOG_CONFIG() {
    return process.env.HTTP_LOG_CONFIG || 'combined'
  }

  static get MONGO_URL() {
    return process.env.MONGO_URL || 'localhost'
  }

  static get MONGO_PORT() {
    return process.env.MONGO_PORT || 27017
  }

  static get MONGO_DB() {
    return process.env.MONGO_DB || 'root'
  }

  static get MONGO_USER() {
    return process.env.MONGO_USER || 'user'
  }

  static get MONGO_PASS() {
    return process.env.MONGO_PASS || 'pass'
  }
}

export default Env
