import fs from "fs/promises";
import path from "path";

const entityName = process.argv[2];

if (!entityName) {
  console.error("Please provide an entity name.");
  process.exit(1);
}

const controllersDir = path.join(process.cwd(), "app", "Http", "Controllers");
const modelsDir = path.join(process.cwd(), "app", "Http", "Models");

const controllerFileName = `${entityName}Controller.mjs`;
const modelFileName = `${entityName}.mjs`;

const controllerFilePath = path.join(controllersDir, controllerFileName);
const modelFilePath = path.join(modelsDir, modelFileName);

const relativeControllerFilePath = path.relative(
  process.cwd(),
  controllerFilePath
);
const relativeModelFilePath = path.relative(process.cwd(), modelFilePath);

(async () => {
  try {
    // Check if controller file already exists
    const controllerExists = await fs
      .access(controllerFilePath)
      .then(() => true)
      .catch(() => false);
    if (controllerExists) {
      console.log(`Controller "${controllerFileName}" already exists.`);
      process.exit(0); // Exit the process if the controller already exists
    }

    // Check if model file already exists
    const modelExists = await fs
      .access(modelFilePath)
      .then(() => true)
      .catch(() => false);
    if (modelExists) {
      console.log(`Model "${modelFileName}" already exists.`);
      process.exit(0); // Exit the process if the model already exists
    }

    // Controller template
    const controllerTemplate = `// import necessary models

    class ${entityName} {

      // Store a newly created resource in storage.
      static async store(req, res){
        // write your code here
      };

      // Get all the resources in storage.
      static async getAll(req, res){
        // write your code here
      };

      // Get the specified resource in storage
      static async getById(req, res){
        // write your code here
      };

      //  Update the specified resource in storage
      static async updateById(req, res){
        // write your code here
      };

      //  Delete the specified resource from storage.
      static async deleteById(req, res){
        // write your code here
      };


    }

    export default ${entityName};
`;

    // Model template
    const modelTemplate = `import mongoose from 'mongoose';

const ${entityName}Schema = new mongoose.Schema({
  // Define your schema fields here
});

const ${entityName} = mongoose.model('${entityName}', ${entityName}Schema);

export default ${entityName};
`;

    // Write controller file
    await fs.writeFile(controllerFilePath, controllerTemplate);
    console.log(
      `"${controllerFileName}" created successfully. < ${relativeControllerFilePath} >`
    );
    //console.log(`${relativeControllerFilePath}`);

    // Write model file
    await fs.writeFile(modelFilePath, modelTemplate);
    console.log(
      `"${modelFileName}" created successfully. < ${relativeModelFilePath} >`
    );
    //console.log(`${relativeModelFilePath}`);
  } catch (err) {
    console.error("Error creating controller or model:", err);
  }
})();
