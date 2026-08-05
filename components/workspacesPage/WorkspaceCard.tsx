import { Bookmark, MapPin, Monitor, Users, Video, Wifi } from 'lucide-react';
import Image from 'next/image';

type WorkspaceCardProps = {
  name: string;
  type: string;
  location: string;
  capacity: number;
  image: string;
  available: boolean;
};

export default function WorkspaceCard({
  name,
  type,
  location,
  capacity,
  image,
  available,
}: WorkspaceCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="relative h-48">
        <Image src={image} alt={name} height={20} width={20} />

        <span className="absolute left-3 top-3 rounded-full bg-violet-500 px-3 py-1 text-xs font-medium text-white">
          {type}
        </span>

        <button className="absolute right-3 top-3 text-white">
          <Bookmark size={20} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>

        <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
          <MapPin size={15} />
          <span>{location}</span>
        </div>

        <div className="mt-3 flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-1 text-sm">
            <Users size={16} />
            <span>{capacity} people</span>
          </div>

          <Monitor size={16} />
          <Video size={16} />
          <Wifi size={16} />
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div
            className={`flex items-center gap-2 text-sm font-medium ${
              available ? 'text-emerald-800' : 'text-orange-500'
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                available ? 'bg-emerald-800' : 'bg-orange-500'
              }`}
            />

            {available ? 'Available now' : 'Unavailable'}
          </div>

          <button className="rounded-lg bg-[#44777d] px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 cursor-pointer">
            View details
          </button>
        </div>
      </div>
    </div>
  );
}
