function parseDateFromString(dateString) {
    var match = dateString.match(/^(\d{4})(\d{2})(\d{2})$/);

    if (!match) {
        console.error('올바르지 않은 날짜 형식입니다.');
        return null;
    }

    var year = parseInt(match[1], 10);
    var month = parseInt(match[2], 10) - 1;
    var day = parseInt(match[3], 10);

    var dateObject = new Date(year, month, day);

    if (isNaN(dateObject.getTime())) {
        console.error('올바르지 않은 날짜 형식입니다.');
        return null;
    }

    return dateObject;
}

function calculateExperience(startDate) {
    var startDateObject = parseDateFromString(startDate);

    if (startDateObject === null) {
        return null;
    }

    var currentDate = new Date();
    var years = currentDate.getFullYear() - startDateObject.getFullYear();
    var months = currentDate.getMonth() - startDateObject.getMonth();

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months };
}

function calculateAndDisplayExperience(startDate) {
    var experience = calculateExperience(startDate);

    if (experience !== null) {
        var startDateElement = document.getElementById('job-start-date');
        startDateElement.innerHTML = experience.years + "년 " + experience.months + "개월";
    }
}