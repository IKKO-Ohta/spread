export class FirestoreHelper {
  static generateId(): string {
    const idLength = 8
    const pool = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''

    for (let i = 0; i < idLength; i++) {
      id += pool[Math.floor(Math.random() * pool.length)]
    }
    return id
  }
}
