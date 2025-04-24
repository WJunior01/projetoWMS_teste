import { Cuboid as Cube } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-white">
      <Cube size={28} className="text-white" />
      <span className="text-2xl font-bold">girowms</span>
    </Link>
  );
}