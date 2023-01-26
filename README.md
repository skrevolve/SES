# aws-sdk-services

-   npm install typescript -g // 타입 스크립트를 글로벌로 설치, tsc --init에 사용

-   tsc --init // 타입 스크립트 초기화

-   tsconfig.json 파일 수정

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

-   npm install -D @types/node // nodejs 의 javascript 라이브러리를 typescript에서 확인할 수 있도록
-   npm install -D typescript // 설치, tasks.json에서 tsc 명령어를 사용하기위해

-   진입 파일에서 f5 키를 눌러 launch.json 파일을 만들어, 디버그 환경 설정

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

-   디버그를 실행하기 전에 preLaunchTask 에 해당하는 tsc 빌드를 먼저 해야 하므로, f1 키를 눌러 Tasks.configureDefaultBuildTask 클릭해서 tsc 빌드 클릭을 해서 tasks.json 파일을 만든다
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
