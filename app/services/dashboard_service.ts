import Booking from '#models/booking'
import Cottage from '#models/cottage'
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

    const cottagesCount = await this.getCottagesCount()

    const availableNightsInPeriod = cottagesCount * daysInPeriod

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

  private async getCottagesCount() {
    const totalCottages = await Cottage.query().count('* as total')

    return totalCottages[0].$extras.total || 1
  }

  private getBookingsInPeriod(startDate: DateTime, currentDateTime: DateTime) {
    return Booking.query()
      .preload('cottage')
      .whereBetween('startDate', [startDate.toSQL()!, currentDateTime.toSQL()!])
      .orWhereBetween('endDate', [startDate.toSQL()!, currentDateTime.toSQL()!])
      .orderBy('startDate')
  }

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

  private calculateOccupancyRate(availableNightsInPeriod: number, bookedNightsInPeriod: number) {
    if (availableNightsInPeriod <= 0 || bookedNightsInPeriod <= 0) return 0

    return (bookedNightsInPeriod / availableNightsInPeriod) * 100
  }

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
