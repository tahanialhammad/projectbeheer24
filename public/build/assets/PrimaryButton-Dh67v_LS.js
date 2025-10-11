import{j as o,$ as u}from"./app-WsZsgw5z.js";function f({className:a="",disabled:t=!1,href:e,children:s,type:i="button",...n}){const r=`
    inline-flex items-center justify-center px-4 py-2 bg-black border border-transparent 
    rounded-full font-semibold text-xs text-white uppercase tracking-widest 
    hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none 
    focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 transition ease-in-out duration-150 
    ${t?"opacity-25":""} 
    ${a}
  `;return e?o.jsx(u,{href:e,className:r,...n,children:s}):o.jsx("button",{type:i,className:r,disabled:t,...n,children:s})}export{f as P};
