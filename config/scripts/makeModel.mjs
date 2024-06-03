import fs from "fs/promises";
import path from "path";

const modelName = process.argv[2];

if (!modelName) {
  console.error("Please provide a model name.");
  process.exit(1);
}

const modelsDir = path.join(process.cwd(), "app", "Http", "Models");
const modelFilePath = path.join(modelsDir, `${modelName}.mjs`);
const relativeModelFilePath = path.relative(process.cwd(), modelFilePath);

(async () => {
  try {
    // Check if the model file already exists
    const exists = await fs
      .access(modelFilePath)
      .then(() => true)
      .catch(() => false);
    if (exists) {
      console.log(`Model "${modelName}" already exists.`);
      process.exit(0); // Exit the process if the model already exists
    }

    const modelTemplate = `import mongoose from 'mongoose';

const ${modelName}Schema = new mongoose.Schema({
  // Define your schema fields here
});

const ${modelName} = mongoose.model('${modelName}', ${modelName}Schema);

export default ${modelName};
`;

    // Ensure the models directory exists
    await fs.mkdir(modelsDir, { recursive: true });

    // Write model file
    await fs.writeFile(modelFilePath, modelTemplate);
    console.log(
      `"${modelName}" created successfully. < ${relativeModelFilePath} >`
    );
  } catch (err) {
    console.error("Error creating model:", err);
  }
})();
