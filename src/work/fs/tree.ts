// Walking the directory tree

import fs from 'fs';
import path from 'path';

export const walk = (dir: string, done: (err: NodeJS.ErrnoException | null, results?: string[]) => void) => {
    let results: string[] = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach((file) => {
            file = path.resolve(dir, file);
            fs.stat(file, (_, stat) => {
                if (stat && stat.isDirectory()) {
                    walk(file, (__, res) => {
                        results = results.concat(res!);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
}

export function wrappedWalk(dir: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
        walk(dir, (err, results) => {
            if (err) reject(err)
            else resolve(results!)
        })
    })
}
