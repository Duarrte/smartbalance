import React, { useState, useMemo } from 'react';
import Navbar from '../components/Navbar';
import SummaryCard from '../components/SummaryCard';
import TransactionModal from '../components/TransactionModal';
import { DollarSignIcon, ArrowUpIcon, ArrowDownIcon, SearchIcon, FilterIcon, PlusIcon } from '../assets/icons';
import { formatCurrency, formatDate } from '../utils/formatters';
import type { Transaction, TransactionType } from '../types/transaction';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Transicao: React.FC = () => {
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('smart-balance-data', []);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | TransactionType>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Lógica de Cálculos
  const stats = useMemo(() => {
    let income = 0; let expense = 0;
    transactions.forEach(t => t.type === 'in' ? income += t.amount : expense += t.amount);
    return { income, expense, balance: 150 + income + expense };
  }, [transactions]);

  // Filtragem
  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(t => {
        const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              t.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || t.type === filterType;
        return matchesSearch && matchesType;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchTerm, filterType]);

  const handleSave = (transaction: Transaction) => {
    setTransactions(prev => {
      const exists = prev.find(t => t.id === transaction.id);
      if (exists) return prev.map(t => t.id === transaction.id ? transaction : t);
      return [transaction, ...prev];
    });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Excluir esta transação?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-gray-900 border-b pb-3">📊 Dashboard Financeiro</h1>
        
        <section className="flex flex-wrap gap-6 mb-10">
          <SummaryCard title="Saldo Total" value={formatCurrency(stats.balance)} icon={DollarSignIcon} colorClass="border-indigo-600" desc="Capital total hoje." />
          <SummaryCard title="Receitas" value={formatCurrency(stats.income)} icon={ArrowUpIcon} colorClass="border-green-600" desc="Entradas do mês." />
          <SummaryCard title="Despesas" value={formatCurrency(stats.expense)} icon={ArrowDownIcon} colorClass="border-red-600" desc="Saídas do mês." />
        </section>

        <section className="mb-8 p-6 bg-white shadow-2xl rounded-2xl border border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative grow sm:max-w-sm">
            <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Buscar..." className="border rounded-xl px-4 py-3 pl-12 w-full focus:ring-4 focus:ring-indigo-100 outline-none transition" />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          
          <div className="flex gap-3">
            <div className="relative">
              <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="bg-indigo-50 text-indigo-700 font-semibold px-4 py-3 rounded-xl flex items-center gap-2 border border-indigo-200">
                <FilterIcon className="h-4 w-4" /> {filterType === 'all' ? 'Todos' : filterType === 'in' ? 'Entradas' : 'Saídas'}
              </button>
              {isFilterOpen && (
                <ul className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-2xl z-10 overflow-hidden">
                  {['all', 'in', 'out'].map(type => (
                    <li key={type} onClick={() => { setFilterType(type as any); setIsFilterOpen(false); }} className="px-4 py-2 hover:bg-gray-50 cursor-pointer capitalize">
                      {type === 'all' ? 'Todos' : type === 'in' ? 'Entradas' : 'Saídas'}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button onClick={() => { setEditingTransaction(null); setIsModalOpen(true); }} className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-indigo-700 shadow-lg transition">
              <PlusIcon className="h-4 w-4" /> Nova
            </button>
          </div>
        </section>

        <section className="bg-white shadow-2xl rounded-2xl overflow-hidden border">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Data</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Descrição</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase">Valor</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredTransactions.map(t => (
                  <tr key={t.id} className="hover:bg-indigo-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(t.date)}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{t.description}</div>
                      <div className="text-xs text-gray-400">{t.category}</div>
                    </td>
                    <td className={`px-6 py-4 text-right text-sm font-extrabold ${t.type === 'in' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.type === 'in' ? '+' : '-'} {formatCurrency(t.amount)}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <button onClick={() => { setEditingTransaction(t); setIsModalOpen(true); }} className="text-indigo-600 mr-3">Editar</button>
                      <button onClick={() => handleDelete(t.id)} className="text-red-500">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} editingTransaction={editingTransaction} />
    </div>
  );
};

export default Transicao;