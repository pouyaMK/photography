'use server'
import { cookies } from 'next/headers';

export async function setTokenCookie(token: string) {
  (await cookies()).set('token', token, {
    maxAge: 3600,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  });
}

export async function deleteTokenCookie() {
  (await cookies()).delete('token');
}