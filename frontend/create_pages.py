import os

template_top = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Go Green Eco Tech</title>
    <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="top-bar">
        <div class="container d-flex justify-content-between">
            <div class="top-bar-contact">
                <span class="contact-item"><i class="fa-solid fa-phone"></i> +91 9112220077 / +91 95458 03999</span>
            </div>
            <div class="top-bar-socials">
                <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i class="fa-brands fa-twitter"></i></a>
                <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
            </div>
        </div>
    </div>
    <header class="header">
        <div class="container d-flex justify-content-between align-items-center">
            <a href="index.html" class="logo">
                <img src="images/Go-Green-Eco-logo (1).png" alt="Go Green Eco Tech Logo">
            </a>
            <div class="header-right d-flex align-items-center" style="gap: 20px;">
                <div class="mobile-toggle" id="mobile-toggle">
                    <i class="fa-solid fa-bars"></i>
                </div>
                <nav class="nav-menu">
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="about.html" class="{about_active}">About Us</a></li>
                        <li>
                            <a href="services.html" class="{services_active}">Services <i class="fa-solid fa-chevron-down nav-chevron"></i></a>
                            <ul class="dropdown">
                                <li><a href="hazardous-waste.html">Hazardous Waste</a></li>
                                <li><a href="non-hazardous-waste.html">Non Hazardous Waste</a></li>
                            </ul>
                        </li>
                        <li><a href="industries.html" class="{industries_active}">Industries</a></li>
                        <li><a href="process.html" class="{process_active}">Our Process</a></li>
                        <li><a href="contact.html" class="{contact_active}">Contact</a></li>
                    </ul>
                </nav>
                <div class="header-action">
                    <a href="contact.html" class="btn btn-primary">Request Pickup</a>
                </div>
            </div>
        </div>
    </header>
    <section class="page-title" style="padding: 100px 0; background-color: var(--dark-green); color: white; text-align: center; background-image: linear-gradient(rgba(10, 52, 21, 0.8), rgba(10, 52, 21, 0.8)), url('images/hero.png'); background-size: cover; background-position: center;">
        <h1 style="color: white; font-size: 56px; margin: 0;">{title}</h1>
    </section>
