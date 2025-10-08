import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function fallbackAvatar(name: string) {

    const names = name.split(' ');

    const firstName = names[0];

    let lastName = '';
    if(names.length > 1) {
        lastName = names[1];
    }

    return `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
}
