class ReadingPlan {

    constructor(id, startDate, start, end, measurePerDay = 0, endDate, mode, measure, book_data, plan_scheme = {}) {
        this.id = id;
        this.measure = measure;
        this.startDate = new Date(startDate);
        this.start = Number(start);
        this.end = Number(end);
        this.mode = mode;
        this.measurePerDay = Number(measurePerDay);
        this.msPerDay = 24*60*60*1000;
        this.book_data = book_data;
        this.plan_scheme = plan_scheme;
        if(mode === "endDate") {
            this.plan_endDate = new Date(endDate);
        } else {
            const new_endDate = new Date();
            new_endDate.setDate(this.startDate.getDate() + this.plan_total_days - 1);
            this.plan_endDate = new Date();
        }
    }
    get obtain_basic_details() {
        return {
            id: this.id, measure: this.measure, startDate: this.startDate, start: this.start, end: this.end, mode: this.mode, measurePerDay: this.measurePerDay, book_data: this.book_data, plan_endDate: this.plan_endDate
        }
    }
    //This calculates the variables required for creating a brand new reading plan
    get plan_variables() {
        const total_measure = this.end - this.start + 1;
        if(this.mode === 'endDate') {
            const plan_total_days = Math.round((this.plan_endDate.getTime() - this.startDate.getTime()) / this.msPerDay)+1;
            const remainder = total_measure % plan_total_days;
            const std_measure_measurePerDay = (total_measure - remainder)/plan_total_days;
            const remainder_interval = Math.floor(plan_total_days / remainder);
            const num_intervals_to_skip = Math.floor(plan_total_days / remainder_interval) - remainder;
            return {
                plan_total_days: plan_total_days,
                total_measure: total_measure,
                remainder: remainder,
                std_measure_measurePerDay: std_measure_measurePerDay,
                remainder_interval: remainder_interval,
                num_intervals_to_skip: num_intervals_to_skip
            }
        } else {
            return {
                plan_total_days: Math.ceil(total_measure / this.measurePerDay),
                total_measure: total_measure,
                remainder: 0,
                std_measure_measurePerDay: this.measurePerDay,
                remainder_interval: 0,
                num_intervals_to_skip: 0
            }
        }
    }

    get basic_details() {
        return {
            title: this.book_data.title,
            googleLink: this.book_data.additionalDetails.volumeInfo.canonicalVolumeLink,
            author: this.book_data.author,
            images: this.book_data.images,
            id: this.id,
            measure: this.measure,
            startDate: this.startDate,
            start: this.start,
            end: this.end,
            mode: this.mode,
            measurePerDay: this.measurePerDay
        }
    }

    //this creates a new plan
    get create_new_plan () {
        const { std_measure_measurePerDay, plan_total_days, remainder_interval, num_intervals_to_skip} = this.plan_variables;
        const planObject = {};
        let running_total = this.start;
        for(let day = 1; day <= plan_total_days; day++) {
            const date_for_plan_day = new Date();
            date_for_plan_day.setDate(this.startDate.getDate() + day - 1);
            let amount_to_read = std_measure_measurePerDay;
            if(remainder_interval > 0 && day % remainder_interval === 0) {
                amount_to_read++;
                if(num_intervals_to_skip > 0 && day <=(remainder_interval * num_intervals_to_skip)) {
                    amount_to_read--;
                }
            }
            let toPage = (running_total + amount_to_read - 1) > this.end ? this.end : (running_total + amount_to_read - 1);
            if(toPage < running_total ) toPage = running_total;
            planObject[day] = { day: day, date: date_for_plan_day, total_to_read: toPage - running_total + 1, from: running_total, to: toPage, completed: false};
            running_total += amount_to_read
        }
        this.plan_scheme = planObject;
        return planObject;
    }

}

module.exports = ReadingPlan;