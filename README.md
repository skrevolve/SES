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

-   진입 파일에서 f5 키를 눌러 디버그 환경 설정

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

-   디버그를 실행하기 전에 preLaunchTask 에 해당하는 tsc 빌드를 먼저 해야 하므로, f1 키를 눌러 Tasks.configureDefaultBuildTask 클릭후 tsc build
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
