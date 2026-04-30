// ---- GLOBAL STATE ----
let stats = [];
let services = [];
let infra = [];
let industries = [];
let articles = [];
let footerLinks = [];
let clients = [];
let hazardousWaste = [];
let nonHazardousWaste = [];

const API_BASE = 'http://localhost:3000/api';

// ---- HELPERS ----
function cleanPath(path) {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.includes('uploads/')) {
        return `http://localhost:3000/uploads/${path.split('uploads/')[1]}`;
    }
    // If it starts with images/, go up one level because admin is in a subfolder
    if (path.startsWith('images/')) {
        return '../' + path;
    }
    return path;
}

const parseSafe = (data) => {
    if (!data) return [];
    let parsed = data;
    while (typeof parsed === 'string') {
        try {
            let next = JSON.parse(parsed);
            if (next === parsed) break;
            parsed = next;
        } catch(e) { break; }
    }
    if (Array.isArray(parsed)) {
        return parsed.map(item => {
            while (typeof item === 'string') {
                try {
                    let next = JSON.parse(item);
                    if (next === item) break;
                    item = next;
                } catch(e) { break; }
            }
            return item;
        });
    }
    return parsed;
};

// ---- AUTH ----
document.addEventListener('DOMContentLoaded', checkSession);

async function checkSession(){
  const user = localStorage.getItem('gg_admin');
  if(user) {
    showPanel();
    await initAdmin();
  }
}

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  const u = document.getElementById('loginUser').value;
  const p = document.getElementById('loginPass').value;
  if(u === 'admin' && p === 'admin123'){
    localStorage.setItem('gg_admin', 'true');
    showPanel();
    initAdmin();
  } else {
    document.getElementById('loginError').style.display='block';
  }
});

function showPanel(){
  document.getElementById('loginScreen').style.display='none';
  document.getElementById('adminPanel').style.display='flex';
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('gg_admin');
  location.reload();
});

// ---- NAVIGATION ----
const navItems = document.querySelectorAll('.nav-item[data-section]');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const section = item.getAttribute('data-section');
    goTo(section);
  });
});

function goTo(sectionId){
  document.querySelectorAll('.panel-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  const target = document.getElementById('section-' + sectionId);
  const nav = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
  if(target) target.classList.add('active');
  if(nav) nav.classList.add('active');
  
  document.getElementById('pageTitle').innerText = sectionId.charAt(0).toUpperCase() + sectionId.slice(1) + ' Editor';
}

// Sidebar Toggle
document.getElementById('sidebarToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
});

// ---- WASTE MANAGEMENT RENDERING ----
function renderHazardous() {
    renderWasteSection('hazardousContainer', hazardousWaste, 'hazardous');
}

function renderNonHazardous() {
    renderWasteSection('nonhazardousContainer', nonHazardousWaste, 'nonhazardous');
}

