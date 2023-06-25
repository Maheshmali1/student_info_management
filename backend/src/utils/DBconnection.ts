import config from 'config'
import mongoose from 'mongoose'

const DBPath: string = config.get('DB_PATH')
export const DBconnection = async (): Promise<void> => {
  try {
    await mongoose.connect(DBPath)
    console.log('connected to database.')
  } catch (error) {
    console.log(error, 'could not connect database.')
  }
}
