export default function DateString() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    if (day.toString().length < 10) {
        day = '0' + day;
    }
    if (month.toString().length < 10) {
        month = '0' + month;
    }
    var date_string = day + '.' + month + '.' + year;
    return date_string;
}