function renderWasteSection(containerId, dataArray, type) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    const arrName = type === 'hazardous' ? 'hazardousWaste' : 'nonHazardousWaste';
    
    dataArray.forEach((item, idx) => {
        if (!item.detail) item.detail = {};
        const d = item.detail;
        const card = document.createElement('div');
        card.className = 'editor-card';
        card.innerHTML = `
            <div class="editor-card-header">
                <span class="editor-card-title">${item.industry || 'New Industry'}</span>
                <div style="display:flex; gap:8px;">
                    <button class="btn-add" onclick="toggleDetail('${type}_detail_${idx}')" style="padding:5px 12px; font-size:12px;"><i class="fa-solid fa-file-pen"></i> Edit Detail Page</button>
                    <button class="btn-remove" onclick="removeWasteItem('${type}', ${idx})"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>

            <!-- Card Fields (shown on listing page) -->
            <div class="form-grid">
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" value="${item.industry || ''}" oninput="${arrName}[${idx}].industry=this.value">
                </div>
                <div class="form-group">
                    <label>Subtitle</label>
                    <input type="text" value="${item.subtitle || ''}" placeholder="e.g. Textile Waste" oninput="${arrName}[${idx}].subtitle=this.value">
                </div>
                <div class="form-group full">
                    <label>Card Image</label>
                    <div style="display:flex; gap:10px; align-items:center;">
                        <img src="${cleanPath(item.img)}" style="width:80px; height:55px; object-fit:cover; border-radius:6px; background:#fff; border:1px solid var(--border);">
                        <div style="display:flex; flex:1; gap:5px;">
                            <input type="text" id="${type}_ind_img_${idx}" value="${item.img || ''}" oninput="${arrName}[${idx}].img=this.value; render${type === 'hazardous' ? 'Hazardous' : 'NonHazardous'}()" style="flex:1">
                            <input type="file" id="file_${type}_ind_img_${idx}" style="display:none" onchange="uploadWasteImage('${type}', ${idx})">
                            <button type="button" class="btn-add" onclick="document.getElementById('file_${type}_ind_img_${idx}').click()"><i class="fa-solid fa-upload"></i></button>
                        </div>
                    </div>
                </div>
                <div class="form-group full">
                    <label>Highlight Text <small style="color:var(--text2)">(green bold line)</small></label>
                    <input type="text" value="${item.highlight || ''}" placeholder="e.g. Industry Challenge: Obsolete technology..." oninput="${arrName}[${idx}].highlight=this.value">
                </div>
                <div class="form-group full">
                    <label>Description</label>
                    <textarea rows="2" oninput="${arrName}[${idx}].desc=this.value" placeholder="Card description...">${item.desc || ''}</textarea>
                </div>
                <div class="form-group">
                    <label>Icon <small style="color:var(--text2)">(FontAwesome)</small></label>
                    <div style="display:flex; gap:10px; align-items:center;">
                        <div style="width:35px; height:35px; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; border-radius:6px; font-size:16px;"><i class="${item.icon || 'fa-solid fa-industry'}"></i></div>
                        <input type="text" value="${item.icon || ''}" placeholder="fa-solid fa-shirt" oninput="${arrName}[${idx}].icon=this.value; render${type === 'hazardous' ? 'Hazardous' : 'NonHazardous'}()" style="flex:1">
                    </div>
                </div>
            </div>

            <!-- Detail Page Editor (hidden by default) -->
            <div id="${type}_detail_${idx}" style="display:none; margin-top:15px; padding:20px; background:var(--bg2); border-radius:10px; border:1px dashed var(--primary);">
                <h4 style="margin-bottom:15px; color:var(--primary);"><i class="fa-solid fa-file-pen"></i> Detail Page Content (Learn More Page)</h4>
                
                <div class="form-grid">
                    <div class="form-group full">
                        <label>Page Title <small style="color:var(--text2)">(banner heading)</small></label>
                        <input type="text" value="${d.page_title || ''}" placeholder="e.g. Dye & Intermediates Manufacturing" oninput="${arrName}[${idx}].detail.page_title=this.value">
                    </div>

                    <div class="form-group full" style="margin-top:10px;">
                        <label style="font-weight:700; font-size:14px;">🖼️ Hero Section</label>
                    </div>
                    <div class="form-group full">
                        <label>Hero Image <small style="color:var(--text2)">(uses card image if empty)</small></label>
                        <div style="display:flex; gap:5px;">
                            <input type="text" id="${type}_detail_img_${idx}" value="${d.hero_img || ''}" placeholder="Leave empty to use card image" oninput="${arrName}[${idx}].detail.hero_img=this.value" style="flex:1">
                            <input type="file" id="file_${type}_detail_img_${idx}" style="display:none" onchange="uploadDetailImage('${type}', ${idx})">
                            <button type="button" class="btn-add" onclick="document.getElementById('file_${type}_detail_img_${idx}').click()"><i class="fa-solid fa-upload"></i></button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Hero Subtitle</label>
                        <input type="text" value="${d.hero_subtitle || ''}" placeholder="e.g. Process Safety" oninput="${arrName}[${idx}].detail.hero_subtitle=this.value">
                    </div>
                    <div class="form-group">
                        <label>Hero Title</label>
                        <input type="text" value="${d.hero_title || ''}" placeholder="e.g. Controlling Pigment Runoff" oninput="${arrName}[${idx}].detail.hero_title=this.value">
                    </div>
                    <div class="form-group full">
                        <label>Hero Description</label>
                        <textarea rows="3" oninput="${arrName}[${idx}].detail.hero_desc=this.value" placeholder="Detailed hero description...">${d.hero_desc || ''}</textarea>
                    </div>

                    <div class="form-group full" style="margin-top:10px;">
                        <label style="font-weight:700; font-size:14px;">📦 Waste Categories (mini cards)</label>
                    </div>
                    <div class="form-group full">
                        <label>Categories Heading</label>
                        <input type="text" value="${d.categories_heading || ''}" placeholder="e.g. Waste Categories in Dye Production" oninput="${arrName}[${idx}].detail.categories_heading=this.value">
                    </div>
                    <div class="form-group full" id="${type}_cats_${idx}">
                        ${(d.categories || []).map((cat, cIdx) => `
                            <div style="display:flex; gap:8px; margin-bottom:8px; align-items:center; background:var(--bg1); padding:10px; border-radius:8px;">
                                <input type="text" value="${cat.icon || ''}" placeholder="Icon class" oninput="${arrName}[${idx}].detail.categories[${cIdx}].icon=this.value" style="width:140px;">
                                <input type="text" value="${cat.title || ''}" placeholder="Title" oninput="${arrName}[${idx}].detail.categories[${cIdx}].title=this.value" style="flex:1;">
                                <input type="text" value="${cat.desc || ''}" placeholder="Description" oninput="${arrName}[${idx}].detail.categories[${cIdx}].desc=this.value" style="flex:2;">
                                <button class="btn-remove" onclick="removeDetailCat('${type}', ${idx}, ${cIdx})" style="padding:5px;"><i class="fa-solid fa-times"></i></button>
                            </div>
                        `).join('')}
                    </div>
                    <div class="form-group full">
                        <button class="btn-add" onclick="addDetailCat('${type}', ${idx})" style="font-size:12px; padding:5px 10px;"><i class="fa-solid fa-plus"></i> Add Category</button>
                    </div>

                    <div class="form-group full" style="margin-top:10px;">
                        <label style="font-weight:700; font-size:14px;">📢 Call to Action</label>
                    </div>
                    <div class="form-group">
                        <label>CTA Heading</label>
                        <input type="text" value="${d.cta_heading || ''}" placeholder="e.g. Environmental Protection" oninput="${arrName}[${idx}].detail.cta_heading=this.value">
                    </div>
                    <div class="form-group full">
                        <label>CTA Description</label>
                        <textarea rows="2" oninput="${arrName}[${idx}].detail.cta_desc=this.value" placeholder="CTA paragraph...">${d.cta_desc || ''}</textarea>
                    </div>
                    <div class="form-group">
                        <label>Button Text</label>
                        <input type="text" value="${d.cta_btn_text || ''}" placeholder="Request Consultation" oninput="${arrName}[${idx}].detail.cta_btn_text=this.value">
                    </div>
                    <div class="form-group">
                        <label>Button Link</label>
                        <input type="text" value="${d.cta_btn_link || ''}" placeholder="contact.html" oninput="${arrName}[${idx}].detail.cta_btn_link=this.value">
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function toggleDetail(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

function addDetailCat(type, idx) {
    const arr = type === 'hazardous' ? hazardousWaste : nonHazardousWaste;
    if (!arr[idx].detail) arr[idx].detail = {};
    if (!arr[idx].detail.categories) arr[idx].detail.categories = [];
    arr[idx].detail.categories.push({ icon: 'fa-solid fa-flask', title: '', desc: '' });
    renderWasteSection(type + 'Container', arr, type);
}

function removeDetailCat(type, idx, cIdx) {
    const arr = type === 'hazardous' ? hazardousWaste : nonHazardousWaste;
    arr[idx].detail.categories.splice(cIdx, 1);
    renderWasteSection(type + 'Container', arr, type);
}

async function uploadDetailImage(type, idx) {
    const fileInput = document.getElementById(`file_${type}_detail_img_${idx}`);
    if (!fileInput.files[0]) return;
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    showToast('Uploading...', 'info');
    try {
        const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData });
        const data = await res.json();
        const arr = type === 'hazardous' ? hazardousWaste : nonHazardousWaste;
        arr[idx].detail.hero_img = data.filename ? `uploads/${data.filename}` : data.url;
        document.getElementById(`${type}_detail_img_${idx}`).value = arr[idx].detail.hero_img;
        showToast('Uploaded!');
    } catch (e) { showToast('Upload failed', 'error'); }
}

function addHazardous() {
    hazardousWaste.push({ industry: '', subtitle: '', img: '', highlight: '', desc: '', link: '', icon: 'fa-solid fa-industry', detail: {} });
    renderHazardous();
}

function addNonHazardous() {
    nonHazardousWaste.push({ industry: '', subtitle: '', img: '', highlight: '', desc: '', link: '', icon: 'fa-solid fa-recycle', detail: {} });
    renderNonHazardous();
}

function removeWasteItem(type, idx) {
    if (type === 'hazardous') hazardousWaste.splice(idx, 1);
    else nonHazardousWaste.splice(idx, 1);
    renderWasteSection(type + 'Container', type === 'hazardous' ? hazardousWaste : nonHazardousWaste, type);
}

async function uploadWasteImage(type, idx) {
    const fileInput = document.getElementById(`file_${type}_ind_img_${idx}`);
    if (!fileInput.files[0]) return;
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    showToast('Uploading...', 'info');
    try {
        const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData });
        const data = await res.json();
        const arr = type === 'hazardous' ? hazardousWaste : nonHazardousWaste;
        arr[idx].img = data.filename ? `uploads/${data.filename}` : data.url;
        renderWasteSection(type + 'Container', arr, type);
        showToast('Uploaded!');
    } catch (e) { showToast('Upload failed', 'error'); }
}

// ---- DATA LOADING ----
async function initAdmin(){
  renderStats();
  renderServices();
  renderInfra();
  renderIndustries();
  renderArticles();
  renderClients();
  renderFooterLinks();
  renderHazardous();
  renderNonHazardous();
  await loadSavedData();
}

async function loadSavedData(){
  try {
    const res = await fetch(`${API_BASE}/all-settings?t=${Date.now()}`);
    let all = await res.json();
    while (typeof all === 'string') { try { all = JSON.parse(all); } catch(e) { break; } }

    if(all.gg_hero){
        let h = all.gg_hero;
        if (typeof h === 'string') try { h = JSON.parse(h); } catch(e) {}
        document.getElementById('hero_badge').value = h.badge || '';
        document.getElementById('hero_title').value = h.title || '';
        document.getElementById('hero_desc').value  = h.desc || '';
        document.getElementById('hero_btn1_text').value = h.btn1_text || '';
        document.getElementById('hero_btn1_link').value = h.btn1_link || '';
        document.getElementById('hero_btn2_text').value = h.btn2_text || '';
        document.getElementById('hero_btn2_link').value = h.btn2_link || '';
    }
    
    if(all.gg_stats) { stats = parseSafe(all.gg_stats); renderStats(); }
    if(all.gg_services) { services = parseSafe(all.gg_services); renderServices(); }
    if(all.gg_infra) { infra = parseSafe(all.gg_infra); renderInfra(); }
    if(all.gg_industries) { industries = parseSafe(all.gg_industries); renderIndustries(); }
    if(all.gg_articles) { articles = parseSafe(all.gg_articles); renderArticles(); }
    if(all.gg_clients) { clients = parseSafe(all.gg_clients); renderClients(); }
    if(all.gg_hazardous) { hazardousWaste = parseSafe(all.gg_hazardous); renderHazardous(); }
    if(all.gg_nonhazardous) { nonHazardousWaste = parseSafe(all.gg_nonhazardous); renderNonHazardous(); }
    
    if(all.gg_contact){
        let c = parseSafe(all.gg_contact);
        document.getElementById('con_phone').value = c.phone || '';
        document.getElementById('con_email').value = c.email || '';
        document.getElementById('con_corp_addr').value = c.corp_addr || '';
        document.getElementById('con_fact_addr').value = c.fact_addr || '';
        document.getElementById('con_fb').value = c.fb || '';
        document.getElementById('con_tw').value = c.tw || '';
        document.getElementById('con_li').value = c.li || '';
    }
    
    if(all.gg_footer){
        let f = parseSafe(all.gg_footer);
        document.getElementById('foot_tagline').value = f.tagline || '';
        document.getElementById('foot_copy').value = f.copy || '';
        footerLinks = f.links || [];
        renderFooterLinks();
    }
  } catch(e) { console.error('Load failed', e); }
}

function renderInfra(){
    const container = document.getElementById('infraContainer');
    if(!container) return;
    container.innerHTML = '';
    infra.forEach((s, idx) => {
        container.innerHTML += `
            <div class="editor-card">
                <div class="form-grid">
                    <div class="form-group full"><label>Title</label><input type="text" value="${s.title}" oninput="infra[${idx}].title=this.value"></div>
                    <div class="form-group full"><label>Desc</label><input type="text" value="${s.desc}" oninput="infra[${idx}].desc=this.value"></div>
                </div>
                <button class="btn-remove" onclick="infra.splice(${idx},1);renderInfra()"><i class="fa-solid fa-trash"></i> Remove</button>
            </div>`;
    });
}

function renderIndustries(){
    const container = document.getElementById('industriesContainer');
    if(!container) return;
    container.innerHTML = '';
    industries.forEach((s, idx) => {
        container.innerHTML += `
            <div class="editor-card">
                <div class="form-grid">
                    <div class="form-group full"><label>Title</label><input type="text" value="${s.title}" oninput="industries[${idx}].title=this.value"></div>
                    <div class="form-group full"><label>Desc</label><input type="text" value="${s.desc}" oninput="industries[${idx}].desc=this.value"></div>
                    <div class="form-group"><label>Icon (FontAwesome)</label><input type="text" value="${s.icon}" oninput="industries[${idx}].icon=this.value"></div>
                </div>
                <button class="btn-remove" onclick="industries.splice(${idx},1);renderIndustries()"><i class="fa-solid fa-trash"></i> Remove</button>
            </div>`;
    });
}

function renderFooterLinks(){
    const container = document.getElementById('footerLinksContainer');
    if(!container) return;
    container.innerHTML = '';
    footerLinks.forEach((l, idx) => {
        container.innerHTML += `
            <div class="editor-card">
                <div class="form-grid">
                    <div class="form-group"><label>Link Text</label><input type="text" value="${l.text}" oninput="footerLinks[${idx}].text=this.value"></div>
                    <div class="form-group"><label>Link URL</label><input type="text" value="${l.url}" oninput="footerLinks[${idx}].url=this.value"></div>
                </div>
                <button class="btn-remove" onclick="footerLinks.splice(${idx},1);renderFooterLinks()"><i class="fa-solid fa-trash"></i> Remove</button>
            </div>`;
    });
}

function addStat() { stats.push({num:'', lbl:''}); renderStats(); }
function addService() { services.push({title:'', desc:'', icon:''}); renderServices(); }
function addInfra() { infra.push({title:'', desc:''}); renderInfra(); }
function addIndustry() { industries.push({title:'', desc:'', icon:''}); renderIndustries(); }
function addArticle() { articles.push({title:'', date:'', img:'', content:'', tag:''}); renderArticles(); }
function addClient() { clients.push({img:''}); renderClients(); }
function addFooterLink() { footerLinks.push({text:'', url:''}); renderFooterLinks(); }

function renderStats(){
    const container = document.getElementById('statsContainer');
    if(!container) return;
    container.innerHTML = '';
    stats.forEach((s, idx) => {
        container.innerHTML += `
            <div class="editor-card">
                <div class="form-grid">
                    <div class="form-group"><label>Number</label><input type="text" value="${s.num}" oninput="stats[${idx}].num=this.value"></div>
                    <div class="form-group"><label>Label</label><input type="text" value="${s.lbl}" oninput="stats[${idx}].lbl=this.value"></div>
                </div>
                <button class="btn-remove" onclick="stats.splice(${idx},1);renderStats()"><i class="fa-solid fa-trash"></i> Remove</button>
            </div>`;
    });
}

function renderServices(){
    const container = document.getElementById('servicesContainer');
    if(!container) return;
    container.innerHTML = '';
    services.forEach((s, idx) => {
        container.innerHTML += `
            <div class="editor-card">
                <div class="form-grid">
                    <div class="form-group full"><label>Title</label><input type="text" value="${s.title}" oninput="services[${idx}].title=this.value"></div>
                    <div class="form-group full"><label>Desc</label><input type="text" value="${s.desc}" oninput="services[${idx}].desc=this.value"></div>
                    <div class="form-group"><label>Icon (FontAwesome)</label><input type="text" value="${s.icon}" oninput="services[${idx}].icon=this.value"></div>
                </div>
                <button class="btn-remove" onclick="services.splice(${idx},1);renderServices()"><i class="fa-solid fa-trash"></i> Remove</button>
            </div>`;
    });
}

// ... more renderers ...
function renderArticles(){
    const container = document.getElementById('articlesContainer');
    if(!container) return;
    container.innerHTML = '';
    articles.forEach((a, idx) => {
        container.innerHTML += `
            <div class="editor-card">
                <div class="editor-card-header">
                    <span class="editor-card-title">${a.title || 'New Article'}</span>
                    <div style="display:flex;gap:5px;">
                        <button class="btn-add" onclick="openArticleEditor(${idx})" style="padding:5px 10px; font-size:12px;"><i class="fa-solid fa-edit"></i> Edit Content</button>
                        <button class="btn-remove" onclick="articles.splice(${idx},1);renderArticles()"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
                <div class="form-grid">
                    <div class="form-group full"><label>Title</label><input type="text" value="${a.title}" oninput="articles[${idx}].title=this.value"></div>
                    <div class="form-group"><label>Date</label><input type="text" value="${a.date}" oninput="articles[${idx}].date=this.value"></div>
                    <div class="form-group">
                        <label>Image</label>
                        <div style="display:flex; gap:10px; align-items:center;">
                            <img src="${cleanPath(a.img)}" style="width:40px; height:40px; object-fit:cover; border-radius:4px; background:#fff; border:1px solid var(--border);">
                            <div style="display:flex; flex:1; gap:5px;">
                                <input type="text" id="art_img_${idx}" value="${a.img}" oninput="articles[${idx}].img=this.value; renderArticles()">
                                <input type="file" id="file_art_img_${idx}" style="display:none" onchange="uploadImage('art_img_${idx}', ${idx}, 'article')">
                                <button type="button" class="btn-add" onclick="document.getElementById('file_art_img_${idx}').click()"><i class="fa-solid fa-upload"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    });
}

