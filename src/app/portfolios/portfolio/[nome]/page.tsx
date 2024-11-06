"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";

interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  created_at: string;
}

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Sao_Paulo',
    };
    return new Intl.DateTimeFormat('pt-BR', options).format(date);
  }

export default function Portfolio({ params }: { params: Promise<{ nome: string }> }) {
    const [nome, setNome] = useState<string | null>(null);
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [userAvatar, setUserAvatar] = useState('');

    useEffect(() => {
      params.then((resolvedParams) => {
        setNome(resolvedParams.nome);
        fetchUserRepos(resolvedParams.nome);
        fetchUserData(resolvedParams.nome);
      });
    }, [params]);

    // Função para buscar os repositórios do usuário
const fetchUserRepos = async (username: string) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos`, {
      });
      const data = await response.json();

      // Formatação da data para cada repositório
    const formattedData: Repository[] = data.map((repo: Repository) => ({
      ...repo,
      created_at: formatDate(repo.created_at),
    }));

      setRepos(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar repositórios:", error);
      setLoading(false);
    }
  };

    const fetchUserData = async (username: string) => {
        try {
          const response = await fetch(`https://api.github.com/users/${username}`, {
          });
          const data = await response.json();
          setUserAvatar(data.avatar_url);
          setLoading(false);
        } catch (error) {
          console.error("Erro ao buscar perfil:", error);
          setLoading(false);
        }
    };
    if (loading) return <div>Carregando...</div>;

    return (
        <div className="flex flex-col md:flex-row bg-gray-100">
          {/* Sidebar */}
          <div className="w-full md:w-1/6 bg-white flex flex-col items-center p-8 md:sticky md:top-0">
            {userAvatar && (
              <Image src={userAvatar} alt="User Avatar" width={100} height={100} className="rounded-full mb-4" priority />
            )}
            <h1 className="text-2xl font-semibold text-center">{nome}</h1>
            <div className="flex space-x-4 mt-5">
              <a href={`https://github.com/${nome}`} target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} className="text-slate-500 hover:text-black transition duration-300" />
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 p-8">
            <h2 className="text-3xl font-bold mb-6">Repositórios - GitHub</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo) => (
                <div key={repo.id} className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-xl font-semibold">{repo.name}</h3>
                  <p className="text-gray-600">{repo.description || "Sem descrição disponível"}</p>
                  <p className="text-sm text-gray-500 mt-2">Linguagem: {repo.language || "N/A"}</p>
                  <p className="text-sm text-gray-500 mt-2">Data de Criação: {repo.created_at || "N/A"}</p>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-4 text-blue-600 hover:underline"
                  >
                    Ver Repositório
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
