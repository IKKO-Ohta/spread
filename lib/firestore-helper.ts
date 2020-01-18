import functions from 'firebase'

export class FirestoreHelper {
  static generateId(): string {
    const idLength = 12
    const pool = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let id = ''

    for (let i = 0; i < idLength; i++) {
      id += pool[Math.floor(Math.random() * pool.length)]
    }
    return id
  }

  static async sendMail(destination: string, url: string): Promise<void> {
    const sendMail = functions.functions().httpsCallable('sendMail')
    try {
      await sendMail({ destination, url })
    } catch (error) {
      throw new Error('#sendMail ERROR')
    }
  }
}
