'use client';

import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ROIResult {
  investment: number;
  productivityGain: number;
  timeSaved: number;
  roi: number;
  breakEvenMonths: number;
  yearlySavings: number;
}

const COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399'];

export default function Home() {
  const [employees, setEmployees] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(50);
  const [aiCost, setAiCost] = useState(200);
  const [hoursSavedPerWeek, setHoursSavedPerWeek] = useState(5);
  const [result, setResult] = useState<ROIResult | null>(null);

  const calculateROI = () => {
    const weeklyTimeSaved = employees * hoursSavedPerWeek;
    const monthlyTimeSaved = weeklyTimeSaved * 4;
    const monthlySavings = monthlyTimeSaved * hourlyRate;
    const monthlyInvestment = aiCost;
    const netMonthlySavings = monthlySavings - monthlyInvestment;
    const roi = ((netMonthlySavings / monthlyInvestment) * 100);
    const yearlySavings = netMonthlySavings * 12;
    const breakEven = monthlyInvestment > 0 ? Math.max(1, Math.ceil(monthlyInvestment / monthlySavings)) : 0;

    setResult({
      investment: monthlyInvestment,
      productivityGain: monthlySavings,
      timeSaved: monthlyTimeSaved,
      roi: roi,
      breakEvenMonths: breakEven,
      yearlySavings: yearlySavings
    });
  };

  const chartData = result ? [
    { name: 'Custo AI', value: result.investment },
    { name: 'Economia Mensal', value: result.productivityGain },
  ] : [];

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-cyan-400 mb-2">
          🤖 AI ROI Calculator
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Descubra o retorno real do investimento em ferramentas de IA
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Parâmetros</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm mb-1">Número de funcionários usando AI</label>
                <input
                  type="number"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-1">Custo/hora por funcionário (R$)</label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-1">Custo mensal ferramentas AI (R$)</label>
                <input
                  type="number"
                  value={aiCost}
                  onChange={(e) => setAiCost(Number(e.target.value))}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-sm mb-1">Horas economizadas por semana (por func.)</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={hoursSavedPerWeek}
                  onChange={(e) => setHoursSavedPerWeek(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-cyan-400 text-center">{hoursSavedPerWeek}h/semana</div>
              </div>

              <button
                onClick={calculateROI}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 rounded-lg transition-all"
              >
                Calcular ROI
              </button>
            </div>
          </div>

          {/* Resultados */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold text-white mb-4">Resultados</h2>
            
            {result ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-slate-400 text-xs">ROI Mensal</div>
                    <div className={`text-2xl font-bold ${result.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {result.roi.toFixed(1)}%
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-slate-400 text-xs">Payback</div>
                    <div className="text-2xl font-bold text-cyan-400">
                      {result.breakEvenMonths} {result.breakEvenMonths === 1 ? 'mês' : 'meses'}
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-slate-400 text-xs">Economia Anual</div>
                    <div className="text-2xl font-bold text-green-400">
                      R$ {result.yearlySavings.toLocaleString('pt-BR')}
                    </div>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg p-4">
                    <div className="text-slate-400 text-xs">Horas/Mês</div>
                    <div className="text-2xl font-bold text-purple-400">
                      {result.timeSaved}h
                    </div>
                  </div>
                </div>

                <div className="h-48 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#fff' }}
                      />
                      <Bar dataKey="value" fill="#22d3ee" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {result.roi < 0 && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">
                    ⚠️ O investimento não se paga neste cenário. Considere aumentar as horas economizadas ou reduzir custos.
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-slate-500 py-12">
                Preencha os parâmetros e clique em &quot;Calcular ROI&quot;
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-slate-800/30 rounded-xl p-4 border border-slate-700">
          <p className="text-slate-400 text-sm text-center">
            💡 <strong>Nota:</strong> {result && result.roi >= 0 ? 'Parabéns!' : 'Conforme o paradoxo de Solow,'} a maioria das empresas não vê impacto de AI na produtividade. 
            Use esta ferramenta para medir e justificar seu investimento em IA.
          </p>
        </div>
      </div>
    </main>
  );
}
