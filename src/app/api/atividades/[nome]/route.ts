import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { nome: string } }) {
    const { nome } = await context.params;
    const file = await fs.readFile(process.cwd() + "/src/data/base.json", "utf-8");
    const dados = JSON.parse(file);
    const user = dados.find((user: { user: string }) => user.nome === nome);
    return NextResponse.json(user ? user.atividades : []);
}

export async function POST(request: Request, context: { params: { nome: string } }) {
    const { nome } = await context.params;
    const file = await fs.readFile(process.cwd() + "/src/data/base.json", "utf-8");
    const dados = JSON.parse(file);
    const userIndex = dados.findIndex((user: { nome: string; }) => user.nome === nome);

    const atividade = await request.json();
    atividade.id = userIndex !== -1 && dados[userIndex].atividades.length
        ? dados[userIndex].atividades[dados[userIndex].atividades.length - 1].id + 1
        : 1;

    if (userIndex !== -1) {
        dados[userIndex].atividades.push(atividade);
    } else {
        dados.push({ nome: nome, atividades: [atividade] });
    }

    await fs.writeFile(process.cwd() + "/src/data/base.json", JSON.stringify(dados));
    return NextResponse.json(atividade, { status: 201 });
}

export async function DELETE(request: Request, context: { params: { nome: string, id: number } }) {
    const { nome, id } = await context.params;
    const file = await fs.readFile(process.cwd() + "/src/data/base.json", "utf-8");
    const dados = JSON.parse(file);
    const userIndex = dados.findIndex((user: { nome: string; }) => user.nome === nome);

    if (userIndex !== -1) {
        dados[userIndex].atividades = dados[userIndex].atividades.filter((atividade: { id: number }) => atividade.id !== id);
        await fs.writeFile(process.cwd() + "/src/data/base.json", JSON.stringify(dados));
        return NextResponse.json({ message: "Atividade deletada com sucesso" }, { status: 200 });
    } else {
        return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }
}

export async function PUT(request: Request, context: { params: { nome: string, id: number } }) {
    const { nome, id } = await context.params;
    const file = await fs.readFile(process.cwd() + "/src/data/base.json", "utf-8");
    const dados = JSON.parse(file);
    const userIndex = dados.findIndex((user: { nome: string; }) => user.nome === nome);

    if (userIndex !== -1) {
        const atividadeIndex = dados[userIndex].atividades.findIndex((atividade: { id: number }) => atividade.id === id);
        if (atividadeIndex !== -1) {
            const updatedAtividade = await request.json();
            dados[userIndex].atividades[atividadeIndex] = { ...dados[userIndex].atividades[atividadeIndex], ...updatedAtividade };
            await fs.writeFile(process.cwd() + "/src/data/base.json", JSON.stringify(dados));
            return NextResponse.json(dados[userIndex].atividades[atividadeIndex], { status: 200 });
        } else {
            return NextResponse.json({ message: "Atividade não encontrada" }, { status: 404 });
        }
    } else {
        return NextResponse.json({ message: "Usuário não encontrado" }, { status: 404 });
    }
}
