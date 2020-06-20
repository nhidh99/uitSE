export const loadCities = async () => {
    const url = "https://raw.githubusercontent.com/nhidh99/uitSE/master/laptop-store/laptop-store-addresses/cities.json";
    const response = await fetch(url);
    return response.ok ? (await response.json())['data'] : [];
};

export const loadDistrictsByCityId = async (cityId) => {
    const url = `https://raw.githubusercontent.com/nhidh99/uitSE/master/laptop-store/laptop-store-addresses/districts/${cityId}.json`;
    const response = await fetch(url);
    return response.ok ? (await response.json())['data'] : [];
};

export const loadWardsByDistrictId = async (districtId) => {
    const url = `https://raw.githubusercontent.com/nhidh99/uitSE/master/laptop-store/laptop-store-addresses/wards/${districtId}.json`;
    const response = await fetch(url);
    return response.ok ? (await response.json())['data'] : [];
}