const dob = document.querySelector("#date");
const message = document.querySelector("#message");
const nextPalindromeMessage = document.querySelector("#next-palindrome-msg");
const previousPalindromeMessage = document.querySelector("#previous-palindrome-msg");
const checkButton = document.querySelector("#check-btn");
const meme = document.querySelector("#meme");

function reverseStr(str) {
    return str.split('').reverse().join('');
}

function isStringPalindrome(str) {
    let reversedString = reverseStr(str);
    return (reversedString === str);
}

function convertDateAsString(date) {
    let dateStr = {
        day: '',
        month: '',
        year: ''
    };
    if (date.day < 10) {
        dateStr.day = '0' + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = '0' + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();

    return dateStr;
}

function allDateFormats(date) {
    let stringDates = convertDateAsString(date);
    let ddmmyyyy = stringDates.day + stringDates.month + stringDates.year;
    let mmddyyyy = stringDates.month + stringDates.day + stringDates.year;
    let yyyymmdd = stringDates.year + stringDates.month + stringDates.day;
    let ddmmyy = stringDates.day + stringDates.month + stringDates.year.slice(-2);
    let mmddyy = stringDates.month + stringDates.day + stringDates.year.slice(-2);
    let yymmdd = stringDates.year.slice(-2) + stringDates.month + stringDates.day;
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormats(date) {
    let listOfDates = allDateFormats(date);
    let flag = false;
    for (let i = 0; i < listOfDates.length; i++) {
        if (isStringPalindrome(listOfDates[i])) {
            flag = true;
            break;
        }
    }
    return flag;
}

function leapYear(year) {
    if ((year % 400 === 0) && (year % 100 !== 0) || (year % 4 === 0)) {
        return true;
    } else {
        return false;
    }
}

function getNextDate(date) {
    let day = date.day + 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (leapYear(year)) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }

    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year
    }

}

function nextPalindromeDate(date) {
    let count = 0;
    let nextDate = getNextDate(date);

    while (1) {
        count++;
        let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }

        nextDate = getNextDate(nextDate);
    }

    return [count, nextDate];

}

function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 3) {
        if (leapYear(year)) {
            if (day < 1) {
                day = 29;
                month--;
            }
        } else {
            if (day < 1) {
                day = 28;
                month--;
            }
        }
    } else {
        if (month === 1 && day < 1) {
            day = 31;
            month = 12;
            year--;
        }
        if (month > 1 && day < 1) {
            day = daysInMonth[month - 2];
            month--;
        }
    }

    return {
        day: day,
        month: month,
        year: year
    }
}

function previousPalindromeDate(date) {
    let count = 0;
    let previousDate = getPreviousDate(date);

    while (1) {
        count++;
        let isPalindrome = checkPalindromeForAllDateFormats(previousDate);
        if (isPalindrome) {
            break;
        }

        previousDate = getPreviousDate(previousDate);
    }

    return [count, previousDate];
}

meme.style.display = "none";

function clickHandler() {

    if (dob.value === "") {
        message.innerText = "Please select birthdate";
        message.style.color = "red";
    } else {
        meme.style.display = "block";
        message.style.display = "none";
        nextPalindromeMessage.style.display = "none";
        previousPalindromeMessage.style.display = "none";
        setTimeout(() => {

            meme.style.display = "none";

            let dobValue = dob.value.split('-');
            let date = {
                day: Number(dobValue[2]),
                month: Number(dobValue[1]),
                year: Number(dobValue[0])
            };

            if (checkPalindromeForAllDateFormats(date)) {
                message.style.display = "block";
                message.style.color = "green";
                message.innerText = "Congrats!! your Birthday is a Palindrome 🥳";
                nextPalindromeMessage.style.display = "none";
                previousPalindromeMessage.style.display = "none";
            } else {
                message.style.display = "block";
                message.style.color = "red";
                message.innerText = "Opps! your Birthday is not a palindrome 😐";
                let [count, nextDate] = nextPalindromeDate(date);
                let [ctr, previousDate] = previousPalindromeDate(date);
                nextPalindromeMessage.style.display = "block";
                previousPalindromeMessage.style.display = "block";
                nextPalindromeMessage.innerText = `👉 Next Palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${count} days.`;
                previousPalindromeMessage.innerText = `👉 Previous Palindrome date is ${previousDate.day}-${previousDate.month}-${previousDate.year}, you missed it by ${ctr} days.`;
            }

        }, 3000)
    }
}

checkButton.addEventListener('click', clickHandler);