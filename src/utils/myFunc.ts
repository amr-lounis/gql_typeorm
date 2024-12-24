import axios from "axios";
import * as readline from "readline";
import * as crypto from "crypto";
import { config_server } from "./";
// **************************************************************************************************** 
export const getImageAsBase64 = async (url) => {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer', // Set the response type to arraybuffer to handle binary data
        });
        return Buffer.from(response.data, 'binary').toString('base64');
    } catch (error) { return ""; }
}
// **************************************************************************************************** 
export const limitFloat = (number) => {
    return Math.floor(number * 100) / 100;
    // return parseFloat(number.toFixed(2));
}
// **************************************************************************************************** 
let count = 0;
export const myLog = (str: any) => {
    if (config_server.myLog == false) return;
    console.log(`------------------------------ ${count++} ------------------------------`)
    console.log(str)
}
// **************************************************************************************************** 
export const toPage = (itemsCountAll: number, pageNumber?: number, itemsTake?: number) => {
    itemsTake = itemsTake ?? 100;
    itemsTake = itemsTake < 1 ? 1 : itemsTake;
    // 
    pageNumber = pageNumber ?? 1;
    pageNumber = pageNumber < 1 ? 1 : pageNumber;
    // 
    let allPagesCount = Math.ceil(itemsCountAll / itemsTake);
    pageNumber = pageNumber > allPagesCount ? allPagesCount : pageNumber;
    // 
    allPagesCount = allPagesCount < 1 ? 1 : allPagesCount;
    pageNumber = pageNumber < 1 ? 1 : pageNumber;
    // 
    const itemsSkip = (pageNumber - 1) * itemsTake;
    return { allPagesCount, itemsTake, pageNumber, itemsSkip };
}
// **************************************************************************************************** 

export function generateRandomString(min, max) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const randomLength = Math.floor(Math.random() * (max - min + 1)) + min;
    let randomString = '';
    for (let i = 0; i < randomLength; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}

export const generateID = (input: string) => {
    return input + "_" + (new Date().toISOString()) + "_" + generateRandomString(10, 10);
}

export function generateRandomInt(min, max) {
    const randomLength = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomLength;
}

export function generateRandomFloat(min, max) {
    const randomLength = Math.random() * (max - min + 1) + min;
    return randomLength;
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function consoleRead(titel: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(titel, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}
export const encodeB64 = (input: string): string => {
    return Buffer.from(input, "utf8").toString("base64");
}

export const decodeB64 = (base64String: string): string => {
    return Buffer.from(base64String, "base64").toString("utf8");
}

export const hashingOutBase64 = (input: string): string => {
    const hash = crypto.createHash("md5");
    hash.update(input);
    return hash.digest("base64");
}
export const hashingOutHex = (input: string): string => {
    const hash = crypto.createHash("md5");
    hash.update(input);
    return hash.digest("hex");
}

class StringCryptor {
    private algorithm: string;
    private key: string;
    private iv: Buffer;

    constructor(key: string) {
        this.algorithm = "aes-256-cbc"; // Encryption algorithm
        this.key = crypto.createHash("sha256").update(key).digest("base64").substring(0, 32); // Key must be 32 bytes for AES-256
        this.iv = crypto.randomBytes(16); // Initialization vector
    }

    encrypt(plainText: string): string {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(plainText, "utf8", "base64");
        encrypted += cipher.final("base64");
        return `${this.iv.toString("base64")}:${encrypted}`;
    }

    decrypt(encryptedText: string): string {
        const [ivBase64, encrypted] = encryptedText.split(":");
        const iv = Buffer.from(ivBase64, "base64");
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
        let decrypted = decipher.update(encrypted, "base64", "utf8");
        decrypted += decipher.final("utf8");
        return decrypted;
    }
}
