import { useState } from "react";
import StatsCard from "@/components/StatsCard";
import ExpenseCard from "@/components/ExpenseCard";
import QuickActions from "@/components/QuickActions";
import ExpenseChart from "@/components/ExpenseChart";
import QRScanner from "@/components/QRScanner";
import PersonalPaymentHistory from "@/components/PersonalPaymentHistory";
import MoneyManagement from "@/components/MoneyManagement";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, TrendingUp, TrendingDown, Users, Calendar, Search, Filter, Plus } from "lucide-react";
interface DashboardProps {
  mode?: 'group' | 'personal';
}
const Dashboard = ({
  mode = 'group'
}: DashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Enhanced Mock Data with realistic scenarios
  const statsData = {
    group: [{
      title: "Outstanding Balance",
      value: "₹3,840",
      icon: Wallet,
      trend: {
        value: -18.2,
        label: "reduced this month"
      },
      color: 'success' as const
    }, {
      title: "You Owe",
      value: "₹1,250",
      icon: TrendingDown,
      trend: {
        value: 5.8,
        label: "vs last month"
      },
      color: 'destructive' as const
    }, {
      title: "You're Owed",
      value: "₹2,590",
      icon: TrendingUp,
      trend: {
        value: 22.4,
        label: "vs last month"
      },
      color: 'success' as const
    }, {
      title: "Active Groups",
      value: "4",
      icon: Users,
      color: 'primary' as const,
      subtitle: "Family, Office, Trip, Friends"
    }],
    personal: [{
      title: "Available Balance",
      value: "₹47,320",
      icon: Wallet,
      trend: {
        value: 8.4,
        label: "vs last month"
      },
      color: 'success' as const
    }, {
      title: "This Month Income",
      value: "₹65,000",
      icon: TrendingUp,
      trend: {
        value: 0,
        label: "salary + freelance"
      },
      color: 'success' as const
    }, {
      title: "This Month Spent",
      value: "₹28,680",
      icon: TrendingDown,
      trend: {
        value: -12.3,
        label: "vs last month"
      },
      color: 'warning' as const
    }, {
      title: "Savings Goal",
      value: "78%",
      icon: Calendar,
      color: 'primary' as const,
      subtitle: "₹31,000 of ₹40,000"
    }]
  };
  const recentExpenses = {
    group: [{
      id: '1',
      title: 'Weekend Trip to Goa',
      amount: 8400,
      type: 'expense' as const,
      category: 'Travel',
      date: '2024-01-20',
      description: 'Hotel, food and activities for 3 days',
      paidBy: 'Rahul',
      splitBetween: ['Rahul', 'Priya', 'Amit', 'Sneha'],
      status: 'settled'
    }, {
      id: '2',
      title: 'Office Lunch',
      amount: 1680,
      type: 'expense' as const,
      category: 'Food',
      date: '2024-01-19',
      description: 'Team lunch at Pizza Hut',
      paidBy: 'Amit',
      splitBetween: ['Amit', 'Pooja', 'Vikash', 'Ravi', 'Neha', 'Kiran'],
      status: 'pending'
    }, {
      id: '3',
      title: 'Apartment Rent',
      amount: 12000,
      type: 'expense' as const,
      category: 'Housing',
      date: '2024-01-01',
      description: 'Monthly rent split',
      paidBy: 'Priya',
      splitBetween: ['Priya', 'Sneha', 'Kavya'],
      status: 'partial'
    }],
    personal: [{
      id: '1',
      title: 'Freelance Project Payment',
      amount: 25000,
      type: 'income' as const,
      category: 'Work',
      date: '2024-01-18',
      description: 'Web development project completion'
    }, {
      id: '2',
      title: 'Swiggy Order',
      amount: 420,
      type: 'expense' as const,
      category: 'Food',
      date: '2024-01-19',
      description: 'Dinner from favorite restaurant'
    }, {
      id: '3',
      title: 'Netflix Subscription',
      amount: 649,
      type: 'expense' as const,
      category: 'Entertainment',
      date: '2024-01-15',
      description: 'Monthly subscription renewal'
    }, {
      id: '4',
      title: 'Salary Credit',
      amount: 40000,
      type: 'income' as const,
      category: 'Salary',
      date: '2024-01-01',
      description: 'Monthly salary from company'
    }]
  };
  const chartData = {
    group: [{
      name: 'Food & Dining',
      value: 12400,
      color: '#10b981'
    }, {
      name: 'Travel & Transport',
      value: 8900,
      color: '#3b82f6'
    }, {
      name: 'Entertainment',
      value: 4200,
      color: '#8b5cf6'
    }, {
      name: 'Housing',
      value: 15000,
      color: '#ef4444'
    }, {
      name: 'Shopping',
      value: 3200,
      color: '#f59e0b'
    }],
    personal: [{
      name: 'Food & Dining',
      value: 8200,
      color: '#10b981'
    }, {
      name: 'Transportation',
      value: 3400,
      color: '#3b82f6'
    }, {
      name: 'Entertainment',
      value: 2100,
      color: '#8b5cf6'
    }, {
      name: 'Shopping',
      value: 4800,
      color: '#f59e0b'
    }, {
      name: 'Bills & Utilities',
      value: 6200,
      color: '#ef4444'
    }, {
      name: 'Health & Fitness',
      value: 1500,
      color: '#06b6d4'
    }]
  };
  const currentStats = statsData[mode];
  const currentExpenses = recentExpenses[mode];
  const currentChart = chartData[mode];
  if (mode === 'personal') {
    return <div className="space-y-8 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentStats.map((stat, index) => <StatsCard key={index} {...stat} />)}
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-green-400">
            <TabsTrigger value="overview" className="bg-neutral-50 text-zinc-950">Overview</TabsTrigger>
            <TabsTrigger value="payments" className="text-slate-950 bg-gray-50">QR Payments</TabsTrigger>
            <TabsTrigger value="history" className="text-slate-950 bg-slate-50">Payment History</TabsTrigger>
            <TabsTrigger value="money" className="text-gray-950 bg-gray-50">Money Management</TabsTrigger>
            <TabsTrigger value="insights" className="bg-gray-50 text-gray-950">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <QuickActions mode={mode} />
              </div>
              <div className="lg:col-span-2">
                <ExpenseChart type="pie" data={currentChart} title="Personal Expense Breakdown" />
              </div>
            </div>
            
            {/* Recent Personal Expenses */}
            <Card className="glass-card animate-slide-up mt-6">
              <div className="p-6 bg-green-600">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-card-foreground">Recent Personal Expenses</h3>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input placeholder="Search expenses..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64 bg-green-400" />
                    </div>
                    <Button variant="outline" size="sm" className="text-gray-950">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Expense
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  {currentExpenses.map(expense => <ExpenseCard key={expense.id} {...expense} />)}
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="payments" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <QRScanner />
              <Card className="glass-card">
                <div className="p-6 bg-green-400">
                  <h3 className="text-lg font-semibold mb-4">Quick Payment Options</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-zinc-100 text-slate-950">
                      <Wallet className="h-4 w-4 mr-2" />
                      Pay to Contact
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-gray-950">
                      <Users className="h-4 w-4 mr-2" />
                      Split Bill
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-zinc-950">
                      <Calendar className="h-4 w-4 mr-2" />
                      Pay Bills
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-6">
            <PersonalPaymentHistory />
          </TabsContent>
          
          <TabsContent value="money" className="mt-6">
            <MoneyManagement />
          </TabsContent>
          
          <TabsContent value="insights" className="mt-6">
            <Card className="glass-card">
              <div className="p-6 bg-green-500">
                <h3 className="text-lg font-semibold mb-4">Personal Finance Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20 animate-fade-in">
                    <h4 className="font-medium text-success mb-1">Smart Spending 🎯</h4>
                    <p className="text-sm text-muted-foreground">You spend 28% less on weekdays. Great discipline!</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 animate-fade-in">
                    <h4 className="font-medium text-primary mb-1">Savings Goal 💰</h4>
                    <p className="text-sm text-muted-foreground">₹9,000 more to reach monthly target</p>
                  </div>
                  <div className="p-4 bg-warning/10 rounded-lg border border-warning/20 animate-fade-in">
                    <h4 className="font-medium text-warning mb-1">Budget Watch ⚠️</h4>
                    <p className="text-sm text-muted-foreground">Shopping budget 85% used this month</p>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 animate-fade-in">
                    <h4 className="font-medium text-green-600 mb-1">Best Category 📊</h4>
                    <p className="text-sm text-muted-foreground">Transportation costs down 40%</p>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 animate-fade-in">
                    <h4 className="font-medium text-blue-600 mb-1">Investment Ready 📈</h4>
                    <p className="text-sm text-muted-foreground">Consider mutual funds for surplus ₹18K</p>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 animate-fade-in">
                    <h4 className="font-medium text-purple-600 mb-1">Monthly Streak 🔥</h4>
                    <p className="text-sm text-muted-foreground">12 days of expense tracking!</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>;
  }
  return <div className="space-y-8 py-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentStats.map((stat, index) => <StatsCard key={index} {...stat} />)}
      </div>

      {/* Quick Actions & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <QuickActions mode={mode} />
        </div>
        <div className="lg:col-span-2">
          <ExpenseChart type="pie" data={currentChart} title="Group Expense Breakdown" />
        </div>
      </div>

      {/* Recent Expenses */}
      <Card className="glass-card animate-slide-up">
        <div className="p-6 bg-[#2ddd1d]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-card-foreground">Recent Group Expenses</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search expenses..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 w-64 bg-green-400" />
              </div>
              <Button variant="outline" size="sm" className="text-gray-950">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {currentExpenses.map(expense => <ExpenseCard key={expense.id} {...expense} />)}
          </div>
        </div>
      </Card>
    </div>;
};
export default Dashboard;