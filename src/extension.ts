'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    let request = require('request');
    let fs = require('fs');

    let lastInput: string;

    let validate = vscode.commands.registerCommand('jenkins.pipeline.linter.connector.validate', async () => {

        let url = vscode.workspace.getConfiguration().get('jenkins.pipeline.linter.connector.url') as string | undefined;
        let user = vscode.workspace.getConfiguration().get('jenkins.pipeline.linter.connector.user') as string | undefined;
        let pass = vscode.workspace.getConfiguration().get('jenkins.pipeline.linter.connector.pass') as string | undefined;

        if (url === undefined || url.length === 0) {
            url = await vscode.window.showInputBox({ prompt: 'Enter Jenkins Pipeline Linter Url.', value: lastInput });
        }
        if (url !== undefined && url.length > 0) {
            lastInput = url;
            let activeTextEditor = vscode.window.activeTextEditor;
            if (activeTextEditor !== undefined) {
                let path = activeTextEditor.document.uri.fsPath;
                let filestream = fs.createReadStream(path);
                const chunks: any = [];
                filestream.on('data', (chunk: any) => {
                    chunks.push(chunk.toString());
                });
                filestream.on('end', () => {
                    let options: any = {
                        method: 'POST',
                        url: url,
                        formData: {
                            'jenkinsfile': chunks.join()
                        }
                    };
                    if(user !== undefined && user.length > 0 && pass !== undefined && pass.length > 0) {
                        options.auth = {
                            'user': user,
                            'pass': pass
                        };
                    }
                    request(options, (err: any, httpResponse: any, body: any) => {
                        if (err) {
                            vscode.window.showErrorMessage(err);
                        } else {
                            if (body.startsWith('Jenkinsfile successfully validated.')) {
                                vscode.window.showInformationMessage(body);
                            } else {
                                vscode.window.showWarningMessage(body);
                            }
                        }
                    });
                });
            } else {
                vscode.window.showErrorMessage('No active text editor. Open the jenkinsfile you want to validate.');
            }
        } else {
            vscode.window.showErrorMessage('Jenkins Pipeline Linter Url is not defined.');
        }

    });
    context.subscriptions.push(validate);
}

// this method is called when your extension is deactivated
export function deactivate() {
}