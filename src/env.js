const IS_PRO = process.env.NODE_ENV === 'production'

export const SERVICE = {
  commonRequestHost: IS_PRO ? 'https://admin-api.macrozheng.com' : 'https://admin-api.macrozheng.com'
}
