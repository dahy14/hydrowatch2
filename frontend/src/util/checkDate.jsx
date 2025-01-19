import generateInvoice from "./generateInvoice";
import daysjs from "dayjs";

export function retDate(timestamp) {
  const d = daysjs(timestamp);

  const start = d.date(1).format("MMMM D, YYYY");
  const end = d.date(d.daysInMonth()).format("MMMM D, YYYY");
  return { start, end };
}

export class checkBilling {
  constructor(billedTo) {
    this.billedTo = billedTo;
    this.nextMonth = null;
    this.billingPeriod = null;
    this.prevMonth = null;
    this.prevCons = null;
  }

  checkDate(date, consumption) {
    date = new Date(date);

    // if null checker
    if (this.nextMonth === null) {
      this.nextMonth = new Date(date);
      this.nextMonth.setMonth(date.getMonth() + 1);
    }
    if (this.prevMonth === null) {
      this.prevMonth = new Date(date);
      this.prevMonth.setMonth(date.getMonth());
    }

    if (date.getMonth() !== this.nextMonth.getMonth()) {
      this.prevCons = consumption;
    }
    // if next month is the same as the current month
    if (date.getMonth() === this.nextMonth.getMonth()) {
      if (this.billingPeriod === null) {
        this.billingPeriod = true;

        generateInvoice(
          this.billedTo,
          this.prevCons,
          this.prevMonth,
          this.nextMonth
        );
        // reset the flags
        this.nextMonth = null;
        this.prevMonth = null;
        this.billingPeriod = null;
        this.prevCons = null;
      } else {
        console.error("bill has not proceed");
      }
      // code for non payment
    }
  }
}
