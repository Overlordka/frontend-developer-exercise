const token = '6291aa27b5e87e3a3495cc2c670960008263d487e8534c1a5147649279d523e3';

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