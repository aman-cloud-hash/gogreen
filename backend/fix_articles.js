const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://gogreen:Jn03wuvhxZdCpumQlthOIw@firm-gremlin-25616.j77.aws-ap-south-1.cockroachlabs.cloud:26257/defaultdb',
    ssl: { rejectUnauthorized: false }
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
        console.log("Fixing Articles in DB (Table: settings)...");
        const data = JSON.stringify(correctArticles);
        // Checking if the row exists first
        const check = await pool.query("SELECT * FROM settings WHERE id = 'gg_articles'");
        if(check.rows.length > 0) {
            await pool.query("UPDATE settings SET data = $1 WHERE id = 'gg_articles'", [data]);
            console.log("SUCCESS: Articles updated!");
        } else {
            await pool.query("INSERT INTO settings (id, data) VALUES ('gg_articles', $1)", [data]);
            console.log("SUCCESS: Articles inserted!");
        }
    } catch (err) {
        console.error("FAILED to fix DB:", err);
    } finally {
        await pool.end();
    }
}

fix();
