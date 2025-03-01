import Booking from '#models/booking'
import Cabin from '#models/cabin'
import { DateTime } from 'luxon'

export const PERIODS = {
  LAST_7_DAYS: 'last-7-days',
  LAST_30_DAYS: 'last-30-days',
  LAST_90_DAYS: 'last-90-days',
  LAST_180_DAYS: 'last-180-days',
} as const

const PERIOD_DAYS = {
  [PERIODS.LAST_7_DAYS]: 7,
  [PERIODS.LAST_30_DAYS]: 30,
  [PERIODS.LAST_90_DAYS]: 90,
  [PERIODS.LAST_180_DAYS]: 180,
} as const

export class DashboardService {
  /**
   * Retrieves dashboard data based on the selected period.
   *
   * @param period - The selected period (e.g., last 7 days, 30 days, etc.).
   * @returns The aggregated dashboard data.
   */
  async getData(period: keyof typeof PERIOD_DAYS) {
    const currentDateTime = DateTime.now().set({
      hour: 14,
      minute: 0,
      second: 0,
      millisecond: 0,
    })

    const daysInPeriod = PERIOD_DAYS[period]

    const startDate = currentDateTime.minus({ days: daysInPeriod })

    const bookingsInPeriod = await this.getBookingsInPeriod(startDate, currentDateTime)

    const bookingsCount = bookingsInPeriod.length

    const checkinsCount = bookingsInPeriod.filter((b) => b.status === 'checked-in').length

    const revenue = this.calculateRevenue(bookingsInPeriod, startDate, currentDateTime)

    const bookedNightsInPeriod = this.calculateBookedNightsInPeriod(
      bookingsInPeriod,
      startDate,
      currentDateTime
    )

    const cabinsCount = await this.getCabinsCount()

    const availableNightsInPeriod = cabinsCount * daysInPeriod

    const occupancyRate = this.calculateOccupancyRate(availableNightsInPeriod, bookedNightsInPeriod)

    const chartData = this.generateChartData(bookingsInPeriod, startDate, currentDateTime)

    return {
      bookingsCount,
      checkinsCount,
      revenue,
      occupancyRate,
      chartData,
    }
  }

  /**
   * Retrieves the total number of cabins.
   *
   * @returns The total count of cabins.
   */
  private async getCabinsCount() {
    const totalCabins = await Cabin.query().count('* as total')

    return totalCabins[0].$extras.total || 1
  }

  /**
   * Fetches all bookings that fall within the selected time period.
   *
   * @param startDate - The start date of the period.
   * @param currentDateTime - The end date of the period.
   * @returns A list of bookings within the period.
   */
  private getBookingsInPeriod(startDate: DateTime, currentDateTime: DateTime) {
    return Booking.query()
      .preload('cabin')
      .whereBetween('startDate', [startDate.toSQL()!, currentDateTime.toSQL()!])
      .orWhereBetween('endDate', [startDate.toSQL()!, currentDateTime.toSQL()!])
      .orderBy('startDate')
  }

  /**
   * Calculates total revenue for bookings within a given period.
   *
   * @param bookings - The list of bookings.
   * @param periodStartDate - The start date of the period.
   * @param periodEndDate - The end date of the period.
   * @returns The total revenue for the period.
   */
  private calculateRevenue(
    bookings: Booking[],
    periodStartDate: DateTime,
    periodEndDate: DateTime
  ) {
    return bookings.reduce((sum, booking) => {
      const nightsInPeriod = this.calculateBookingNightsInPeriod(
        booking.startDate,
        booking.endDate,
        periodStartDate,
        periodEndDate
      )

      return sum + booking.total! * (nightsInPeriod / booking.nights)
    }, 0)
  }

  /**
   * Calculates the total booked nights within a given period.
   *
   * @param bookings - The list of bookings.
   * @param startDate - The start date of the period.
   * @param currentDateTime - The end date of the period.
   * @returns The total number of booked nights.
   */
  private calculateBookedNightsInPeriod(
    bookings: Booking[],
    startDate: DateTime,
    currentDateTime: DateTime
  ) {
    return bookings.reduce((sum, booking) => {
      return (
        sum +
        this.calculateBookingNightsInPeriod(
          booking.startDate,
          booking.endDate,
          startDate,
          currentDateTime
        )
      )
    }, 0)
  }

  /**
   * Calculates the number of nights for a booking within a given period.
   *
   * @param bookingStartDate - The start date of the booking.
   * @param bookingEndDate - The end date of the booking.
   * @param periodStartDate - The start date of the period.
   * @param periodEndDate - The end date of the period.
   * @returns The number of nights for the booking within the period.
   */
  private calculateBookingNightsInPeriod(
    bookingStartDate: DateTime,
    bookingEndDate: DateTime,
    periodStartDate: DateTime,
    periodEndDate: DateTime
  ): number {
    const effectiveStartDate = DateTime.max(bookingStartDate, periodStartDate)
    const effectiveEndDate = DateTime.min(bookingEndDate, periodEndDate)

    return Math.max(1, Math.ceil(effectiveEndDate.diff(effectiveStartDate, 'days').days))
  }

  /**
   * Calculates the occupancy rate for a given period.
   *
   * @param availableNightsInPeriod - The total number of available nights.
   * @param bookedNightsInPeriod - The total number of booked nights.
   * @returns The occupancy rate as a percentage.
   */
  private calculateOccupancyRate(availableNightsInPeriod: number, bookedNightsInPeriod: number) {
    if (availableNightsInPeriod <= 0 || bookedNightsInPeriod <= 0) return 0

    return (bookedNightsInPeriod / availableNightsInPeriod) * 100
  }

  /**
   * Generates chart data for bookings within the selected period.
   *
   * @param bookings - The list of bookings.
   * @param startDate - The start date of the period.
   * @param endDate - The end date of the period.
   * @returns An array of objects containing chart data.
   */
  private generateChartData(bookings: Booking[], startDate: DateTime, endDate: DateTime) {
    if (bookings.length === 0) return []

    const chartData = []

    let currentDate = startDate

    while (currentDate <= endDate) {
      const formattedDate = currentDate.toFormat('dd LLL', { locale: 'fr' })

      const bookingsForDay = bookings.filter((booking) => {
        return booking.startDate <= currentDate && booking.endDate >= currentDate
      })

      let revenueForDay = 0
      let extrasForDay = 0

      bookingsForDay.forEach((booking) => {
        revenueForDay += booking.total! / booking.nights
        extrasForDay += (booking.extrasPrice || 0) / booking.nights
      })

      chartData.push({
        name: formattedDate,
        total: Number(revenueForDay.toFixed(2)),
        extras: Number(extrasForDay.toFixed(2)),
      })

      currentDate = currentDate.plus({ days: 1 })
    }

    return chartData
  }
}