"""

template_bottom = """
    <footer class="footer">
        <div class="container footer-grid">
            <div class="footer-col branding">
                <a href="index.html" class="logo footer-logo">
                    <img src="images/Go-Green-Eco-logo (1).png" alt="Go Green Eco Tech Logo" style="height: 60px;">
                </a>
                <p>Transforming industrial waste into sustainable resources for a cleaner, greener future.</p>
                <div class="footer-socials mt-3">
                    <a href="#"><i class="fa-brands fa-facebook-f"></i></a>
                    <a href="#"><i class="fa-brands fa-twitter"></i></a>
                    <a href="#"><i class="fa-brands fa-linkedin-in"></i></a>
                </div>
            </div>
            <div class="footer-col">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="industries.html">Industries</a></li>
                    <li><a href="process.html">Our Process</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Services</h3>
                <ul>
                    <li><a href="hazardous-waste.html">Hazardous Waste</a></li>
                    <li><a href="non-hazardous-waste.html">Non Hazardous Waste</a></li>
                    <li><a href="services.html">Transportation</a></li>
                    <li><a href="services.html">Pre Processing</a></li>
                    <li><a href="services.html">Recycling</a></li>
                </ul>
            </div>
            <div class="footer-col contact-info">
                <h3>Contact</h3>
                <p style="margin-bottom: 10px;"><i class="fa-solid fa-building"></i> <strong>Corp Office:</strong> Thane(W)-400 604</p>
                <p style="margin-bottom: 10px;"><i class="fa-solid fa-industry"></i> <strong>Factory:</strong> Boisar 401506, Dist-Palghar</p>
                <p><i class="fa-solid fa-envelope"></i> info@gogreenecotech.in</p>
                <p><i class="fa-solid fa-phone"></i> +91 9112220077</p>
            </div>
        </div>
        <div class="footer-bottom border-top">
            <div class="container d-flex justify-content-between text-small flex-wrap">
                <p>&copy; 2026 Go Green Eco Tech. All Rights Reserved.</p>
                <div class="bottom-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms & Conditions</a>
                </div>
            </div>
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>
"""

pages = {
    "about.html": {
        "title": "About Us",
        "active": "about",
        "content": """
    <section class="about section-padding">
        <div class="container d-flex align-items-center gap-4 flex-wrap">
            <div class="about-image flex-1 position-relative">
                <img src="images/who are we.jpg.jpeg" alt="Industrial Processing" class="rounded-image shadow-main">
                <div class="expert-badge">
                    <div class="badge-icon"><i class="fa-solid fa-award"></i></div>
                    <div class="badge-text" style="text-align: left;">
                        <span class="badge-title">15+ Years</span>
                        <span class="badge-sub">Deep Experience</span>
                    </div>
                </div>
            </div>
            <div class="about-content flex-1">
                <span class="section-subtitle">Our Story</span>
                <h2 class="section-title">Cleaning Up One Facility at a Time</h2>
                <p class="section-desc">Go Green Eco Tech was founded on a simple belief: industrial waste shouldn't be a liability for the planet or your business. With 15 years in the field, we’ve become a trusted partner for factories across India, helping them navigate complex safety and environmental laws with ease.</p>
                <h4 style="margin-bottom: 10px; color: var(--text-dark);">Our Mission</h4>
                <p style="margin-bottom: 20px;">To provide straightforward, legal, and cost effective waste solutions that protect the environment while keeping your business operations running without a hitch.</p>
                <h4 style="margin-bottom: 10px; color: var(--text-dark);">Our Vision</h4>
                <p style="margin-bottom: 20px;">To lead India toward a truly "zero waste" industrial future where every byproduct is captured and reused, creating a cleaner world for the next generation.</p>
                <ul class="about-list">
                    <li><i class="fa-solid fa-earth-americas"></i> <strong>Real Impact</strong> - We focus on methods that actually keep local soil and water safe not just moving the problem somewhere else.</li>
                    <li><i class="fa-solid fa-scale-balanced"></i> <strong>Legal Support</strong> - We handle the paperwork and certifications (ISO 14001, CPCB).</li>
                    <li><i class="fa-solid fa-user-tie"></i> <strong>Hands on Experts</strong> - With 15 years on factory floors, we’ve seen every type of waste challenge and solved them all.</li>
                </ul>
            </div>
        </div>
    </section>
        """
    },
    "process.html": {
        "title": "Our Process",
        "active": "process",
        "content": """
    <section class="section-padding bg-dark">
        <div class="container text-center">
            <span class="section-subtitle">How It Works</span>
            <h2 class="section-title">The Go Green Way</h2>
            <p class="section-desc mb-5" style="max-width: 700px; margin: 0 auto 40px auto;">We’ve refined our workflow over 15 years to make it as simple and transparent for you as possible.</p>
            <div class="services-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                
                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-truck"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Safe Collection</h3>
                            <p>Arrive and segment</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/safe storage.jpeg" alt="Safe Collection"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p>We arrive at your site on time, helping your team segregate and document your waste properly from the start securely.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-microscope"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Technical Sorting</h3>
                            <p>Blend and process</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/Precision Sorting.jpeg" alt="Technical Sorting"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p>We shred, blend, and sort materials at our facility to prepare them for the best possible recycling outcome.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-leaf"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Sustainability</h3>
                            <p>Give second life</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/Sustainability Transformation.jpeg" alt="Sustainability"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p>Finally, your waste is turned back into useful resources, giving it a second life and protecting our planet.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

            </div>
        </div>
    </section>
        """
    },
    "industries.html": {
        "title": "Industries We Serve",
        "active": "industries",
        "content": """
    <section class="section-padding">
        <div class="container text-center">
            <span class="section-subtitle">Our Impact</span>
            <h2 class="section-title">Support Across All Sectors</h2>
            <p class="section-desc mb-5" style="max-width: 700px; margin: 0 auto 40px auto;">We’ve worked with high pressure industries for over a decade, providing the specialized care needed for complex waste streams.</p>
            <div class="services-grid mt-4" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                
                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-flask"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Pharmaceuticals</h3>
                            <p>Clinical waste care</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/Pharmaceuticals.jpeg" alt="Pharmaceuticals"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p>Secure disposal of expired drugs, biomedical materials, and chemical byproducts from clinical manufacturing.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-bong"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Chemical Processing</h3>
                            <p>Acid and active solutions</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/Chemical Processing.jpg.jpeg" alt="Chemical Processing"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p>Expert handling of acids, spent solvents, catalysts, and heavy chemical residues.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-gear"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Heavy Engineering</h3>
                            <p>Industrial scale</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/Heavy Engineering.jpeg" alt="Heavy Engineering"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p>Managing mass scale scrap, production inefficiencies, and providing total site waste management for complex layouts.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

            </div>
        </div>
    </section>
        """
    },
    "services.html": {
        "title": "Services",
        "active": "services",
        "content": """
    <section class="services section-padding bg-dark">
        <div class="container text-center">
            <span class="section-subtitle">Expert Services</span>
            <h2 class="section-title">Waste Management Done Right</h2>
            <p class="section-desc max-w-700 mx-auto" style="max-width: 700px; margin: 0 auto 40px auto;">Whether it's toxic chemical disposal or large scale recycling, we provide the equipment and expertise to handle it safely.</p>
            
            <div class="services-grid mt-4" style="grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));">
                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-biohazard"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Hazardous Waste</h3>
                            <p>Certified Toxic Disposal</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/hazardous/Hazardous Waste.png" alt="Hazardous Waste"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p>Safe pickups, secure transport, and certified disposal of dangerous industrial materials with real time tracking.</p>
                    </div>
                    <a href="hazardous-waste.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-recycle"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Non Hazardous Waste</h3>
                            <p>Resource Recovery</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/non hazardous/non hazardous wsate.png" alt="Non Hazardous Waste"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p>Efficient sorting and recycling programs that recover resources and keep your factory trash out of landfills.</p>
                    </div>
                    <a href="non-hazardous-waste.html" class="bakebun-btn">Learn more</a>
                </div>
            </div>
        </div>
    </section>
        """
    },
    "hazardous-waste.html": {
        "title": "Hazardous Waste",
        "active": "services",
        "content": """
    <section class="section-padding bg-dark">
        <div class="container text-center">
            <span class="section-subtitle">Hazardous Waste Management</span>
            <h2 class="section-title">Handling Toxic Materials Safely</h2>
            <p class="section-desc mb-5" style="max-width: 700px; margin: 0 auto 40px auto;">Handling toxic materials is high stakes work. We take that responsibility off your hands with safe, certified disposal that protects your team and our environment.</p>
            
            <div class="services-grid mt-4">
                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-shirt"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Textile Industry</h3>
                            <p>Textile Waste</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/hazardous/textile waste.png" alt="Textile Industry"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p style="font-weight: 600; color:var(--primary-green); margin-bottom:5px;">Industry Challenge: Obsolete technology and unskilled labor.</p>
                        <p>In the textile sector, waste problems often stem from poor process control, inadequate housekeeping, and obsolete technology. We address these challenges with advanced collection and processing of chemical sludges and cotton flub.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-droplet"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Dye & Intermediates</h3>
                            <p>Dye Waste</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/hazardous/top-view-cloths-made-with-different-natural-pigments-assortment.jpg" alt="Dye & Intermediates"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p style="font-weight: 600; color:var(--primary-green); margin-bottom:5px;">Process Safety: Controlling pigment runoff.</p>
                        <p>Manufacturing natural and synthetic pigments requires precise regulation. Our services manage hazardous components to protect local water bodies from industrial runoff and process residues.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-car"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Auto Mobile Manufacturing</h3>
                            <p>Auto Waste</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/hazardous/assembly-line-production-new-car-automated-welding-car-body-production-line-robotic-arm-car-production-line-is-working.jpg" alt="Auto Mobile Manufacturing"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p style="font-weight: 600; color:var(--primary-green); margin-bottom:5px;">Waste Types: Paint sludge, ETP sludge, and oil.</p>
                        <p>The automotive sector generates massive quantities of paint and oil soaked wastes. We provide industrial scale removal of ETP sludges to maintain high efficiency production lines.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-pills"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Pharma & Drug Industries</h3>
                            <p>Pharma Waste</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/hazardous/colorful-pills-syringe.jpg" alt="Pharma & Drug Industries"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p style="font-weight: 600; color:var(--primary-green); margin-bottom:5px;">Safety Standard: Secure destruction of meds.</p>
                        <p>Handling expired drugs and chemical residues requires absolute safety protocols. We manage everything from distillation residues to expired pharmaceutical products with zero environmental leakage.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-oil-well"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Petroleum & Drilling</h3>
                            <p>Petroleum Waste</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/hazardous/Oil , Gas refineries.png" alt="Petroleum & Drilling"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p style="font-weight: 600; color:var(--primary-green); margin-bottom:5px;">Heavy Handling: Disposal of tank bottom sludges.</p>
                        <p>Drilling operations and oil depots produce heavy, petroleum rich sludges. Our specialized team handles tank bottom cleaning and sludge disposal according to GPCB standards.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-brush"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Paints, Varnishes & Inks</h3>
                            <p>Paint Waste</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/hazardous/Paints, Varnishes, Inks.png" alt="Paints, Varnishes & Inks"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p style="font-weight: 600; color:var(--primary-green); margin-bottom:5px;">Safety: Mitigating fire hazards.</p>
                        <p>Production high fire risks are mitigated by our vacuum systems for safety. We process waste results from the mechanical mixing of pigments and solvents without chemical reactions.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-industry"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>CETP / ETP Infrastructure</h3>
                            <p>CETP Waste</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/hazardous/CETPETP.png" alt="CETP / ETP"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p style="font-weight: 600; color:var(--primary-green); margin-bottom:5px;">Value: Cost effective shared management.</p>
                        <p>Common Effluent Treatment Plants (CETP) allow small industries to manage wastewater collectively. We handle the resulting concentrated hazardous sludges from these shared facilities.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-seedling"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Fertilizers & Pesticides</h3>
                            <p>Fertilizer Waste</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/hazardous/fertilizers.png" alt="Fertilizers & Pesticides"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p style="font-weight: 600; color:var(--primary-green); margin-bottom:5px;">Material Concern: Cadmium, Arsenic and Dioxin.</p>
                        <p>Waste derived from fertilizers and pesticides often contains high dioxin concentrations and heavy metals like Arsenic and Lead. We ensure zero environmental leakage during processing.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-box"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>FMCG Supply Chain</h3>
                            <p>FMCG Waste</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/hazardous/fmcg.png" alt="FMCG Supply Chain"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p style="font-weight: 600; color:var(--primary-green); margin-bottom:5px;">Impact: Single use plastic waste.</p>
                        <p>Fast moving consumer goods produce complex waste from harsh chemical compositions and plastic packaging. We provide a sustainable path for zero waste manufacturing goals.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>
            </div>
            
        </div>
    </section>
        """
    },
    "non-hazardous-waste.html": {
        "title": "Non Hazardous Waste",
        "active": "services",
        "content": """
    <section class="section-padding bg-dark">
        <div class="container text-center">
            <span class="section-subtitle">Non Hazardous Waste</span>
            <h2 class="section-title">Putting Waste Back to Use</h2>
            <p class="section-desc mb-5" style="max-width: 700px; margin: 0 auto 40px auto;">Just because it isn’t toxic doesn’t mean it belongs in a landfill.</p>
            
            <div class="services-grid mt-4" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-recycle"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Resource Recovery</h3>
                            <p>Expert processing</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/non hazardous/non hazardous wsate.png" alt="Resource Recovery"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p>Industrial leftovers aren't just trash they’re raw materials waiting for a second life before land-fill.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>

                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-fire"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Co Processing Edge</h3>
                            <p>High temperature</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/non hazardous/PRE-PROCESSING BENEFIT OVER INCINERATION LANDFILL.png" alt="Co Processing Edge"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p>Pre processing leads to co processing in cement kilns at >1400°C for total destruction.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>
                
                <div class="bakebun-card">
                    <div class="bakebun-header">
                        <div class="bakebun-icon"><i class="fa-solid fa-link"></i></div>
                        <div class="bakebun-title-group" style="text-align:left;">
                            <h3>Integrated Waste</h3>
                            <p>Total solutions</p>
                        </div>
                    </div>
                    <div class="bakebun-img"><img src="images/imagess/non hazardous/hazardous waste and non hazardous waste.png" alt="Integrated Waste Solutions"></div>
                    <div class="bakebun-body" style="text-align:left;">
                        <p>We offer total site waste management for complicated industrial layouts. Single point of contact.</p>
                    </div>
                    <a href="contact.html" class="bakebun-btn">Learn more</a>
                </div>
            </div>
            
        </div>
    </section>
        """
    },
    "contact.html": {
        "title": "Contact Us",
        "active": "contact",
        "content": """
    <section class="contact-section-container section-padding">
        <div class="container contact-wrapper">
            <div class="contact-info-block">
                <span class="section-subtitle">Let’s Talk</span>
                <h2 class="section-title">Ready to Clean Up Your Waste Stream?</h2>
                <p class="section-desc">We’re here to help you solve your waste challenges. Send us a message, and one of our experts will get back to you within 24 hours to discuss a customized plan for your facility.</p>
                
                <div class="mt-5">
                    <div style="display:flex; gap:20px; margin-bottom: 30px;">
                        <div class="badge-icon" style="min-width: 50px; width: 50px; height:50px; font-size:20px;"><i class="fa-solid fa-building"></i></div>
                        <div>
                            <h4 style="margin-bottom: 5px;">Corporate Office Address</h4>
                            <p style="margin:0;">21, 22, 23, 2nd Floor, Sai Chambers, Mittal Park, Raghunath Nagar, Thane(W)-400 604.</p>
                        </div>
                    </div>
                    <div style="display:flex; gap:20px; margin-bottom: 30px;">
                        <div class="badge-icon" style="min-width: 50px; width: 50px; height:50px; font-size:20px;"><i class="fa-solid fa-industry"></i></div>
                        <div>
                            <h4 style="margin-bottom: 5px;">Factory Office Address</h4>
                            <p style="margin:0;">Survey No-55, Plot No-6, 7. 70 Bungla, Near Karam Tara, Saravali, Boisar 401506. Tel & Dist-Palghar. Maharashtra.</p>
                        </div>
                    </div>
                    <div style="display:flex; gap:20px; margin-bottom: 30px;">
                        <div class="badge-icon" style="min-width: 50px; width: 50px; height:50px; font-size:20px;"><i class="fa-solid fa-envelope"></i></div>
                        <div>
                            <h4 style="margin-bottom: 5px;">Email Our Team</h4>
                            <p style="margin:0;">director@gogreenecotech.in / info@gogreenecotech.in</p>
                        </div>
                    </div>
                    <div style="display:flex; gap:20px; margin-bottom: 30px;">
                        <div class="badge-icon" style="min-width: 50px; width: 50px; height:50px; font-size:20px;"><i class="fa-solid fa-phone"></i></div>
                        <div>
                            <h4 style="margin-bottom: 5px;">Give Us a Call</h4>
                            <p style="margin:0;">+91 9112220077 / +91 95458 03999</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="contact-form-block">
                <form action="#" method="POST">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" class="form-control" placeholder="John Doe" required>
                    </div>
                    <div style="display:flex; gap: 20px;">
                        <div class="form-group flex-1">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" class="form-control" placeholder="john@company.com" required>
                        </div>
                        <div class="form-group flex-1">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" class="form-control" placeholder="+91 98765 43210" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="message">Your Message</label>
                        <textarea id="message" class="form-control" placeholder="Tell us about your waste management needs..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary w-100" style="width:100%;">Request Pickup</button>
                </form>
            </div>
        </div>
    </section>
        """
    }
}

for filename, data in pages.items():
    actives = {k: "" for k in ["about_active", "services_active", "industries_active", "process_active", "contact_active"]}
    if data["active"]:
        actives[f'{data["active"]}_active'] = "active"
        
    top_formatted = template_top.format(title=data["title"], **actives)
    full_html = top_formatted + data["content"] + template_bottom
    with open(filename, "w", encoding="utf-8") as f:
        f.write(full_html)
    print(f"Created {filename}")
