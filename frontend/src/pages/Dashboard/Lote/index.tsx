import React, { useState } from 'react';

import LayoutDashboard from '../../../components/LayoutDashboard';
import Row from '../../../components/Row';
import Column from '../../../components/Column';
import BreadCrumb from '../../../components/BreadCrumb';
import ActionButton from '../../../components/ActionButton';
import TableElement from '../../../components/TableElement';

import { Container, Title } from './styles';
import SideBarForm from '../../../components/SideBarForm';
import TextFieldElement from '../../../components/TextFieldElement';
import AutoCompleteElement from '../../../components/AutoCompleteElement';

function createData(
  name: string,
  description: string,
) {
  return { name, description };
}

const rows = [
  createData('Cupcake', 'Descrição do lote'),
  createData('Donut', 'Descrição do lote'),
  createData('Eclair', 'Descrição do lote'),
  createData('Frozen yoghurt', 'Descrição do lote'),
  createData('Gingerbread', 'Descrição do lote'),
  createData('Honeycomb', 'Descrição do lote'),
  createData('Ice cream sandwich', 'Descrição do lote'),
  createData('Jelly Bean', 'Descrição do lote'),
  createData('KitKat', 'Descrição do lote'),
  createData('Lollipop', 'Descrição do lote'),
  createData('Marshmallow', 'Descrição do lote'),
  createData('Nougat', 'Descrição do lote'),
  createData('Oreo', 'Descrição do lote'),
];