function renderClients(){
    const container = document.getElementById('clientsContainer');
    if(!container) return;
    container.innerHTML = '';
    clients.forEach((c, idx) => {
        container.innerHTML += `
            <div class="client-edit-card">
                <img src="${cleanPath(c.img)}" style="width:100%;height:80px;object-fit:contain;margin-bottom:10px;background:#fff;border-radius:4px;">
                <div style="display:flex;gap:5px;">
                    <input type="file" id="file_cli_${idx}" style="display:none" onchange="uploadImage('cli_img_${idx}', ${idx}, 'client')">
                    <button class="btn-add" style="flex:1" onclick="document.getElementById('file_cli_${idx}').click()"><i class="fa-solid fa-image"></i></button>
                    <button class="btn-remove" onclick="clients.splice(${idx},1);renderClients()"><i class="fa-solid fa-trash"></i></button>
                </div>
                <input type="hidden" id="cli_img_${idx}" value="${c.img}">
            </div>`;
    });
}

async function uploadImage(id, idx, type) {
    const fileInput = document.getElementById('file_' + id.replace('img_', ''));
    if (!fileInput || !fileInput.files[0]) return;
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    showToast('Uploading...', 'info');
    try {
        const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData });
        const data = await res.json();
        const url = data.filename ? `uploads/${data.filename}` : data.url;
        if(type==='article') articles[idx].img = url;
        if(type==='client') clients[idx].img = url;
        document.getElementById(id).value = url;
        if(type==='article') renderArticles();
        if(type==='client') renderClients();
        showToast('Uploaded!');
    } catch (e) { showToast('Upload failed', 'error'); }
}

