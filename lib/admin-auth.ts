export const verifyAdminPassword = (password: string): boolean => {
  const adminPassword = 'LeStudioBrocante2025'
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable not set')
    return false
  }
  return password === adminPassword
}

export const getAdminToken = (password: string): string | null => {
  if (!verifyAdminPassword(password)) {
    return null
  }
  // Simple token generation (in production, use JWT)
  return Buffer.from(`admin:${Date.now()}`).toString('base64')
}

export const validateAdminToken = (token: string): boolean => {
  // Simple validation (in production, verify JWT)
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf-8')
    return decoded.startsWith('admin:')
  } catch {
    return false
  }
}
