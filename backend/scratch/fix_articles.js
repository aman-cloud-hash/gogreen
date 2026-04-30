const { Pool } = require('pg');

const pool = new Pool({
    connectionString: "postgresql://aman:S-9M7v7u_S688vKzXfEetg@go-green-eco-tech-16013.8nj.gcp-asia-southeast1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full"
});

const correctArticles = [
    {
        id: 'article_1',
        title: "How To Stay Compliant With CPCB Industrial Waste Rules",
        date: "April 6, 2026",
        img: "images/imagess/hazardous/environmental-pollution-factory-exterior.jpg"
    },
    {
        id: 'article_2',
        title: "5 Tips For Safe Chemical Waste Disposal In Your Factory",
        date: "March 18, 2026",
        img: "images/imagess/hazardous/scientist-holding-green-chemicals.jpg"
    },
    {
        id: 'article_3',
        title: "Understanding Refinery Sludge: Risks & Safe Disposal Methods",
        date: "February 27, 2026",
        img: "images/imagess/hazardous/wide-shot-three-towers-port-sunset-cloudy-day.jpg"
    },
    {
        id: 'article_4',
        title: "Zero Waste Manufacturing: Is Your Industry Ready For It?",
        date: "January 14, 2026",
        img: "images/Sustainability Transformation.jpeg"
    }
];

async function fix() {
    try {
        console.log("Fixing Articles in DB...");
        // Pehle purane articles delete karenge (optional, but cleaner)
        // Ya phir hum seedhe update kar sakte hain.
        
        const data = JSON.stringify(correctArticles);
        await pool.query("UPDATE gg_settings SET value = $1 WHERE id = 'gg_articles'", [data]);
        
        console.log("SUCCESS: Articles paths fixed in DB!");
    } catch (err) {
        console.error("FAILED to fix DB:", err);
    } finally {
        await pool.end();
    }
}

fix();
