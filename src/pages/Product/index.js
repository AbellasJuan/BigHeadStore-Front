import { useEffect, useState } from 'react';
import { Container, Image, Name, Footer, Price, Button } from './style';
import { useParams } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Product() {
  const { id } = useParams();
  const [item, setItem] = useState({image: "", name: "", price: "132"});
  const { cart, fillCart } = useCart();
  const navigate = useNavigate();
  async function loadPage() {
    const promise = api.getProduct(id);
    promise.then(ans => {
      setItem(ans.data);
    }).catch(err => alert(err));
  }

  useEffect(() => {
    loadPage();
  }, [])

  function putOnCart(e) {
    const index = cart.findIndex((item) => item._id === e.id);
    const cartUpdt = cart
    if (index === -1) {
      cartUpdt.push({ ...item, quantity: 1 });
    } else {
      cartUpdt[index].quantity = parseInt(cart[index].quantity) + 1;
    }
    fillCart(cartUpdt);
    navigate('/cart')
  }

  return (
    <Container>
      <Image src={item.image} alt={item.name} />
      <Name>{item.name}</Name>
      <Footer>
        <Price>{`R$${parseFloat(item.price).toFixed(2).replace('.', ',')}`}</Price>
        <Button onClick={(e) => putOnCart(e.target)} id={item._id}>Adicionar ao carrinho</Button>
      </Footer>
    </Container>

  );
}

export default Product;