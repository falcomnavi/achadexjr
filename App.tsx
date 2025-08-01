import React, { useState, useCallback } from 'react';
import { Delivery, DeliveryStatus, PaymentMethod } from './types';
import useLocalStorage from './hooks/useLocalStorage';
import Header from './components/Header';
import DeliveryList from './components/DeliveryList';
import AddDeliveryModal from './components/AddDeliveryModal';
import QrCodeModal from './components/QrCodeModal';
import { PlusIcon } from './components/icons';

const getSampleData = (): Delivery[] => [
    {
        id: '1',
        recipientName: 'João Silva',
        address: 'Rua das Flores, 123, São Paulo, SP',
        packageDescription: 'Livro de ficção científica e um par de fones de ouvido.',
        status: DeliveryStatus.EmTransito,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        deliveryPerson: 'Marcos',
        paymentMethod: PaymentMethod.CartaoCredito,
        deliveryFee: 15.50,
        notes: 'Cliente pediu para deixar na portaria.'
    },
    {
        id: '2',
        recipientName: 'Maria Oliveira',
        address: 'Avenida Brasil, 456, Rio de Janeiro, RJ',
        packageDescription: 'Roupas e acessórios de moda.',
        status: DeliveryStatus.Pendente,
        createdAt: new Date().toISOString(),
        deliveryPerson: 'Ana',
        paymentMethod: PaymentMethod.Pix,
        deliveryFee: 12.00,
    },
    {
        id: '3',
        recipientName: 'Carlos Pereira',
        address: 'Praça da Sé, 789, Salvador, BA',
        packageDescription: 'Componentes eletrônicos para computador.',
        status: DeliveryStatus.Entregue,
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
        deliveryPerson: 'Marcos',
        paymentMethod: PaymentMethod.Dinheiro,
        deliveryFee: 25.00,
        notes: 'Entregue em mãos.'
    },
    {
        id: '4',
        recipientName: 'Ana Costa',
        address: 'Rua da Praia, 101, Porto Alegre, RS',
        packageDescription: 'Equipamento fotográfico.',
        status: DeliveryStatus.Falha,
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        deliveryPerson: 'Ana',
        paymentMethod: PaymentMethod.CartaoDebito,
        deliveryFee: 18.75,
        notes: 'Destinatário ausente na primeira tentativa.'
    },
];

const App: React.FC = () => {
  const [deliveries, setDeliveries] = useLocalStorage<Delivery[]>('deliveries', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQrModalOpen, setQrModalOpen] = useState(false);

  React.useEffect(() => {
    try {
        const storedDeliveries = window.localStorage.getItem('deliveries');
        if (!storedDeliveries || JSON.parse(storedDeliveries).length === 0) {
            setDeliveries(getSampleData());
        }
    } catch (e) {
        console.error("Failed to parse deliveries from localStorage", e);
        setDeliveries(getSampleData());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddDelivery = useCallback((newDeliveryData: Omit<Delivery, 'id' | 'status' | 'createdAt'>) => {
    const newDelivery: Delivery = {
      id: new Date().getTime().toString(),
      ...newDeliveryData,
      status: DeliveryStatus.Pendente,
      createdAt: new Date().toISOString(),
    };
    setDeliveries(prevDeliveries => [newDelivery, ...prevDeliveries]);
  }, [setDeliveries]);

  const handleStatusChange = useCallback((id: string, newStatus: DeliveryStatus) => {
    setDeliveries(prevDeliveries =>
      prevDeliveries.map(d =>
        d.id === id ? { ...d, status: newStatus } : d
      )
    );
  }, [setDeliveries]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header onQrClick={() => setQrModalOpen(true)} />
      <main className="container mx-auto">
        <DeliveryList deliveries={deliveries} onStatusChange={handleStatusChange} />
      </main>
      
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 z-20"
        aria-label="Adicionar nova entrega"
      >
        <PlusIcon className="w-8 h-8" />
      </button>

      <AddDeliveryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddDelivery={handleAddDelivery}
      />
      
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setQrModalOpen(false)}
      />
    </div>
  );
};

export default App;