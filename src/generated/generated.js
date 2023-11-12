export const react_app_jsx =
  "import%20React%20from%20'react'%3B%0A%0Aconst%20%7B%7BsubModuleName%7D%7D%20%3D%20()%20%3D%3E%20%7B%0A%20%20return%20(%0A%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%0A%20%20%20%20%3C%2Fdiv%3E%0A%20%20)%3B%0A%7D%3B%0A%0Aexport%20default%20%7B%7BsubModuleName%7D%7D%3B";
export const react_index_js = '';
export const solid_app_jsx =
  'import%20%7BhashIntegration%2C%20Router%2C%20Routes%2C%20useRoutes%7D%20from%20%22%40solidjs%2Frouter%22%3B%0Aimport%20%7Blazy%7D%20from%20%22solid-js%22%3B%0A%0Aconst%20routes%20%3D%20%5B%7B%0A%20%20%20%20path%3A%20%22%2F%22%2C%0A%20%20%20%20component%3A%20lazy(()%20%3D%3E%20import(%22.%2Fhome%22))%0A%7D%2C%20%7B%0A%20%20%20%20path%3A%20%22%2Fpage%22%2C%0A%20%20%20%20component%3A%20lazy(()%20%3D%3E%20import(%22.%2Fpage%22))%0A%7D%5D%0A%0Afunction%20App()%20%7B%0A%20%20%20%20const%20Routes%20%3D%20useRoutes(routes)%3B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%20%20%3CRouter%20source%3D%7BhashIntegration()%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3CRoutes%2F%3E%0A%20%20%20%20%20%20%20%20%3C%2FRouter%3E%0A%20%20%20%20)%0A%7D%0A%0Aexport%20default%20App%3B%0A';
export const solid_home_jsx =
  'import%20%7BcreateSignal%7D%20from%20%22solid-js%22%3B%0Aimport%20%7BA%7D%20from%20%22%40solidjs%2Frouter%22%3B%0A%0Aconst%20Home%20%3D%20()%20%3D%3E%20%7B%0A%20%20%20%20const%20%5Bcount%2C%20setCount%5D%20%3D%20createSignal(0)%3B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20style%3D%7B%7Bdisplay%3A%20%22flex%22%2C%20justifyContent%3A%20%22center%22%7D%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CA%20href%3D%7B%22%2F%22%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20style%3D%7B%7Bpadding%3A%20%221rem%22%7D%7D%3EHome%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FA%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CA%20href%3D%7B%22%2Fpage%22%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20style%3D%7B%7Bpadding%3A%20%221rem%22%7D%7D%3EPage%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FA%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ch2%3ECount%3A%20%7Bcount()%7D%3C%2Fh2%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cbutton%20onClick%3D%7B()%20%3D%3E%20setCount(c%20%3D%3E%20c%20%2B%201)%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Clique%20!%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fbutton%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20)%3B%0A%7D%3B%0A%0Aexport%20default%20Home%3B%0A';
export const solid_index_js =
  'import%20%7Brender%7D%20from%20%22solid-js%2Fweb%22%3B%0Aimport%20App%20from%20%22.%2Fapp%22%3B%0A%0Arender(()%20%3D%3E%20%3CApp%20%2F%3E%2C%20document.getElementById(%22app%22))%3B';
export const solid_page_jsx =
  'import%20%7BA%7D%20from%20%22%40solidjs%2Frouter%22%3B%0A%0Aconst%20Page%20%3D%20()%20%3D%3E%20%7B%0A%20%20%20%20return%20(%0A%20%20%20%20%20%20%20%20%3Cdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20style%3D%7B%7Bdisplay%3A%20%22flex%22%2C%20justifyContent%3A%20%22center%22%7D%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CA%20href%3D%7B%22%2F%22%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20style%3D%7B%7Bpadding%3A%20%221rem%22%7D%7D%3EHome%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FA%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3CA%20href%3D%7B%22%2Fpage%22%7D%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20style%3D%7B%7Bpadding%3A%20%221rem%22%7D%7D%3EPage%3C%2Fspan%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C%2FA%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20%20%20%20%20%20%20%20%20%3Ch1%3EPage%202%3C%2Fh1%3E%0A%20%20%20%20%20%20%20%20%3C%2Fdiv%3E%0A%20%20%20%20)%3B%0A%7D%3B%0A%0Aexport%20default%20Page%3B';
export const solid_view_blade_php = '%3Cdiv%20id%3D%22app%22%3E%3C%2Fdiv%3E';
export const vanilla_controller_php =
  "%3C%3Fphp%0A%0Anamespace%20App%5CHttp%5CControllers%3B%0A%0Ause%20Illuminate%5CFoundation%5CAuth%5CAccess%5CAuthorizesRequests%3B%0Ause%20Illuminate%5CFoundation%5CValidation%5CValidatesRequests%3B%0Ause%20Illuminate%5CRouting%5CController%20as%20BaseController%3B%0A%0Aclass%20%7B%7BsubModuleName_capitalized%7D%7DController%20extends%20BaseController%0A%7B%0A%20%20%20%20use%20AuthorizesRequests%2C%20ValidatesRequests%3B%0A%0A%20%20%20%20public%20function%20index()%0A%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20return%20view('resources%2Fviews%2F%7B%7BsubModuleName_lw%7D%7D')%3B%0A%20%20%20%20%7D%0A%7D";
export const vanilla_index_js = 'const%20foo%20%3D%20%22bar%22%3B';
export const vanilla_view_blade_php = '%3Cdiv%20id%3D%22app%22%3E%3C%2Fdiv%3E';