// ---- DATABASE ACTIONS ----
async function saveToDB(id, content) {
    showToast('Saving...', 'info');
    try {
        const res = await fetch(`${API_BASE}/settings/${id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(content)
        });
        if (res.ok) showToast('Saved successfully!');
        else showToast('Save failed', 'error');
    } catch (e) { showToast('Save failed', 'error'); }
}

document.getElementById('saveAllBtn').addEventListener('click', async () => {
    await saveToDB('gg_hero', {
        badge: document.getElementById('hero_badge').value,
        title: document.getElementById('hero_title').value,
        desc: document.getElementById('hero_desc').value,
        btn1_text: document.getElementById('hero_btn1_text').value,
        btn1_link: document.getElementById('hero_btn1_link').value,
        btn2_text: document.getElementById('hero_btn2_text').value,
        btn2_link: document.getElementById('hero_btn2_link').value
    });
    await saveToDB('gg_stats', stats);
    await saveToDB('gg_services', services);
    await saveToDB('gg_infra', infra);
    await saveToDB('gg_industries', industries);
    await saveToDB('gg_articles', articles);
    await saveToDB('gg_clients', clients);
    await saveToDB('gg_hazardous', hazardousWaste);
    await saveToDB('gg_nonhazardous', nonHazardousWaste);
    await saveToDB('gg_contact', {
        phone: document.getElementById('con_phone').value,
        email: document.getElementById('con_email').value,
        corp_addr: document.getElementById('con_corp_addr').value,
        fact_addr: document.getElementById('con_fact_addr').value,
        fb: document.getElementById('con_fb').value,
        tw: document.getElementById('con_tw').value,
        li: document.getElementById('con_li').value
    });
    await saveToDB('gg_footer', {
        tagline: document.getElementById('foot_tagline').value,
        copy: document.getElementById('foot_copy').value,
        links: footerLinks
    });
});

function showToast(msg, type = 'success') {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.className = 'toast show ' + type;
    setTimeout(() => { toast.className = 'toast'; }, 3000);
}
