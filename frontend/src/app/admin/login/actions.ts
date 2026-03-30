'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { API_BASE_URL } from '@/lib/api-config';

export async function loginAdmin(prevState: any, formData: FormData) {
  const username = formData.get('username')?.toString();
  const password = formData.get('password')?.toString();

  if (!username || !password) {
    return { error: 'Veuillez remplir tous les champs.' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      cache: 'no-store', // Important for dynamic auth
    });

    if (!response.ok) {
      if (response.status === 401) {
        return { error: 'Identifiants ou mot de passe incorrects. (Assurez-vous que l\'admin existe dans la base)' };
      }
      return { error: 'Erreur lors de la connexion au serveur.' };
    }

    const data = await response.json();
    
    // Store token in cookies
    cookies().set('admin_token', data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

  } catch (error) {
    return { error: 'Service momentanément indisponible. Le serveur backend est-il lancé ?' };
  }

  // Redirect on success
  redirect('/admin');
}

export async function logoutAdmin() {
  cookies().delete('admin_token');
  redirect('/admin/login');
}
