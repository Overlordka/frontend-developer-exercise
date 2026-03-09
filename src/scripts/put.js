const token = '6291aa27b5e87e3a3495cc2c670960008263d487e8534c1a5147649279d523e3';

export async function updateDevice(deviceId, payload) {
    if (!deviceId) {
        throw new Error('Device id is required for PUT request.');
    }

    const response = await fetch(`https://exercise.mobicom-pro.com/api/devices/${deviceId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${text}`);
    }

    return response.json();
}