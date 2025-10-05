import{j as i,$ as u}from"./app-BZ7HYxBB.js";function f({type:a="button",className:r="",disabled:t=!1,href:e,children:o,...s}){const n=`
    inline-flex items-center px-4 py-2 bg-white border border-black rounded-full 
    font-semibold text-xs text-black uppercase tracking-widest shadow-sm 
    hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 
    focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150
    ${t?"opacity-25":""} 
    ${r}
  `;return e?i.jsx(u,{href:e,className:n,...s,children:o}):i.jsx("button",{type:a,className:n,disabled:t,...s,children:o})}export{f as S};
