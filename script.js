const products=[
 {name:"Oud Marakoja",price:2400,image:"assets/oud-marakoka.jpg",desc:"A dark, warm oud with a smooth fruity touch — bold, polished and made to leave a lasting impression."},
 {name:"Oud For Greatness",price:2400,image:"assets/oud-for-greatness.jpg",desc:"Rich and confident with an elegant oud character. A statement scent for evenings, events and standout moments."},
 {name:"Vanilla",price:1400,image:"assets/vanilla.jpg",desc:"Soft, sweet and comforting with a creamy vanilla mood. An easy everyday fragrance with a cozy finish."},
 {name:"Oud Supreme",price:2100,image:"assets/oud-supreme.jpg",desc:"A refined oud profile with depth and presence. Smooth, sophisticated and ideal when you want to feel dressed up."},
 {name:"Hugo Boss",price:2000,image:"assets/hugo-boss.jpg",desc:"Clean, fresh and effortlessly masculine in character. A versatile choice for work, casual days and evenings."}
];
const WHATSAPP_NUMBER="923120590220";let bag=[];
function money(n){return "Rs. "+n.toLocaleString("en-PK")}
function productCard(p){return `<article class="product"><a class="pic" href="products.html#${encodeURIComponent(p.name)}"><img src="${p.image}" alt="${p.name} perfume" loading="lazy"><span class="view-pill">View scent</span></a><div class="info"><div class="tag">PERFUME</div><h3>${p.name}</h3><p>${p.desc}</p><div class="row"><span class="price">${money(p.price)}</span><button class="add" onclick='add(${JSON.stringify(p.name)})'>Add +</button><button class="order" onclick='orderProduct(${JSON.stringify(p.name)})'>Order</button></div></div></article>`}
function render(){const grid=document.getElementById("grid");if(!grid)return;const q=(document.getElementById("search")?.value||"").toLowerCase();const list=products.filter(p=>!q||p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q));grid.innerHTML=list.map(productCard).join("")||"<p class='empty'>No fragrance found. Try another name.</p>"}
function add(name){const p=products.find(x=>x.name===name);if(!p)return;bag.push(p);update();toast("Added to your bag ✦")}
function remove(i){bag.splice(i,1);update()}
function update(){const c=document.getElementById("count"),items=document.getElementById("items"),total=document.getElementById("total");if(c)c.textContent=bag.length;if(items)items.innerHTML=bag.length?bag.map((p,i)=>`<div class="item"><span>${p.name}<br><small>${money(p.price)}</small></span><button onclick="remove(${i})">Remove</button></div>`).join(""):"<p class='empty'>Your bag is empty.</p>";if(total)total.textContent=money(bag.reduce((a,p)=>a+p.price,0))}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("shade").classList.add("show")}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("shade").classList.remove("show")}
function orderProduct(name){const p=products.find(x=>x.name===name);if(!p)return;const msg=`Hi VELORA! I want to order this perfume.\n\nPerfume: ${p.name}\nPrice: ${money(p.price)}\n\nName:\nPhone:\nCity:\nComplete address:`;window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(msg),"_blank")}
function checkout(){if(!bag.length){toast("Add a perfume first");return}const lines=bag.map(p=>`• ${p.name} — ${money(p.price)}`).join("\n");const total=bag.reduce((a,p)=>a+p.price,0);const msg=`Hi VELORA! I want to place an order.\n\n${lines}\n\nTotal: ${money(total)}\n\nName:\nPhone:\nCity:\nComplete address:`;window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(msg),"_blank")}
function focusSearch(){const s=document.getElementById("search");if(s){document.querySelector(".products-section")?.scrollIntoView({behavior:"smooth"});setTimeout(()=>s.focus(),400)}else window.location.href="products.html"}
let t;function toast(s){const x=document.getElementById("toast");x.textContent=s;x.classList.add("showtoast");clearTimeout(t);t=setTimeout(()=>x.classList.remove("showtoast"),1800)}
render();update();
