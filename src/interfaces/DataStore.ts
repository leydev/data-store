import fs from 'fs';
import { DataRaw } from '@interfaces/Cryptography';

export type Schema<T> = T;

export type Payload<T> = Schema<T>;

export type WriteFile = typeof fs.writeFileSync;

export type ReadFile = typeof fs.readFileSync;

export interface IDataStoreParameters<SchemaType> {
  /**
   * Object base to use as schema
   */
  schema: Schema<SchemaType>;
  /**
   * The name od file to save data
   */
  fileName: string;
  /**
   * The algorithm used on encryption
   *
   * @default 'aes-256-cbc'
   */
  algorithm?: string;
  /**
   * Active mechanism of encryption
   *
   * @default true
   */
  encrypt?: boolean;
  /**
   * The string key to encrypt/decrypt
   * If omited, a random key will be generate
   *
   */
  secret?: string;
  /**
   * Can overwrite data on file ?
   * If omited, false is default
   *
   * @default true
   */
  overwrite?: boolean;
  /**
   * Create the file if not exist?
   * If omited, false is default
   *
   * @default true
   */
  createFileIfNotExist?: boolean;
}

/**
 * Interface from class DataStore
 */
export interface IDataStore<T> {
  encryptData(data: DataRaw): Buffer;
  decryptData(data: DataRaw): Buffer;
  write(payload: Payload<T>): void;
  read<P extends keyof Schema<T>>(key: P): Schema<T>[P];
  getFileName(): string;
  getSecret(): string;
}
