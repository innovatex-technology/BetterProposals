const path = window.location.host;
const basePath = path.includes("localhost") 
  ? "http://localhost:3001"
  : "";
  
const base_url = basePath + "/api/v1"
const base_image_url = basePath + "/innovatex/image/"

//api calling service
const apiService = async ({ path, method, headers = {}, body = null }) => {
    const url = base_url + path;
    const options = {
        method,
        headers: {
          ...headers
        }
      };
    
      if (!(body instanceof FormData) && (method === "POST" || method === "PUT")) {
        options.headers['Content-Type'] = 'application/json';
        options["body"] = JSON.stringify(body)
      }else if(body instanceof FormData){
        options["body"] = body
      }
    let response;
    try {
       response = await fetch(url, options);
      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        errorData.status = response.status
        return errorData;
      }
      return response;
    } catch (error) {
      // Handle network errors or other issues
      console.error('API call error:', error);
      return response;
    }
  };
  
  export { apiService, base_url , base_image_url};
  