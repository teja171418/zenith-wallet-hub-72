import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
  };
  color?: 'primary' | 'success' | 'warning' | 'destructive';
}
const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  color = 'primary'
}: StatsCardProps) => {
  const colorClasses = {
    primary: 'from-primary to-primary-dark',
    success: 'from-success to-green-600',
    warning: 'from-warning to-orange-600',
    destructive: 'from-destructive to-red-600'
  };
  return <Card className="glass-card hover-scale animate-fade-in">
      <div className="p-6 bg-card">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          {trend && <div className="text-right">
              <p className={`text-xs font-medium ${trend.value >= 0 ? 'text-success' : 'text-destructive'}`}>
                {trend.value >= 0 ? '+' : ''}{trend.value}%
              </p>
              <p className="text-xs text-muted-foreground">{trend.label}</p>
            </div>}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </Card>;
};
export default StatsCard;