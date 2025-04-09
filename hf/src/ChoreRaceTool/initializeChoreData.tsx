const defaultChoreData = {
  chores: [
    {
      choreName: "Folding Laundry",
      unitOfMeasurement: "Clothes Folded",
      unitsPerSecond: "Seconds / Fold",
      best: {
        units: 26,
        time: 421,
      },
      previous: {
        units: 33,
        time: 600,
      },
    },
    {
      choreName: "Washing Dishes",
      unitOfMeasurement: "Dishes Washed",
      unitsPerSecond: "Seconds / Dish",
      best: {
        units: 30,
        time: 1376,
      },
      previous: {
        units: 14,
        time: 712,
      },
    },
    {
      choreName: "Making the Bed",
      unitOfMeasurement: "None",
      unitsPerSecond: "None",
      best: {
        units: 0,
        time: 135,
      },
      previous: {
        units: 0,
        time: 135,
      },
    },
    {
      choreName: "CUSTOM: Sweeping and Mopping the Kitchen",
      unitOfMeasurement: "None",
      unitsPerSecond: "None",
      best: {
        units: 0,
        time: 319,
      },
      previous: {
        units: 0,
        time: 553,
      },
    },
    {
      choreName: "CUSTOM: Water the Plants",
      unitOfMeasurement: "None",
      unitsPerSecond: "None",
      best: {
        units: 0,
        time: 54,
      },
      previous: {
        units: 0,
        time: 62,
      },
    },
  ],
};

// Function to load or initialize data in localStorage
const initializeChoreData = () => {
  // Check if there's already saved data in localStorage, if no data is found, save the default data to localStorage
  const storedData = localStorage.getItem("choreData");

  if (!storedData) {
    localStorage.setItem("choreData", JSON.stringify(defaultChoreData));
  } else {
    console.log("Chore data already exists in localStorage.");
  }
};

export default initializeChoreData;
