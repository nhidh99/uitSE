export const loadCities = async () => {
    const url = "https://tiki.vn/api/v2/directory/regions?country_id=vn";
    const response = await fetch(url);
    return response.ok ? (await response.json())['data'] : [];
};

export const loadDistrictsByCityId = async (cityId) => {
    const url = `https://tiki.vn/api/v2/directory/districts?region_id=${cityId}`;
    const response = await fetch(url);
    return response.ok ? (await response.json())['data'] : [];
};

export const loadWardsByDistrictId = async (districtId) => {
    const url = `https://tiki.vn/api/v2/directory/wards?district_id=${districtId}`;
    const response = await fetch(url);
    return response.ok ? (await response.json())['data'] : [];
}