export function getOrdinalSuffix(num: number): string {
  const suffixes = ["th", "st", "nd", "rd"];
  const value = num % 100; // Get the last two digits

  // Special case for 11, 12, 13
  if (value >= 11 && value <= 13) {
    return num + "th";
  }

  const index = num % 10; // Get the last digit
  return num + (suffixes[index] || "th");
}

interface Airport {
  code: string;
  cityName: string;
}

export function getCityNameByCode(code: string): string {
  // Step 1: Retrieve the data from localStorage
  const storedData = localStorage.getItem("airports");

  // Step 2: Parse the JSON string back into an array
  const airports: Airport[] = JSON.parse(storedData || '[]');

  // Step 3: Find the object with the matching code
  const airport = airports.find(airport => airport.code === code);

  // Step 4: Return the cityName if found, or a default message
  return airport ? airport.cityName : "Code not found";
}

// Example usage:
// const cityName = getCityNameByCode("ANW");
// console.log(cityName); // Outputs: "Ainsworth"

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return ""; // Handle null or undefined dates

  // Create a Date object from the input string
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return ""; // Handle invalid dates

  // Extract the day and month
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // "Dec"

  // Return the formatted date
  return `${day} ${month}`;
}

// Example usage
// const dateInput = "2024-12-15";
// console.log(formatDate(dateInput)); // Output: 15 Dec

export function convertTo12HourFormat(time24: string): string {
  // Split the time into hours and minutes
  const [hours, minutes] = time24.split(":").map(Number);

  // Determine AM or PM
  const period = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  const hours12 = hours % 12 || 12; // If hours % 12 is 0, it should be 12

  // Return the formatted time
  return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
}

// Example usage
// const time24 = "19:15";
// console.log(convertTo12HourFormat(time24)); // Output: 7:15 PM

export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString('en-BD', {
    minimumFractionDigits: 2, // Ensures two decimal places
    maximumFractionDigits: 2, // Ensures two decimal places
  })}`;
}

// Example Usage:
// const amount = 1234567.89;
// console.log(formatBDT(amount)); // Output: "৳1,234,567.89"
