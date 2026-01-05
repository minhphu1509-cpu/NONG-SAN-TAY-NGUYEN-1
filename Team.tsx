
import React from 'react';
import { TeamMember } from '../types';

interface TeamProps {
  team: TeamMember[];
}

const Team: React.FC<TeamProps> = ({ team }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 brand-font text-stone-800 uppercase">Đội Ngũ Tâm Huyết</h1>
        <div className="w-24 h-1 bg-green-700 mx-auto mb-8"></div>
        <p className="text-stone-500 max-w-3xl mx-auto text-lg">Hội tụ những con người có tình yêu mãnh liệt với đất và cà phê, chúng tôi cùng nhau kiến tạo những giá trị sạch cho cộng đồng.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {team.map((member, i) => (
          <div key={i} className="group">
            <div className="aspect-[4/5] overflow-hidden rounded-[50px] mb-8 shadow-2xl relative">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-10">
                <p className="text-white font-medium italic text-sm">"Tâm huyết trong từng hạt mầm"</p>
              </div>
            </div>
            <div className="text-center px-4">
              <h3 className="text-3xl font-bold text-stone-800 mb-2 brand-font">{member.name}</h3>
              <p className="text-green-700 font-bold text-xs uppercase tracking-[0.2em] mb-6">{member.role}</p>
              <p className="text-stone-500 italic text-sm leading-relaxed">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
