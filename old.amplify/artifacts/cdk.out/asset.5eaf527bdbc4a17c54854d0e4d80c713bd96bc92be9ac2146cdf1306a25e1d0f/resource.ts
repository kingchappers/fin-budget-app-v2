import { execSync } from "node:child_process";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { defineFunction } from "@aws-amplify/backend";
import { DockerImage, Duration } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";

const functionDir = path.dirname(fileURLToPath(import.meta.url));

export const createIncomeFunctionHandler = defineFunction(
  (scope) =>
    new Function(scope, "createIncome", {
      handler: "bootstrap",
      runtime: Runtime.PROVIDED_AL2023,
      timeout: Duration.seconds(3), //  default is 3 seconds
      code: Code.fromAsset(functionDir, {
        bundling: {
          image: DockerImage.fromRegistry("dummy"),
          local: {
            tryBundle(outputDir: string) {
              execSync(`rsync -rLv ${functionDir}/* ${path.join(outputDir)}`);
              execSync(
                `cd ${path.join(outputDir)} && GOARCH=amd64 GOOS=linux go build -tags lambda.norpc -o ${path.join(outputDir)}/bootstrap ${functionDir}/main.go`
              );
              return true;
            },
          },
        },
      }),
    }),
    {
      resourceGroupName: "auth" // Optional: Groups this function with auth resource
    }
);