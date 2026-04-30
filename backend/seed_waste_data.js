const { Client } = require('pg');

const connectionString = 'postgresql://gogreen:Jn03wuvhxZdCpumQlthOIw@firm-gremlin-25616.j77.aws-ap-south-1.cockroachlabs.cloud:26257/defaultdb';

const hazardousData = [
    {
        industry: "Textile Industry",
        subtitle: "Textile Waste",
        icon: "fa-solid fa-shirt",
        img: "images/imagess/hazardous/textile waste.png",
        highlight: "Industry Challenge: Obsolete technology and unskilled labor.",
        desc: "In the textile sector, waste problems often stem from poor process control, inadequate housekeeping, and obsolete technology. We address these challenges with advanced collection and processing of chemical sludges and cotton flub.",
        link: "industry-textile.html",
        waste_types: [{ name: "Sludges", img: "images/Textiles Sludges.png" }, { name: "Cotton Flub", img: "images/Textiles Cotton Flub.png" }]
    },
    {
        industry: "Dye & Intermediates",
        subtitle: "Dye Waste",
        icon: "fa-solid fa-droplet",
        img: "images/imagess/hazardous/top-view-cloths-made-with-different-natural-pigments-assortment.jpg",
        highlight: "Process Safety: Controlling pigment runoff.",
        desc: "Manufacturing natural and synthetic pigments requires precise regulation. Our services manage hazardous components to protect local water bodies from industrial runoff and process residues.",
        detail: {
            page_title: "Dye & Intermediates Manufacturing",
            hero_img: "",
            hero_subtitle: "Process Safety",
            hero_title: "Controlling Pigment Runoff & Chemical Residues",
            hero_desc: "Manufacturing natural and synthetic pigments requires precise regulation. Dye intermediates and pigment manufacturing processes often result in concentrated runoff and hazardous process residues that can be devastating to local water bodies if not managed with absolute precision.",
            categories_heading: "Waste Categories in Dye Production",
            categories: [
                { icon: "fa-solid fa-flask-vial", title: "Mother Liquors", desc: "Concentrated chemical solutions remaining after pigment crystallization, requiring specialized neutralization." },
                { icon: "fa-solid fa-droplet-slash", title: "Pigment Runoff", desc: "High-intensity colored wastewater sludges that must be stabilized before final disposal." },
                { icon: "fa-solid fa-filter", title: "Filter Presses", desc: "Hazardous cakes from process filtration containing reactive intermediates and solvents." }
            ],
            cta_heading: "Environmental Protection",
            cta_desc: "We provide chemical stabilization and volume reduction services specifically for dye manufacturers. Our goal is to ensure that even the most stubborn pigment wastes are transformed into manageable, CPCB-compliant streams.",
            cta_btn_text: "Request Dye Waste Consultation",
            cta_btn_link: "contact.html"
        }
    },
    {
        industry: "Auto Mobile Manufacturing",
        subtitle: "Auto Waste",
        icon: "fa-solid fa-car",
        img: "images/imagess/hazardous/assembly-line-production-new-car-automated-welding-car-body-production-line-robotic-arm-car-production-line-is-working.jpg",
        highlight: "Waste Types: Paint sludge, ETP sludge, and oil.",
        desc: "The automotive sector generates massive quantities of paint and oil soaked wastes. We provide industrial scale removal of ETP sludges to maintain high efficiency production lines.",
        link: "industry-auto.html",
        waste_types: [{ name: "Paint Sludge", img: "images/Auto Mobiles Paint Sludge.png" }, { name: "ETP sludge", img: "images/Auto Mobiles ETP sludge.png" }, { name: "Oil Cotton", img: "images/Auto Mobiles oil soaked cotton.png" }]
    },
    {
        industry: "Pharma & Drug Industries",
        subtitle: "Pharma Waste",
        icon: "fa-solid fa-pills",
        img: "images/imagess/hazardous/colorful-pills-syringe.jpg",
        highlight: "Safety Standard: Secure destruction of meds.",
        desc: "Handling expired drugs and chemical residues requires absolute safety protocols. We manage everything from distillation residues to expired pharmaceutical products with zero environmental leakage.",
        link: "industry-pharma.html",
        waste_types: [{ name: "Process", img: "images/Pharma & Drugs Process.png" }, { name: "Expired", img: "images/Pharma & Drugs expired drugs.png" }, { name: "Ept", img: "images/Pharma & Drugs Ept.png" }, { name: "Residues", img: "images/Pharma & Drugs residues.png" }, { name: "Distillation", img: "images/Pharma & Drugs Distillation.png" }]
    },
    {
        industry: "Petroleum & Drilling",
        subtitle: "Petroleum Waste",
        icon: "fa-solid fa-oil-well",
        img: "images/imagess/hazardous/Oil , Gas refineries.png",
        highlight: "Heavy Handling: Disposal of tank bottom sludges.",
        desc: "Drilling operations and oil depots produce heavy, petroleum rich sludges. Our specialized team handles tank bottom cleaning and sludge disposal according to GPCB standards.",
        link: "industry-petroleum.html",
        waste_types: [{ name: "Tank bottom sludges", img: "images/Petroleum depot, drilling Tank bottom sludges.png" }, { name: "Sludges", img: "images/Petroleum depot, drilling sludges.png" }]
    },
    {
        industry: "Paints, Varnishes & Inks",
        subtitle: "Paint Waste",
        icon: "fa-solid fa-brush",
        img: "images/imagess/hazardous/Paints, Varnishes, Inks.png",
        highlight: "Safety: Mitigating fire hazards.",
        desc: "Production high fire risks are mitigated by our vacuum systems for safety. We process waste results from the mechanical mixing of pigments and solvents without chemical reactions.",
        link: "industry-paint.html",
        waste_types: [{ name: "Paint sludges", img: "images/Paints, Varnishes, Inks Paint sludges.png" }, { name: "Residues", img: "images/Paints, Varnishes, Inks process residues filters sludges.png" }]
    },
    {
        industry: "CETP / ETP Infrastructure",
        subtitle: "CETP Waste",
        icon: "fa-solid fa-industry",
        img: "images/imagess/hazardous/CETPETP.png",
        highlight: "Value: Cost effective shared management.",
        desc: "Common Effluent Treatment Plants (CETP) allow small industries to manage wastewater collectively. We handle the resulting concentrated hazardous sludges from these shared facilities.",
        link: "industry-cetp.html",
        waste_types: [{ name: "Sludges", img: "images/CETPETP sludges.png" }]
    },
    {
        industry: "FMCG Supply Chain",
        subtitle: "FMCG Waste",
        icon: "fa-solid fa-box",
        img: "images/imagess/hazardous/fmcg.png",
        highlight: "Impact: Single use plastic waste.",
        desc: "Fast moving consumer goods produce complex waste from harsh chemical compositions and plastic packaging. We provide a sustainable path for zero waste manufacturing goals.",
        link: "industry-fmcg.html",
        waste_types: [{ name: "Residues", img: "images/FMCG Process Residues.png" }, { name: "Expired", img: "images/FMCG expired products.png" }]
    },
    {
        industry: "Chemical",
        subtitle: "Chemical Waste",
        icon: "fa-solid fa-flask",
        img: "images/imagess/hazardous/scientist-holding-green-chemicals.jpg",
        highlight: "Handling: Proper disposal of process residues.",
        desc: "Chemical industries generate hazardous sludges, off-spec products and ETP waste that require careful handling and certified disposal methods.",
        link: "contact.html",
        waste_types: [{ name: "Sludges", img: "images/Chemical Sludges.png" }, { name: "Residues", img: "images/Chemical  process residues.png" }, { name: "ETP", img: "images/Chemical etp.png" }, { name: "Off-spec", img: "images/Chemical off specification products.png" }]
    },
    {
        industry: "Agro Chemical",
        subtitle: "Agro Waste",
        icon: "fa-solid fa-seedling",
        img: "images/imagess/hazardous/closeup-biologist-spraying-potted-flowers-with-nutritional-fertilizes-plant-nursery.jpg",
        highlight: "Safety: Managing pesticide residues.",
        desc: "Agrochemical manufacturing produces process residues, sludges, and tarry distillation residues that need specialized handling for safe disposal.",
        link: "contact.html",
        waste_types: [{ name: "Residues", img: "images/Agro Chemical Process residues.png" }, { name: "Sludges", img: "images/Agro Chemical sludges.png" }, { name: "Tarry Residue", img: "images/Agro Chemical tarry residue distillation residue.png" }]
    },
    {
        industry: "Petrochemicals",
        subtitle: "Refinery Waste",
        icon: "fa-solid fa-oil-can",
        img: "images/imagess/hazardous/wide-shot-three-towers-port-sunset-cloudy-day.jpg",
        highlight: "Scale: Industrial refinery sludge management.",
        desc: "Petrochemical refineries produce large volumes of refinery sludges and process waste requiring specialized treatment and disposal protocols.",
        link: "contact.html",
        waste_types: [{ name: "Refinery sludges", img: "images/Petrochemicals Refinery sludges.png" }, { name: "Waste", img: "images/Petrochemicals waste.png" }]
    },
    {
        industry: "Engineering",
        subtitle: "Engineering Waste",
        icon: "fa-solid fa-gears",
        img: "images/imagess/hazardous/civil-engineer-construction-worker-manager-holding-digital-tablet-blueprints-talking-planing-about-construction-site-cooperation-teamwork-concept.jpg",
        highlight: "Industrial: Paint and ETP waste management.",
        desc: "Engineering facilities produce ETP sludge, paint waste, and various industrial sludges from their manufacturing processes.",
        link: "contact.html",
        waste_types: [{ name: "ETP", img: "images/Engineering etp.png" }, { name: "Paint", img: "images/Engineering Paint.png" }, { name: "Sludges", img: "images/Engineering sludges.png" }]
    },
    {
        industry: "Fertilizers",
        subtitle: "Fertilizer Waste",
        icon: "fa-solid fa-wheat-awn",
        img: "images/imagess/hazardous/fertilizers.png",
        highlight: "Processing: Expired product management.",
        desc: "Fertilizer manufacturing generates sludges and expired products that require certified hazardous waste disposal.",
        link: "contact.html",
        waste_types: [{ name: "Sludges", img: "images/Fertilizers Sludges.png" }, { name: "Expired", img: "images/Fertilizers expired products.png" }]
    },
    {
        industry: "Pesticides",
        subtitle: "Pesticide Waste",
        icon: "fa-solid fa-skull-crossbones",
        img: "images/imagess/hazardous/pesticides.png",
        highlight: "Critical: Safe handling of toxic residues.",
        desc: "Pesticide manufacturing waste contains highly toxic process residues and sludges demanding stringent safety protocols.",
        link: "contact.html",
        waste_types: [{ name: "Residues", img: "images/Pesticides Process residues.png" }, { name: "Sludges", img: "images/Pesticides sludges.png" }]
    },
    {
        industry: "Food & Beverage",
        subtitle: "F&B Waste",
        icon: "fa-solid fa-utensils",
        img: "images/Sustainability Transformation.jpeg",
        highlight: "Safety: ETP sludge and expired product disposal.",
        desc: "Food and beverage industries generate ETP sludges and expired products requiring proper hazardous waste management.",
        link: "contact.html",
        waste_types: [{ name: "ETP sludges", img: "images/Food & Beverage ETP sludges.png" }, { name: "Expired", img: "images/Food & Beverage expired.png" }]
    },
    {
        industry: "Oil, Gas Refineries",
        subtitle: "Oil & Gas Waste",
        icon: "fa-solid fa-gas-pump",
        img: "images/imagess/hazardous/Oil , Gas refineries.png",
        highlight: "Scale: Large volume process residue handling.",
        desc: "Oil and gas refineries produce significant process residues requiring specialized industrial-grade treatment.",
        link: "contact.html",
        waste_types: [{ name: "Process Residue", img: "images/Oil, Gas refineries Process Residue.png" }]
    }
];

