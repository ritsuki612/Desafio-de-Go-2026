// localStorageを使ったユーザーデータの管理

export interface UserProfile {
  name: string;
  email: string;
  school: string;
  level: 'beginner' | 'novice' | 'intermediate';
  registeredAt: string;
}

const KEY = 'igo_user_profile';

export function getProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(KEY);
    return data ? (JSON.parse(data) as UserProfile) : null;
  } catch {
    return null;
  }
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(KEY, JSON.stringify(profile));
}

export function deleteProfile(): void {
  localStorage.removeItem(KEY);
}
