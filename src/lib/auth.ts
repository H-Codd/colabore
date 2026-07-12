import { z } from "zod";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

const USERS_STORAGE_KEY = "colabore-users";
const SESSION_STORAGE_KEY = "colabore-session";

const registerSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório."),
  email: z.string().email("E-mail inválido."),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres."),
});

const loginSchema = z.object({
  email: z.string().email("E-mail inválido."),
  password: z.string().min(1, "Senha é obrigatória."),
});

const API_BASE = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_API_BASE_URL ?? "" : "";

function isBrowser() {
  return typeof window !== "undefined";
}

function readUsers(): User[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const storedUsers = window.localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? (JSON.parse(storedUsers) as User[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function readSessionUserId() {
  if (!isBrowser()) {
    return null;
  }

  return window.localStorage.getItem(SESSION_STORAGE_KEY);
}

function saveSessionUserId(userId: string | null) {
  if (!isBrowser()) {
    return;
  }

  if (userId) {
    window.localStorage.setItem(SESSION_STORAGE_KEY, userId);
    return;
  }

  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

async function tryApiRegister(name: string, email: string, password: string) {
  if (!API_BASE) return null;

  try {
    const res = await fetch(`${API_BASE}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data as User;
  } catch {
    return null;
  }
}

async function tryApiLogin(email: string, password: string) {
  if (!API_BASE) return null;

  try {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data as User;
  } catch {
    return null;
  }
}

export async function registerUser(name: string, email: string, password: string) {
  registerSchema.parse({ name, email, password });

  // Try API first (if configured). If it fails, fallback to localStorage.
  const apiUser = await tryApiRegister(name.trim(), email.trim().toLowerCase(), password);
  if (apiUser) {
    saveSessionUserId(apiUser.id);
    return apiUser;
  }

  const users = readUsers();
  const normalizedEmail = email.trim().toLowerCase();

  const alreadyRegistered = users.some((user) => user.email.toLowerCase() === normalizedEmail);
  if (alreadyRegistered) {
    throw new Error("Este e-mail já está cadastrado.");
  }

  const newUser: User = {
    id: typeof crypto !== "undefined" && typeof crypto.randomUUID === "function" ? crypto.randomUUID() : String(Date.now()),
    name: name.trim(),
    email: normalizedEmail,
    password,
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newUser]);
  saveSessionUserId(newUser.id);

  return newUser;
}

export async function loginUser(email: string, password: string) {
  loginSchema.parse({ email, password });

  const normalizedEmail = email.trim().toLowerCase();

  const apiUser = await tryApiLogin(normalizedEmail, password);
  if (apiUser) {
    saveSessionUserId(apiUser.id);
    return apiUser;
  }

  const users = readUsers();
  const foundUser = users.find((user) => user.email.toLowerCase() === normalizedEmail);

  if (!foundUser || foundUser.password !== password) {
    throw new Error("E-mail ou senha inválidos.");
  }

  saveSessionUserId(foundUser.id);
  return foundUser;
}

export function logoutUser() {
  saveSessionUserId(null);
}

export function getCurrentUser() {
  const userId = readSessionUserId();

  if (!userId) {
    return null;
  }

  return readUsers().find((user) => user.id === userId) ?? null;
}

export function isAuthenticated() {
  return Boolean(getCurrentUser());
}