const Lote: React.FC = () => {
  const [showSideBarForm, setShowSideBarForm] = useState<boolean>(false);

  const caminhos = [
    {
      name: 'Dashboard',
      link: '/dashboard/'
    },
    {
      name: 'Lote',
      link: '/dashboard/lote'
    }
  ];
  
  const handleClick = () => {
    setShowSideBarForm(!showSideBarForm);
  }

  return (
    <LayoutDashboard>
      <Container>
        <Row>
          <Column>
            <BreadCrumb caminhos={caminhos} />
            <Title>Lotes</Title>
          </Column>
        </Row>

        <Row>
          <Column style={{ alignItems: 'flex-end' }}>
            <ActionButton text='Adicionar Lote' onClick={handleClick} />
          </Column>
        </Row>

        <Row>
          <Column>
            <TableElement 
              header={['nome', 'descrição']} 
              rowsField={['name', 'description']} 
              rows={rows} 
              tableItemName='Lotes' 
              handleEdit={() => console.log('edit')}
              handleDelete={() => console.log('delete')}    
            />
          </Column>
        </Row>
      </Container>
      <SideBarForm 
        title='Lotes' 
        show={showSideBarForm}
        setShow={setShowSideBarForm}  
        currentSchema={1}
      >
        <AutoCompleteElement
          label='Produto'
          name='produto'
          options={top100Films}
          required
        />

        <TextFieldElement 
          label='Quantidade'
          name='quantidade'
          required
        />

        <TextFieldElement 
          label='Descrição'
          name='descricao'
          required
        />

      </SideBarForm>
    </LayoutDashboard>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { name: 'The Shawshank Redemption', id: 1994 },
  { name: 'The Godfather', id: 1972 },
  { name: 'The Godfather: Part II', id: 1974 },
  { name: 'The Dark Knight', id: 2008 },
  { name: '12 Angry Men', id: 1957 },
  { name: "Schindler's List", id: 1993 },
  { name: 'Pulp Fiction', id: 1994 },
  {
    name: 'The Lord of the Rings: The Return of the King',
    id: 2003,
  },
  { name: 'The Good, the Bad and the Ugly', id: 1966 },
  { name: 'Fight Club', id: 1999 },
  {
    name: 'The Lord of the Rings: The Fellowship of the Ring',
    id: 2001,
  },
  {
    name: 'Star Wars: Episode V - The Empire Strikes Back',
    id: 1980,
  },
  { name: 'Forrest Gump', id: 1994 },
  { name: 'Inception', id: 2010 },
  {
    name: 'The Lord of the Rings: The Two Towers',
    id: 2002,
  },
  { name: "One Flew Over the Cuckoo's Nest", id: 1975 },
  { name: 'Goodfellas', id: 1990 },
  { name: 'The Matrix', id: 1999 },
  { name: 'Seven Samurai', id: 1954 },
  {
    name: 'Star Wars: Episode IV - A New Hope',
    id: 1977,
  },
  { name: 'City of God', id: 2002 },
  { name: 'Se7en', id: 1995 },
  { name: 'The Silence of the Lambs', id: 1991 },
  { name: "It's a Wonderful Life", id: 1946 },
  { name: 'Life Is Beautiful', id: 1997 },
  { name: 'The Usual Suspects', id: 1995 },
  { name: 'Léon: The Professional', id: 1994 },
  { name: 'Spirited Away', id: 2001 },
  { name: 'Saving Private Ryan', id: 1998 },
  { name: 'Once Upon a Time in the West', id: 1968 },
  { name: 'American History X', id: 1998 },
  { name: 'Interstellar', id: 2014 },
  { name: 'Casablanca', id: 1942 },
  { name: 'City Lights', id: 1931 },
  { name: 'Psycho', id: 1960 },
  { name: 'The Green Mile', id: 1999 },
  { name: 'The Intouchables', id: 2011 },
  { name: 'Modern Times', id: 1936 },
  { name: 'Raiders of the Lost Ark', id: 1981 },
  { name: 'Rear Window', id: 1954 },
  { name: 'The Pianist', id: 2002 },
  { name: 'The Departed', id: 2006 },
  { name: 'Terminator 2: Judgment Day', id: 1991 },
  { name: 'Back to the Future', id: 1985 },
  { name: 'Whiplash', id: 2014 },
  { name: 'Gladiator', id: 2000 },
  { name: 'Memento', id: 2000 },
  { name: 'The Prestige', id: 2006 },
  { name: 'The Lion King', id: 1994 },
  { name: 'Apocalypse Now', id: 1979 },
  { name: 'Alien', id: 1979 },
  { name: 'Sunset Boulevard', id: 1950 },
  {
    name: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
    id: 1964,
  },
  { name: 'The Great Dictator', id: 1940 },
  { name: 'Cinema Paradiso', id: 1988 },
  { name: 'The Lives of Others', id: 2006 },
  { name: 'Grave of the Fireflies', id: 1988 },
  { name: 'Paths of Glory', id: 1957 },
  { name: 'Django Unchained', id: 2012 },
  { name: 'The Shining', id: 1980 },
  { name: 'WALL·E', id: 2008 },
  { name: 'American Beauty', id: 1999 },
  { name: 'The Dark Knight Rises', id: 2012 },
  { name: 'Princess Mononoke', id: 1997 },
  { name: 'Aliens', id: 1986 },
  { name: 'Oldboy', id: 2003 },
  { name: 'Once Upon a Time in America', id: 1984 },
  { name: 'Witness for the Prosecution', id: 1957 },
  { name: 'Das Boot', id: 1981 },
  { name: 'Citizen Kane', id: 1941 },
  { name: 'North by Northwest', id: 1959 },
  { name: 'Vertigo', id: 1958 },
  {
    name: 'Star Wars: Episode VI - Return of the Jedi',
    id: 1983,
  },
  { name: 'Reservoir Dogs', id: 1992 },
  { name: 'Braveheart', id: 1995 },
  { name: 'M', id: 1931 },
  { name: 'Requiem for a Dream', id: 2000 },
  { name: 'Amélie', id: 2001 },
  { name: 'A Clockwork Orange', id: 1971 },
  { name: 'Like Stars on Earth', id: 2007 },
  { name: 'Taxi Driver', id: 1976 },
  { name: 'Lawrence of Arabia', id: 1962 },
  { name: 'Double Indemnity', id: 1944 },
  {
    name: 'Eternal Sunshine of the Spotless Mind',
    id: 2004,
  },
  { name: 'Amadeus', id: 1984 },
  { name: 'To Kill a Mockingbird', id: 1962 },
  { name: 'Toy Story 3', id: 2010 },
  { name: 'Logan', id: 2017 },
  { name: 'Full Metal Jacket', id: 1987 },
  { name: 'Dangal', id: 2016 },
  { name: 'The Sting', id: 1973 },
  { name: '2001: A Space Odyssey', id: 1968 },
  { name: "Singin' in the Rain", id: 1952 },
  { name: 'Toy Story', id: 1995 },
  { name: 'Bicycle Thieves', id: 1948 },
  { name: 'The Kid', id: 1921 },
  { name: 'Inglourious Basterds', id: 2009 },
  { name: 'Snatch', id: 2000 },
  { name: '3 Idiots', id: 2009 },
  { name: 'Monty Python and the Holy Grail', id: 1975 },
];

export default Lote;