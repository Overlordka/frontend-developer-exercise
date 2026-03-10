const token = '6291aa27b5e87e3a3495cc2c670960008263d487e8534c1a5147649279d523e3';

function parseDateString(dateString) {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

function formatDateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getStartOfWeek(dateString) {
    const date = parseDateString(dateString);
    const daysFromMonday = (date.getDay() + 6) % 7;

    date.setDate(date.getDate() - daysFromMonday);

    return formatDateString(date);
}

export async function fetchDevices() {
    const response = await fetch('https://exercise.mobicom-pro.com/api/devices', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
    }

    return response.json();
}

export async function fetchCurrentEnergyConsumption() {
    const currentWeather = await fetch("https://exercise.mobicom-pro.com/api/weather", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }
    });

    if (!currentWeather.ok) {
        const text = await currentWeather.text();
        throw new Error(`HTTP error! status: ${currentWeather.status}, message: ${text}`);
    }

    const currentTime = await currentWeather.json();

    const currentDate = currentTime.timestamp.split(" ")[0];
    const [yearPart, monthPart, dayPart] = currentDate.split("-");
    const year = Number(yearPart);
    const month = Number(monthPart);
    const previousYear = month === 1 ? year - 1 : year;
    const previousMonth = month === 1 ? 12 : month - 1;
    const currentDateFrom = `${previousYear}-${String(previousMonth).padStart(2, "0")}-${dayPart}`;


    const getEnergyConsumption = await fetch(`https://exercise.mobicom-pro.com/api/statistics?device_id=38&from=${currentDateFrom}&to=${currentDate}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }
    });

    if (!getEnergyConsumption.ok) {
        const text = await getEnergyConsumption.text();
        throw new Error(`HTTP error! status: ${getEnergyConsumption.status}, message: ${text}`);
    }

    const energyConsumption = await getEnergyConsumption.json();

    return energyConsumption;
}

export async function getWeeklyEnergyConsumption() {
    const energyConsumption = await fetchCurrentEnergyConsumption();

    if (!Array.isArray(energyConsumption) || energyConsumption.length === 0) {
        return [];
    }

    const sortedEnergyConsumption = [...energyConsumption].sort((firstItem, secondItem) =>
        firstItem.date.localeCompare(secondItem.date)
    );
    const currentDate = sortedEnergyConsumption[sortedEnergyConsumption.length - 1].date;
    const startOfWeek = getStartOfWeek(currentDate);
    const weeklyData = sortedEnergyConsumption.filter((item) => item.date >= startOfWeek && item.date <= currentDate);

    console.log('Weekly Energy Consumption:', weeklyData);
    return weeklyData;
}