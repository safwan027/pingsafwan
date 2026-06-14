'use server' // This ensures the code never runs in the browser
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

// app/actions.ts
export async function verifyPassword(enteredPassword: string) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Call the SQL function we just created
  const { data, error } = await supabaseAdmin
    .rpc('verify_admin_password', { entered_password: enteredPassword })

  if (error) {
    console.error("Function Error:", error)
    return false
  }

  if (data) {
    cookies().set('admin_auth', enteredPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    })
  }

  return data; // Returns true or false
}

export async function logoutAdmin() {
  cookies().delete('admin_auth')
}
