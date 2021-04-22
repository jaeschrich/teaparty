
import { Router } from 'express';
import { join } from 'path';
import { randomBytes, createHmac } from 'crypto';
import { db } from './storage';
import { PasswordEntry } from '../shared/StorageTypes';

export function createPassword(password: string) {
    const hmac = createHmac('sha256', 'tea partyyyyy'); // TODO: a real secret
    const salt = randomBytes(8).toString('hex');
    hmac.update(salt+password);
    return {
        salt,
        hash: hmac.digest('hex')
    }
}

export function checkPassword(password: string, entry: PasswordEntry) {
    const hmac = createHmac('sha256', 'tea partyyyyy'); // TODO: a real secret
    hmac.update(entry.salt + password);
    return hmac.digest('hex') === entry.hash;
}

