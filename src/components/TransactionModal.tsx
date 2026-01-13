import React, { useState, useEffect } from 'react';
import { XIcon } from '../assets/icons';
import type { Transaction } from '../types/transaction';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
  editingTransaction: Transaction | null;
}

const TransactionModal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, editingTransaction }) => {
  const [formData, setFormData] = useState<Partial<Transaction>>({
    description: '',
    category: 'Outros',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    type: 'out',
  });

  useEffect(() => {
    if (editingTransaction) {
      setFormData({
        ...editingTransaction,
        amount: Math.abs(editingTransaction.amount),
        date: editingTransaction.date.split('T')[0]
      });
    } else {
      setFormData({ description: '', category: 'Outros', amount: 0, date: new Date().toISOString().split('T')[0], type: 'out' });
    }
  }, [editingTransaction, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) || 0 : value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-3xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{editingTransaction ? 'Editar' : 'Nova'} Transação</h2>
          <button onClick={onClose}><XIcon className="h-6 w-6 text-gray-400 hover:text-gray-600" /></button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const finalAmount = formData.type === 'out' ? -Math.abs(formData.amount!) : Math.abs(formData.amount!);
          onSave({ ...formData, id: editingTransaction?.id || Date.now(), amount: finalAmount } as Transaction);
          onClose();
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Descrição</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 p-3" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Valor (R$)</label>
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} step="0.01" required className="mt-1 block w-full rounded-lg border border-gray-300 p-3" />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Data</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required className="mt-1 block w-full rounded-lg border border-gray-300 p-3" />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Tipo</label>
              <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-300 p-3 bg-white">
                <option value="in">Entrada</option>
                <option value="out">Saída</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Categoria</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full rounded-lg border border-gray-300 p-3" />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-lg">Salvar Transação</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;