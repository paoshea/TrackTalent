import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description: string;
}

export function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  link,
}: MetricCardProps & { link?: string }) {
  const Component = link ? 'a' : 'div';
  return (
    <Component 
      href={link}
      className="bg-white rounded-lg shadow p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-indigo-500 rounded-full">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600">{description}</p>
    </div>
  );
}
