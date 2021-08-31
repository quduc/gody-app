
//distance and duration get from API Google Distance
//its include text and value

export const calculateFare = (distance: any, duration: any) => {
    const distanceInKm = distance.value * 0.001;
    const durationInMinutes = duration.value / 60;
    let totalFare = 0;
    if (distanceInKm <= 2) {
        totalFare = 1.5 + durationInMinutes * (1 / 23);
    }
    if (distanceInKm > 2) {
        totalFare = 1.5 + durationInMinutes * (1 / 23) + 0.75 * (distanceInKm - 2);
    }
    return Math.round(totalFare);
}