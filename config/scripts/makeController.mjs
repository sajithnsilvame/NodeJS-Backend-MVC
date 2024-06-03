import fs from "fs/promises";
import path from "path";

const controllerName = process.argv[2];

if (!controllerName) {
  console.error("Please provide a controller name.");
  process.exit(1);
}

const controllersDir = path.join(process.cwd(), "app", "Http", "Controllers");
const controllerFileName = `${controllerName}.mjs`;
const controllerFilePath = path.join(controllersDir, controllerFileName);
const relativeControllerFilePath = path.relative(
  process.cwd(),
  controllerFilePath
);

(async () => {
  try {
    // Check if the controller file already exists
    const exists = await fs
      .access(controllerFilePath)
      .then(() => true)
      .catch(() => false);
    if (exists) {
      console.log(`Controller "${controllerName}" already exists.`);
      process.exit(0); // Exit the process if the controller already exists
    }

    const controllerTemplate = `// import necessary models

    class ${controllerName} {

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

    export default ${controllerName};
`;

    // Write controller file
    await fs.writeFile(controllerFilePath, controllerTemplate);
    console.log(
      `"${controllerName}" created successfully. < ${relativeControllerFilePath} >`
    );
  } catch (err) {
    console.error("Error creating controller:", err);
  }
})();
