# jenkins-pipeline-linter-connector README

This extension validates Jenkinsfiles by sending them to the Pipeline Linter of a Jenkins server.

## Features

- Validate Jenkinsfiles from within vscode.
- Supports declarative pipelines only.

## Examples

![Example 1](images/example1.gif)

![Example 2](images/example2.gif)

## Extension Settings

This extension contributes the following settings:

* `jenkins.pipeline.linter.connector.url`: Url of the Jenkins Pipeline Linter. 
* `jenkins.pipeline.linter.connector.crumbUrl`: Url of the Jenkins Crumb Issuer. This isonly needed if you are authenticating with a password.
* `jenkins.pipeline.linter.connector.pass`: Jenkins password (can be left blank if you don't want to put your password in your settings).
* `jenkins.pipeline.linter.connector.token`: Jenkins token (can be left blank if you don't want to put your token in your settings).
* `jenkins.pipeline.linter.connector.user`: Jenkins username.
* `jenkins.pipeline.linter.connector.strictssl`: Set to false to allow invalid ssl connections.

## How to use

Configure the plugins settings in settings.json within VSCode.  Once the settings are saved, access the [command palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette) and select "Validate Jenkinsfile", or press shift + alt + v.


## Example configs

# Authentication via token

```json

"jenkins.pipeline.linter.connector.url": "https://jenkins.local/pipeline-model-converter/validate",
"jenkins.pipeline.linter.connector.token": "_Users-Token_",
"jenkins.pipeline.linter.connector.user": "_Username_",
"jenkins.pipeline.linter.connector.strictssl": true,

```
# Authentication via password

```json

"jenkins.pipeline.linter.connector.url": "https://jenkins.local/pipeline-model-converter/validate",
"jenkins.pipeline.linter.connector.crumbUrl": "https://jenkins.local/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,%22:%22,//crumb)",
"jenkins.pipeline.linter.connector.pass": "_Users-Password_",
"jenkins.pipeline.linter.connector.user": "_Username_",
"jenkins.pipeline.linter.connector.strictssl": true,

```


## Contributors

* [Asif Kamran Malick](https://github.com/akmalick)
* [backbasejeff](https://github.com/backbasejeff)
* [Blake Easley](https://github.com/Jimmyscene)
* [Draco Boreus](https://github.com/dracoBoreus)
* [Tomáš Hartmann](https://github.com/cvakiitho)
* [John Pastore](https://github.com/john-pastore)

## Release Notes

### 1.2.0
Added token based authentication.

### 1.1.7
Fixed error in readme.

### 1.1.6

Clear output before run.

### 1.1.5

Mask manual password input.

### 1.1.4

Added possibility to leave password option blank, when setting user name.

### 1.1.3

Added option to disable strict ssl validation.

### 1.1.2

Changed readme.

### 1.1.1

Changed dependency of url-parse for potential security problem.

### 1.1.0

Added the possibility to add the crumbUrl for Jenkins installations with active CRSF protection.

### 1.0.4

Changed output channel.

### 1.0.3

Bugfixes.

### 1.0.2

Bugfixes.

### 1.0.1

Bugfixes.

### 1.0.0

Initial release of jenkins-pipeline-linter-connector.
