import React from 'react';
import { useCart } from "../contexts/CartContext"; // Usa o contexto com o updateQuantity corrigido
import { useCart } from "../contexts/AuthContext";

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (!isOpen) return null;

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookie Value;
  }

  const CartModal = ({ isOpen, onClose }) => {
    const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
    const [submitting, setSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleCheckout = () => {
      if(cart.length === 0) return;
      setSubmitting(true);

      const payload = {
        total_price: totalPrice.toFixed(2),
        items: cart.map((item) => ({
          product: item.id,
          price: Number(item.price).toFixed(2),
          quantity: item.quantity,
        })),
      };

      fetch('/api/orders/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCookie('csrftoken'),
        },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          if (!res.ok) {
            const errData = await res.json();
            alert(`Erro ao processar pedido: ${JSON.stringify(errData)}`);
            throw new Error('Erro no checkout');
          }
          return res.json();
        })
        .then((data) => {
          alert(`🎉 Pedido #${data.order_id} realizado com sucesso!`);
          clearCart(); // Esvazia o carrinho global e o localStorage
          onClose(); // Fecha a gaveta do carrinho
        })
        .catch((err) => console.error(err))
        .finally(() => setSubmitting(false));
    };
    
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'flex-end', zIndex: 1000 }}>
        <div style={{ width: '100%', maxWidth: '450px', backgroundColor: '#fff', height: '100%', padding: '20px', display: 'flex', WebkitFlexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Meu Carrinho</h2>
              <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}>&times;</button>
            </div>

            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#777', marginTop: '40px'}}>O seu carrinho está vazio.</p>
            ) : (
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                </div>
              ))}
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'flex-end',
      zIndex: 1000
    }}>
      <div style={{
        width: '100%',
        maxWidth: '450px',
        backgroundColor: '#fff',
        height: '100%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '-2px 0 10px rgba(0,0,0,0.1)'
      }}>
        {/* Cabeçalho do Modal */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>Meu Carrinho</h2>
            <button 
              onClick={onClose} 
              style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
            >
              &times;
            </button>
          </div>

          {/* Lista de Itens do Carrinho */}
          {cart.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#777', marginTop: '40px' }}>O seu carrinho está vazio.</p>
          ) : (
            <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {cart.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #f0f0f0', alignItems: 'center' }}>
                  {/* Thumbnail */}
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#eee', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                    {item.image ? (
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#aaa' }}>Sem Foto</div>
                    )}
                  </div>

                  {/* Informações */}
                  <div style={{ flexGrow: 1 }}>
                    <h4 style={{ margin: '0 0 5px 0', fontSize: '15px' }}>{item.name}</h4>
                    <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
                      R$ {Number(item.price).toFixed(2)}
                    </p>

                    {/* Controles de Quantidade */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fff', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Botão Remover */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '14px' }}
                  >
                    Excluir
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Rodapé do Modal (Resumo & Ações) */}
        {cart.length > 0 && (
          <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
              <span>Total:</span>
              <span>R$ {totalPrice.toFixed(2)}</span>
            </div>

            <button 
              onClick={() => alert('Próximo passo: Finalização de Pedido (Checkout)!')}
              style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginBottom: '8px' }}
            >
              Finalizar Compra
            </button>

            <button 
              onClick={clearCart}
              style={{ width: '100%', padding: '8px', backgroundColor: 'transparent', color: '#6c757d', border: 'none', cursor: 'pointer', fontSize: '13px' }}
            >
              Esvaziar Carrinho
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;