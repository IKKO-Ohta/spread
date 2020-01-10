import format from 'date-fns/format'
import ja from 'date-fns/locale/ja'

export class TimeUtil {
  static getNow(): string {
    return format(new Date(), 'yyyy/MM/dd HH:mm:ss', { locale: ja })
  }
}
