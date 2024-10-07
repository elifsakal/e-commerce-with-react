import { useEffect, useState } from 'react';
import './App.css';
import PageContainer from './container/PageContainer';
import Header from './components/Header';
import RouterConfig from './config/RouterConfig';
import Loading from './components/Loading';
import { Drawer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { calculateBasket, setDrawer, removeFromBasket } from './redux/slices/basketslice';

function App() {
  const { products, drawer, totalAmount } = useSelector((store) => store.basket);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateBasket());
  }, []);

  const handleRemoveFromBasket = (id) => {
    dispatch(removeFromBasket({ id }));
    dispatch(calculateBasket());
  };

  return (
    <div>
      <PageContainer>
        <Header />
        <RouterConfig />
        <Loading />
        <Drawer className='drawer' anchor='right' open={drawer} onClose={() => dispatch(setDrawer())}>
          {
            products && products.map((product) => (
              <div key={product.id}>
                <div className='flex-row' style={{ padding: "20px" }}>
                  <img style={{ marginRight: "10px" }} src={product.image} width={50} height={50} />
                  <p style={{ width: "320px" }}>{product.title}({product.count})</p>
                  <p style={{ marginRight: "10px", fontWeight: "bold", width: "60px" }}>{product.price} TL</p>
                  <button onClick={() => handleRemoveFromBasket(product.id)} style={{ padding: "5px", borderRadius: "5px", backgroundColor: "lightpink", border: "none", color: "white", width: "50px" }}>Sil</button>
                </div>
              </div>
            ))
          }
          <div>Toplam Tutar: {totalAmount}</div>
        </Drawer>
      </PageContainer>
    </div>
  );
}

export default App;
