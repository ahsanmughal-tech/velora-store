const products=[
["Oud Marakoja","Perfumes",2400,"assets/oud-marakoka.jpg"],
["Oud For Greatness","Perfumes",2400,"assets/oud-for-greatness.jpg"],
["Vanilla","Perfumes",1400,"assets/vanilla.jpg"],
["Oud Supreme","Perfumes",2100,"assets/oud-supreme.jpg"],
["Hugo Boss","Perfumes",2000,"assets/hugo-boss.jpg"],
["Aurum Classic Watch","Watches",3499,"⌚"],["Noir Steel Watch","Watches",2999,"◉"],
["Luna Pendant","Jewelry",1599,"◇"],["Vela Chain","Jewelry",1299,"✦"],
["Monaco Shades","Eyewear",1999,"◒"],["Riviera Shades","Eyewear",1799,"◓"],
["Metro Crossbody","Bags",2499,"▣"],["Daily Mini Bag","Bags",2199,"▤"],
["Signature Bracelet","Accessories",999,"∞"],["Minimal Ring","Jewelry",799,"○"],
["Classic Card Wallet","Accessories",1499,"▤"],["Velora Gift Set","Accessories",2299,"✧"]
];
const WHATSAPP_NUMBER="923120590220";
let filter="All",bag=[];
function money(n){return "Rs. "+n.toLocaleString("en-PK")}
function render(){
 const q=(document.getElementById("search")?.value||"").toLowerCase();
 let list=products.filter(p=>(filter==="All"||p[1]===filter)&&(!q||p[0].toLowerCase().includes(q)||p[1].toLowerCase().includes(q)));
 document.getElementById("grid").innerHTML=list.map((p)=>`<article class="product"><div class="pic">${p[1]==="Perfumes"?`<img src="${p[3]}" alt="${p[0]} perfume">`:p[3]}</div><div class="info"><div class="tag">${p[1]}</div><h3>${p[0]}</h3><div class="row"><span class="price">${money(p[2])}</span><button class="add" onclick="add('${p[0]}')">Add +</button><button class="order" onclick="orderProduct('${p[0]}')">Order</button></div></div></article>`).join("")||"<p>No products found.</p>";
}
function setFilter(f){filter=f;document.querySelectorAll("#filters button").forEach(b=>b.classList.toggle("active",b.textContent===f));render();document.getElementById("shop").scrollIntoView({behavior:"smooth"})}
function add(name){const p=products.find(x=>x[0]===name);bag.push(p);update();toast("Added to your bag")}
function remove(i){bag.splice(i,1);update()}
function update(){
 document.getElementById("count").textContent=bag.length;
 document.getElementById("items").innerHTML=bag.length?bag.map((p,i)=>`<div class="item"><span>${p[0]}<br><small>${money(p[2])}</small></span><button onclick="remove(${i})">Remove</button></div>`).join(""):"<p>Your bag is empty.</p>";
 document.getElementById("total").textContent=money(bag.reduce((a,p)=>a+p[2],0));
}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("shade").classList.add("show")}
function closeCart(){document.getElementById("cart").classList.remove("open");document.getElementById("shade").classList.remove("show")}
function orderProduct(name){
 const p=products.find(x=>x[0]===name); if(!p)return;
 const msg=`Hi VELORA! I want to order this product.\n\nProduct: ${p[0]}\nCategory: ${p[1]}\nPrice: ${money(p[2])}\n\nName:\nPhone:\nCity:\nComplete address:`;
 window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(msg),"_blank");
}
function checkout(){
 if(!bag.length){toast("Add a product first");return}
 const lines=bag.map(p=>`• ${p[0]} — ${money(p[2])}`).join("\n");
 const total=bag.reduce((a,p)=>a+p[2],0);
 const msg=`Hi VELORA! I want to place an order.\n\n${lines}\n\nTotal: ${money(total)}\n\nName:\nPhone:\nCity:\nComplete address:`;
 window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+encodeURIComponent(msg),"_blank");
}
function focusSearch(){document.getElementById("search").focus();document.getElementById("shop").scrollIntoView({behavior:"smooth"})}
function join(e){e.preventDefault();toast("You're on the VELORA list ✦");e.target.reset()}
let t;function toast(s){const x=document.getElementById("toast");x.textContent=s;x.classList.add("showtoast");clearTimeout(t);t=setTimeout(()=>x.classList.remove("showtoast"),1800)}
render();update();
