document.addEventListener('DOMContentLoaded', () => {
    // Add sticky header behavior
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            header.style.padding = '15px 0';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
            header.style.padding = '20px 0';
        }
    });

    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            }
        });
    });

    // ---- DATA SYNC FROM API ----
    const API_BASE = 'http://localhost:3000/api';

    async function loadWebsiteData() {
        try {
            const res = await fetch(`http://localhost:3000/api/all-settings?t=${Date.now()}`);
            const all = await res.json();

            const parseSafe = (data) => {
                if (!data) return null;
                let parsed = data;
                while (typeof parsed === 'string') {
                    try {
                        let next = JSON.parse(parsed);
                        if (next === parsed) break;
                        parsed = next;
                    } catch(e) { break; }
                }
                return parsed;
            };
            
            // Clean Path Helper for Website
            const fixPath = (p) => {
                if(!p) return '';
                // If it's an upload, load it from the backend server
                if(p.startsWith('uploads/')) return 'http://localhost:3000/' + p;
                
                // If it's a local image, make sure it's relative
                if(p.startsWith('/')) p = p.substring(1);
                return p;
            };

            // Hero Section
            if(all.gg_hero && document.querySelector('.hero-content')) {
                const hero = all.gg_hero;
                const hc = document.querySelector('.hero-content');
                if(hc.querySelector('.hero-subtitle')) hc.querySelector('.hero-subtitle').textContent = hero.badge;
                if(hc.querySelector('.hero-title')) hc.querySelector('.hero-title').textContent = hero.title;
                if(hc.querySelector('.hero-desc')) hc.querySelector('.hero-desc').textContent = hero.desc;
                
                const heroImg = document.querySelector('.hero-image img');
                if(heroImg && hero.img) heroImg.src = fixPath(hero.img);

                const btns = hc.querySelectorAll('.btn');
                if(btns.length > 0) {
                    btns[0].textContent = hero.btn1_text;
                    btns[0].href = hero.btn1_link;
                }
                if(btns.length > 1) {
                    btns[1].textContent = hero.btn2_text;
                    btns[1].href = hero.btn2_link;
                }
            }
            
            // Stats Bar
            if(all.gg_stats && document.querySelector('.stats-bar .container')) {
                const statsCont = document.querySelector('.stats-bar .container');
                statsCont.innerHTML = '';
                all.gg_stats.forEach(s => {
                    statsCont.innerHTML += `
                    <div class="stat-item">
                        <span class="stat-number">${s.num}</span>
                        <span class="stat-label">${s.label}</span>
                    </div>`;
                });
            }
            
            // Services
            if(all.gg_services && document.getElementById('servicesContainer')) {
                const sc = document.getElementById('servicesContainer');
                sc.innerHTML = '';
                all.gg_services.forEach(s => {
                    sc.innerHTML += `
                    <div class="service-card">
                        <div class="service-img">
                            <img src="${fixPath(s.img)}" alt="${s.title}">
                        </div>
                        <h4>${s.title}</h4>
                        <p>${s.desc}</p>
                    </div>`;
                });
            }

            // Infrastructure
            if(all.gg_infra && document.getElementById('infraGrid')) {
                const ig = document.getElementById('infraGrid');
                ig.innerHTML = '';
                all.gg_infra.forEach(inf => {
                    ig.innerHTML += `
                    <div class="infra-card">
                        <img src="${fixPath(inf.img)}" alt="${inf.title}">
                        <div class="infra-overlay">
                            <h3>${inf.title}</h3>
                        </div>
                    </div>`;
                });
            }

            // Industries
            if(all.gg_industries && document.getElementById('industriesGrid')) {
                const indg = document.getElementById('industriesGrid');
                indg.innerHTML = '';
                all.gg_industries.forEach(ind => {
                    indg.innerHTML += `
                    <div class="industry-card">
                        <div class="industry-img">
                            <img src="${fixPath(ind.img)}" alt="${ind.title}">
                        </div>
                        <div class="industry-info">
                            <h4>${ind.title}</h4>
                            <p>${ind.desc}</p>
                        </div>
                    </div>`;
                });
            }

            // Articles
            const articlesGrid = document.getElementById('latestArticlesGrid');
            const articlesData = parseSafe(all.gg_articles);
            if(articlesData && articlesGrid) {
                articlesGrid.innerHTML = '';
                articlesData.forEach(a => {
                    articlesGrid.innerHTML += `
                    <a href="article.html?id=${a.id}" class="article-card-link">
                        <div class="service-card" style="padding-bottom: 20px; box-shadow: none;">
                            <div class="service-img">
                                <img src="${fixPath(a.img)}" alt="${a.title}" onerror="this.src='images/Sustainability Transformation.jpeg'">
                            </div>
                            <div style="padding: 20px 20px 0 20px;">
                                <h4 style="margin-bottom: 10px; font-size: 17px; line-height: 1.4;">${a.title}</h4>
                                <p style="color: var(--primary-green) !important; font-size: 14px; font-weight: 600; margin: 0;">${a.date}</p>
                            </div>
                        </div>
                    </a>`;
                });
            }

            // Hazardous Waste Table
            const hazData = parseSafe(all.gg_hazardous);
            if(hazData && document.getElementById('hazardousTableBody')) {
                const htb = document.getElementById('hazardousTableBody');
                htb.innerHTML = '';
                hazData.forEach(item => {
                    htb.innerHTML += `
                        <tr>
                            <td>
                                <div class="industry-td"><img src="${fixPath(item.img)}" class="table-industry-img"> ${item.industry}</div>
                            </td>
                            <td>
                                <div class="waste-type-td">
                                    ${(item.waste_types || []).map(wt => `
                                        <div class="waste-tag"><span>${wt.name}</span> <img src="${fixPath(wt.img)}" class="waste-item-img"></div>
                                    `).join('')}
                                </div>
                            </td>
                        </tr>
                    `;
                });
            }

            // Non-Hazardous Waste Table (on home page)
            if(nonHazData && document.getElementById('nonhazardousTableBody')) {
                const nhtb = document.getElementById('nonhazardousTableBody');
                nhtb.innerHTML = '';
                nonHazData.forEach(item => {
                    nhtb.innerHTML += `
                        <tr>
                            <td>
                                <div class="industry-td"><img src="${fixPath(item.img)}" class="table-industry-img"> ${item.industry}</div>
                            </td>
                            <td>
                                <div class="waste-type-td">
                                    ${(item.waste_types || []).map(wt => `
                                        <div class="waste-tag"><span>${wt.name}</span> <img src="${fixPath(wt.img)}" class="waste-item-img"></div>
                                    `).join('')}
                                </div>
                            </td>
                        </tr>
                    `;
                });
            }

            // Hazardous Waste Cards (on hazardous-waste.html)
            const hazCards = document.getElementById('hazardousCards');
            if(hazData && hazCards) {
                console.log("Rendering Hazardous Cards:", hazData.length);
                hazCards.innerHTML = '';
                hazData.forEach((item, idx) => {
                    const detailLink = `industry-detail.html?type=hazardous&idx=${idx}`;
                    hazCards.innerHTML += `
                        <div class="bakebun-card">
                            <div class="bakebun-header">
                                <div class="bakebun-icon"><i class="${item.icon || 'fa-solid fa-industry'}"></i></div>
                                <div class="bakebun-title-group" style="text-align:left;">
                                    <h3>${item.industry}</h3>
                                    <p>${item.subtitle || item.industry + ' Waste'}</p>
                                </div>
                            </div>
                            <div class="bakebun-img"><img src="${fixPath(item.img)}" alt="${item.industry}"></div>
                            <div class="bakebun-body" style="text-align:left;">
                                ${item.highlight ? `<p style="font-weight: 600; color:var(--primary-green); margin-bottom:5px;">${item.highlight}</p>` : ''}
                                ${item.desc ? `<p>${item.desc}</p>` : ''}
                            </div>
                            <a href="${detailLink}" class="bakebun-btn">Learn more</a>
                        </div>
                    `;
                });
            }

            // Non-Hazardous Waste Cards (on non-hazardous-waste.html)
            const nhCards = document.getElementById('nonhazardousCards');
            if(nonHazData && nhCards) {
                console.log("Rendering Non-Hazardous Cards:", nonHazData.length);
                nhCards.innerHTML = '';
                nonHazData.forEach((item, idx) => {
                    const detailLink = `industry-detail.html?type=nonhazardous&idx=${idx}`;
                    nhCards.innerHTML += `
                        <div class="bakebun-card">
                            <div class="bakebun-header">
                                <div class="bakebun-icon"><i class="${item.icon || 'fa-solid fa-recycle'}"></i></div>
                                <div class="bakebun-title-group" style="text-align:left;">
                                    <h3>${item.industry}</h3>
                                    <p>${item.subtitle || item.industry + ' Resource'}</p>
                                </div>
                            </div>
                            <div class="bakebun-img"><img src="${fixPath(item.img)}" alt="${item.industry}"></div>
                            <div class="bakebun-body" style="text-align:left;">
                                ${item.highlight ? `<p style="font-weight: 600; color:var(--primary-green); margin-bottom:5px;">${item.highlight}</p>` : ''}
                                ${item.desc ? `<p>${item.desc}</p>` : ''}
                            </div>
                            <a href="${detailLink}" class="bakebun-btn">Learn more</a>
                        </div>
                    `;
                });
            }
        } catch(e) {
            console.error('Backend data load failed', e);
        }
    }

    loadWebsiteData();
});
