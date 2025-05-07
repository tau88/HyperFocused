const defaultTimeUnitData = {
  timeUnit: [
    { name: "Seconds", value: 1, favorited: true },
    { name: "Minutes", value: 60, favorited: false },
    { name: "Hours", value: 3600, favorited: false },
    { name: "Days", value: 86400, favorited: false },
    { name: "Microcentury", value: 3155.7, favorited: false },
    { name: "Nanocentury", value: 3.156, favorited: false },
    { name: "Sacaramucci", value: 950400, favorited: false },
    { name: "Showers", value: 480, favorited: false },
    { name: "Walked Miles", value: 1020, favorited: false },
    { name: "Songs", value: 180, favorited: false },
  ],
};

// Function to load or initialize data in localStorage
const initializeTimeUnitData = () => {
  // Check if there's already saved data in localStorage, if no data is found, save the default data to localStorage
  const storedData = localStorage.getItem("timeUnitData");

  if (!storedData) {
    localStorage.setItem("timeUnitData", JSON.stringify(defaultTimeUnitData));
  } else {
    console.log("Time Translator data already exists in localStorage.");
  }
};

export default initializeTimeUnitData;
