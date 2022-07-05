export class Utils {
  /**
   * Convert ISO datetime (2022-07-05T20:52:21.820Z) string into mysql datetime (2022-07-05 20:52:21.820)
   * @param timestamp
   */
  static toDatetime(timestamp: string) {
    return timestamp.replace('T', ' ').replace('Z', ' ')
  }
}
