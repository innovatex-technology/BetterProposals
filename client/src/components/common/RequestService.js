import { apiService, base_url, base_image_url } from '../common/apiService';


export const APP_BASE_URL = base_image_url;
//calling secure apis
export const callingSecureAPI = async (path, method, headers = {}, body = null) => {
  headers["Authorization"] = "Bearer " + atob(localStorage.getItem('accessToken'));
  let response = await apiService({ path, method, headers, body });
  console.log(response.status, response.status === 401)
  if (response.status === 401) {
   const token = await refreshTokenValue();
    headers["Authorization"] = "Bearer " + token
    console.log({ path, method, headers, body })
    response = await apiService({ path, method, headers, body });
  }
  return response;
}

//login user
export const login = async (credentials) => {
  const response = await fetch(`${base_url}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Basic " + btoa(`${credentials.email}:${credentials.password}`)
    },
    body: JSON.stringify({}),
  });
  const data = await response.json();
  if (response.ok && response.status === 200) {
    localStorage.setItem('accessToken', btoa(data?.data?.accessToken));
    localStorage.setItem('refreshToken', btoa(data?.data?.refreshToken));
  } else {
    throw new Error(data.message || 'Login failed');
  }
  return data?.data?.user_details;
};

//logout function
export const logout = () => {
  localStorage.clear();
};

//refresh token
export const refreshTokenValue = async () => {
  console.log("comming")
  const refreshToken = atob(localStorage.getItem('refreshToken'));
  const response = await fetch(`${base_url}/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken: 'Bearer ' + refreshToken }),
  });
  const data = await response.json();
  if (response.ok && response.status === 200) {
    localStorage.setItem('accessToken', btoa(data?.data?.accessToken));
    return data?.data?.accessToken;
  } else {
    logout();
    throw new Error(data.message || 'Failed to refresh token');
    return false;
  }
};
