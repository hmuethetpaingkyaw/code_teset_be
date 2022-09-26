import dotenv from 'dotenv'
import app from './src/app'
import DB_CONNECTION from './src/database'
dotenv.config()
const port = process.env.PORT || '3200'

app.listen(port, async () => {
  try {
    await DB_CONNECTION.authenticate()
    console.log('Database Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  console.log(`Application is running :) ${port}`)
})
