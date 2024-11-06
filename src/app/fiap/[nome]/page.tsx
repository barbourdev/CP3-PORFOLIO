"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Fiap({ params }: { params: Promise<{ nome: string }> }) {
  const [nome, setNome] = useState<string | null>(null);
  const [atividades, setAtividades] = useState<{ id: string; nome: string; dataEntrega: string; nota: string; feedback: string }[]>([]);
  const [novaAtividade, setNovaAtividade] = useState({ nome: "", dataEntrega: "", nota: "", feedback: "" });

  useEffect(() => {
    params.then((resolvedParams) => {
      setNome(resolvedParams.nome);
      fetchAtividades(resolvedParams.nome);
    });
  }, [params]);

  const fetchAtividades = async (nome: string) => {
    const response = await fetch(`/api/atividades/${nome}`);
    const data = await response.json();
    setAtividades(data);
  };

  const handleAddAtividade = async () => {
    const response = await fetch(`/api/atividades/${nome}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novaAtividade),
    });
    const data = await response.json();
    setAtividades([...atividades, data]);
    setNovaAtividade({ nome: "", dataEntrega: "", nota: "", feedback: "" });
  };

  return (
    <div className="flex flex-row min-h-screen">
      <div className="w-full md:w-1/6 bg-white flex flex-col items-center p-8 md:sticky md:top-0">
        <div className="p-4 md:w-full bg-white">
        <Link href={`/portfolios/portfolio/${nome}`}><p className="font-bold text-slate-500 hover:text-black">Voltar | GitHub</p></Link>
          <h2 className="text-2xl font-semibold mb-4">Cadastrar Atividade</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleAddAtividade(); }}>
            <label>Atividade</label>
            <input
              type="text"
              placeholder="Nome"
              value={novaAtividade.nome}
              onChange={(e) => setNovaAtividade({ ...novaAtividade, nome: e.target.value })}
              className="border p-2 mb-2 w-full"
              required
            />
            <label>Data Entregue</label>
            <input
              type="date"
              placeholder="Data de Entrega"
              value={novaAtividade.dataEntrega}
              onChange={(e) => setNovaAtividade({ ...novaAtividade, dataEntrega: e.target.value })}
              className="border p-2 mb-2 w-full"
              required
            />
            <label>Nota</label>
            <input
              type="number"
              placeholder="Nota"
              value={novaAtividade.nota}
              onChange={(e) => setNovaAtividade({ ...novaAtividade, nota: e.target.value })}
              className="border p-2 mb-2 w-full"
              required
            />
            <label>Feedback</label>
            <textarea
              placeholder="Feedback"
              value={novaAtividade.feedback}
              onChange={(e) => setNovaAtividade({ ...novaAtividade, feedback: e.target.value })}
              className="border p-2 mb-2 w-full"
              required
            />
            <button type="submit" className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-slate-50 hover:text-black transition duration-300">
              Adicionar
            </button>
          </form>
        </div>
      </div>
      <div className="w-full md:w-3/4 p-8">
        <h2 className="text-3xl font-bold mb-6">FIAP | {nome}</h2>
        {atividades.length === 0 ? (
          <p className="text-gray-500 text-lg">Nenhuma atividade cadastrada.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {atividades.map((atividade) => (
              <div key={atividade.id} className="bg-white rounded-lg shadow p-4">
                <h3 className="text-lg font-bold">{atividade.nome}</h3>
                <p>Data de Entrega: {atividade.dataEntrega}</p>
                <p>Nota: {atividade.nota}</p>
                <p>Feedback: {atividade.feedback}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
