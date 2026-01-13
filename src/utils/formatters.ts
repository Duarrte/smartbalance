export const formatCurrency = (value: number): string => {
  const absoluteValue = Math.abs(value);
  if (absoluteValue === 0) return "R$ 0,00";
  return `R$ ${absoluteValue.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });
};