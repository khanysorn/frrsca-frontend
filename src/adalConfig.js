import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
 
export const adalConfig = {
  tenant: '6f4432dc-20d2-441d-b1db-ac3380ba633d',
  clientId: '9d24ecc6-1ead-478f-a3c4-8c91f6645001',
  endpoints: {
    api: '14d71d65-f596-4eae-be30-27f079bf8d4b',
  },
  cacheLocation: 'localStorage',
};
 
export const authContext = new AuthenticationContext(adalConfig);
 
export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);
 
export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);