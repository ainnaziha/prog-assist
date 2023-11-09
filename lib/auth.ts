'use server'

import { cookies } from 'next/headers'
import { User } from './models/user';

export async function isAuth() {
    return cookies().has('user');
}

export async function getUser() {
    const userCookie = cookies().get('user');
    const json = userCookie?.value ? JSON.parse(userCookie.value) : null;
    const user: User | null = json ? {
        id: json?.id,
        name: json?.name,
        email: json?.email,
    } : null;
    return user;
}

export async function setUser(user: User) {
    cookies().set('user', JSON.stringify(user), { secure: true })
}

export async function deleteUser() {
    cookies().delete('user')
}