const nonHazardousData = [
    {
        industry: "Resource Recovery",
        subtitle: "Expert processing",
        icon: "fa-solid fa-recycle",
        img: "images/imagess/non hazardous/non hazardous wsate.png",
        highlight: "",
        desc: "Industrial leftovers aren't just trash they're raw materials waiting for a second life before land-fill.",
        link: "contact.html",
        waste_types: []
    },
    {
        industry: "Plastic Shredding",
        subtitle: "Size reduction & recycling",
        icon: "fa-solid fa-scissors",
        img: "images/plastic shredding.png",
        highlight: "",
        desc: "Industrial plastic waste is shredded into uniform granules, making it ready for co-processing or recycling — keeping it out of landfills and back into a productive cycle.",
        link: "industry-recycling.html",
        waste_types: []
    },
    {
        industry: "Co Processing Edge",
        subtitle: "High temperature",
        icon: "fa-solid fa-fire",
        img: "images/imagess/non hazardous/PRE-PROCESSING BENEFIT OVER INCINERATION LANDFILL.png",
        highlight: "",
        desc: "Pre processing leads to co processing in cement kilns at >1400°C for total destruction.",
        link: "industry-coprocessing.html",
        waste_types: []
    },
    {
        industry: "Integrated Waste",
        subtitle: "Total solutions",
        icon: "fa-solid fa-link",
        img: "images/imagess/non hazardous/hazardous waste and non hazardous waste.png",
        highlight: "",
        desc: "We offer total site waste management for complicated industrial layouts. Single point of contact.",
        link: "industry-integrated.html",
        waste_types: []
    },
    {
        industry: "Hospitality & Hotels",
        subtitle: "Hotel Waste",
        icon: "fa-solid fa-hotel",
        img: "images/Hospitality & Hotels.png",
        highlight: "Focus: Food waste and linen management.",
        desc: "Hotels generate large volumes of food waste and used linens that can be sustainably recycled.",
        link: "contact.html",
        waste_types: [{ name: "Food Waste", img: "images/Hospitality & Hotels Food Waste food waste.png" }, { name: "Linens", img: "images/Hospitality & Hotels Food Waste linen.png" }]
    },
    {
        industry: "Retail & E-commerce",
        subtitle: "Retail Waste",
        icon: "fa-solid fa-store",
        img: "images/Retail & E commerce.png",
        highlight: "Focus: Cardboard and packaging waste.",
        desc: "Retail operations produce substantial cardboard and shrink wrap packaging waste suitable for recycling.",
        link: "contact.html",
        waste_types: [{ name: "Cardboard", img: "images/Retail & E commerce cadboard.png" }, { name: "Shrink Wrap", img: "images/Retail & E commerce shrink wrap.png" }]
    },
    {
        industry: "Corporate Offices & IT",
        subtitle: "Office Waste",
        icon: "fa-solid fa-building",
        img: "images/Corporate Offices & IT.png",
        highlight: "Focus: Paper and e-waste recycling.",
        desc: "Corporate offices generate paper waste and electronic waste that can be responsibly recycled.",
        link: "contact.html",
        waste_types: [{ name: "Paper", img: "images/Corporate Offices & IT paper.png" }, { name: "E-waste", img: "images/Corporate Offices & IT e waste.png" }]
    },
    {
        industry: "Construction & Demolition",
        subtitle: "C&D Waste",
        icon: "fa-solid fa-hammer",
        img: "images/Construction & Demolition.png",
        highlight: "Focus: Concrete and wood recovery.",
        desc: "Construction sites produce concrete debris and wood waste that can be processed for reuse.",
        link: "contact.html",
        waste_types: [{ name: "Concrete", img: "images/Construction & Demolition Concrete.png" }, { name: "Wood", img: "images/Construction & Demolition wood.png" }]
    },
    {
        industry: "Agriculture & Farming",
        subtitle: "Farm Waste",
        icon: "fa-solid fa-tractor",
        img: "images/Agriculture & Farmin.png",
        highlight: "Focus: Crop residues and organic matter.",
        desc: "Agricultural operations produce crop residues, organic matter and animal waste suitable for composting and energy recovery.",
        link: "contact.html",
        waste_types: [{ name: "Crop Residues", img: "images/Agriculture & Farming Crop Residues.png" }, { name: "Organic", img: "images/Agriculture & Farming  Organic Matter.png" }, { name: "Animal", img: "images/Agriculture & Farming Animal Waste.png" }]
    },
    {
        industry: "Education & Schools",
        subtitle: "Campus Waste",
        icon: "fa-solid fa-school",
        img: "images/Education & Schools.png",
        highlight: "Focus: Paper and food waste management.",
        desc: "Educational institutions generate paper, stationery and food waste that can be managed sustainably.",
        link: "contact.html",
        waste_types: [{ name: "Paper", img: "images/Education & Schools Paper.png" }, { name: "Stationery", img: "images/Education & Schools Stationery Waste.png" }, { name: "Food", img: "images/Education & Schools Food Waste.png" }]
    }
];

async function seed() {
    const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
    try {
        await client.connect();
        console.log("Connected to DB");
        await client.query("UPSERT INTO settings (id, data) VALUES ($1, $2)", ['gg_hazardous', JSON.stringify(hazardousData)]);
        await client.query("UPSERT INTO settings (id, data) VALUES ($1, $2)", ['gg_nonhazardous', JSON.stringify(nonHazardousData)]);
        console.log("Full waste data with all fields seeded successfully!");
    } catch (err) {
        console.error("Error seeding data:", err);
    } finally {
        await client.end();
    }
}
seed();
