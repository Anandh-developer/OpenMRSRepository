
class HelperFunctions {
    getDateForVisitDateVerification() {
        const today = new Date();//instance will return the current date with global format
        const visitDateFormat = today.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).replace(',', '').split(' ');
        //date will be converted to Jan.26.2025 for validate the visit date 
        const visitDate = visitDateFormat[1] + "." + visitDateFormat[0] + "." + visitDateFormat[2];

        return visitDate;
    }
    getFutureDate() {
        const today = new Date();//Get the current date
        const futureDate = new Date(today);//Pass the current date to other date instance
        futureDate.setDate(today.getDate() + 1);//increase the date by one to get the future date 
        return futureDate.getDate();//get the month of the day that will be future date
    }
    getCurrentAge(day, month, year) {
        //The below format will be Janualry 26 2025
        let bithDate = new Date(`${month} ${day} ${year}`)

        let todayDate = new Date();//get the current date
        let age = todayDate.getFullYear() - bithDate.getFullYear();// To find the initial age

        let monthDifference = todayDate.getMonth() - bithDate.getMonth();// To find the month difference between today date with birth date
        let dateDifference = todayDate.getDate() - bithDate.getDate();// find the day difference between current date with birth date
        if ((monthDifference < 0) || ((monthDifference === 0) && (dateDifference < 0)))// If Month differnce is less than zero or if the month differnce is zero and date differce is less than or equal to zero the birth day not yet come for the current year so the birth day will be initial age-1
        {
            age--
        }
        //get the age as string so we dont need to convert in script

        return age.toString();
    }

    getTimeStamp() {
        let date = new Date();
        console.log(date.toDateString())
        console.log(date.toTimeString())
        let time = date.toTimeString().split(" ");
        let dateAndTimeStamp = date.toDateString().replaceAll(" ", "_") + "_" + time[0].replaceAll(":", "_");
        return dateAndTimeStamp;
    }
    BMICalculator(height, weight) {
        //formula for calculate the BMI Math.pow will do (height / 100  *height / 100) 
        let bmi = weight / Math.pow(height / 100, 2);
        //convert the BMI to flot and the convert the digit with 1
        return parseFloat(bmi.toFixed(1)).toString();
    }
}



module.exports = HelperFunctions;

let Df = new HelperFunctions()
//Df.getCurrentAge("10","Augest","2000");
// Df.getCurrentAge(26,"January",2000)
 Df.getCurrentAge("27","January",2000)
// Df.getCurrentAge(28,"January",2000)