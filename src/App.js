import express from 'express'
import logger from './Logger'
import morgan from 'morgan'
import { json, urlencoded } from 'body-parser'
import fileUpload from 'express-fileupload'
import Env from './Env'
import split from 'split'
import cors from 'cors'

const app = express()

app
  .use(
    morgan(Env.HTTP_LOG_CONFIG, {
      stream: split().on('data', message => logger.info(message))
    })
  )
  .use(cors())
  .use(json({ limit: '5mb' }))
  .use(
    urlencoded({
      limit: '5mb',
      extended: false
    })
  )
  .use(fileUpload())

export default app
