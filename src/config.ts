import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const IS_DEV: boolean = process.env.NODE_ENV === 'development'
const PORT: number =  +process.env.PORT || 3000
const JWT_SECRET: string = process.env.JWT_SECRET || 'pem-file-or-your-secret-beer!'
const EXPIRES_IN: number = +process.env.EXPIRES_IN || 3600

export {
  PORT,
  JWT_SECRET,
  EXPIRES_IN,
}

export default IS_DEV
