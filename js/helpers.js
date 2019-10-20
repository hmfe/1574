var Helper = (function() {
    return {
        formattedTimestamp: function() {
            var date = new Date(),
                year = date.getFullYear(),
                month = date.getMonth(),
                day = date.getDate(),
                hours = date.getHours(),
                minutes = date.getMinutes(),
                amPm = hours > 12 ? 'PM' : 'AM';

            hours = hours > 12 ? hours - 12 : hours;

            return year + '-' + month + '-' + day + ', ' + hours + ':' + minutes + ' ' + amPm;
        }
    }
})();