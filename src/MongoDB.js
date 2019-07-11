import mongoose from 'mongoose'
import Env from './Env'
import logger from './Logger'

class MongoDB {
  static async connect() {
    const mongoConfig = {
      url: `mongodb+srv://${Env.MONGO_USER}:${Env.MONGO_PASS}@${Env.MONGO_URL}/${Env.MONGO_DB}`,
      params: {
        useNewUrlParser: true
      }
    }

    mongoose.connect(mongoConfig.url, mongoConfig.params)

    mongoose.connection.on('connected', () =>
      logger.info(
        `Connected ${Env.MONGO_DB}@${Env.MONGO_URL}:${Env.MONGO_PORT}`
      )
    )

    mongoose.connection.on('disconneected', () => {
      logger.warn(`Disconnected from ${Env.MONGO_URL}`)
      logger.warn(`Trying to reconnect  @${Env.MONGO_URL}`)
      setTimeout(
        () => mongoose.connect(mongoConfig.url, mongoConfig.params),
        5000
      )
    })

    mongoose.connection.on('error', error => {
      logger.error(
        `Error on MongoDb Connection @${Env.MONGO_URL}: ${error.message}`
      )
      setTimeout(
        () => mongoose.connect(mongoConfig.url, mongoConfig.params),
        5000
      )
    })

    process.on('SIGINT', () =>
      mongoose.connection.close(() => {
        logger.warn(
          `MongoDb disconeted @${Env.MONGO_URL} by the end of service`
        )
        // eslint-disable-next-line no-process-exit
        process.exit(0)
      })
    )
  }
}

export default MongoDB
