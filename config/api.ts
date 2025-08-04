// All backend API endpoints

export const DEV_API_BASE_URL = 'http://192.168.68.119:8010';
export const PROD_API_BASE_URL = 'https://bbitapi.ramsbd.net';
export const STAGING_API_BASE_URL = 'http://92.204.172.226:8000';

// const isProduction = false; // For testing purposes, set to true
// const BASE_URL = isProduction ? PROD_API_BASE_URL : DEV_API_BASE_URL;
export const BASE_URL = STAGING_API_BASE_URL;

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/user/api/v1/user/login/`,
  PASSENGERS: {
    GET_ALL: `${BASE_URL}/passenger/api/v1/passenger/without_pagination/for_app/all/`,
    GET_ALL_WITHOUT_PAGINATION: `${BASE_URL}/passenger/api/v1/passenger/without_pagination/for_app_wp/all/`,
    CREATE: `${BASE_URL}/passengers`,
    UPDATE: `${BASE_URL}/passengers/`,
    DELETE: `${BASE_URL}/passengers/`,
  },
  PASSENGER: {
    GET_BY_ID: `${BASE_URL}/passenger/api/v1/passenger/`,
    CREATE: `${BASE_URL}/passenger/api/v1/passenger/create/`,
    UPDATE: `${BASE_URL}/passenger/api/v1/passenger/update/`,
    DELETE: `${BASE_URL}/passenger/api/v1/passenger/delete/`,
  },
  AGENT: {
    GET_ALL_WITHOUT_PAGINATION: `${BASE_URL}/agent/api/v1/agent/without_pagination/for_app/all/`
  },
  SUB_AGENT: {
    GET_ALL_BY_AGENT_ID: `${BASE_URL}/sub_agent/api/v1/sub_agent/without_pagination/for_app/all/`
  },
  PASSPORT: {
    GET_PASSPORT_INFO: `${BASE_URL}/passenger/api/v1/passenger/get_passport_data_from_google_vision/`,
    CHECK_DUPLICATE_PASSPORT_NO: `${BASE_URL}/passenger/api/v1/passenger/check_passport_no_when_create/`,
    GET_PASSPORT_INFO_SINGLE_IMG: `${BASE_URL}/passenger/api/v1/passenger/get_passport_data_from_google_vision_for_single_image/`,
  },
  DEMAND: {
    GET_ALL: `${BASE_URL}/demand/api/v1/demand/without_pagination/all/`
  },
  RECRUITING_AGENCY: {
    GET_ALL: `${BASE_URL}/recruiting_agency/api/v1/recruiting_agency/without_pagination/all/`
  },
  COUNTRY: {
    GET_ALL: `${BASE_URL}/country/api/v1/country/without_pagination/all/`
  },
  CURRENT_STATUS: {
    GET_ALL: `${BASE_URL}/current_status/api/v1/current_status/without_pagination/all/`
  },
  VISA_ENTRY: {
    GET_ALL: `${BASE_URL}/visa_entry/api/v1/visa_entry/without_pagination/all/`
  },
  THANA: {
    GET_ALL: `${BASE_URL}/thana/api/v1/thana/without_pagination/all/`
  },
  CITY: {
    GET_ALL: `${BASE_URL}/city/api/v1/city/without_pagination/all/`
  },
  PROFESSION: {
    GET_ALL: `${BASE_URL}/profession/api/v1/profession/without_pagination/all/`
  },
  PASSENGER_TYPE: {
    GET_ALL: `${BASE_URL}/passenger_type/api/v1/passenger_type/without_pagination/all/`
  }
}
