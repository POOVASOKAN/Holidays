// Function to find holidays
function findHolidays() {
    //! Inputting API Key 
    const apiKey = "68JOm36WUu9mIhC6nQ50Eqe6Yq3903mO";
  
    //! Action 1 : Letting  the user select the dateinput 
    const dateInput = $("#dateInput").val();
  
    //! Action 2 : Letting  the user select the country
    const selectedCountry = $("#countrySelect").val();
  
    //! After checking the selected month 
    if (!dateInput) {
      
      alert("Please select a month.");
      return;
    }
  
    //! Action 3: Using API URL for fetching holidays
    const apiUrl = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${selectedCountry}&year=2023`;
  
    //! Action 4: Fetch holidays data from the API
    fetch(apiUrl)

      //! Parsing the fetch response as JSON
      .then((response) => response.json())

      //! Call the displayHolidays function with the data and selected month
      .then((data) => displayHolidays(data, dateInput))

      //! Log an error if there's an issue fetching data
      .catch((error) => console.error("Error fetching holidays:", error));
  }
  
  //! Action 4: Function to display holidays
  function displayHolidays(data, selectedMonth) {

    //! Get the result div element by ID
    const resultDiv = $("#result");
  
    //! Clear any previous content in the result div
    resultDiv.empty();
  
    //! Extracting holidays data from the API response
    const holidays = data.response?.holidays || [];
  
    //! Checking if there are holidays
    if (holidays.length > 0) {
     
      resultDiv.append(`<h2>Holidays for ${selectedMonth}</h2>`);
  
      //! Filtering holidays for the selected month
      const holidaysForMonth = holidays.filter((holiday) => {

        //! Creating a Date object from the holiday date
        const holidayDate = new Date(holiday.date.iso);
  
        //! Checking if the month of the holiday matches the selected month
        return holidayDate.getMonth() + 1 === parseInt(selectedMonth.split("-")[1]);
      });
  
      //! Checking if there are holidays for the selected month
      if (holidaysForMonth.length > 0) {

        //!Displaying each holiday with its date and name
        holidaysForMonth.forEach((holiday) => {
          resultDiv.append(`<p>${holiday.date.iso} - ${holiday.name}</p>`);
        });
      } else {

        //! Displaying message if no holidays found for the selected month and country
        resultDiv.append("<p>No holidays found for the selected month and country.</p>");
      }
    } 
  }
  