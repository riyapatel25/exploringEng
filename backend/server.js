const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Choose a suitable port

const fs = require('fs');
const cors = require('cors');

// Enable CORS
app.use(cors());

// default route
app.get('/', (req, res) => {
    res.send("backend running");
});
// Define API endpoints and routes
app.get('/api/products', (req, res) => {
    // Logic to fetch products data
    const productsData = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
    res.json(productsData);
  });
  
app.get('/api/programs', (req, res) => {
    // Logic to fetch programs data
    const programsData = JSON.parse(fs.readFileSync('./data/programs.json', 'utf8'));
    res.json(programsData);
    });

app.get('/api/zips', (req, res) => {
    // Logic to fetch zips data
    const zipsData = JSON.parse(fs.readFileSync('./data/zips.json', 'utf8'));
    res.json(zipsData);
    });

app.get('/api/zip_program_junction', (req, res) => {
    // Logic to fetch zip_program_junction data
    const zip_program_junctionData = JSON.parse(fs.readFileSync('./data/zip_program_junction.json', 'utf8'));
    res.json(zip_program_junctionData);
    });


app.get('/api/productNames', (req, res) => {
    const productsData = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
    const productNames = productsData.products.map(product => `${product.manufacturer} ${product.model}`);
    res.json(productNames);
    });
      

app.get('/api/getMatchingPrograms', (req, res) => {
    const { zipCode, productName, purchaseAmount } = req.query;
    
    console.log(`zipCode: ${zipCode}, productName: ${productName}, purchaseAmount: ${purchaseAmount}`);
    
    // Read data from JSON files
    const productsData = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
    const programsData = JSON.parse(fs.readFileSync('./data/programs.json', 'utf8'));
    const zipsData = JSON.parse(fs.readFileSync('./data/zips.json', 'utf8'));
    const zipProgramJunctionData = JSON.parse(fs.readFileSync('./data/zip_program_junction.json', 'utf8')).zip_program_junction;
    
    // Read conditions from JSON file
    const conditionsData = JSON.parse(fs.readFileSync('./data/conditions.json', 'utf8'));
    const conditions = conditionsData.conditions;
    
    // Find product by name
    const product = productsData.products.find(p => (p.manufacturer + ' ' + p.model) === productName);
    
    if (!product) {
        return res.status(504).json({ error: 'Product not found' });
    }
    
    // print product
    console.log(`product: ${JSON.stringify(product)}`);
    
    // Get zip ID for the given zip code
    const zipId = zipsData.zips.find(zip => zip.zip_code === zipCode);
    
    if (!zipId) {
        return res.status(504).json({ error: 'Zip code not found' });
    }
    
    // print zipId
    console.log(`zipId: ${JSON.stringify(zipId)}`);
    
    // Get program IDs applicable to the given zip code
    const programIds = zipProgramJunctionData
        .filter(junction => junction.zip_id === Number(zipId.id))
        .map(junction => junction.program_id);
    
    // print programIds
    console.log(`programIds: ${programIds}`);
    
    // Filter programs based on product constraints and matching program IDs DYNAMICALLY!!
    const matchingPrograms = programsData.programs.filter(program => {
        return (
        programIds.includes(program.id) &&
        conditions.every(condition => program[condition.programProp] === product[condition.productProp])
        );
    });
    
    // Calculate the new column for each matching program
    const programsWithRebate = matchingPrograms.map(program => {
        const { max_amount, max_percent_amount } = program; //extract fields in matchingPrograms
        const calculatedValue = Math.min(purchaseAmount * (max_percent_amount / 100), max_amount);
        return { name:program.name, rebate_amount: calculatedValue };
    });
    
    // print programsWithNewColumn
    console.log(`programsWithRebate: ${JSON.stringify(programsWithRebate)}`);

    res.json(programsWithRebate);
    
    });
      

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
