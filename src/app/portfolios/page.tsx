'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface UserData {
  id: number;
  login: string;
  avatar_url: string;
  bio: string | null;
}

const githubUsers = [
  { username: 'barbourdev' },
  { username: 'Wmoreira-m' },
  { username: 'JulioDev01' },
  { username: 'kaiquepintor' },
  { username: 'BrennoVilela' },
];

export default function Portfolios() {
  const [userData, setUserData] = useState<UserData[]>([]);

  useEffect(() => {
    // Função para buscar dados dos usuários do GitHub
    const fetchUserData = async () => {
      const data = await Promise.all(
        githubUsers.map(async (user) => {
          const response = await fetch(`https://api.github.com/users/${user.username}`);
          const userData = await response.json();
          return userData as UserData; // Faz o casting para UserData
        })
      );
      setUserData(data);
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Portfólios</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {userData.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
            <Image src={user.avatar_url} alt={`${user.login}'s avatar`} className="w-24 h-24 rounded-full mx-auto mb-4" width={120} height={120}/>
            <h2 className="text-xl font-semibold text-center">{user.login}</h2>
            <p className="text-gray-600 text-center mb-4">{user.bio || 'Sem bio disponível'}</p>

            <Link href={`/portfolios/portfolio/${user.login}`}>
              <button className="w-full bg-black text-white font-semibold py-2 rounded-lg hover:bg-slate-50 hover:text-black transition duration-300">
                Ver Portfólio
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
