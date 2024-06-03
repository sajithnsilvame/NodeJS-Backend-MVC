import fs from "fs/promises";
import path from "path";

const middlewareName = process.argv[2];

if (!middlewareName) {
  console.error("Please provide a middleware name.");
  process.exit(1);
}

const middlewaresDir = path.join(process.cwd(), "app", "Http", "Middlewares");
const middlewareFileName = `${middlewareName}.mjs`;
const middlewareFilePath = path.join(middlewaresDir, middlewareFileName);
const relativeMiddlewareFilePath = path.relative(
  process.cwd(),
  middlewareFilePath
);

(async () => {
  try {
    // Check if the middlewares directory exists and create it if it doesn't
    await fs.mkdir(middlewaresDir, { recursive: true });

    // Check if the middleware file already exists
    const exists = await fs
      .access(middlewareFilePath)
      .then(() => true)
      .catch(() => false);
    if (exists) {
      console.log(`Middleware "${middlewareName}" already exists.`);
      process.exit(0); // Exit the process if the middleware already exists
    }

    // Create middleware template
    const middlewareTemplate = `const ${middlewareName} = (req, res, next) => {
  // Middleware logic here
};

export default ${middlewareName};
`;

    // Write middleware file
    await fs.writeFile(middlewareFilePath, middlewareTemplate);
    console.log(
      `"${middlewareName}" created successfully. < ${relativeMiddlewareFilePath} >`
    );
  } catch (err) {
    console.error("Error creating middleware:", err);
  }
})();
