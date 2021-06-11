export function setCookie(
  name: string,
  value: any,
  exdays: number,
  path: string
) {
  const date = new Date()
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=${path}`
}

export function getCookie(name: string): string {
  const cookies = document.cookie.split(';')
  for (const cookie of cookies) {
    const [key, value] = cookie.trim().split('=')
    if (key === name) {
      return value
    }
  }
  return ''
}

export function delCookie(name: string, path: string) {
  // To delete a cookie should be simple set it to a expired date
  setCookie(name, undefined, -100, path)
}
