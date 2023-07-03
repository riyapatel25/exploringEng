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
            
        // Read data from JSON files
        const productsData = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
        const programsData = JSON.parse(fs.readFileSync('./data/programs.json', 'utf8'));
        const zipsData = JSON.parse(fs.readFileSync('./data/zips.json', 'utf8'));
        const zipProgramJunctionData = JSON.parse(fs.readFileSync('./data/zip_program_junction.json', 'utf8')).zip_program_junction;
      
        // Find product by name
        const product = productsData.products.find(p => (p.manufacturer + ' ' + p.model) === productName);
      
        if (!product) {
            console.log("shit went doooown")
          return res.status(504).json({ error: 'Product not found' });
        }
      
        // Get zip ID for the given zip code
        const zipId = zipsData.zips.find(zip => zip.zip_code === zipCode);
      
        if (!zipId) {
            console.log("dddammnnnn")
          return res.status(504).json({ error: 'Zip code not found' });
        }

        // Get program IDs applicable to the given zip code
        const programIds = zipProgramJunctionData
          .filter(junction => junction.zip_id === Number(zipId.id))
          .map(junction => junction.program_id);
   

        // Filter programs based on product constraints and matching program IDs
        const matchingPrograms = programsData.programs.filter(program => {
          return (
            program.hardwire_required === product.is_hardwired &&
            program.networked_required === product.is_networked &&
            programIds.includes(program.id)
          );
        });
      
        // Calculate the new column for each matching program
        const programsWithrebate = matchingPrograms.map(program => {
          const { max_amount, max_percent_amount } = program;
          const calculatedValue = Math.min(purchaseAmount * (max_percent_amount / 100), max_amount);
          return { ...program, rebate_amount: calculatedValue };
        });
     
        // for final ouput, loop through programsWithrebate and return only the program model, manufacturer and rebate amount

        const finalOutput = programsWithrebate.map(program => {
            return { rebate_amount: program.rebate_amount, name: program.name};
          });
          
          res.json(finalOutput);
          console.log(finalOutput)
      });
      
      

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});