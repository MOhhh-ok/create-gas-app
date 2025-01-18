import readline from 'readline';

// ユーザーから入力を受け付ける
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export async function prompt(question: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(question, (dirName) => {
            rl.close();
            resolve(dirName);
        });
    });
}
