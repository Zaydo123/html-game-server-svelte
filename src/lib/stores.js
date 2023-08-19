import { writable } from 'svelte/store';
// Create a writable store with a default value of null
export const adminAuthCookie = writable(null);
