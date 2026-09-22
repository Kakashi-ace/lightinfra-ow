export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const targetUrl = `https://lightinfra-cms.onrender.com${url.pathname}${url.search}`;
  
  // 转发请求到 Render CMS 后端
  const headers = new Headers(context.request.headers);
  headers.set('host', 'lightinfra-cms.onrender.com');

  const modifiedRequest = new Request(targetUrl, {
    method: context.request.method,
    headers,
    body: context.request.body,
    redirect: 'follow',
  });

  return fetch(modifiedRequest);
};
