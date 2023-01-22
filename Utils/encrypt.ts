import 'dotenv/config'
import SimpleCrypto from 'simple-crypto-js'

const _secretKey: string | undefined = process.env.secretKey || 'Empty'

const simpleCrypto = new SimpleCrypto(_secretKey)

export default simpleCrypto