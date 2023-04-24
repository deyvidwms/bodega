import styled from 'styled-components';

export const Container = styled.div`
  background: #f4f4f4;
`;

export const HeaderEncarte = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px 20px;

  @media (max-width: 570px) {
    align-items: flex-start;

    div {
      display: none;
    }
  }
`;

export const Title = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  margin-bottom: 16px;
  transform: translateY(-60%);
`;

export const TitleMobile = styled.h1`
  font-family: 'Dancing Script', cursive;
  font-size: 3rem;
  margin-bottom: 16px;
  transform: translateY(-60%);
`;

export const Subtitle = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 5rem;
  font-weight: 900;
  color: #FFF;
  text-shadow: 0 0 20px rgb(0 0 0 / 35%);

  @media (max-width: 570px) {
    font-size: 6rem;
    line-height: 1;
  }

  @media (max-width: 380px) {
    font-size: 4rem;
  }
`;

export const ContentEncarte = styled.div`
  max-width: 1250px;
  margin: auto;
`;

export const CategoryEncarte = styled.div`
  margin-bottom: 20px;
`;

export const CategoryTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

export const CategoryListItens = styled.div`
  display: flex;
  flex-wrap: wrap;  
  justify-content: center;
  gap: 15px;
`;

export const ProductImage = styled.img``;

export const ProductItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding: 30px 10px;
  background-color: #FFF;
  box-shadow: 10px 10px 20px rgb(127 127 127 / 25%);
  border-radius: 12px;

  img {
    width: 70%;
    border-radius: 12px;
    margin-bottom: 10px;
  }
`;

export const ProductName = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 1.5rem;
`;

export const ProductPrice = styled.h1`
  font-family: 'Montserrat', sans-serif;
  font-size: 2rem;
`;

export const FooterEncarte = styled.div`
  display: flex;
  justify-content: center;
  background-image: linear-gradient(180deg, #f4f4f4 30%, #fff 30%);
  padding: 50px;
`;

export const RegisterClientForm = styled.form`
  background-color: #FFF;
  width: fit-content;
  padding: 50px;
  border-radius: 6px;
  box-shadow: 10px 10px 20px rgb( 0 0 0 / 5%),
              -10px -10px 20px rgb( 0 0 0 / 15%);

  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.5rem;
    max-width: 600px;
  }
`;

export const RegisterClientFormContent = styled.div`
  max-width: 600px;
`;

export const RegisterClientFormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;