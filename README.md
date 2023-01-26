# aws-sdk-services

-   npm install typescript -g

-   tsc --init

-   tsconfig.json

    >

        {
            "compilerOptions": {
            "target": "es5",
            "module": "commonjs",
            "outDir": "out",
            "sourceMap": true,
            "esModuleInterop": true
            }
        }

-   npm install -D @types/node
-   npm install -D typescript

-   Set the debug environment by pressing f5

    >

        {
            "version": "0.2.0",
            "configurations": [
                {
                    "type": "node",
                    "request": "launch",
                    "name": "Launch Program",
                    "program": "${workspaceFolder}/main.ts",
                    "preLaunchTask": "tsc: build - tsconfig.json",
                    "outFiles": ["${workspaceFolder}/out/**/*.js"]
                }
            ]
        }

- Before running debug, you need to build tsc corresponding to preLaunchTask first, so press F1, click Tasks.configureDefaultBuildTask, and then tsc build
    >
        {
            "version": "2.0.0",
            "tasks": [
                {
                    "type": "typescript",
                    "tsconfig": "tsconfig.json",
                    "problemMatcher": ["$tsc"],
                    "group": {
                        "kind": "build",
                        "isDefault": true
                    },
                    "label": "tsc: build - tsconfig.json"
                }
            ]
        }
