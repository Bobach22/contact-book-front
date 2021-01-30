import { styled } from 'baseui';

export const Wrapper = styled('div', () => ({
  backgroundColor: '#ffffff',
}));

export const Header = styled('header', () => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flex: '0 1 auto',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: '40px',
  backgroundColor: '#ffffff',
  marginBottom: '30px',
  boxShadow: '0 0 8px rgba(0, 0 ,0, 0.1)',
 
}));

export const Heading = styled('h2', ({ $theme }) => ({
  ...$theme.typography.HeadingXSmall,
  fontWeight:700,
  color: '#161F6A',
  margin: 0,
  display:"flex",
  alignItems:"center"
}));

export const ButtonWrapper = styled('div', ({ $theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  paddingTop: '20px',
}));
