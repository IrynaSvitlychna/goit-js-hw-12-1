import{a as w,S as E,i as p}from"./assets/vendor-89feecc5.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))u(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&u(c)}).observe(document,{childList:!0,subtree:!0});function i(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function u(n){if(n.ep)return;n.ep=!0;const r=i(n);fetch(n.href,r)}})();const I=w.create({baseURL:"https://pixabay.com/api/",params:{key:"41942157-8ce243761fb563c2a1b85d8a4",language:"en",image_type:"photo",orientation:"horizontal",safesearch:!0}}),S=document.getElementById("search-form"),a=document.getElementById("image-gallery"),o=document.getElementById("load-more"),q=document.getElementById("spinner");let d,l=1,g=40,y="",m=!1;S.addEventListener("submit",async e=>{e.preventDefault();const t=new FormData(e.currentTarget).get("query");if(t){y=t,l=1;try{s(!0);const i=await h();M(i)}catch{f()}finally{s(!1)}}});o.addEventListener("click",async()=>{l+=1,await x(),m&&(o.classList.add("is-hidden"),b())});async function h(){return(await I.get("",{params:{q:y,page:l,per_page:g}})).data}async function x(){try{s(!0);const e=await h();T(e.hits)}catch{f()}finally{s(!1)}}function M(e){const t=e.hits;if(t.length===0){f();return}m=e.totalHits<=l*g,o.classList.remove("is-hidden"),s(!1);const i=t.map(L);a.innerHTML="",a.append(...i),v()}function T(e){if(e.length===0){m=!0,o.classList.add("is-hidden"),s(!1),b();return}const t=e.map(L);a.append(...t),v()}function L(e){const t=document.createElement("a");return t.href=e.webformatURL,t.setAttribute("data-lightbox","image-gallery"),t.innerHTML=`
    <div class="gallery-item">
      <img src="${e.webformatURL}" alt="${e.tags}">
      <div class="image-info">
        <div class="img-info-item">
          <p>Likes:</p>
          <p>${e.likes}</p>
        </div>
        <div class="img-info-item">
          <p>Views: </p>
          <p>${e.views}</p>
        </div>
        <div class="img-info-item">
          <p>Comments: </p>
          <p>${e.comments}</p>
        </div>
        <div class="img-info-item">
          <p>Downloads: </p>
          <p>${e.downloads}</p>
        </div>
      </div>
    </div>
  `,t}function v(){d?d.refresh():d=new E(".gallery a")}function b(){p.info({title:"Info",message:"There are no more images for your request."})}function s(e){q.classList.toggle("is-hidden",!e)}function f(){a.innerHTML="",p.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"})}
//# sourceMappingURL=commonHelpers.js.map
